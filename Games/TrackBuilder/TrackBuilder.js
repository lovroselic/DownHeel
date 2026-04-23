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

        $(".section").show();
    },
    start() {
        console.log(PRG.NAME + " started.");
        $("#startGame").addClass("hidden");
        GAME.start();
    }
};

const GAME = {
    start() {
        //WebGL.setContext('webgl');
        $MAP.properties = MAP_TOOLS.properties;
        $MAP.lists = MAP_TOOLS.lists;
        $("#bottom")[0].scrollIntoView();
        ENGINE.topCanvas = ENGINE.getCanvasName("ROOM");
        $(ENGINE.topCanvas).on("click", { layer: ENGINE.topCanvas }, GAME.mouseClick);
        GAME.init();
        GAME.started = true;
        //GAME.level = "Demo";
        //GAME.levelStart();
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
        $("#buttons").append("<input type='button' id='maze' value='Maze'>");
        $("#buttons").append("<input type='button' id='export' value='Export'>");
        $("#buttons").append("<input type='button' id='import' value='Import'>");
        $("#buttons").append("<input type='button' id='copy' value='Copy to Clipboard'>");

        $("#gridsize").on("change", GAME.render);

        //fill_value
        $("#fill_value").append(`<option value="${MAPDICT.EMPTY}">Space</option>`);
        $("#fill_value").append(`<option value="${MAPDICT.HOLE}">Hole</option>`);
        $("#fill_value").append(`<option value="${MAPDICT.WALL}">Wall</option>`);

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