let control = {
    mouseX: 0,
    mouseY: 0,
    startX: 0,
    startY: 0,
    gridX: -1,
    gridY: -1,
    oldGridX: -1,
    oldGridY: -1,
    event: null,
    moved: false,
    start: function (event) {
        let element = event.target.id;

        if (event.type !== "mousedown") {
            event.preventDefault();

            if (typeof event.touches[1] === "object") {
                event.stopPropagation();
                return false;
            }

            control.mouseX = event.touches[0].pageX;
            control.mouseY = event.touches[0].pageY;

            control.event = "touch";
        } else {
            control.event = "mouse";
        }

        if (element === "control" || element === "effects") {
            control.gameAreaIn();
        }

        control.startX = control.mouseX;
        control.startY = control.mouseY;

        control.moved = false;
    },

    moving: function (event) {
        if (event.type !== "mousemove") {
            event.preventDefault();
            control.mouseX = event.touches[0].pageX;
            control.mouseY = event.touches[0].pageY;
        } else {
            control.mouseX = event.clientX;
            control.mouseY = event.clientY;
        }

        if (!control.inside(control.startX - 10 * game.scale, control.startY - 10 * game.scale, control.startX + 10 * game.scale, control.startY + 10 * game.scale)) {
            control.moved = true;
            animation.renderContext("control");
        }

        if (game.selectedPiece !== null) {

            if(typeof game.selectedPieces === "undefined" ||  game.selectedPieces === null){
                return false;
            }

            let shape = game.selectedPieces[game.selectedPiece].shape;
            let height = ((shape.length - 1) * game.blockSize * 1.10) / 2;
            let width = ((shape[0].length - 1) * game.blockSize) / 2;

            let startX = game.width / 2 - game.gridWidth / 2;
            let startY = game.gridAreaTop;

            if (control.inside(startX, startY, startX + (game.blockSize * 10), startY + (game.blockSize * 10))) {

                control.gridX = Math.floor((control.mouseX - startX - width) / game.blockSize);
                control.gridY = Math.floor((control.mouseY - startY - height) / game.blockSize);

                if (control.gridX < 0) {
                    control.gridX = 0;
                }
                if (control.gridY < 0) {
                    control.gridY = 0;
                }

                if (control.gridX !== control.oldGridX || control.gridY !== control.oldGridY) {
                    control.oldGridX = control.gridX;
                    control.oldGridY = control.gridY;
                }
            }
        }
    },

    end: function (event) {
        let element = event.target.id;
        if (control.inside(control.startX - 10 * game.scale, control.startY - 10 * game.scale, control.startX + 10 * game.scale, control.startY + 10 * game.scale)) {
            console.log("Tap Event");
            if(game.selectedPiece !== null && levels[game.level].rotation === true){
                game.selectedPieces[game.selectedPiece].shape = blocks.rotate90Degrees(game.selectedPieces[game.selectedPiece].shape);
            }
        }

        if (event.type !== "mouseup" && typeof event.touches !== "undefined") {
            if (event.touches.length > 0) {
                event.preventDefault();
                event.stopPropagation();
                return false;
            }
        }

        if (element === "dialog") {
            if (event.target.classList.contains("lives")) {
                control.livesDialog();
            }

            if (event.target.classList.contains("coins")) {
                control.coinsDialog();
            }

            if (event.target.classList.contains("settings")) {
                control.settingsDialog();
            }

            if (event.target.classList.contains("level")) {
                control.levelDialog();
            }

            if (event.target.classList.contains("gameOver")) {
                control.gameOverDialog();
            }
        }

        if (element === "control" || element === "effects") {
            control.gameTopBar();
            control.gameFooterBar();
            control.gameAreaOut();
            control.release();
        }

        if (element === "startMenu") {
            if (control.inside(game.width / 2 - 120 * game.scale, 340 * game.scale, game.width / 2 + 120 * game.scale, 410 * game.scale)) {
                if (lives.count < 1) {
                    dialogs.showLives();
                } else {
                    dialogs.showLevel();

                }
                if (game.sound === "YES") {
                    sound.play("click");
                }
            }

            if (control.inside(game.width / 2 - 120 * game.scale, 420 * game.scale, game.width / 2 + 120 * game.scale, 480 * game.scale)) {
                control.showScores();
                if (game.sound === "YES") {
                    sound.play("click");
                }
            }

            if (control.inside(game.width / 2 - 120 * game.scale, 495 * game.scale, game.width / 2 + 120 * game.scale, 550 * game.scale)) {
                dialogs.showSettings();
                if (game.sound === "YES") {
                    sound.play("click");
                }
            }

            if (control.inside(0, 0, 99 * game.scale, 51 * game.scale)) {
                if (lives.count < lives.maxLives) {
                    dialogs.showLives();
                    if (game.sound === "YES") {
                        sound.play("click");
                    }
                }
            }

            if (control.inside(game.width - (100 * game.scale), 0, game.width, (51 * game.scale))) {
                dialogs.showCoins();
                if (game.sound === "YES") {
                    sound.play("click");
                }
            }
        }
        //animation.renderContext("control");
    },

    release: function () {
        control.releasePiece();
    },

    releasePiece: function () {
        if(typeof game.selectedPieces === "undefined" ||  game.selectedPieces === null){
            return false;
        }

        if (game.selectedPiece !== null) {
            game.selectedPieces[game.selectedPiece].selected = false;
            game.selectedPiece = null;
            animation.renderContext("control");
        }
    },

    grabPiece: function (piece) {
        if(typeof game.selectedPieces[piece].shape === "undefined"){
            return false;
        }

        if (game.selectedPieces[piece].placed === true) {
            return;
        }

        if (game.selectedPiece === null) {
            game.selectedPiece = piece;
            game.selectedPieces[game.selectedPiece].selected = true;
            animation.renderContext("control");
        }
    },

    placePiece: function (gridX, gridY, shape) {
        if (game.selectedPiece !== null) {
            /* logic to check if can place */
            game.selectedPieces[game.selectedPiece].placed = true;
            control.releasePiece();

            blocks.placeAtCoordinates(gridX, gridY, shape);
            blocks.checkGrid();
        }
    },

    gameAreaIn: function () {
        let startX = game.width / 2 - game.gridWidth / 2;
        let startY = game.gridAreaTop;

        if (control.inside(startX, game.height - (game.bottomHeight * game.scale), startX + (game.blockSize * 10), game.height - (56 * game.scale))) {

            let piece = Math.floor((control.mouseX - startX) / (game.blockSize * 3.3) + 1);
            control.grabPiece(piece);
        }
    },

    gameAreaOut: function () {
        if(typeof game.selectedPieces === "undefined" ||  game.selectedPieces === null){
            return false;
        }

        if (game.selectedPiece !== null) {



            if (control.event === "mouse") {
                offset = 0;
            } else {
                offset = (control.startY - control.mouseY) * 0.75;

                if (offset > (game.blockSize * 3)) {
                    offset = (game.blockSize * 3);
                }
                if (offset < 0) {
                    offset = 0;
                }
            }

            let startX = game.width / 2 - game.gridWidth / 2;
            let startY = game.gridAreaTop  + offset;

            let shape = game.selectedPieces[game.selectedPiece].shape;
            let orientation = game.selectedPieces[game.selectedPiece].orientation;
            let height = ((shape.length - 1) * game.blockSize * 1.10) / 2;
            let width = ((shape[0].length - 1) * game.blockSize) / 2;

            if (control.inside(startX, startY, startX + (game.blockSize * 10), startY + (game.blockSize * 10))) {
                control.gridX = Math.floor((control.mouseX - startX - width) / game.blockSize);
                control.gridY = Math.floor((control.mouseY - startY - height) / game.blockSize);

                if (control.gridX < 0) {
                    control.gridX = 0;
                }
                if (control.gridY < 0) {
                    control.gridY = 0;
                }

                if (blocks.willFitAtCoordinates(
                    control.gridX,
                    control.gridY,
                    shape,
                    orientation).coordinates
                ) {
                    control.placePiece(control.gridX,
                        control.gridY,
                        game.selectedPieces[game.selectedPiece]);
                }
            }

            control.releasePiece();
        }

        if (control.inside(60 * game.scale, game.height - (56 * game.scale), game.width - 60 * game.scale, game.height)) {
            console.log("inside perks",
                Math.floor((control.mouseX - startX) / game.blockSize)
            );
            game.gameOver();
        }
    },

    gameOverDialog: function () {

        let dialogTopPos = game.height / 2 - 250;
        if (game.highScore) {
            dialogTopPos = game.height / 2 - 150;
        }

        if (control.inside(game.width / 2 - 152.5, dialogTopPos + 240, game.width / 2 + 152.5, dialogTopPos + 326)) {
            dialogs.hideGameOver();
            game.startNewGame();
            if (game.sound === "YES") {
                sound.play("click");
            }
            if(helpers.isCordova() && game.advertsOn === "YES"){
                if (/(android)/i.test(navigator.userAgent)) {

                } else {

                    AdMob.prepareInterstitial(
                        {
                            adId: admobid.interstitial,
                            autoShow: true,
                            isTesting: false
                        }
                    );
                }
            }
        }

        if (control.inside(game.width / 2 - 152.5, dialogTopPos + 340, game.width / 2 + 152.5, dialogTopPos + 426)) {
            dialogs.hideGameOver();
            game.showStartMenu();
            if (game.sound === "YES") {
                sound.play("click");
            }
            if(helpers.isCordova() && game.advertsOn === "YES"){
                if (/(android)/i.test(navigator.userAgent)) {

                } else {

                    AdMob.prepareInterstitial(
                        {
                            adId: admobid.interstitial,
                            autoShow: true,
                            isTesting: false
                        }
                    );
                }
            }

        }
    },

    livesDialog: function () {
        let dialogTopPos = game.height / 2 - 150;

        if (control.inside(game.width / 2 - 160, dialogTopPos + 165, game.width / 2 + 180, dialogTopPos + 235)) {

            if (lives.count < lives.maxLives) {
                if (coins.count >= 100) {
                    coins.spend(100);
                    lives.reset();
                } else {
                    setTimeout(function () {
                        dialogs.showCoins("Not Enough Coins");
                    }, 500);
                }

            }
            
            dialogs.hideLives();
            if (game.sound === "YES") {
                sound.play("click");
            }
        }

        if (control.inside(game.width / 2 + 130, dialogTopPos - 40, game.width / 2 + 180, dialogTopPos + 20)) {
            dialogs.hideLives();
            if (game.sound === "YES") {
                sound.play("click");
            }
        }
    },

    settingsDialog: function () {
        let dialogHeight = 470;

        if (game.startMenu === "closed") {
            dialogHeight = 570;
        }

        let dialogTopPos = game.height / 2 - (dialogHeight / 2) + 20;

        if (control.inside(game.width / 2 + 130, dialogTopPos - 40, game.width / 2 + 180, dialogTopPos + 20)) {
            dialogs.hideSettings();
            if (game.sound === "YES") {
                sound.play("click");
            }
        }

        if (control.inside(game.width / 2 - 152.5, dialogTopPos + 40, game.width / 2 + 152.5, dialogTopPos + 126)) {
            sound.toggleSound();
            if (game.sound === "YES") {
                sound.play("click");
            }
        }

        if (control.inside(game.width / 2 - 152.5, dialogTopPos + 140, game.width / 2 + 152.5, dialogTopPos + 226)) {
            sound.toggleMusic();
            if (game.sound === "YES") {
                sound.play("click");
            }
        }

        if (control.inside(game.width / 2 - 152.5, dialogTopPos + 240, game.width / 2 + 152.5, dialogTopPos + 326)) {
            console.log("restore purchases");
            if (game.sound === "YES") {
                sound.play("click");
            }
            store.refresh();
        }

        if (control.inside(game.width / 2 - 152.5, dialogTopPos + 340, game.width / 2 + 152.5, dialogTopPos + 426)) {
            //game.toggleAdverts();
            if (game.sound === "YES") {
                sound.play("click");
            }
            if(game.advertsOn === "YES"){
                store.order("remove adverts");
            } else {
                game.toggleAdverts();
            }

        }

        if (game.startMenu === "closed") {
            if (control.inside(game.width / 2 - 152.5, dialogTopPos + 440, game.width / 2 + 152.5, dialogTopPos + 526)) {
                dialogs.hideSettings();
                setTimeout(game.gameOver, 500);
                if (game.sound === "YES") {
                    sound.play("click");
                }
                if(helpers.isCordova() && game.advertsOn === "YES"){
                    if (/(android)/i.test(navigator.userAgent)) {

                    } else {

                        AdMob.prepareInterstitial(
                            {
                                adId: admobid.interstitial,
                                autoShow: true,
                                isTesting: false
                            }
                        );
                    }
                }
            }
        }
    },

    levelDialog: function () {
        //let dialogHeight = 470;

        //if (game.startMenu === "closed") {
            dialogHeight = 570;
        //}

        let dialogTopPos = game.height / 2 - (dialogHeight / 2) + 20;

        if (control.inside(game.width / 2 + 130, dialogTopPos - 40, game.width / 2 + 180, dialogTopPos + 20)) {
            dialogs.hideLevel();
            if (game.sound === "YES") {
                sound.play("click");
            }
        }

        if (control.inside(game.width / 2 - 152.5, dialogTopPos + 40, game.width / 2 + 152.5, dialogTopPos + 126)) {
            game.level = 1;
            game.startNewGame();
            dialogs.hideLevel();

            if (game.sound === "YES") {
                sound.play("click");
            }
        }

        if (control.inside(game.width / 2 - 152.5, dialogTopPos + 140, game.width / 2 + 152.5, dialogTopPos + 226)) {
            game.level = 2;
            game.startNewGame();
            dialogs.hideLevel();

            if (game.sound === "YES") {
                sound.play("click");
            }
        }

        if (control.inside(game.width / 2 - 152.5, dialogTopPos + 240, game.width / 2 + 152.5, dialogTopPos + 326)) {
            game.level = 3;
            game.startNewGame();
            dialogs.hideLevel();

            if (game.sound === "YES") {
                sound.play("click");
            }
        }

        if (control.inside(game.width / 2 - 152.5, dialogTopPos + 340, game.width / 2 + 152.5, dialogTopPos + 426)) {
            game.level = 4;
            game.startNewGame();
            dialogs.hideLevel();

            if (game.sound === "YES") {
                sound.play("click");
            }
        }

        //if (game.startMenu === "closed") {
            if (control.inside(game.width / 2 - 152.5, dialogTopPos + 440, game.width / 2 + 152.5, dialogTopPos + 526)) {
                game.level = 5;
                game.startNewGame();
                dialogs.hideLevel();

                if (game.sound === "YES") {
                    sound.play("click");
                }
            }
        //}
    },

    coinsDialog: function () {
        let dialogTopPos = game.height / 2 - 230;

        if (control.inside(game.width / 2 + 130, dialogTopPos - 40, game.width / 2 + 180, dialogTopPos + 20)) {
            dialogs.hideCoins();
            if (game.sound === "YES") {
                sound.play("click");
            }
        }

        if (control.inside(game.width / 2 - 152.5, dialogTopPos + 40, game.width / 2 + 152.5, dialogTopPos + 126)) {
            //coins.add(100);
            store.order("100 Coins");
            dialogs.hideCoins();
            if (game.sound === "YES") {
                sound.play("click");
            }
        }

        if (control.inside(game.width / 2 - 152.5, dialogTopPos + 140, game.width / 2 + 152.5, dialogTopPos + 226)) {
            //coins.add(500);
            store.order("500 Coins");

            dialogs.hideCoins();
            if (game.sound === "YES") {
                sound.play("click");
            }
        }

        if (control.inside(game.width / 2 - 152.5, dialogTopPos + 240, game.width / 2 + 152.5, dialogTopPos + 326)) {
            //coins.add(1000);

            store.order("1000 Coins");

            dialogs.hideCoins();
            if (game.sound === "YES") {
                sound.play("click");
            }
        }

        if (control.inside(game.width / 2 - 152.5, dialogTopPos + 340, game.width / 2 + 152.5, dialogTopPos + 426)) {
            //coins.add(2000);

            store.order("2000 Coins");

            dialogs.hideCoins();
            if (game.sound === "YES") {
                sound.play("click");
            }
        }
    },

    gameTopBar: function () {
        if (control.inside(0, 0, 99 * game.scale, 51 * game.scale)) {
            if (lives.count < lives.maxLives) {
                dialogs.showLives();
                if (game.sound === "YES") {
                    sound.play("click");
                }
            }
        }

        if (control.inside(game.width / 2 - (30 * game.scale), 0, game.width / 2 + (30 * game.scale), (51 * game.scale))) {
            if (lives.count < 1) {
                dialogs.showLives();
            } else {
                lives.use();
            }
            animation.renderContext('control');
            if (game.sound === "YES") {
                sound.play("click");
            }
        }

        if (control.inside(game.width - (100 * game.scale), 0, game.width, (51 * game.scale))) {
            dialogs.showCoins();
            if (game.sound === "YES") {
                sound.play("click");
            }
        }
    },

    showScores: function () {
        if (helpers.isCordova()) {
            var data = {
                leaderboardId: game.leaderboard
            };
            gamecenter.showLeaderboard(function () {
            }, function () {
            }, data);
        } else {
            alert("High Scores Coming Soon");
        }
    },

    gameFooterBar: function () {

        if (control.inside(game.width - 56 * game.scale, game.height - 56 * game.scale, game.width, game.height)) {
            control.showScores();
            if (game.sound === "YES") {
                sound.play("click");
            }
        }
        if (control.inside(0, game.height - 56 * game.scale, 56 * game.scale, game.height)) {
            dialogs.showSettings();
            if (game.sound === "YES") {
                sound.play("click");
            }

        }
    },

    inside: function (x, y, xx, yy) {
        return (
            control.mouseX > x && control.mouseX < xx &&
            control.mouseY > y && control.mouseY < yy
        );
    }
};