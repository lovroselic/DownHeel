/*jshint browser: true */
/*jshint -W097 */
/*jshint -W117 */
/*jshint -W061 */
"use strict";

/////////////////////////////////////////////////
/*
      
TODO:
    * 
known bugs: 
    * i don't do bugs

retests:
    * all completed

 */
////////////////////////////////////////////////////

const DEBUG = {
    SETTING: true,
    AUTO_TEST: false,
    FPS: false,
    VERBOSE: false,
    _2D_display: false,
    INVINCIBLE: false,
    FREE_FUEL: false,
    keys: false,
    killAllAllowed: false,
    max17: false,
    stop() {
        HERO.player.setSpeed(0);
    },
    displayInv() {
        HERO.inventory.scroll.display();
        const list = [];
        for (const item of HERO.inventory.item) {
            list.push(item.name);
        }
        console.info("items", list);
        console.log(`"${list.join('", "')}"`);
    },
    kill() {
        if (DEBUG.killAllAllowed) {
            console.log("KILL all");
            ENTITY3D.POOL.clear();
        }
        const alive = ENTITY3D.POOL.filter(el => el);
        if (alive.length > 0) {
            console.log("-------------------------------------------");
            for (const enemy of alive) {
                console.log(enemy.id, enemy.name, enemy.health);
            }
        }
    },
    goto(grid) {
        HERO.player.pos = Vector3.from_Grid(Grid.toCenter(grid), 0.5);
    },
    killStatus() {
        console.log("-------------------------------------------");
        console.warn("level:", GAME.level, "totalKills", MAP[GAME.level].map.totalKills, "killsRequiredToStopSpawning", MAP[GAME.level].map.killsRequiredToStopSpawning, "stopped", MAP[GAME.level].map.stopSpawning, "delay", MAP[GAME.level].map.spawnDelay,
            "killCount", MAP[GAME.level].map.killCount, "killCountdown", MAP[GAME.level].map.killCountdown, "maxSpawned", MAP[GAME.level].map.maxSpawned, "lairs:", LAIR.POOL.length
        );
        console.info("monsterList", MAP[GAME.level].monsterList);
    },
    automaticTests() {
        console.time("automaticTests");
        console.info("***** Automatic level testing *****");
        for (let level = 1; level <= 20; level++) {
            console.log("testing level", level);
            GAME.level = level;
            GAME.levelStart();
            GAME.frameDraw(17);
        }
        console.info("***** Automatic level testing END *****");
        console.timeEnd("automaticTests");
    },
};

const INI = {
    HERO_SHOOT_TIMEOUT: 250,
    SCREEN_BORDER: 256,
    SUN_HEIGHT_FACTOR: 7.5, //7.5
    CREEP_SPEED: 1.8,
    PAD_BETWEEN_LEVELS: 5,
    LAST_LEVEL: 20,
    SIDE_SPEED: 5.0,
    FALL_SPEED: 5.0,
    SHIT_ROT_ANGLE: Math.radians(30),
    FUEL_BIN: 15,
    FUEL_CONSUMPTION: 20, //units per grid
    MONSTER_SHOOT_TIMEOUT: 1999,
    DOWNWARD_GUARD_FACTOR: 2.7,
};

const PRG = {
    VERSION: "1.0.1",
    NAME: "TaXXon",
    YEAR: "2026",
    SG: "TAXXON",
    CSS: "color: #239AFF;",
    INIT() {
        console.log("%c**************************************************************************************************************************************", PRG.CSS);
        console.log(`${PRG.NAME} ${PRG.VERSION} by Lovro Selic, (c) LaughingSkull ${PRG.YEAR} on ${navigator.userAgent}`);
        console.log("%c**************************************************************************************************************************************", PRG.CSS);
        $("#title").html(PRG.NAME);
        $("#version").html(`${PRG.NAME} V${PRG.VERSION} <span style='font-size:14px'>&copy</span> LaughingSkull ${PRG.YEAR}`);
        $("input#toggleAbout").val("About " + PRG.NAME);
        $("#about fieldset legend").append(" " + PRG.NAME + " ");

        ENGINE.autostart = true;
        ENGINE.start = PRG.start;
        ENGINE.readyCall = GAME.setup;
        ENGINE.setGridSize(64);
        ENGINE.setSpriteSheetSize(64);
        ENGINE.init();
    },
    setup() {
        if (DEBUG.SETTING) {
            $("#engine_version").html(ENGINE.VERSION);
            $("#grid_version").html(GRID.VERSION);
            $("#iam_version").html(IndexArrayManagers.VERSION);
            $("#lib_version").html(LIB.VERSION);
            $("#webgl_version").html(WebGL.VERSION);
            $("#maptools_version").html(MAP_TOOLS.VERSION);
        } else {
            $('#debug').hide();
        }

        $("#toggleHelp").click(function () {
            $("#help").toggle(400);
        });
        $("#toggleAbout").click(function () {
            $("#about").toggle(400);
        });
        $("#toggleVersion").click(function () {
            $("#debug").toggle(400);
        });
        $("#toggleSaveGame").click(function () {
            $("#savegame_manager").toggle(400);
        });

        //boxes
        ENGINE.gameWIDTH = 1024;
        ENGINE.titleWIDTH = 1280 + INI.SCREEN_BORDER;
        ENGINE.sideWIDTH = ENGINE.titleWIDTH - ENGINE.gameWIDTH - INI.SCREEN_BORDER;
        ENGINE.gameHEIGHT = 768;
        ENGINE.titleHEIGHT = 96;
        ENGINE.bottomHEIGHT = 80;
        ENGINE.bottomWIDTH = ENGINE.titleWIDTH;
        MAP_TOOLS.INI.FOG = false;

        $("#bottom").css("margin-top", ENGINE.gameHEIGHT + ENGINE.titleHEIGHT + ENGINE.bottomHEIGHT);
        $(ENGINE.gameWindowId).width(ENGINE.gameWIDTH + 2 * ENGINE.sideWIDTH + 4);
        ENGINE.addBOX("TITLE", ENGINE.titleWIDTH, ENGINE.titleHEIGHT, ["title", "lives", "hiscore"], null);
        ENGINE.addBOX("LSIDE", INI.SCREEN_BORDER, ENGINE.gameHEIGHT, ["Lsideback", "alt", "altover"], "side");
        ENGINE.addBOX("ROOM", ENGINE.gameWIDTH, ENGINE.gameHEIGHT, ["background", "3d_webgl", "info", "text", "FPS", "button", "click"], "side");
        ENGINE.addBOX("SIDE", ENGINE.sideWIDTH, ENGINE.gameHEIGHT, ["sideback", "score", "stage"], "fside");
        ENGINE.addBOX("DOWN", ENGINE.bottomWIDTH, ENGINE.bottomHEIGHT, ["bottom", "bottomText", "fuel", "fuelPlot", "subtitle"], null);

        if (DEBUG._2D_display) {
            ENGINE.addBOX("LEVEL", ENGINE.gameWIDTH, ENGINE.gameHEIGHT, ["pacgrid", "grid", "coord", "player"], null);
        }

        /** dev settings */
        if (DEBUG.VERBOSE) {
            WebGL.VERBOSE = true;
            AI.VERBOSE = true;
            ENGINE.verbose = true;
            MAP_TOOLS.INI.VERBOSE = true;
        }
    },
    start() {
        console.log("%c**************************************************************************************************************************************", PRG.CSS);
        console.log(`${PRG.NAME} ${PRG.VERSION} STARTED!`);
        console.log("%c**************************************************************************************************************************************", PRG.CSS);
        $(ENGINE.topCanvas).off("mousemove", ENGINE.mouseOver);
        $(ENGINE.topCanvas).off("click", ENGINE.mouseClick);
        $(ENGINE.topCanvas).css("cursor", "");


        $("#startGame").addClass("hidden");
        ENGINE.disableDefaultKeys();
        TITLE.startTitle();
    }
};

const HERO = {
    construct() {
        this.player = null;
        this.height = 0.0;
        this.reset();
    },
    reset() {
        this.revive();
        this.canShoot = true;
        this.falling = false;
        this.setMode("idle");
        this.maxFuel = 750;
        this.fuel = HERO.maxFuel;
        this.multi = false;
    },
    revive() {
        this.dead = false;
        this.fuel = this.maxFuel;
        this.canShoot = true;
        this.setMode("idle");
        this.falling = false;
    },
    setMode(mode) {
        this.mode = mode;
    },
    concludeAction() {
        this.setMode("idle");
        this.player.resetDefaultRotation();
    },
    shoot() {

        if (HERO.dead) return;
        if (HERO.falling) return;
        if (!HERO.canShoot) return;

        const origin = this.player.pos.add(new Vector3(this.player.bb_deltas.x, -0.05, 0.015));
        BULLET3D.add(new Bullet(origin, DIR_FORWARD, COMMON_ITEM_TYPE.Bullet));

        if (this.multi) {
            const offset = 0.25;
            const vectors = [DIR_LEFT, DIR_RIGHT, DIR_DOWN, DIR_UP];

            for (const V of vectors) {
                BULLET3D.add(new Bullet(origin.add(V, offset), DIR_FORWARD, COMMON_ITEM_TYPE.Bullet));
            }
        }

        this.useFuel(1);
        HERO.canShoot = false;

        setTimeout(() => (HERO.canShoot = true), INI.HERO_SHOOT_TIMEOUT);
        return;
    },
    multishot() {
        this.multi = true;
    },
    hitByMissile(missile) {
        if (DEBUG.VERBOSE) console.warn("HERO hit by missile", missile,);

    },
    hitObstacle() {
        this.explode();
    },
    burn() {
        return this.explode();
    },
    explode() {
        if (HERO.dead) return;
        EXPLOSION3D.add(new BigFireExplosion(this.player.pos));
        AUDIO.Explosion.volume = RAY.volume(0);
        AUDIO.Explosion.play();
        this.die();
    },
    die() {
        if (HERO.dead) return;
         if (DEBUG.VERBOSE) console.warn("hero dies");
        HERO.dead = true;
        HERO.canShoot = false;
    },
    death() {
         if (DEBUG.VERBOSE) console.error("HERO DEATH");
        GAME.lives--;
        TITLE.lives();
        if (GAME.lives <= 0) return HERO.finalDeath();
        ENGINE.TEXT.centeredText("Press ENTER to use new ship", ENGINE.gameWIDTH, ENGINE.gameHEIGHT / 2);
        ENGINE.GAME.ANIMATION.resetTimer();
        ENGINE.GAME.ANIMATION.next(GAME.lifeLostRun);
    },
    finalDeath() {
         if (DEBUG.VERBOSE) console.error("HERO FINAL death");

        GAME.checkScore();
        TITLE.hiScore();
        for (const L of LIGHTS3D.POOL) {
            L.lightColor = Array(0, 0, 0);
        }
        ENGINE.TEXT.centeredText("Rest In Peace", ENGINE.gameWIDTH, ENGINE.gameHEIGHT / 2);
        ENGINE.TEXT.centeredText("(ENTER)", ENGINE.gameWIDTH, ENGINE.gameHEIGHT / 2 + ENGINE.TEXT.RD.fs * 1.2);
        ENGINE.GAME.ANIMATION.resetTimer();
        ENGINE.GAME.ANIMATION.next(GAME.gameOverRun);

        GAME.restarted = true;
    },
    manage() {
        let Grid3D = Vector3.to_Grid3D(HERO.player.pos);
        if (Grid3D.x > 0 && Grid3D.x < MAP[GAME.level].map.width - 1) {
            const filledGridIndices = HERO.player.inWhichGridIndices();
            const hit = HERO.player.GA.checkIndicesAny(filledGridIndices, MAPDICT.WALL);
            if (hit) {
                return this.explode();
            }
        }

        if (this.falling && Grid3D.z < 0.5) return this.explode();                                              // falling to ground
        if (HERO.player.pos.x > MAP[GAME.level].map.width + INI.PAD_BETWEEN_LEVELS) GAME.nextLevel();
    },
    fallingDown(lapsedTime) {
        HERO.setMode("falling");
        let length = (lapsedTime / 1000) * INI.FALL_SPEED;
        const nextPos3 = HERO.player.pos.translate(new Vector3(1, -1, 0), length);                              //down and forward
        HERO.player.setPos(nextPos3);
        HERO.player.changeRotation(INI.SHIT_ROT_ANGLE, [1, 0, 0]);
    },
    addFuel(fuel) {
        HERO.fuel += fuel * INI.FUEL_BIN;
        HERO.fuel = Math.min(HERO.maxFuel, HERO.fuel);
        TITLE.fuelPlot();
    },
    useFuel(consumption) {
        if (DEBUG.FREE_FUEL) return;
        HERO.fuel -= consumption;
        HERO.fuel = Math.max(0, HERO.fuel);
        if (HERO.fuel === 0) {
            HERO.falling = true;
            AUDIO.Alarm.play();
        }
        TITLE.fuelPlot();
    },
    creep(lapsedTime) {
        if (HERO.dead) return;
        if (HERO.falling) return this.fallingDown(lapsedTime);
        const length = this.player.creep(lapsedTime);
        const consumption = length * INI.FUEL_CONSUMPTION;
        this.useFuel(consumption);
    },
    changePosition(posDir, rotationAxis, mode, lapsedTime) {
        if (HERO.mode === "idle" || HERO.mode === mode) {
            let length = (lapsedTime / 1000) * INI.SIDE_SPEED;
            let nextPos3 = HERO.player.pos.translate(posDir, length);
            let bottomPos3 = nextPos3.translate(new Vector3(0, -this.player.bb_deltas.y * INI.DOWNWARD_GUARD_FACTOR, 0)); //2.7
            let FPGrid3D = Vector3.to_FP_Grid3D(nextPos3);
            let BottomFPGrid3D = Vector3.to_FP_Grid3D(bottomPos3);

            if (this.outOfBounds(FPGrid3D)) return;                                 // we will not apply the move
            let gridDown = Grid3D.toClass(BottomFPGrid3D);
            if (posDir.y === -1 && this.player.GA.isWall(gridDown)) return;         //don't crash moving down
            HERO.player.setPos(nextPos3);
            HERO.player.changeRotation(INI.SHIT_ROT_ANGLE, rotationAxis);
            HERO.setMode(mode);
        }
        return;
    },
    outOfBounds(FPGrid3D) {
        const R = HERO.player.r;
        if (FPGrid3D.y - R < 1) return true;
        if (FPGrid3D.y + R >= MAP[GAME.level].map.height) return true;
        if (FPGrid3D.z - R <= 0.0) return true;
        if (FPGrid3D.z + 2 * R >= MAP[GAME.level].map.depth) return true;
        return false;
    },
};


const GAME = {
    restarted: false,
    start() {
        console.log("GAME started");
        if (AUDIO.Title) {
            AUDIO.Title.pause();
            AUDIO.Title.currentTime = 0;
        }
        $(ENGINE.topCanvas).off("mousemove", ENGINE.mouseOver);
        $(ENGINE.topCanvas).off("click", ENGINE.mouseClick);
        $(ENGINE.topCanvas).css("cursor", "");
        ENGINE.hideMouse();
        ENGINE.GAME.pauseBlock();
        ENGINE.GAME.paused = true;

        let GameRD = new RenderData("CPU", 60, "#fF2010", "text", "#444444", 2, 2, 2);
        ENGINE.TEXT.setRD(GameRD);
        ENGINE.watchVisibility(ENGINE.GAME.lostFocus);
        ENGINE.GAME.setGameLoop(GAME.run);
        ENGINE.GAME.start(16);

        AI.immobileWander = false;

        GAME.IAM_settings();
        GAME.WebGL_settings();

        GAME.completed = false;
        GAME.extraLife = SCORE.extraLife.clone();
        GAME.lives = 4;
        GAME.level = 1;
        GAME.score = 0;

        HERO.construct();
        ENGINE.VECTOR2D.configure("player");
        GAME.fps = new FPS_short_term_measurement(300);
        GAME.prepareForRestart();
        GAME.time = new Timer("Main");

        ENGINE.draw("background", (ENGINE.gameWIDTH - TEXTURE.DarkNight.width) / 2, (ENGINE.gameHEIGHT - TEXTURE.DarkNight.height) / 2, TEXTURE.DarkNight);

        if (DEBUG.AUTO_TEST) {
            return DEBUG.automaticTests();
        }

        GAME.levelStart();
    },
    IAM_settings() {
        IndexArrayManagers.DEADLY_TOUCH = true;
        IndexArrayManagers.EE_COLLISION_CHECK = false;
        IndexArrayManagers.E_WALL_COLLISION_CHECK = true;
    },
    WebGL_settings() {
        WebGL.setAmbientStrength(0.1);
        WebGL.setDiffuseStrength(0.5); 
        WebGL.HERO_AS_INNER = true;
        WebGL.INI.BACKGROUND_ALPHA = 0.0;
        WebGL.USE_SHADOW = true;
        WebGL.USE_INTERACTION = false;
        WebGL.INI.HERO_HEIGHT = 0;
        WebGL.FIRST_PERSON_DUAL_DISPLAY = false;
        WebGL.NO_TOP_CEILING = true;
        WebGL.VIEWS_ALLOWED = new Set([1, 3, 4]);
        WebGL.GAME.setViewButtons();
    },
    nextLevel() {
        GAME.level++;
        if (GAME.level > INI.LAST_LEVEL) {
            ENGINE.GAME.ANIMATION.stop();
            return GAME.won();
        }
        GAME.levelStart();
    },
    levelStart() {
        console.log("starting level", GAME.level);
        HERO.reset();
        TITLE.fuelPlot();
        WebGL.playerList.clear();                           //requred for restart after resurrection
        GAME.initLevel(GAME.level);
        WebGL.GAME.setFirstPerson();                        
        GAME.continueLevel(GAME.level);
    },
    continueLevel(level) {
        GAME.levelExecute();
    },
    levelExecute() {
        GAME.drawFirstFrame(GAME.level);
        ENGINE.GAME.resume();
    },
    setCameraView() {
        WebGL.hero.firstPersonCamera = new $3D_Camera(WebGL.hero.player, DIR_NOWAY, 0.0, new Vector3(0, 0, 0), 0);
        WebGL.hero.topCamera = new $3D_Camera(WebGL.hero.player, DIR_UP, 4, new Vector3(0, -1, 0), 2, 80);                                          //top back
        WebGL.hero.axonometric = new $3D_Camera(WebGL.hero.player, new Vector3(0, 1, 1), 4.5, new Vector3(0, -0.5, -1.0), 3.0, 80);                 //zaxxon perspective

        switch (WebGL.CONFIG.cameraType) {
            case "first_person":
                WebGL.hero.player.associateExternalCamera(WebGL.hero.firstPersonCamera);
                WebGL.setCamera(WebGL.hero.firstPersonCamera);
                break;
            case "third_person":
                WebGL.hero.player.associateExternalCamera(WebGL.hero.topCamera);
                WebGL.setCamera(WebGL.hero.topCamera);
                break;
            case "top_down":
                WebGL.hero.player.associateExternalCamera(WebGL.hero.overheadCamera);
                WebGL.setCamera(WebGL.hero.overheadCamera);
                break;
            case "orto_top_down":
                WebGL.hero.player.associateExternalCamera(WebGL.hero.orto_overheadCamera);
                WebGL.setCamera(WebGL.hero.orto_overheadCamera);
                break;
            case "axonometric":
                WebGL.hero.player.associateExternalCamera(WebGL.hero.axonometric);
                WebGL.setCamera(WebGL.hero.axonometric);
                break;
            case "sideCamera":
                WebGL.hero.player.associateExternalCamera(WebGL.hero.sideCamera);
                WebGL.setCamera(WebGL.hero.sideCamera);
                break;
            default:
                throw "WebGL.CONFIG.cameraType error";
        }
    },
    initLevel(level) {
        if (DEBUG.VERBOSE) console.info("init level", level);

        this.newDungeon(level);
        WebGL.MOUSE.initialize("ROOM");
        WebGL.setContext('webgl');

        const start_dir = MAP[level].map.startPosition.vector;
        let start_grid = MAP[level].map.startPosition.grid;
        start_grid = new Vector3(start_grid.x + 0.5 - INI.PAD_BETWEEN_LEVELS, start_grid.z + 0.2874, start_grid.y + 0.5);
        HERO.player = new $3D_player(start_grid, Vector3.from_2D_dir(start_dir), MAP[level].map, HERO_TYPE.Taxxon);
        HERO.player.setSpeed(INI.CREEP_SPEED);
        HERO.player.useCollision(HERO.player.boundingBoxCollision);

        this.buildWorld(level);
        GAME.setCameraView();
        SPAWN_TOOLS.spawnSunFromCamera(new Vector3(MAP[level].map.width * 0.5, MAP[level].map.depth * INI.SUN_HEIGHT_FACTOR, MAP[level].map.height * 0.5), LIGHT_COLORS.sun);
        AI.initialize(HERO.player, "3D3");
        GAME.setWorld(level);
        ENTITY3D.resetTime();
    },
    setWorld(level, decalsAreSet = false) {
        console.time("setWorld");
        const textureData = {
            wall: TEXTURE[MAP[level].wall],
            floor: TEXTURE[MAP[level].floor],
            ceil: TEXTURE[MAP[level].ceil]
        };

        WebGL.updateShaders();

        if (WebGL.CONFIG.firstperson) {
            WebGL.init('webgl', MAP[level].world, textureData, WebGL.hero.player, decalsAreSet);              //firstperson
        } else {
            WebGL.init('webgl', MAP[level].world, textureData, WebGL.hero.topCamera, decalsAreSet);           //thirdperson
        }
        LAIR.set_timeout(MAP[level].map.spawnDelay);
        console.timeEnd("setWorld");
    },
    buildWorld(level) {
        if (DEBUG.VERBOSE) console.info(" ******** building world, room/dungeon/level:", level, "ressurection", HERO.ressurection, "restart", GAME.restarted);
        WebGL.init_required_IAM(MAP[level].map, HERO, GAME);
        SPAWN_TOOLS.spawn(level);
        MAP[level].world = WORLD.build(MAP[level].map);
    },
    newDungeon(level) {
        MAP_TOOLS.unpack(level);
    },
    prepareForRestart() {
        let clear = ["background", "text", "FPS", "button", "bottomText"];
        ENGINE.clearManylayers(clear);
        TITLE.blackBackgrounds();
        ENGINE.TIMERS.clear();
    },
    setup() {
        console.log("GAME SETUP started");
        $("#conv").remove();
    },
    setTitle() {
        const text = GAME.generateTitleText();
        const RD = new RenderData("CPU", 24, "#0E0", "bottomText");
        const SQ = new RectArea(0, 0, LAYER.bottomText.canvas.width, LAYER.bottomText.canvas.height);
        GAME.movingText = new MovingText(text, 4, RD, SQ);
    },
    generateTitleText() {
        let text = `${PRG.NAME} ${PRG.VERSION
            }, a game by Lovro Selič, ${"\u00A9"} LaughingSkull ${PRG.YEAR
            }. 
             
            Music: 'Ex Nihilo' written and performed by LaughingSkull, ${"\u00A9"
            } 2017 Lovro Selič. `;
        text += "     ENGINE, GRID, MAZE, Burrows-Wheeler RLE Compression, WebGL, shaders and GAME code by Lovro Selič using JavaScript and GLSL. ";
        text += "     glMatrix library by Brandon Jones and Colin MacKenzie IV. Thanks. ";
        text = text.split("").join(String.fromCharCode(8202));
        return text;
    },
    runTitle() {
        if (ENGINE.GAME.stopAnimation) return;
        GAME.movingText.process();
        GAME.titleFrameDraw();
    },
    titleFrameDraw() {
        GAME.movingText.draw();
    },
    drawFirstFrame(level) {
        if (DEBUG.VERBOSE) console.log("drawing first frame");
        TITLE.firstFrame();
        if (DEBUG._2D_display) {
            ENGINE.resizeBOX("LEVEL", MAP[level].pw, MAP[level].ph);
            ENGINE.BLOCKGRID.configure("pacgrid", "#FFF", "#000");
            ENGINE.BLOCKGRID3D.draw(MAP[GAME.level].map, HERO.player.depth);
            GRID.grid();
            GRID.paintCoord3D("coord", MAP[level].map, HERO.player.depth);
        }
    },
    run(lapsedTime) {
        if (ENGINE.GAME.stopAnimation) return;
        const date = Date.now();
        HERO.player.animateAction();
        HERO.creep(lapsedTime);
        HERO.manage();
        if (ENGINE.GAME.stopAnimation) return;                          // game might be won!
        BULLET3D.manage(lapsedTime);
        EXPLOSION3D.manage(date);
        FIRE3D.manage(date);
        ENTITY3D.manage(lapsedTime, date, [HERO.invisible, HERO.dead]);
        ITEM3D.checkCollisionToHero();

        GAME.respond(lapsedTime);
        ENGINE.TIMERS.update();

        MAP.manage(GAME.level);
        GAME.frameDraw(lapsedTime);
        HERO.concludeAction();

        if (HERO.dead) IAM.checkIfProcessesComplete([EXPLOSION3D], HERO.death);
        if (GAME.completed) GAME.won();
    },
    frameDraw(lapsedTime) {
        if (DEBUG._2D_display) {
            GAME.drawPlayer();
        }
        WebGL.renderScene(MAP[GAME.level].map);

        if (DEBUG.FPS) {
            GAME.FPS(lapsedTime);
        }
        if (DEBUG._2D_display) {
            const map = MAP[GAME.level].map;
            ENGINE.BLOCKGRID3D.draw(map, HERO.player.depth);
            BULLET3D.draw();
            ENTITY3D.drawVector2D();
            DYNAMIC_ITEM3D.drawVector2D();
            GRID.paintCoord3D("coord", MAP[GAME.level].map, HERO.player.depth);
        }
    },
    drawPlayer() {
        ENGINE.clearLayer(ENGINE.VECTOR2D.layerString);
        ENGINE.VECTOR2D.draw(HERO.player);
    },
    respond(lapsedTime) {
        if (HERO.dead) return;
        if (HERO.falling) return;

        WebGL.GAME.respond(lapsedTime);
        ENGINE.GAME.respond(lapsedTime);

        const map = ENGINE.GAME.keymap;

        //debug
        if (map[ENGINE.KEY.map.F7]) {
            if (!DEBUG.keys) return;
        }
        if (map[ENGINE.KEY.map.F8]) {
            if (!DEBUG.keys) return;
            DEBUG.kill();
            ENGINE.GAME.keymap[ENGINE.KEY.map.F8] = false;
        }

        //controls
        if (map[ENGINE.KEY.map.ctrl]) {
            HERO.shoot();
            ENGINE.GAME.keymap[ENGINE.KEY.map.ctrl] = false; //NO repeat

        }
        if (map[ENGINE.KEY.map.down]) {
            HERO.changePosition(new Vector3(0, 1, 0), [-1, 0, 0], "up", lapsedTime);
            TITLE.altimeterHeight();
        }
        if (map[ENGINE.KEY.map.up]) {
            HERO.changePosition(new Vector3(0, -1, 0), [1, 0, 0], "down", lapsedTime);
            TITLE.altimeterHeight();
        }
        if (map[ENGINE.KEY.map.left]) {
            HERO.changePosition(new Vector3(0, 0, -1), [0, 0, -1], "left", lapsedTime);
        }
        if (map[ENGINE.KEY.map.right]) {
            HERO.changePosition(new Vector3(0, 0, 1), [0, 0, 1], "right", lapsedTime);
        }

        return;
    },
    FPS(lapsedTime) {
        let CTX = LAYER.FPS;
        CTX.fillStyle = "white";
        ENGINE.clearLayer("FPS");
        let fps = 1000 / lapsedTime || 0;
        GAME.fps.update(fps);
        CTX.fillText(GAME.fps.getFps(), 5, 10);
    },
    lifeLostRun(lapsedTime) {
        if (ENGINE.GAME.stopAnimation) return;
        if (ENGINE.GAME.keymap[ENGINE.KEY.map.enter]) {
            ENGINE.GAME.ANIMATION.waitThen(GAME.resurect);
        }
        const date = Date.now();
        FIRE3D.manage(date);
        EXPLOSION3D.manage(date);
        ENTITY3D.manage(lapsedTime, date, [HERO.invisible, HERO.dead]);
        GAME.lifeLostFrameDraw(lapsedTime);
    },
    lifeLostFrameDraw(lapsedTime) {
        if (DEBUG._2D_display) {
            GAME.drawPlayer();
        }
        WebGL.renderScene(MAP[GAME.level].map);

        if (DEBUG.FPS) {
            GAME.FPS(lapsedTime);
        }
        if (DEBUG._2D_display) {
            ENGINE.BLOCKGRID.draw(MAP[GAME.level].map);
            MISSILE3D.draw();
            ENTITY3D.drawVector2D();
        }
    },
    resurect() {
        if (DEBUG.VERBOSE) console.info("RESURECT");
        ENGINE.clearLayer("text");
        HERO.revive();
        BULLET3D.POOL.clear();
        GAME.levelStart();
    },
    gameOverRun(lapsedTime) {
        if (ENGINE.GAME.stopAnimation) return;
        if (ENGINE.GAME.keymap[ENGINE.KEY.map.enter]) {
            ENGINE.GAME.ANIMATION.waitThen(TITLE.startTitle);
        }
        const date = Date.now();
        EXPLOSION3D.manage(date);
        ENTITY3D.manage(lapsedTime, date, [HERO.invisible, HERO.dead]);
        GAME.lifeLostFrameDraw(lapsedTime);
    },
    won() {
         if (DEBUG.VERBOSE) console.info("GAME WON");
        ENGINE.GAME.ANIMATION.resetTimer();
        TITLE.setEndingCreditsScroll();
        ENGINE.GAME.pauseBlock();
        const layersToClear = ["FPS", "info", "fuel", "fuelPlot", "alt", "altover", "background"];
        layersToClear.forEach(item => ENGINE.layersToClear.add(item));
        ENGINE.clearLayerStack();
        ENGINE.GAME.ANIMATION.stop();
        const delay = 4000;
        ENGINE.fillLayer("background", "#000");
        WebGL.transparent();
        ENGINE.draw("background", (ENGINE.gameWIDTH - SPRITE.WinPic.width) / 2, (ENGINE.gameHEIGHT - SPRITE.WinPic.height) / 2, SPRITE.WinPic);
        GAME.checkScore();
        setTimeout(function () {
            ENGINE.clearLayer("subtitle");
            TITLE.music();
            ENGINE.GAME.ANIMATION.next(GAME.wonRun);
        }, delay);
    },
    wonRun(lapsedTime) {
        if (ENGINE.GAME.stopAnimation) return;
        GAME.endingCreditText.process(lapsedTime);
        GAME.wonFrameDraw();
        if (ENGINE.GAME.keymap[ENGINE.KEY.map.enter]) {
            ENGINE.GAME.ANIMATION.next(TITLE.startTitle);
        }
    },
    wonFrameDraw() {
        GAME.endingCreditText.draw();
    },
    addScore(score) {
        GAME.score += score;
        TITLE.score();
    },
    checkScore() {
        SCORE.checkScore(GAME.score);
        SCORE.hiScore();
    },
};

const TITLE = {
    stack: {
        x: null,
        y: null,
        W: null,
        H: null,
        fuelX: null,

    },
    startTitle() {
        if (DEBUG.VERBOSE) console.log("TITLE started");
        if (AUDIO.Title) AUDIO.Title.play(); //dev
        ENGINE.GAME.pauseBlock();
        TITLE.clearAllLayers();
        TITLE.blackBackgrounds();
        TITLE.titlePlot();
        ENGINE.draw("background", (ENGINE.gameWIDTH - TEXTURE.Title.width) / 2, (ENGINE.gameHEIGHT - TEXTURE.Title.height) / 2, TEXTURE.Title);
        $("#DOWN")[0].scrollIntoView();
        ENGINE.topCanvas = ENGINE.getCanvasName("ROOM");
        TITLE.drawButtons();
        GAME.setTitle();
        ENGINE.GAME.start(16);
        ENGINE.GAME.ANIMATION.next(GAME.runTitle);
    },
    clearAllLayers() {
        ENGINE.layersToClear = new Set(["text",
            "sideback", "button", "title", "FPS", "info", "subtitle", "lives",
            "bottomText", "score", "altover", "alt", "fuel", "fuelPlot", "stage",
        ]);
        ENGINE.clearLayerStack();
        WebGL.transparent();
    },
    blackBackgrounds() {
        this.topBackground();
        this.bottomBackground();
        this.sideBackground();
        ENGINE.fillLayer("background", "#000");
    },
    topBackground() {
        const CTX = LAYER.title;
        CTX.fillStyle = "#000";
        CTX.roundRectLegacy(0, 0, ENGINE.titleWIDTH, ENGINE.titleHEIGHT, { upperLeft: 20, upperRight: 20, lowerLeft: 0, lowerRight: 0 }, true, true);
    },
    bottomBackground() {
        const CTX = LAYER.bottom;
        CTX.fillStyle = "#000";
        CTX.roundRectLegacy(0, 0, ENGINE.bottomWIDTH, ENGINE.bottomHEIGHT, { upperLeft: 0, upperRight: 0, lowerLeft: 20, lowerRight: 20 }, true, true);
    },
    sideBackground() {
        ENGINE.fillLayer("sideback", "#000");
        ENGINE.fillLayer("Lsideback", "#000");
    },
    makeGrad(CTX, x, y, w, h) {
        // Create a linear gradient from (x, y) to (w, h)
        let grad = CTX.createLinearGradient(x, y, w, h);

        grad.addColorStop(0.00, "#FFFFFF"); // specular highlight
        grad.addColorStop(0.05, "#F5F7FA");
        grad.addColorStop(0.10, "#E9EDF2");
        grad.addColorStop(0.15, "#DEE3E8");
        grad.addColorStop(0.20, "#D3D8DE");
        grad.addColorStop(0.25, "#C7CDD4");
        grad.addColorStop(0.30, "#BCC2C9");
        grad.addColorStop(0.35, "#B1B7BE");
        grad.addColorStop(0.40, "#A6ACB3");
        grad.addColorStop(0.45, "#9BA1A8");
        grad.addColorStop(0.50, "#90969D"); // mid silver
        grad.addColorStop(0.55, "#858B92");
        grad.addColorStop(0.60, "#7A8087");
        grad.addColorStop(0.65, "#70767D");
        grad.addColorStop(0.70, "#666C73");
        grad.addColorStop(0.75, "#5C6269");
        grad.addColorStop(0.80, "#52585F");
        grad.addColorStop(0.85, "#484E55");
        grad.addColorStop(0.90, "#3F454C");
        grad.addColorStop(0.95, "#363C43");
        grad.addColorStop(1.00, "#2D333A"); // deep steel


        return grad;
    },
    titlePlot() {
        const CTX = LAYER.title;
        const fs = 64;
        CTX.font = fs + "px CPU";
        CTX.textAlign = "center";
        let txt = CTX.measureText(PRG.NAME);
        let x = ENGINE.titleWIDTH / 2;
        let y = fs;
        let gx = x - txt.width / 2;
        let gy = y - fs;
        let grad = this.makeGrad(CTX, gx, gy + 10, gx, gy + fs);
        CTX.fillStyle = grad;
        GAME.grad = grad;
        CTX.shadowColor = "#666666";
        CTX.shadowOffsetX = 2;
        CTX.shadowOffsetY = 2;
        CTX.shadowBlur = 3;
        CTX.fillText(PRG.NAME, x, y);
    },
    drawButtons() {
        ENGINE.clearLayer("button");
        FORM.BUTTON.POOL.clear();
        let x = 8;
        const w = 100;
        const h = 24;
        const F = 1.5;
        let y = 668 - F * h;

        const buttonColors = new ColorInfo("#F00", "#A00", "#222", "#666", 13);
        const musicColors = new ColorInfo("#0E0", "#090", "#222", "#666", 13);

        y += F * h;
        let startBA = new Area(x, y, w, h);
        FORM.BUTTON.POOL.push(new Button("Start game", startBA, buttonColors, GAME.start));

        y += F * h;
        let music = new Area(x, y, w, h);
        FORM.BUTTON.POOL.push(new Button("Title music", music, musicColors, TITLE.music));

        FORM.BUTTON.draw();
        $(ENGINE.topCanvas).on("mousemove", { layer: ENGINE.topCanvas }, ENGINE.mouseOver);
        $(ENGINE.topCanvas).on("click", { layer: ENGINE.topCanvas }, ENGINE.mouseClick);
    },
    firstFrame() {
        TITLE.titlePlot();
        TITLE.lives();
        TITLE.hiScore();
        TITLE.score();
        TITLE.altimeterOverlay();
        TITLE.altimeterHeight();
        TITLE.fuel();
        TITLE.fuelPlot();
        TITLE.stage();
    },
    fuelPlot() {
        ENGINE.clearLayer("fuelPlot");

        const y = ENGINE.bottomHEIGHT / 2;
        const leftX = TITLE.stack.fuelX;
        const rightX = ENGINE.bottomWIDTH - ENGINE.sideWIDTH;
        const deltaX = (rightX - leftX) >>> 1;
        const cX = leftX + deltaX;
        const N = Math.ceil(HERO.fuel / HERO.maxFuel * INI.FUEL_BIN);

        const spread = ENGINE.spreadAroundCenter(N, cX, 48);
        for (let x of spread) {
            ENGINE.spriteDraw("fuelPlot", x, y, SPRITE.OilDrum);
        }
    },
    fuel() {
        const CTX = LAYER.fuel;
        ENGINE.clearLayer("fuel");
        const text = "FUEL :";
        const fs = 60;
        CTX.font = fs + "px CPU";
        let txtW = CTX.measureText(text);
        let x = INI.SCREEN_BORDER;
        let y = fs;
        let gx = x - txtW.width / 2;
        let gy = y - fs;
        let grad = this.makeGrad(CTX, gx, gy + 10, gx, gy + fs);
        CTX.fillStyle = grad;
        GAME.grad = grad;
        CTX.shadowColor = "#666666";
        CTX.shadowOffsetX = 2;
        CTX.shadowOffsetY = 2;
        CTX.shadowBlur = 3;
        CTX.fillText(text, x, y);
        TITLE.stack.fuelX = Math.ceil(x + txtW.width) + 16;
    },
    altimeterOverlay() {
        const CTX = LAYER.altover;
        const COLOR = "rgba(58, 198, 81, 1)";
        const H = (ENGINE.gameHEIGHT * 0.8) >>> 0;
        let y = (ENGINE.gameHEIGHT - H) >>> 1;
        const W = (INI.SCREEN_BORDER * 0.35) >>> 0;
        const x = (INI.SCREEN_BORDER - W) >>> 1;

        TITLE.stack.x = x;
        TITLE.stack.y = y;
        TITLE.stack.W = W;
        TITLE.stack.H = H;

        CTX.strokeStyle = COLOR;
        CTX.lineWidth = 4;
        CTX.beginPath();
        CTX.roundRect(x, y, W, H, 10);
        CTX.stroke();

        const splitLines = MAP[GAME.level].map.depth - 1;
        const splitSize = (H / (splitLines + 1)) >>> 0;

        for (let line = 0; line < splitLines; line++) {
            y += splitSize;
            CTX.drawLine(x + 1, y, x + W - 1, y);
        }
    },
    altimeterHeight() {
        const R = HERO.player.r;
        const CTX = LAYER.alt;
        const COLOR = "rgba(68, 169, 85, 1)";
        ENGINE.clearLayer("alt");
        const maxAlt = MAP[GAME.level].map.depth - 1 + R / 2;
        const currAlt = HERO.player.pos.y - R;
        const fillH = (currAlt / maxAlt * TITLE.stack.H) >>> 0;
        const y = TITLE.stack.H - fillH + TITLE.stack.y;

        CTX.fillStyle = COLOR;
        CTX.fillRect(TITLE.stack.x + 2, y, TITLE.stack.W - 4, fillH - 2);
    },
    lives() {
        ENGINE.clearLayer("lives");
        const cX = 3 * INI.SCREEN_BORDER / 2 - 40;
        const y = ENGINE.titleHEIGHT / 2;
        const spread = ENGINE.spreadAroundCenter(GAME.lives - 1, cX, 48);
        for (let x of spread) {
            ENGINE.spriteDraw("lives", x, y, SPRITE.Lives);
        }
    },
    hiScore() {
        ENGINE.clearLayer("hiscore");
        const CTX = LAYER.hiscore;
        const fs = 20;
        CTX.font = fs + "px CPU";
        CTX.fillStyle = GAME.grad;
        CTX.shadowColor = "#555555";
        CTX.shadowOffsetX = 1;
        CTX.shadowOffsetY = 1;
        CTX.shadowBlur = 1;
        CTX.textAlign = "left";
        const x = 1120;
        const y = 64;
        const index = SCORE.SCORE.name[0].indexOf("&nbsp");
        let HS;
        if (index > 0) {
            HS = SCORE.SCORE.name[0].substring(0, SCORE.SCORE.name[0].indexOf("&nbsp"));
        } else {
            HS = SCORE.SCORE.name[0];
        }
        const text = "HISCORE: " + SCORE.SCORE.value[0].toString().padStart(6, "0") + " by " + HS;
        CTX.fillText(text, x, y);
    },
    score() {
        this._text("score", "SCORE", 32, "score", 6);
        if (GAME.score >= GAME.extraLife[0]) {
            GAME.lives++;
            GAME.extraLife.shift();
            TITLE.lives();
            AUDIO.ExtraLife.play();
        }
    },
    music() {
        AUDIO.Title.play();
    },
    setEndingCreditsScroll() {
        const text = this.generateEndingCredits();
        const RD = new RenderData("CPU", 30, "#DAA520", "text", "#000", 1, 1, 1);
        GAME.endingCreditText = new VerticalScrollingText(text, 1, RD);
    },
    generateEndingCredits() {
        const text = `Congratulations!

        You have completed TaXXon,
        in ${GAME.time.timeString()}.

        You brought taxes to all corners of the galaxy.
        What a glorious achievement.
        Bitchosa Grande will be celebrated
        for aeons, or at least until
        the next audit.

        CREDITS:
        Code and direction, Lovro Selic
        Written in JavaScript and GLSL

        jQuery: John Resig et al
        glMatrix: Brandon Jones and
        Colin MacKenzie IV

        Graphics from free sources,
        plus PiskelApp and Blender
        Textures and images by AI:
        Stable Diffusion, Ideogram,
        Flux.1D, Flux.2D.

        Supplementary tools,
        JavaScript, Python, C++

        Music, 'Ex Nihilo'
        written and performed by LaughingSkull,
        \u00A9 2007 Lovro Selic

        Thanks for sticking it out
        until the bitter, taxable end.`;
        return text;
    },
    _label(CTX, txt, fs, x, y) {
        CTX.font = fs + "px CPU";
        this._grad(CTX, txt, fs, x, y);
        CTX.shadowColor = "#555555";
        CTX.shadowOffsetX = 1;
        CTX.shadowOffsetY = 1;
        CTX.shadowBlur = 2;
        CTX.textAlign = "center";
        CTX.fillText(txt, x, y);
    },
    _text(layer, txt, y, what, pad) {
        ENGINE.clearLayer(layer);
        let CTX = LAYER[layer];
        let x = ENGINE.sideWIDTH / 2;
        let fs = 32;
        this._label(CTX, txt, fs, x, y);
        CTX.fillStyle = "#FFF";
        CTX.shadowColor = "#DDD";
        CTX.shadowOffsetX = 1;
        CTX.shadowOffsetY = 1;
        CTX.shadowBlur = 1;
        y += fs + 4;
        CTX.fillText(GAME[what].toString().padStart(pad, "0"), x, y);
    },
    _grad(CTX, txt, fs, x, y) {
        let txtm = CTX.measureText(txt);
        let gx = x - txtm.width / 2;
        let gy = y - fs;
        CTX.fillStyle = this.makeGrad(CTX, gx, gy + 2, gx, gy + fs);
    },
    stage() {
        this._text("stage", "STAGE", 128, "level", 2);
        const CTX = LAYER.stage;
        CTX.save();
        CTX.fillStyle = "#27e027ff"
        CTX.shadowBlur = 1;
        let fs = 18;
        CTX.font = fs + "px CPU";
        CTX.fillText(MAP[GAME.level].name, ENGINE.sideWIDTH / 2, 192);
        CTX.restore();
    }
};

// -- main --
$(() => {
    PRG.INIT();
    PRG.setup();
    ENGINE.LOAD.preload();
    UNIFORM.setup();
    SCORE.init("SC", "TAXXON", 10, 2500);
    SCORE.loadHS();
    SCORE.hiScore();
    SCORE.extraLife = [10000, 25000, 50000, 100000, 200000, 500000, 1000000, Infinity];
});