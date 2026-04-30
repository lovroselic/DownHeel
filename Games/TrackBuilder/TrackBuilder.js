/*jshint browser: true */
/*jshint -W097 */
/*jshint -W117 */
/*jshint -W061 */
"use strict";

const INI = {
    MAXINT: 96,
    MININT: 5,
    MAX_GRID: 64,
    MIN_GRID: 5,
    SPACE_X: 2048,
    SPACE_Y: 2048,
    CANVAS_RESOLUTION: 256,
    DRAW_OCCLUSION_MAP: false,
};

const MAP = {
    Demo: {
        name: "Demo",
        sg: 0,
        maxSpawned: -1,
        killCountdown: -1,
        killsRequiredToStopSpawning: 99,
        spawnDelay: -1,
        data: '{"width":7,"height":7,"depth":1,"map":"BB3AA4BB2AA2BAA6BB6ABB3ABABB3ABB6ABB5$BA"}',
        wall: "RockWall_SDXL_003",
        floor: "RockWall_SDXL_003",
        ceil: "RockWall_SDXL_003",
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
    VERSION: "0.1.0",
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

        $("#engine_version").html(ENGINE.VERSION);
        $("#grid_version").html(GRID.VERSION);
        $("#maze_version").html(DUNGEON.VERSION);
        $("#lib_version").html(LIB.VERSION);
        $("#webgl_version").html(WebGL.VERSION);
        $("#iam_version").html(IndexArrayManagers.VERSION);

        $(".section").show();
    },
    start() {
        console.log(PRG.NAME + " started.");
        $("#startGame").addClass("hidden");
        GAME.start();
    }
};

const HERO = {};

const GAME = {
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
        //WebGL.CONFIG.set("first_person", false);

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
        $("#buttons").append("<input type='button' id='arena' value='Arena'>");
        //$("#buttons").append("<input type='button' id='maze' value='Maze'>");
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
            //$("#ceiltexture").append(`<option value="${prop}">${prop}</option>`);
            $("#texture_decal").append(`<option value="${prop}">${prop}</option>`);
        }

        LAYER.wallcanvas = $("#wallcanvas")[0].getContext("2d");
        LAYER.floorcanvas = $("#floorcanvas")[0].getContext("2d");
        //LAYER.ceilcanvas = $("#ceilcanvas")[0].getContext("2d");
        LAYER.texturecanvas = $("#texturecanvas")[0].getContext("2d");

        GAME.updateTextures();
        $("#walltexture").change(GAME.repaintTextures);
        $("#floortexture").change(GAME.repaintTextures);
        //$("#ceiltexture").change(GAME.repaintTextures);
        $("#texture_decal").change(GAME.repaintTextures);
        console.log("GAME SETUP completed");
    },
    getResolution(texture) {
        return [texture.width, texture.height];
    },
    updateTextures() {
        const wallTexture = TEXTURE[$("#walltexture")[0].value];
        const floorTexture = TEXTURE[$("#floortexture")[0].value];
        //const ceilTexture = TEXTURE[$("#ceiltexture")[0].value];
        const textureTexture = TEXTURE[$("#texture_decal")[0].value];
        ENGINE.resizeAndFill(LAYER.wallcanvas, wallTexture, 320);
        ENGINE.resizeAndFill(LAYER.floorcanvas, floorTexture, 320);
        //ENGINE.resizeAndFill(LAYER.ceilcanvas, ceilTexture, 320);
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

        grid = new Grid(x, y);
        let currentValue = GA.getValue(grid);
        let gridIndex = GA.gridToIndex(grid);

        console.warn("mouseClick", grid, "radio", radio, "currentValue", currentValue, "gridIndex", gridIndex, "dimension", dimension, "floor", GAME.floor);
        //continue
    },
    render() {
        const radio = $("#selector input[name=renderer]:checked").val();
        switch (radio) {

            case "block":
                GAME.blockGrid();
                break;

        }
        if ($("input[name='grid']")[0].checked) GRID.grid();
        if ($("input[name='coord']")[0].checked) GRID.paintCoord("coord", $MAP.map, $("input[name='all_coord']")[0].checked);


        //GAME.resizeGL_window();
        if (INI.DRAW_OCCLUSION_MAP) {
            $MAP.map.textureMap = $MAP.map.GA.toTextureMap();
            GAME.drawOcclusionMap();
        }
    },
    init() {
        let OK = true;
        if (GAME.started) {
            OK = confirm("Sure?");
        }
        if (OK) {
            $MAP.width = parseInt($("#horizontalGrid").val(), 10);
            $MAP.height = parseInt($("#verticalGrid").val(), 10);
            console.info("INIT", $MAP.width, $MAP.height);
            $MAP.map = FREE_MAP.create($MAP.width, $MAP.height, null, MAP_TOOLS.INI.GA_BYTE_SIZE);
            $MAP.init();
            console.log("GAME.init ->map:", $MAP.map);
            GAME.render();
        }
    },
    blockGrid() {
        let corr = $("input[name='corr']")[0].checked;
        ENGINE.resizeBOX("ROOM");

        $(ENGINE.gameWindowId).width(ENGINE.gameWIDTH + 4);
        ENGINE.BLOCKGRID.configure("pacgrid", "#FFF", "#000");
        ENGINE.BLOCKGRID.draw($MAP.map, corr);
    },
};

$(function () {
    PRG.INIT();
    PRG.setup();
    ENGINE.LOAD.preload();
});