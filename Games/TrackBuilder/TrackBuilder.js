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
        name: "Generic room name",
        data: '{"width":"128","height":"3","depth":1,"map":"AA122BB2AA256$AA4"}',
        wall: "RockWall_SDXL_003",
        floor: "Snow_002",
        start: '[128,5]',
        terrain: '{"direction":{"parameters":{"seed":666,"amplitude":3,"wavelength":32,"octaves":3,"persistence":0.5,"lacunarity":2,"biasDeg":0,"smooth":"smootherstep","minDeg":-45,"maxDeg":45,"decimals":3},"values":[-1.742,-1.746,-1.764,-1.792,-1.814,-1.809,-1.761,-1.662,-1.527,-1.382,-1.229,-1.072,-0.925,-0.806,-0.73,-0.7,-0.704,-0.715,-0.726,-0.736,-0.744,-0.746,-0.743,-0.735,-0.721,-0.707,-0.694,-0.686,-0.681,-0.68,-0.68,-0.681,-0.681,-0.684,-0.706,-0.75,-0.812,-0.881,-0.944,-0.991,-1.016,-1.022,-1.007,-0.965,-0.892,-0.787,-0.651,-0.489,-0.311,-0.128,0.065,0.268,0.473,0.669,0.847,0.998,1.123,1.227,1.304,1.354,1.379,1.388,1.388,1.385,1.385,1.377,1.333,1.245,1.124,0.994,0.878,0.793,0.733,0.687,0.678,0.716,0.787,0.863,0.918,0.933,0.915,0.886,0.844,0.786,0.719,0.65,0.59,0.545,0.513,0.483,0.444,0.394,0.34,0.29,0.254,0.236,0.232,0.24,0.284,0.374,0.496,0.628,0.744,0.825,0.869,0.893,0.906,0.904,0.878,0.819,0.72,0.583,0.419,0.245,0.053,-0.157,-0.372,-0.573,-0.743,-0.87,-0.958,-1.021,-1.055,-1.057,-1.036,-1.005,-0.978,-0.963]},"width":{"parameters":{"seed":777,"amplitude":1.5,"wavelength":16,"octaves":3,"persistence":0.5,"lacunarity":2,"biasWidth":1,"smooth":"smootherstep","minWidth":0.5,"maxWidth":2,"decimals":3},"values":[0.5,0.5,0.5,0.5,0.5,0.546,0.694,0.787,0.803,0.8,0.81,0.822,0.829,0.826,0.802,0.776,0.769,0.759,0.715,0.664,0.643,0.653,0.69,0.78,0.932,1.099,1.254,1.386,1.483,1.577,1.723,1.847,1.878,1.849,1.733,1.603,1.54,1.53,1.602,1.686,1.705,1.687,1.649,1.667,1.791,1.948,2,2,2,2,2,1.969,1.856,1.753,1.66,1.604,1.596,1.601,1.6,1.59,1.57,1.571,1.641,1.719,1.74,1.718,1.636,1.565,1.566,1.613,1.729,1.825,1.82,1.763,1.66,1.564,1.531,1.52,1.502,1.487,1.483,1.508,1.601,1.684,1.68,1.614,1.463,1.307,1.228,1.186,1.173,1.142,1.061,0.982,0.95,0.95,0.953,0.93,0.848,0.785,0.808,0.882,1.017,1.13,1.145,1.124,1.082,1.032,0.989,0.919,0.764,0.621,0.585,0.623,0.76,0.877,0.866,0.802,0.713,0.65,0.652,0.676,0.708,0.745,0.782,0.804,0.791,0.766]},"slope":{"parameters":{"seed":888,"amplitude":18,"wavelength":16,"octaves":3,"persistence":0.65,"lacunarity":2,"biasSlope":18,"smooth":"smootherstep","minSlope":3,"maxSlope":45,"decimals":3},"values":[12.183,12.01,11.579,11.898,13.582,15.715,17.751,19.034,19.302,19.422,19.897,20.348,20.407,20.109,19.192,18.302,18.072,17.925,17.324,16.623,16.303,16.136,15.747,15.893,17.13,18.553,19.458,19.989,20.409,20.95,22.22,23.429,23.742,23.912,24.431,24.498,23.455,21.519,18.494,15.402,13.209,11.555,10.753,10.769,11.232,11.679,11.302,10.626,10.424,11.022,13.2,15.027,14.848,13.994,12.911,12.682,14.033,16.268,19.811,23.761,26.916,29.244,30.351,30.546,30.525,30.646,31.132,31.688,31.965,31.41,28.845,26.112,25.125,25.44,27.67,29.981,30.516,29.842,27.466,25.106,24.491,24.68,25.257,25.341,24.268,22.998,22.484,22.228,21.561,20.68,19.742,18.991,18.616,18.654,19.333,20.059,20.251,19.706,17.456,14.668,12.77,11.31,10.282,9.661,9.185,9.219,10.856,13.065,14.54,15.692,16.58,17.027,17.107,16.784,15.556,14.352,14.078,14.361,15.339,16.225,16.27,15.931,15.14,13.781,12.046,9.964,7.236,5.143]}}',
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
    VERSION: "0.3.1",
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
        ENGINE.addBOX("DIRECTION", 2048, 128, ["direction"], null);
        ENGINE.addBOX("WIDTH", 2048, 128, ["width"], null);
        ENGINE.addBOX("SLOPE", 2048, 128, ["slope"], null);
        ENGINE.addBOX("WEBGL", 800, 600, ["3d_webgl"], null);

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

        /** noise functions */
        GAME.ensureTerrain();

        $("#dir_generate").click(function () {
            NOISE_FUNCTION.direction_noise_preview();
        });

        $("#width_generate").click(function () {
            NOISE_FUNCTION.width_noise_preview();
        });

        $("#slope_generate").click(function () {
            NOISE_FUNCTION.slope_noise_preview();
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
        const dimension = 1;

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

            GAME.ensureTerrain();
            NOISE_FUNCTION.generate_terrain();

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

        roomExport += `terrain: '${JSON.stringify($MAP.map.terrain)}',\n`;
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


        $MAP.width = Import.width;
        $MAP.height = Import.height;
        $MAP.depth = 1;
        $("#horizontalGrid").val(Import.width);
        $("#verticalGrid").val(Import.height);

        $("#horizontalGrid").trigger("change");
        $("#verticalGrid").trigger("change");

        const terrain = ImportText.extractGroup(/terrain\:\s?\'(.*)\'/);
        $MAP.map.terrain = JSON.parse(terrain);
        NOISE_FUNCTION.writeParsToForm();
        NOISE_FUNCTION.generate_terrain();

        GAME.updateWH();
        ENGINE.resizeBOX("ROOM");
        GAME.resizeGL_window();
        $(ENGINE.gameWindowId).width(ENGINE.gameWIDTH + 4);
        $MAP.map.textureMap = $MAP.map.GA.toTextureMap();
        GAME.render();

        console.info("$MAP.map", $MAP.map);
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
        $("#WEBGL_canvas_0").css("top", `${ENGINE.gameHEIGHT + 4 + 3 * (128)}px`)
    },
    parseFloatSafe(value, fallback) {
        const n = parseFloat(value);
        return Number.isFinite(n) ? n : fallback;
    },
    parseIntSafe(value, fallback) {
        const n = parseInt(value, 10);
        return Number.isFinite(n) ? n : fallback;
    },
    roundValue(value, decimals = 3) {
        const scale = 10 ** decimals;
        return Math.round(value * scale) / scale;
    },
    getMapWidth() {
        if ($MAP && $MAP.width) {
            return parseInt($MAP.width, 10) || 128;
        }
        return parseInt($("#horizontalGrid").val(), 10) || 128;
    },
    getGridPx() {
        return parseInt($("#gridsize").val(), 10) || 16;
    },
    ensureTerrain() {
        if (!$MAP.map.terrain) {
            $MAP.map.terrain = {};
        }

        if (!$MAP.map.terrain.direction) {
            $MAP.map.terrain.direction = {};
        }

        if (!$MAP.map.terrain.width) {
            $MAP.map.terrain.width = {};
        }

        if (!$MAP.map.terrain.slope) {
            $MAP.map.terrain.slope = {};
        }
    },
};

const NOISE_FUNCTION = {
    DIRECTION_NOISE_DEFAULTS: {
        seed: 666,
        amplitude: 3.0,                                 // max deviation around bias, in degrees
        wavelength: 32,
        octaves: 3,
        persistence: 0.5,
        lacunarity: 2.0,
        biasDeg: 0.0,
        smooth: "smootherstep",
        minDeg: -45,
        maxDeg: 45,
        decimals: 3
    },
    WIDTH_NOISE_DEFAULTS: {
        seed: 777,
        amplitude: 1.5,                                  // max deviation around bias, in width units
        wavelength: 16,
        octaves: 3,
        persistence: 0.5,
        lacunarity: 2.0,
        biasWidth: 1.0,
        smooth: "smootherstep",
        minWidth: 0.5,
        maxWidth: 2.0,
        decimals: 3
    },
    SLOPE_NOISE_DEFAULTS: {
        seed: 888,
        amplitude: 18.0,                                // max deviation around bias, in degrees
        wavelength: 16,
        octaves: 3,
        persistence: 0.65,
        lacunarity: 2.0,
        biasSlope: 18.0,
        smooth: "smootherstep",
        minSlope: 3.0,
        maxSlope: 45.0,
        decimals: 3
    },
    readSlopeParams() {
        const d = this.SLOPE_NOISE_DEFAULTS;

        const seed = GAME.parseIntSafe($("#slope_seed").val(), d.seed);
        const amplitude = GAME.parseFloatSafe($("#slope_amp").val(), d.amplitude);
        const wavelength = GAME.parseFloatSafe($("#slope_wl").val(), d.wavelength);
        const persistence = GAME.parseFloatSafe($("#slope_persist").val(), d.persistence);
        const lacunarity = GAME.parseFloatSafe($("#slope_lacunarity").val(), d.lacunarity);
        const biasSlope = GAME.parseFloatSafe($("#slope_bias").val(), d.biasSlope);
        const minSlope = GAME.parseFloatSafe($("#slope_min").val(), d.minSlope);
        const maxSlope = GAME.parseFloatSafe($("#slope_max").val(), d.maxSlope);
        const smooth = $("#slope_smooth").val() || d.smooth;
        const octaves = GAME.parseIntSafe($("#slope_octaves").val(), d.octaves);

        const safeMin = Math.clamp(Math.min(minSlope, maxSlope), 0.1, 44.9);
        const safeMax = Math.clamp(Math.max(minSlope, maxSlope), safeMin + 0.1, 45.0);

        return {
            seed: seed,
            amplitude: Math.clamp(amplitude, 0, 45),
            wavelength: Math.clamp(wavelength, 1, 512),
            octaves: Math.clamp(octaves, 1, 8),
            persistence: Math.clamp(persistence, 0, 1),
            lacunarity: Math.clamp(lacunarity, 1.01, 8),
            biasSlope: Math.clamp(biasSlope, safeMin, safeMax),
            smooth: smooth,
            minSlope: safeMin,
            maxSlope: safeMax,
            decimals: d.decimals
        };
    },
    readWidthParams() {
        const d = this.WIDTH_NOISE_DEFAULTS;

        const seed = GAME.parseIntSafe($("#width_seed").val(), d.seed);
        const amplitude = GAME.parseFloatSafe($("#width_amp").val(), d.amplitude);
        const wavelength = GAME.parseFloatSafe($("#width_wl").val(), d.wavelength);
        const persistence = GAME.parseFloatSafe($("#width_persist").val(), d.persistence);
        const lacunarity = GAME.parseFloatSafe($("#width_lacunarity").val(), d.lacunarity);
        const biasWidth = GAME.parseFloatSafe($("#width_bias").val(), d.biasWidth);
        const minWidth = GAME.parseFloatSafe($("#width_min").val(), d.minWidth);
        const maxWidth = GAME.parseFloatSafe($("#width_max").val(), d.maxWidth);
        const smooth = $("#width_smooth").val() || d.smooth;
        const octaves = GAME.parseIntSafe($("#width_octaves").val(), d.octaves);

        const safeMin = Math.max(0.1, Math.min(minWidth, maxWidth));
        const safeMax = Math.max(safeMin, Math.max(minWidth, maxWidth));

        return {
            seed: seed,
            amplitude: Math.clamp(amplitude, 0, 32),
            wavelength: Math.clamp(wavelength, 1, 512),
            octaves: Math.clamp(octaves, 1, 8),
            persistence: Math.clamp(persistence, 0, 1),
            lacunarity: Math.clamp(lacunarity, 1.01, 8),
            biasWidth: Math.clamp(biasWidth, safeMin, safeMax),
            smooth: smooth,
            minWidth: safeMin,
            maxWidth: safeMax,
            decimals: d.decimals
        };
    },
    readDirectionParams() {
        const d = this.DIRECTION_NOISE_DEFAULTS;
        const seed = GAME.parseIntSafe($("#dir_seed").val(), d.seed);
        const amplitude = GAME.parseFloatSafe($("#dir_amp").val(), d.amplitude);
        const wavelength = GAME.parseFloatSafe($("#dir_wl").val(), d.wavelength);
        const persistence = GAME.parseFloatSafe($("#dir_persist").val(), d.persistence);
        const lacunarity = GAME.parseFloatSafe($("#dir_lacunarity").val(), d.lacunarity);
        const biasDeg = GAME.parseFloatSafe($("#dir_bias").val(), d.biasDeg);
        const smooth = $("#dir_smooth").val() || d.smooth;
        const octaves = GAME.parseIntSafe($("#dir_octaves").val(), d.octaves);

        return {
            seed: seed,
            amplitude: Math.clamp(amplitude, 0, 45),
            wavelength: Math.clamp(wavelength, 1, 512),
            octaves: Math.clamp(octaves, 1, 8),
            persistence: Math.clamp(persistence, 0, 1),
            lacunarity: Math.clamp(lacunarity, 1.01, 8),
            biasDeg: Math.clamp(biasDeg, -45, 45),
            smooth: smooth,
            minDeg: d.minDeg,
            maxDeg: d.maxDeg,
            decimals: d.decimals
        };
    },
    rawToSlope(raw, params) {
        let slope = params.biasSlope + raw * 2 * params.amplitude;
        slope = Math.clamp(slope, params.minSlope, params.maxSlope);
        return GAME.roundValue(slope, params.decimals);
    },
    rawToWidth(raw, params) {
        let width = params.biasWidth + raw * 2 * params.amplitude;
        width = Math.clamp(width, params.minWidth, params.maxWidth);
        return GAME.roundValue(width, params.decimals);
    },
    rawToDegrees(raw, params) {
        let deg = params.biasDeg + raw * 2 * params.amplitude;
        deg = Math.clamp(deg, params.minDeg, params.maxDeg);
        return GAME.roundValue(deg, params.decimals);
    },
    generateDirectionValues(width = null, params = null) {
        const W = width || GAME.getMapWidth();
        const P = params || this.readDirectionParams();

        const raw = PERLIN.generateFractalNoise1D({
            width: W,
            seed: P.seed,
            wavelength: P.wavelength,
            octaves: P.octaves,
            persistence: P.persistence,
            lacunarity: P.lacunarity,
            smooth: P.smooth
        });

        return raw.map(v => this.rawToDegrees(v, P));
    },
    buildDirections(width = null, params = null) {
        const W = width || GAME.getMapWidth();
        const P = params || this.readDirectionParams();

        const values = this.generateDirectionValues(W, P);
        $MAP.map.terrain.direction.parameters = P;
        $MAP.map.terrain.direction.values = values;

        return {
            units: "degrees",
            parameters: P,
            values: values,
        };
    },
    buildWidths(width = null, params = null) {
        const W = width || GAME.getMapWidth();
        const P = params || this.readWidthParams();

        const values = this.generateWidthValues(W, P);
        $MAP.map.terrain.width.parameters = P;
        $MAP.map.terrain.width.values = values;

        return {
            units: "grid",
            min: P.minWidth,
            max: P.maxWidth,
            parameters: P,
            values: values
        };
    },
    buildSlopes(width = null, params = null) {
        const W = width || GAME.getMapWidth();
        const P = params || this.readSlopeParams();

        const values = this.generateSlopeValues(W, P);
        $MAP.map.terrain.slope.parameters = P;
        $MAP.map.terrain.slope.values = values;

        const slopeData = {
            units: "degrees_down",
            min: P.minSlope,
            max: P.maxSlope,
            parameters: P,
            values: values
        };

        return slopeData;
    },
    stats(values) {
        if (!values || values.length === 0) {
            return {
                min: 0,
                max: 0,
                avg: 0,
                absMax: 0
            };
        }

        let min = Infinity;
        let max = -Infinity;
        let sum = 0;
        let absMax = 0;

        for (const v of values) {
            min = Math.min(min, v);
            max = Math.max(max, v);
            sum += v;
            absMax = Math.max(absMax, Math.abs(v));
        }

        return {
            min: min,
            max: max,
            avg: sum / values.length,
            absMax: absMax
        };
    },
    updateDirectionStats(directionData) {
        if (!directionData || !directionData.values) {
            $("#dir_stats").html("No direction noise yet.");
            return;
        }

        const s = this.stats(directionData.values);

        $("#dir_stats").html(
            `min: ${s.min.toFixed(3)}&deg;, ` +
            `max: ${s.max.toFixed(3)}&deg;, ` +
            `avg: ${s.avg.toFixed(3)}&deg;, ` +
            `samples: ${directionData.values.length}`
        );
    },
    updateWidthStats(widthData) {
        if (!widthData || !widthData.values) {
            $("#width_stats").html("No width noise yet.");
            return;
        }

        const s = this.stats(widthData.values);

        $("#width_stats").html(
            `min: ${s.min.toFixed(3)}, ` +
            `max: ${s.max.toFixed(3)}, ` +
            `avg: ${s.avg.toFixed(3)}, ` +
            `samples: ${widthData.values.length}`
        );
    },
    drawBackground(layer, gridPx, W, H, midY, mapWidth) {
        const CTX = LAYER[layer];
        ENGINE.clearLayer(layer);
        ENGINE.fillLayer(layer, "#101010");

        const guideCol = "#444";
        ENGINE.drawLine(CTX, new Point(0, H * 0.15), new Point(W, H * 0.15), guideCol, 1);
        ENGINE.drawLine(CTX, new Point(0, H * 0.85), new Point(W, H * 0.85), guideCol, 1);
        ENGINE.drawLine(CTX, new Point(0, midY), new Point(W, midY), "#666", 1);

        const vGridCol = "#202020";

        for (let x = 0; x <= mapWidth; x++) {
            const px = x * gridPx;
            ENGINE.drawLine(CTX, new Point(px, 0), new Point(px, H), vGridCol, 1);
        }

    },
    drawDirections(directionData) {
        if (!directionData || !directionData.values) return;

        const CTX = LAYER.direction;
        const gridPx = GAME.getGridPx();
        const values = directionData.values;
        const mapWidth = values.length;
        const W = mapWidth * gridPx;
        const H = 128;
        const midY = Math.floor(H / 2);

        this.drawBackground("direction", gridPx, W, H, midY, mapWidth);

        const minDeg = directionData.min ?? -45;
        const maxDeg = directionData.max ?? 45;
        const legalAbs = Math.max(Math.abs(minDeg), Math.abs(maxDeg), 1);
        const s = this.stats(values);
        const maxAbs = Math.min(legalAbs, Math.max(s.absMax * 1.15, 1.0));                      // Auto-scale to the generated curve, but keep at least 1 degree visible range.

        // curve
        CTX.strokeStyle = "#2ACBE8";
        CTX.lineWidth = 1;
        CTX.beginPath();

        for (let i = 0; i < values.length; i++) {
            const x = i * gridPx + gridPx * 0.5;
            const y = midY - values[i] / maxAbs * (H * 0.42);
            if (i === 0) CTX.moveTo(x, y);
            else CTX.lineTo(x, y);
        }

        CTX.stroke();

        // dots
        CTX.fillStyle = "#FFFFFF";

        for (let i = 0; i < values.length; i++) {
            const x = i * gridPx + gridPx * 0.5;
            const y = midY - values[i] / maxAbs * (H * 0.42);
            CTX.pixelAt(x - 1, y - 1);
        }

        // labels
        CTX.fillStyle = "#DDD";
        CTX.font = "12px Consolas, monospace";
        CTX.fillText(`Direction: ${values.length} samples, preview scale +/-${maxAbs.toFixed(2)} deg`, 8, 14);
        CTX.fillText(`+${maxAbs.toFixed(2)} deg`, 8, 28);
        CTX.fillText(`0 deg`, 8, midY - 4);
        CTX.fillText(`-${maxAbs.toFixed(2)} deg`, 8, H - 8);
    },
    direction_noise_preview(width = null) {
        const direction = this.buildDirections(width);
        this.drawDirections(direction);
        this.updateDirectionStats(direction);
        return direction;
    },
    generateWidthValues(width = null, params = null) {
        const W = width || GAME.getMapWidth();
        const P = params || this.readWidthParams();

        const raw = PERLIN.generateFractalNoise1D({
            width: W,
            seed: P.seed,
            wavelength: P.wavelength,
            octaves: P.octaves,
            persistence: P.persistence,
            lacunarity: P.lacunarity,
            smooth: P.smooth
        });

        return raw.map(v => this.rawToWidth(v, P));
    },
    drawWidths(widthData) {
        if (!widthData || !widthData.values) return;

        const CTX = LAYER.width;
        const gridPx = GAME.getGridPx();
        const values = widthData.values;
        const mapWidth = values.length;
        const W = mapWidth * gridPx;
        const H = 128;
        const midY = Math.floor(H / 2);

        this.drawBackground("width", gridPx, W, H, midY, mapWidth);

        const minWidth = widthData.min ?? 1.5;
        const maxWidth = widthData.max ?? 6.0;
        const range = Math.max(maxWidth - minWidth, 0.001);

        // curve
        CTX.strokeStyle = "#A7F070";
        CTX.lineWidth = 1;
        CTX.beginPath();

        for (let i = 0; i < values.length; i++) {
            const x = i * gridPx + gridPx * 0.5;

            // max width at top, min width at bottom
            const normalized = (values[i] - minWidth) / range;
            const y = H * 0.85 - normalized * (H * 0.70);

            if (i === 0) CTX.moveTo(x, y);
            else CTX.lineTo(x, y);
        }

        CTX.stroke();

        // dots
        CTX.fillStyle = "#FFFFFF";

        for (let i = 0; i < values.length; i++) {
            const x = i * gridPx + gridPx * 0.5;
            const normalized = (values[i] - minWidth) / range;
            const y = H * 0.85 - normalized * (H * 0.70);

            CTX.pixelAt(x - 1, y - 1);
        }

        // labels
        CTX.fillStyle = "#DDD";
        CTX.font = "12px Consolas, monospace";
        CTX.fillText(`Width: ${values.length} samples`, 8, 14);
        CTX.fillText(`${maxWidth.toFixed(2)}`, 8, 28);
        CTX.fillText(`${((minWidth + maxWidth) * 0.5).toFixed(2)}`, 8, midY - 4);
        CTX.fillText(`${minWidth.toFixed(2)}`, 8, H - 8);
    },
    width_noise_preview(width = null) {
        const widthData = this.buildWidths(width);
        this.drawWidths(widthData);
        this.updateWidthStats(widthData);
        return widthData;
    },
    generateSlopeValues(width = null, params = null) {
        const W = width || GAME.getMapWidth();
        const P = params || this.readSlopeParams();

        const raw = PERLIN.generateFractalNoise1D({
            width: W,
            seed: P.seed,
            wavelength: P.wavelength,
            octaves: P.octaves,
            persistence: P.persistence,
            lacunarity: P.lacunarity,
            smooth: P.smooth
        });

        return raw.map(v => this.rawToSlope(v, P));
    },
    updateSlopeStats(slopeData) {
        if (!slopeData || !slopeData.values) {
            $("#slope_stats").html("No slope noise yet.");
            return;
        }

        const s = this.stats(slopeData.values);

        $("#slope_stats").html(
            `min: ${s.min.toFixed(3)}&deg;, ` +
            `max: ${s.max.toFixed(3)}&deg;, ` +
            `avg: ${s.avg.toFixed(3)}&deg;, ` +
            `samples: ${slopeData.values.length}`
        );
    },
    drawSlopes(slopeData) {
        if (!slopeData || !slopeData.values) return;

        const CTX = LAYER.slope;
        const gridPx = GAME.getGridPx();
        const values = slopeData.values;
        const mapWidth = values.length;
        const W = mapWidth * gridPx;
        const H = 128;
        const midY = Math.floor(H / 2);

        this.drawBackground("slope", gridPx, W, H, midY, mapWidth);

        const minSlope = slopeData.min ?? 3.0;
        const maxSlope = slopeData.max ?? 45.0;
        const range = Math.max(maxSlope - minSlope, 0.001);

        // curve
        CTX.strokeStyle = "#FFB347";
        CTX.lineWidth = 1;
        CTX.beginPath();

        for (let i = 0; i < values.length; i++) {
            const x = i * gridPx + gridPx * 0.5;

            // steep at top, shallow at bottom
            const normalized = (values[i] - minSlope) / range;
            const y = H * 0.85 - normalized * (H * 0.70);

            if (i === 0) CTX.moveTo(x, y);
            else CTX.lineTo(x, y);
        }

        CTX.stroke();

        // dots
        CTX.fillStyle = "#FFFFFF";

        for (let i = 0; i < values.length; i++) {
            const x = i * gridPx + gridPx * 0.5;
            const normalized = (values[i] - minSlope) / range;
            const y = H * 0.85 - normalized * (H * 0.70);

            CTX.pixelAt(x - 1, y - 1);
        }

        // labels
        CTX.fillStyle = "#DDD";
        CTX.font = "12px Consolas, monospace";
        CTX.fillText(`Slope: ${values.length} samples`, 8, 14);
        CTX.fillText(`${maxSlope.toFixed(2)} deg`, 8, 28);
        CTX.fillText(`${((minSlope + maxSlope) * 0.5).toFixed(2)} deg`, 8, midY - 4);
        CTX.fillText(`${minSlope.toFixed(2)} deg`, 8, H - 8);
    },
    slope_noise_preview(width = null) {
        const slopeData = this.buildSlopes(width);
        this.drawSlopes(slopeData);
        this.updateSlopeStats(slopeData);
        return slopeData;
    },
    writeDirectionParams(params) {
        if (!params) return;

        $("#dir_seed").val(params.seed);
        $("#dir_amp").val(params.amplitude);
        $("#dir_wl").val(params.wavelength);
        $("#dir_octaves").val(params.octaves);
        $("#dir_persist").val(params.persistence);
        $("#dir_lacunarity").val(params.lacunarity);
        $("#dir_bias").val(params.biasDeg);
        $("#dir_smooth").val(params.smooth);
    },

    writeWidthParams(params) {
        if (!params) return;

        $("#width_seed").val(params.seed);
        $("#width_amp").val(params.amplitude);
        $("#width_wl").val(params.wavelength);
        $("#width_octaves").val(params.octaves);
        $("#width_persist").val(params.persistence);
        $("#width_lacunarity").val(params.lacunarity);
        $("#width_bias").val(params.biasWidth);
        $("#width_min").val(params.minWidth);
        $("#width_max").val(params.maxWidth);
        $("#width_smooth").val(params.smooth);
    },

    writeSlopeParams(params) {
        if (!params) return;

        $("#slope_seed").val(params.seed);
        $("#slope_amp").val(params.amplitude);
        $("#slope_wl").val(params.wavelength);
        $("#slope_octaves").val(params.octaves);
        $("#slope_persist").val(params.persistence);
        $("#slope_lacunarity").val(params.lacunarity);
        $("#slope_bias").val(params.biasSlope);
        $("#slope_min").val(params.minSlope);
        $("#slope_max").val(params.maxSlope);
        $("#slope_smooth").val(params.smooth);
    },
    generate_terrain() {
        this.direction_noise_preview();
        this.width_noise_preview();
        this.slope_noise_preview();
    },
    writeParsToForm() {
        this.writeDirectionParams($MAP.map.terrain.direction.parameters);
        this.writeWidthParams($MAP.map.terrain.width.parameters);
        this.writeSlopeParams($MAP.map.terrain.slope.parameters);
    },
};

$(function () {
    PRG.INIT();
    PRG.setup();
    ENGINE.LOAD.preload();
});