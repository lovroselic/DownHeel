/*jshint browser: true */
/*jshint -W097 */
/*jshint -W117 */
/*jshint -W061 */
"use strict";

const INI = {
    MAXINT: 256,
    MININT: 3,
    MAX_GRID: 64,
    MIN_GRID: 5,
    SPACE_X: 4096,
    SPACE_Y: 2048,
    CANVAS_RESOLUTION: 256,
    DRAW_OCCLUSION_MAP: false,
};

const MAP = {
    Demo: {
        name: "Demo",
        data: '{"width":7,"height":7,"depth":1,"map":"BB3AA4BB2AA2BAA6BB6ABB3ABABB3ABB6ABB5$BA"}',
        wall: "RockWall_SDXL_003",
        floor: "RockWall_SDXL_003",
        start: '[17,1]',
    }
};

const $MAP = {
    map: {},
    properties: null,
    lists: null,
    combined: [],
    init() {
        for (const prop of this.properties) {
            this.map[prop] = [];
        }
        for (const prop of this.lists) {
            this.map[prop] = [];
        }
    },
    combine() {
        this.combined = [];
        for (const prop of this.properties) {
            this.combined.push(this.map[prop]);
        }
    }
};

const PRG = {
    VERSION: "0.1.2",
    NAME: "TrackBuilder",
    YEAR: "2026",
    CSS: "color: #239AFF;",
    INIT() {
        console.log("%c**************************************************************************************************************************************", PRG.CSS);
        console.log(`${PRG.NAME} ${PRG.VERSION} by Lovro Selic, (c) LaughingSkull ${PRG.YEAR} on ${navigator.userAgent}`);
        console.log("%c**************************************************************************************************************************************", PRG.CSS);
        $("#title").html(PRG.NAME);
        $("#version").html(`${PRG.NAME} V${PRG.VERSION} <span style='font-size:14px'>&copy</span> LaughingSkull ${PRG.YEAR}`);

        ENGINE.autostart = true;
        ENGINE.start = PRG.start;
        ENGINE.readyCall = GAME.setup;
        ENGINE.setGridSize(64);
        ENGINE.setSpriteSheetSize(64);
        ENGINE.init();
    },
    setup() {
        console.log("PRG.setup");
        $("#verticalGrid").change(GAME.updateWH);
        $("#horizontalGrid").change(GAME.updateWH);
        $("#gridsize").change(GAME.updateWH);
        $("#selector input[name=renderer]").click(GAME.render);
        $("#corr").click(GAME.render);
        $("#coord").click(GAME.render);
        $("#all_coord").click(GAME.render);
        $("#grid").click(GAME.render);

        $("#engine_version").html(ENGINE.VERSION);
        $("#grid_version").html(GRID.VERSION);
        $("#maze_version").html(DUNGEON.VERSION);
        $("#lib_version").html(LIB.VERSION);
        $("#webgl_version").html(WebGL.VERSION);
        $("#iam_version").html(IndexArrayManagers.VERSION);

        $(".section").show();

        $("#buttons").on("click", "#new", GAME.init);
        $("#buttons").on("click", "#export", GAME.export);
        $("#buttons").on("click", "#import", GAME.import);
        $("#buttons").on("click", "#copy", GAME.copyToClipboard);

        MAP_TOOLS.INI.FOG = false;
        WebGL.PRUNE = false;
    },
    start() {
        console.log(PRG.NAME + " started.");
        $("#startGame").addClass("hidden");
        GAME.start();
    }
};

const HERO = {};

const GAME = {
    floor: 0,
    start() {
        WebGL.setContext('webgl');
        $MAP.properties = MAP_TOOLS.properties;
        $MAP.lists = MAP_TOOLS.lists;
        $("#bottom")[0].scrollIntoView();
        ENGINE.topCanvas = ENGINE.getCanvasName("ROOM");
        $(ENGINE.topCanvas).on("click", { layer: ENGINE.topCanvas }, GAME.mouseClick);
        GAME.init();
        GAME.started = true;
        GAME.level = "Demo";

        WebGL.PRUNE = false;
        WebGL.HERO_AS_INNER = true;
        WebGL.INI.BACKGROUND_ALPHA = 0.0;
        WebGL.USE_SHADOW = false;

        GAME.levelStart();
    },
    levelStart() {
        GAME.initLevel(GAME.level);
        WebGL.GAME.setFirstPerson();
        WebGL.renderScene($MAP.map);
    },
    newDungeon(level) {
        MAP_TOOLS.unpack(level);
    },
    buildWorld(level) {
        console.warn("building world, level", level);
        SPAWN_TOOLS.spawn(level);
        MAP[level].world = WORLD.build(MAP[level].map);
        $MAP.map.textureMap = $MAP.map.GA.toTextureMap();
    },
    setWorld(level, decalsAreSet = false) {
        console.log("setting world");
        console.time("setWorld");

        const textureData = {
            wall: TEXTURE[$("#walltexture")[0].value],
            floor: TEXTURE[$("#floortexture")[0].value],
        };

        WebGL.updateShaders();
        WebGL.init('webgl', MAP[level].world, textureData, HERO.player, decalsAreSet);
        console.timeEnd("setWorld");
    },
    initLevel(level) {
        this.newDungeon(level);
        const start_dir = MAP[level].map.startPosition.vector;
        let start_grid = MAP[level].map.startPosition.grid;
        start_grid = Vector3.from_Grid(Grid.toCenter(start_grid), 0.6);
        HERO.player = new $3D_player(start_grid, Vector3.from_2D_dir(start_dir), MAP[level].map, HERO_TYPE.ThePrincess);
        WebGL.CONFIG.set("first_person", false);

        WebGL.init_required_IAM($MAP.map, HERO);
        GAME.setCameraView();
        this.buildWorld(level);
        this.setWorld(level);
        console.info("GAME init completed");
    },
    setCameraView() {
        WebGL.hero.firstPersonCamera = new $3D_Camera(WebGL.hero.player, DIR_NOWAY, 0.0, new Vector3(0, 0, 0), 0);
        WebGL.hero.topCamera = new $3D_Camera(WebGL.hero.player, DIR_UP, 0.9, new Vector3(0, -0.5, 0), 1, 70);

        switch (WebGL.CONFIG.cameraType) {
            case "first_person":
                WebGL.hero.player.associateExternalCamera(WebGL.hero.firstPersonCamera);
                WebGL.setCamera(WebGL.hero.firstPersonCamera);
                break;
            case "third_person":
                WebGL.hero.player.associateExternalCamera(WebGL.hero.topCamera);
                WebGL.setCamera(WebGL.hero.topCamera);
                break;
            default:
                throw "WebGL.CONFIG.cameraType error";
        }
    },
    setup() {
        console.log("GAME SETUP started");

        GAME.updateWH();

        $(ENGINE.gameWindowId).width(ENGINE.gameWIDTH + 4);
        ENGINE.addBOX("ROOM", ENGINE.gameWIDTH, ENGINE.gameHEIGHT, ["pacgrid", "wall", "grid", "hint", "coord", "click"], null);
        ENGINE.addBOX("WEBGL", 800, 600, ["3d_webgl"], null);
        ENGINE.addBOX("DEBUG", 320, 200, ["debug"], null);

        $("#buttons").append("<input type='button' id='new' value='New'>");
        $("#buttons").append("<input type='button' id='export' value='Export'>");
        $("#buttons").append("<input type='button' id='import' value='Import'>");
        $("#buttons").append("<input type='button' id='copy' value='Copy to Clipboard'>");

        $("#gridsize").on("change", GAME.render);

        //fill_value
        $("#fill_value").append(`<option value="${MAPDICT.EMPTY}">Space</option>`);
        $("#fill_value").append(`<option value="${MAPDICT.HOLE}">Hole</option>`);
        $("#fill_value").append(`<option value="${MAPDICT.WALL}">Wall</option>`);

        //textures
        for (const prop of TEXTURE_LIST) {
            $("#walltexture").append(`<option value="${prop}">${prop}</option>`);
            $("#floortexture").append(`<option value="${prop}">${prop}</option>`);
            $("#texture_decal").append(`<option value="${prop}">${prop}</option>`);
        }

        LAYER.wallcanvas = $("#wallcanvas")[0].getContext("2d");
        LAYER.floorcanvas = $("#floorcanvas")[0].getContext("2d");
        LAYER.texturecanvas = $("#texturecanvas")[0].getContext("2d");

        GAME.updateTextures();
        $("#walltexture").change(GAME.repaintTextures);
        $("#floortexture").change(GAME.repaintTextures);
        $("#texture_decal").change(GAME.repaintTextures);

        /** pictures */
        if (DECAL_PAINTINGS.length > 0) {
            for (const pic of DECAL_PAINTINGS) {
                $("#picture_decal").append(`<option value="${pic}">${pic}</option>`);
            }
            $("#picture_decal").change(function () {
                ENGINE.drawToId("picturecanvas", 0, 0, ENGINE.conditionalResize(SPRITE[$("#picture_decal")[0].value], INI.CANVAS_RESOLUTION));
            });
            $("#picture_decal").trigger("change");
        }

        /** crests */
        if (DECAL_CRESTS.length > 0) {
            for (const crest of DECAL_CRESTS) {
                $("#crest_decal").append(`<option value="${crest}">${crest}</option>`);
            }
            $("#crest_decal").change(function () {
                ENGINE.drawToId("crestcanvas", 0, 0, ENGINE.conditionalResize(SPRITE[$("#crest_decal")[0].value], INI.CANVAS_RESOLUTION));
            });
            $("#crest_decal").trigger("change");
        }

        /** lights */
        if (LIGHT_DECALS.length > 0) {
            for (const light of LIGHT_DECALS) {
                $("#light_decal").append(`<option value="${light}">${light}</option>`);
            }
            $("#light_decal").change(function () {
                ENGINE.drawToId("lightcanvas", 0, 0, ENGINE.conditionalResize(SPRITE[$("#light_decal")[0].value], INI.CANVAS_RESOLUTION));
            });
            $("#light_decal").trigger("change");
        }

        for (const light in LIGHT_COLORS) {
            $("#lighttype").append(`<option value="${light}">${light}</option>`);
        }
        GAME.printLightDetails();
        $("#lighttype").change(GAME.printLightDetails);

        for (const material in MATERIAL) {
            if (material !== "VERSION") {
                $("#materialtype").append(`<option value="${material}">${material}</option>`);
            }
        }
        GAME.printMaterialDetails();
        $("#materialtype").change(GAME.printMaterialDetails);

        /** */

        $("#randwall").click(GAME.randomTexture.bind(null, TEXTURE_LIST, "#walltexture", "wallcanvas"));
        $("#randfloor").click(GAME.randomTexture.bind(null, TEXTURE_LIST, "#floortexture", "floorcanvas"));

        $("#randpic").click(GAME.randomPic);
        $("#randcrest").click(GAME.randomCrest);
        $("#randlight").click(GAME.randomLight);

        /** search inputs */
        const filterOptions = (selectId, searchId) => {
            const filter = $(searchId).val().toLowerCase();

            $(`${selectId} option`).each((_, option) => {
                const text = $(option).text().toLowerCase();
                $(option).toggle(text.includes(filter));
            });
        };


        $('#searchDecalTexture').on('keyup', () => filterOptions("#texture_decal", "#searchDecalTexture"));
        $('#searchDecals').on('keyup', () => filterOptions("#crest_decal", "#searchDecals"));
        $('#searchPics').on('keyup', () => filterOptions("#picture_decal", "#searchPics"));
        $('#searchLights').on('keyup', () => filterOptions("#light_decal", "#searchLights"));
        $('#searchWall').on('keyup', () => filterOptions("#walltexture", "#searchWall"));
        $('#searchFloor').on('keyup', () => filterOptions("#floortexture", "#searchFloor"));

        /** shortcuts */

        $(document).keydown((event) => {
            switch (event.key) {
                case 'F8':
                    GAME.randomPic();
                    GAME.randomCrest();
                    break;
                default:
                    break;
            }
        });

        console.log("GAME SETUP completed");
    },
    getResolution(texture) {
        return [texture.width, texture.height];
    },
    randomTexture(TextureList, id, canvas) {
        const texture = TextureList.chooseRandom();
        $(id).val(texture).change();
        ENGINE.drawToId(canvas, 0, 0, ENGINE.conditionalResize(TEXTURE[$(id)[0].value], 320));
    },
    randomLight() {
        const search_light = $('#searchLights').val().toLowerCase();
        const filtered_light_decals = LIGHT_DECALS.filter(decal => decal.toLowerCase().includes(search_light));
        const pic = filtered_light_decals.chooseRandom();
        if (!pic) return;
        $("#light_decal").val(pic).change();
        ENGINE.drawToId("lightcanvas", 0, 0, ENGINE.conditionalResize(SPRITE[$("#light_decal")[0].value], INI.CANVAS_RESOLUTION));
    },
    randomPic() {
        const search_pic = $('#searchPics').val().toLowerCase();
        const filtered_pics = DECAL_PAINTINGS.filter(decal => decal.toLowerCase().includes(search_pic));
        const pic = filtered_pics.chooseRandom();
        if (!pic) return;
        $("#picture_decal").val(pic).change();
        ENGINE.drawToId("picturecanvas", 0, 0, ENGINE.conditionalResize(SPRITE[$("#picture_decal")[0].value], INI.CANVAS_RESOLUTION));
    },
    randomCrest() {
        const search_crest = $('#searchDecals').val().toLowerCase();
        const filtered_crests = DECAL_CRESTS.filter(crest => crest.toLowerCase().includes(search_crest));
        const pic = filtered_crests.chooseRandom();
        if (!pic) return;
        $("#crest_decal").val(pic).change();
        ENGINE.drawToId("crestcanvas", 0, 0, ENGINE.conditionalResize(SPRITE[$("#crest_decal")[0].value], INI.CANVAS_RESOLUTION));
    },
    updateTextures() {
        const wallTexture = TEXTURE[$("#walltexture")[0].value];
        const floorTexture = TEXTURE[$("#floortexture")[0].value];
        const textureTexture = TEXTURE[$("#texture_decal")[0].value];
        ENGINE.resizeAndFill(LAYER.wallcanvas, wallTexture, 320);
        ENGINE.resizeAndFill(LAYER.floorcanvas, floorTexture, 320);
        ENGINE.resizeAndFill(LAYER.texturecanvas, textureTexture, INI.CANVAS_RESOLUTION);
        const ids = ["wall_resolution", "floor_resolution"];
        for (const [i, pTexture] of [wallTexture, floorTexture].entries()) {
            let res = GAME.getResolution(pTexture);
            $(`#${ids[i]}`).html(`width: ${res[0]}, height: ${res[1]}`);
        }
        if (GAME.started) GAME.levelStart(); //
    },
    repaintTextures() {
        GAME.updateTextures();
        if ($("#selector input[name=renderer]:checked").val() === "texture") {
            GAME.texture();
        }
    },
    updateWH() {
        if (isNaN(parseInt($("#verticalGrid").val(), 10))) $("#verticalGrid").val(32);
        if (isNaN(parseInt($("#horizontalGrid").val(), 10))) $("#horizontalGrid").val(24);
        if (isNaN(parseInt($("#depthGrid").val(), 10))) $("#depthGrid").val(1);
        if (isNaN(parseInt($("#gridsize").val(), 10))) $("#gridsize").val(32);
        if ($("#verticalGrid").val() > INI.MAXINT) $("#verticalGrid").val(INI.MAXINT);
        if ($("#verticalGrid").val() < INI.MININT) $("#verticalGrid").val(INI.MININT);
        if ($("#horizontalGrid").val() > INI.MAXINT) $("#horizontalGrid").val(INI.MAXINT);
        if ($("#horizontalGrid").val() < INI.MININT) $("#horizontalGrid").val(INI.MININT);

        if ($("#gridsize").val() < INI.MIN_GRID) $("#gridsize").val(INI.MIN_GRID);
        if ($("#gridsize").val() > INI.MAX_GRID) $("#gridsize").val(INI.MAX_GRID);
        if ($("#gridsize").val() % 8 !== 0) {
            $("#gridsize").val(Math.floor($("#gridsize").val() / 8) * 8);
        }
        ENGINE.INI.GRIDPIX = parseInt($("#gridsize").val(), 10);
        //change grids
        if ($("#horizontalGrid").val() * ENGINE.INI.GRIDPIX > INI.SPACE_X) {
            $("#horizontalGrid").val(Math.floor(INI.SPACE_X / ENGINE.INI.GRIDPIX));
        }
        if ($("#verticalGrid").val() * ENGINE.INI.GRIDPIX > INI.SPACE_Y) {
            $("#verticalGrid").val(Math.floor(INI.SPACE_Y / ENGINE.INI.GRIDPIX));
        }

        ENGINE.gameHEIGHT = $("#verticalGrid").val() * ENGINE.INI.GRIDPIX;
        ENGINE.gameWIDTH = $("#horizontalGrid").val() * ENGINE.INI.GRIDPIX;
        $("#ENGINEgameWIDTH").html(ENGINE.gameWIDTH);
        $("#ENGINEgameHEIGHT").html(ENGINE.gameHEIGHT);
        $("#spacex").html(INI.SPACE_X);
        $("#spacey").html(INI.SPACE_Y);
        GAME.resize();
    },
    resize() {
        $MAP.width = $("#horizontalGrid").val();
        $MAP.height = $("#verticalGrid").val();
    },
    mouseClick(event) {
        ENGINE.readMouse(event);
        let x = Math.floor(ENGINE.mouseX / ENGINE.gameWIDTH * $MAP.width);
        let y = Math.floor(ENGINE.mouseY / ENGINE.gameHEIGHT * $MAP.height);

        const radio = $("#paint input[name=painter]:checked").val();
        let GA = $MAP.map.GA;
        let dir, nameId, type, dirIndex, dirs, grid;

        grid = new Grid3D(x, y, GAME.floor);
        let currentValue = GA.getValue(grid);
        let gridIndex = GA.gridToIndex(grid);

        console.warn("mouseClick", grid, "radio", radio, "currentValue", currentValue, "gridIndex", gridIndex, "floor", GAME.floor);

        switch (radio) {

            case 'flip':
                if (GA.isWall(grid)) {
                    GA.carveDot(grid);
                } else {
                    GA.toWall(grid);
                }
                $("#error_message").html("All is fine");
                break;

            case "space":
                GA.carveDot(grid);
                if ($("input[name=floor_support]:checked").val()) {
                    if (grid.z > 0) {
                        grid.z--;
                        GA.toWall(grid);
                    }
                }
                $("#error_message").html("All is fine");
                break;

            case "wall":
                GA.toWall(grid);
                if ($("input[name=ceil_support]:checked").val()) {
                    console.log(grid, dimension);
                    if (grid.z < $MAP.map.depth - 1) {
                        grid.z++;
                        GA.carveDot(grid);
                        console.log("carving space above", grid);
                    }
                }
                $("#error_message").html("All is fine");
                break;

            case "hole":
                GAME.clearGrid(gridIndex);
                GA.toHole(grid);
                $("#error_message").html("All is fine");
                break;

            case "pillar":
                GA.toPillar(grid);
                $("#error_message").html("All is fine");
                break;

            case "decal":
                switch (currentValue) {
                    case MAPDICT.EMPTY:
                    case MAPDICT.BLOCKWALL:
                        dir = NOWAY;
                        [nameId, type] = GAME.getSelectedDecal();
                        break;
                    case MAPDICT.WALL:
                        dir = GAME.getSelectedDir();
                        if (dir.same(NOWAY)) {
                            $("#error_message").html("Wall decal needs direction");
                            return;
                        }
                        [nameId, type] = GAME.getSelectedDecal();
                        break;
                    default:
                        $("#error_message").html(`Decal placement not supported on value: ${currentValue}`);
                        return;
                }

                dirIndex = dir.toInt();
                $("#error_message").html("All is fine");
                GAME.assertUniqueDecalPosition(gridIndex, dirIndex, $MAP.map.decals);
                $MAP.map.decals.push(Array(gridIndex, dirIndex, nameId, type));
                break;

            case "light":
                console.log("light, value", currentValue, "grid", grid);
                switch (currentValue) {
                    case MAPDICT.HOLE:
                    case MAPDICT.WALL:
                        dir = GAME.getSelectedDir();
                        console.log(".dir", dir);
                        if (dir.same(NOWAY)) {
                            $("#error_message").html("Light decal needs direction");
                            return;
                        }
                        dirIndex = dir.toInt();
                        nameId = $("#light_decal")[0].value;
                        type = $("#lighttype")[0].value;
                        $MAP.map.lights.push(Array(gridIndex, dirIndex, nameId, type));
                        break;
                    default:
                        $("#error_message").html(`Light placement not supported on value: ${currentValue}`);
                        return;
                }
                $("#error_message").html("All is fine");
                break;

            case "cleargrid":
                GAME.clearGrid(gridIndex);
                $("#error_message").html("All is fine: grid cleared");
                break;

            case "start":
                switch (currentValue) {
                    case MAPDICT.EMPTY:
                    case MAPDICT.HOLE:
                        dir = GAME.getSelectedDir();
                        if (dir.same(NOWAY)) {
                            $("#error_message").html("Start needs direction");
                            return;
                        }
                        dirIndex = dir.toInt();
                        $MAP.map.start = [gridIndex, dirIndex];
                        break;
                    default:
                        $("#error_message").html(`Start placement not supported on value: ${currentValue}`);
                        return;
                }
                $("#error_message").html("All is fine");
                break;

            case "fill":
                if (GAME.stack.previousRadio === radio) {
                    GAME.stack.fillCount++;
                } else GAME.stack.fillCount = 1;

                if (GAME.stack.fillCount > 2) {
                    GAME.stack.fillCount = 1;
                    GAME.stack.elementBuilt = null;
                }

                const fill_value = $("#fill_value")[0].value;

                console.log("FILL,", grid, fill_value, "fill->", GAME.stack.fillCount);

                switch (GAME.stack.fillCount) {
                    case 1:
                        GAME.stack.startGrid = grid;
                        break;

                    case 2:
                        //success
                        GAME.stack.endGrid = grid;

                        const txt = GAME.fillArea(GAME.stack.startGrid, GAME.stack.endGrid, fill_value);
                        if (txt) $("#error_message").html(txt);

                        break;

                }
                break;
        }

        GAME.stack.previousRadio = radio;
        GAME.render();
    },
    render() {
        const radio = $("#selector input[name=renderer]:checked").val();
        switch (radio) {
            case "block":
                GAME.blockGrid3D();
                break;

        }
        if ($("input[name='grid']")[0].checked) GRID.grid();
        if ($("input[name='coord']")[0].checked) GRID.paintCoord3D("coord", $MAP.map, GAME.floor, $("input[name='all_coord']")[0].checked);

        GAME.resizeGL_window();
        if (INI.DRAW_OCCLUSION_MAP) {
            $MAP.map.textureMap = $MAP.map.GA.toTextureMap();
            GAME.drawOcclusionMap();
        }
    },
    stack: {
        fillCount: 0,
        elementBuilt: null,
        startGrid: null,
        endGrid: null,
    },
    fillArea(from, to, fillValue) {
        const W = to.x - from.x;
        const H = to.y - from.y;
        if (to.z !== from.z) return "Needs to be same slice depth.";
        if (H < 0 || W < 0) return "At least one dimension is negative!";
        console.info("fillArea", from.x, from.y, W, H, from.z, fillValue);
        $MAP.map.GA.fillArea(from.x, from.y, W, H, from.z, fillValue);
        return null;
    },
    clearGrid(gridIndex) {
        $MAP.combine();
        for (let arrType of $MAP.combined) {
            let iElementToRemove = [];
            for (let [index, element] of arrType.entries()) {
                if (element === gridIndex) {
                    iElementToRemove.push(index);
                } else if (element[0] === gridIndex) {
                    iElementToRemove.push(index);
                }
            }
            arrType.removeIfIndexInArray(iElementToRemove);
        }
    },
    assertUniqueDecalPosition(gridIndex, dirIndex, array) {
        for (let [index, element] of array.entries()) {
            if (element[0] === gridIndex) {
                if (element[1] === dirIndex) {
                    let remove = array.splice(index, 1);
                    $("#error_message").html("removed duplicate decal");
                    return;
                }
            }
        }
    },
    printMaterialDetails() {
        const material = MATERIAL[$("#materialtype")[0].value];
        const html = `
    <span style="background-color: ${colorVectorToRGB_String(material.ambientColor)}">Ambient: ${colorVectorToHex(material.ambientColor)}</span><br/>
    <span style="background-color: ${colorVectorToRGB_String(material.diffuseColor)}">Diffuse: ${colorVectorToHex(material.diffuseColor)}</span><br/>
    <span style="background-color: ${colorVectorToRGB_String(material.specularColor)}">Specular: ${colorVectorToHex(material.specularColor)}</span><br/>
    <span>Shininess: ${material.shininess}</span><br/>
    `;
        $("#material-details").html(html);
    },
    printLightDetails() {
        const light = LIGHT_COLORS[$("#lighttype")[0].value];
        const html = `
      <span>R: ${light[0]}</span><br/>
      <span>G: ${light[1]}</span><br/>
      <span>B: ${light[2]}</span><br/>
    `;
        $("#light-details").html(html);
        const code = colorVectorToHex(light);
        $("#light-code").html(`<span style="background-color: ${colorVectorToRGB_String(light)}"> Code: ${code}</span>`);
    },
    getSelectedDecal() {
        const radio = $("#selector2 input[name=decalusage]:checked").val();
        switch (radio) {
            case "picture":
                return [$("#picture_decal")[0].value, radio];
            case "crest":
                return [$("#crest_decal")[0].value, radio];
            case "texture":
                return [$("#texture_decal")[0].value, radio];
            default:
                console.error("decalusage error");
                return [null, null];
        }
    },
    getSelectedDir() {
        const radio = $("#selector input[name=directions]:checked").val();
        return eval(radio);
    },
    init() {
        let OK = true;
        if (GAME.started) {
            OK = confirm("Sure?");
        }
        if (OK) {
            $MAP.width = parseInt($("#horizontalGrid").val(), 10);
            $MAP.height = parseInt($("#verticalGrid").val(), 10);
            $MAP.depth = 1;
            console.info("INIT", $MAP.width, $MAP.height);
            $MAP.map = FREE_MAP3D.create($MAP.width, $MAP.height, 1, null, MAP_TOOLS.INI.GA_BYTE_SIZE);
            $MAP.map.GA.fill(MAPDICT.EMPTY);
            $MAP.init();
            console.log("GAME.init ->map:", $MAP.map);
            GAME.render();
        }
    },
    blockGrid3D() {
        let corr = $("input[name='corr']")[0].checked;
        ENGINE.resizeBOX("ROOM");

        $(ENGINE.gameWindowId).width(ENGINE.gameWIDTH + 4);
        ENGINE.BLOCKGRID.configure("pacgrid", "#FFF", "#000", "hint");
        console.log("GAME.blockGrid3D -> GAME.floor", GAME.floor);
        ENGINE.BLOCKGRID3D.draw($MAP.map, GAME.floor, corr);
    },
    export() {
        let rle = $MAP.map.GA.exportMap();
        console.log("Export", rle);
        let Export;

        Export = { width: $MAP.width, height: $MAP.height, depth: 1, map: rle };

        let RoomID = $("#roomid")[0].value;
        let RoomName = $("#roomname")[0].value;


        let roomExport = `${RoomID} : {
name: "${RoomName}",
data: '${JSON.stringify(Export)}',
wall: "${$("#walltexture")[0].value}",
floor: "${$("#floortexture")[0].value}",
`;
        for (let desc of $MAP.properties) {
            if ($MAP.map[desc].length > 0) {
                roomExport += `${desc}: '${JSON.stringify($MAP.map[desc])}',\n`;
            }
        }
        for (let list of $MAP.lists) {
            if ($MAP.map[list].length > 0) {
                roomExport += `${list}: '${JSON.stringify($MAP.map[list])}',\n`;
            }
        }
        roomExport += `}`;
        $("#exp").val(roomExport);
    },
    import() {
        const dimension = 1;
        $MAP.map.textureMap = null;
        const ImportText = $("#exp").val();
        console.info("ImportText", ImportText);
        const Import = JSON.parse(ImportText.extractGroup(/data:\s\'(.*)\'/));
        const roomId = ImportText.extractGroup(/^\s*(\w*)/);
        $("#roomid").val(roomId);
        const roomName = ImportText.extractGroup(new RegExp(`name:\\s"(.*)"`));
        $("#roomname").val(roomName);

        const SG = ImportText.extractGroup(/sg:\s(\d{1})/);
        $('#checkpoint').val(SG).trigger('change');


        const Textures = ["wall", "floor"];
        for (const prop of Textures) {
            const pattern = new RegExp(`${prop}:\\s"(.*)"`);
            $(`#${prop}texture`).val(ImportText.extractGroup(pattern));
        }

        console.log("Import", Import);

        $MAP.map = FREE_MAP3D.import(Import, MAP_TOOLS.INI.GA_BYTE_SIZE);

        $MAP.init();
        WebGL.init_required_IAM($MAP.map, HERO);
        GAME.updateTextures();  //restarts the level

        for (const prop of [...$MAP.properties, ...$MAP.lists]) {
            const pattern = new RegExp(`${prop}:\\s'(.*)'`);
            let value = ImportText.extractGroup(pattern);
            $MAP.map[prop] = JSON.parse(value) || [];
        }

        console.log("$MAP.map", $MAP.map);
        $MAP.width = Import.width;
        $MAP.height = Import.height;
        $MAP.depth = 1;
        $("#horizontalGrid").val(Import.width);
        $("#verticalGrid").val(Import.height);

        $("#horizontalGrid").trigger("change");
        $("#verticalGrid").trigger("change");

        GAME.updateWH();
        ENGINE.resizeBOX("ROOM");
        GAME.resizeGL_window();
        $(ENGINE.gameWindowId).width(ENGINE.gameWIDTH + 4);
        $MAP.map.textureMap = $MAP.map.GA.toTextureMap();
        GAME.render();
    },
    async copyToClipboard() {
        let copyText = $("#exp")[0];
        console.log("copyText", copyText);
        try {
            await navigator.clipboard.writeText(copyText.value);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    },
    resizeGL_window() {
        $("#WEBGL_canvas_0").css("top", `${ENGINE.gameHEIGHT + 16}px`)
    },
};

$(function () {
    PRG.INIT();
    PRG.setup();
    ENGINE.LOAD.preload();
});