let game = {
    showFrameRate: false,
    container: null,
    width: window.innerWidth,
    height: window.innerHeight,
    context: {},
    theme: 1,

    advertsOn: null,
    highScore: false,
    highScores: [],
    music: false,
    sound: false,
    mode: "normal",
    run: false,
    topHeight: 56,
    bottomHeight: 160,

    scale: 0,
    blockSize: 0,
    startMenu: "closed",

    oldX: 0,
    oldY: 0,
    shake: false,
    grid: [],
    loopTime: 0,
    level: 3,
    selectedPiece: null,
    currentTimer: 0,
    oldTimer: 0,
    leaderboard: "blocks1",

    init: function () {
        assets.load();

        game.height = window.innerHeight;
        if (game.advertsOn === "YES") {
            if(navigator.platform==="iPad"){
                game.height -= 90;
            } else {
                game.height -= 50;
            }
        }

        document.body.style.backgroundImage = "url(assets/backgrounds/woodDark.png)";

        lives.init();
        coins.init();
        score.init();

        if(game.showFrameRate === true){
            let fps = document.createElement("div");
            fps.className = "fps";
            fps.id = "fps";
            document.body.appendChild(fps);
        }

        game.container = document.createElement("div");
        game.container.className = "container";
        game.container.style.height = game.height;
        document.body.appendChild(game.container);

        game.background = renderer.createCanvas(game.container, 'background');
        game.control = renderer.createCanvas(game.container, 'control');
        game.effects = renderer.createCanvas(game.container, 'effects');

        game.startMenu = renderer.createCanvas(game.container, 'startMenu');

        game.dialogBckground = renderer.createCanvas(game.container, 'dialogBackground');
        game.dialog = renderer.createCanvas(game.container, 'dialog');


        listeners.attach(game.container);

        game.blocks = {
            0: assets.list.blocks.flatWhite,
            1: assets.list.blocks.blue,
            2: assets.list.blocks.red,
            3: assets.list.blocks.green,
            4: assets.list.blocks.purple,
            5: assets.list.blocks.cyan,
            6: assets.list.blocks.orange,
            7: assets.list.blocks.yellow,

            90: assets.list.blocks.halfWhite,
            91: assets.list.blocks.halfBlack,

            100: assets.list.blocks.ice,
            101: assets.list.blocks.iceBroken,

            120: assets.list.blocks.copper,
            121: assets.list.blocks.copperBroken,

            140: assets.list.blocks.wood,

            160: assets.list.blocks.stone,
            161: assets.list.blocks.stoneBroken,

            180: assets.list.blocks.steel,
            181: assets.list.blocks.steelBroken,

            200: assets.list.blocks.white,
            201: assets.list.blocks.flatWhite,

            300: assets.list.blocks.bomb,
            301: assets.list.blocks.bomb2,
            302: assets.list.blocks.bomb3,
            303: assets.list.blocks.bomb4,

            998: assets.list.blocks.coin,
            999: assets.list.blocks.heart
        };

    },

    toggleAdverts: function () {

        game.height = window.innerHeight;
        if (game.advertsOn === "NO") {
            game.advertsOn = "YES";
            if(navigator.platform === "iPad"){
                game.height -= 90;
            } else {
                game.height -= 50;
            }
            if (helpers.isCordova()) {
                initAds();
            }
        } else {
            game.advertsOn = "NO";
            if (helpers.isCordova()) {
                AdMob.removeBanner();
            }
        }
        localStorage.setItem("adverts", game.advertsOn);

        animation.renderContext("control");

        let canvasWidth = game.width;
        let canvasHeight = game.height;

        game.container.style.width = game.width;
        game.container.style.height = game.height;

        let canvases = document.querySelectorAll("canvas");
        [].forEach.call(canvases, function (canvas) {

            canvas.width = canvasWidth * renderer.multiplier;
            canvas.height = canvasHeight * renderer.multiplier;
            canvas.style.width = canvasWidth;
            canvas.style.height = canvasHeight;

            canvasContext = canvas.getContext('2d');
            canvasContext.scale(renderer.multiplier, renderer.multiplier);

            if (dialogs.current === "lives") {
                dialogs.moreLivesBackground();
                setTimeout(function () {
                    dialogs.moreLives(true);
                }, 100);
            }

            if (dialogs.current === "coins") {
                dialogs.moreCoinsBackground(game.context['background']);
            }

            if (dialogs.current === "settings") {
                dialogs.settingsBackground();
            }

            if (dialogs.current === "level") {
                dialogs.levelBackground();
            }

            if (dialogs.current === "gameOver") {
                dialogs.gameOverBackground();
            }

            if (game.startMenu === "open") {
                renderer.createStartMenu(game.context['startMenu']);
            }


        });
        renderer.createBackground(game.context['background']);

        game.calculateBlockSize();


    },

    turnAddsOff: function () {

        game.height = window.innerHeight;

            game.advertsOn = "NO";
            if (helpers.isCordova()) {
                AdMob.removeBanner();
            }

        localStorage.setItem("adverts", game.advertsOn);

        animation.renderContext("control");

        let canvasWidth = game.width;
        let canvasHeight = game.height;

        game.container.style.width = game.width;
        game.container.style.height = game.height;

        let canvases = document.querySelectorAll("canvas");
        [].forEach.call(canvases, function (canvas) {

            canvas.width = canvasWidth * renderer.multiplier;
            canvas.height = canvasHeight * renderer.multiplier;
            canvas.style.width = canvasWidth;
            canvas.style.height = canvasHeight;

            canvasContext = canvas.getContext('2d');
            canvasContext.scale(renderer.multiplier, renderer.multiplier);

            if (dialogs.current === "lives") {
                dialogs.moreLivesBackground();
                setTimeout(function () {
                    dialogs.moreLives(true);
                }, 100);
            }

            if (dialogs.current === "coins") {
                dialogs.moreCoinsBackground(game.context['background']);
            }

            if (dialogs.current === "settings") {
                dialogs.settingsBackground();
            }

            if (dialogs.current === "level") {
                dialogs.levelBackground();
            }

            if (dialogs.current === "gameOver") {
                dialogs.gameOverBackground();
            }

            if (game.startMenu === "open") {
                renderer.createStartMenu(game.context['startMenu']);
            }


        });
        renderer.createBackground(game.context['background']);

        game.calculateBlockSize();


    },

    calculateBlockSize: function () {
        game.scale = window.innerHeight / 600;

        game.gameAreaTop = (game.topHeight * game.scale) + 5;
        game.gameAreaBottom = game.height - (game.bottomHeight * game.scale);

        let xSize = (game.gameAreaBottom - game.gameAreaTop) / 11;
        let ySize = (game.width) / 11;

        if (xSize > ySize) {
            game.blockSize = ySize;
        } else {
            game.blockSize = xSize;
        }

        game.gridWidth = game.gridHeight = game.blockSize * 10;
        game.gridAreaTop = game.gameAreaTop + (game.gameAreaBottom - game.gameAreaTop) / 2 - game.gridHeight / 2;

    },

    start: function () {
        game.highScore = false;

        game.scale = window.innerHeight / 600;

        renderer.buildTextures();
        renderer.createStartMenu(game.context['startMenu']);
        renderer.createBackground(game.context['background']);

        game.calculateBlockSize();

        animation.context['control'] = false;
        animation.renderContext('control');


        if(game.music === "YES") {
            sound.play("zing");
        }

        if(game.music === "YES") {

            if (helpers.isCordova()) {
                setTimeout(function () {
                    sound.play("music", true);
                }, 4000);
            }
        }

        requestAnimationFrame(game.playLoop);

    },

    gameOver: function () {

        game.selectedPieces = null;
        game.highScore = score.count > game.highScores[game.level];
        game.run = false;

        lives.use();
        animation.explosion();
        setTimeout(function () {
            dialogs.showGameOver();
        }, 200);

        setTimeout(function () {
            animation.explosion();

            for (var row in game.grid) {
                for (var col in game.grid[row]) {
                    game.grid[row][col] = 0;
                }
            }

            animation.renderContext("control");

        }, 500);

        setTimeout(function () {
            score.save();
        }, 550);
        /* record high score on network */

        if(game.sound==="YES"){
            sound.play("explosion");
        }
    },

    startNewGame: function () {

        game.start = helpers.epoch();

        for (var row in levels[game.level].startGrid) {
            game.grid[row] = levels[game.level].startGrid[row].slice();
        }
        if(lives.count>0){
            lives.use();
            score.reset();
            game.hideStartMenu();
            animation.renderContext('control');

            animation.cloud(100, 400);
            game.run = true;
            setTimeout(function () {
                animation.flashText(game.context['effects'], assets.list.fonts.white, "Lets Go", game.width / 2, game.height / 3, 120, 0.2 * game.scale, "out");
            }, 300);
        } else {
            dialogs.showLives();
        }

        if(game.sound==="YES"){
            sound.play("zing");
        }
    },


    selectedPieces: null,
    playLoop: function () {

        if (game.run) {

            if(levels[game.level].timer !== false){
                game.currentTimer = game.start + levels[game.level].timer - helpers.epoch();
                if(game.oldTimer != game.currentTimer){
                    game.oldTimer = game.currentTimer;
                    animation.renderContext("control");

                    if(game.currentTimer < 10 ){
                        if(game.sound==="YES"){
                            sound.play("beep");
                        }
                    }
                    if (game.currentTimer<1){
                        game.gameOver();
                    }

                }


            }

            if (game.selectedPieces !== null) {
                if (game.selectedPieces[1].placed === true && game.selectedPieces[2].placed === true && game.selectedPieces[3].placed === true) {
                    game.selectedPieces = null;
                }
            }

            if(game.selectedPieces === null){
                blocks.selectGamePieces();
            }

        }

        if (animation.context['control'] === true) {
            game.context['control'].clearRect(0, 0, game.width, game.height);
            renderer.topBarContent();
            if(game.selectedPieces !== null){
                renderer.choicePieces();
            }

            renderer.renderGrid();
            if(levels[game.level].timer !== false) {
                renderer.renderClock();
            }

            if(game.selectedPiece !== null){
                renderer.gamePiece();
                animation.renderContext("control");
            }
        }

        if (game.shake) {
            let offsetX = helpers.randomNumber(-4, 4);
            let offsetY = helpers.randomNumber(-4, 4);

            if (game.oldX !== offsetX && game.oldY !== offsetY) {
                game.container.style.top = offsetY;
                game.container.style.left = offsetX;
            }

            game.oldX = offsetX;
            game.oldY = offsetY;
        }

        if (dialogs.current === "lives") {
            dialogs.moreLives();
        }

        if (dialogs.current === "settings") {
            dialogs.settings();
        }

        if (dialogs.current === "level") {
            dialogs.level();
        }

        if (game.startMenu === "open") {
            renderer.createStartMenu(game.context['startMenu']);
        }

        if (animation.context['effects'] === true) {
            game.context['effects'].clearRect(0, 0, game.width, game.height);
        }
        if(game.showFrameRate === true){
            requestAnimFrame();
        }

        requestAnimationFrame(game.playLoop);
    },

    getSessionSettings: function () {
        game.advertsOn = localStorage.getItem("adverts") || "YES";
        game.highScores[1] = localStorage.getItem("highScore1") || 0;
        game.highScores[2] = localStorage.getItem("highScore2") || 0;
        game.highScores[3] = localStorage.getItem("highScore3") || 0;
        game.highScores[4] = localStorage.getItem("highScore4") || 0;
        game.highScores[5] = localStorage.getItem("highScore5") || 0;

        game.music = localStorage.getItem("music") || "YES";
        game.sound = localStorage.getItem("sound") || "YES";
    },

    showStartMenu: function () {
        renderer.createStartMenu(game.context['startMenu']);
        document.getElementById("startMenu").classList.remove("off");
    },

    hideStartMenu: function () {
        game.startMenu = "closed";
        document.getElementById("startMenu").classList.add("off");

    },

    shakeScreen: function () {
        game.shake = true;
        setTimeout(function () {
            game.shake = false;
            setTimeout(function () {
                game.container.style.top = 0;
                game.container.style.left = 0;
            }, 50);
        }, 200);
    }
};