let dialogs = {
    current: null,
    showLives: function () {
        document.getElementById("dialogBackground").classList.add("on");
        document.getElementById("dialog").classList.add("on");
        document.getElementById("dialog").classList.add("lives");
        document.getElementById("dialog").addEventListener("transitionend", game.shakeScreen);
        dialogs.moreLivesBackground();
        dialogs.current = "lives";

    },

    hideLives: function () {
        document.getElementById("dialogBackground").classList.remove("on");
        document.getElementById("dialog").classList.remove("on");
        document.getElementById("dialog").classList.remove("lives");
        document.getElementById("dialog").removeEventListener("transitionend", game.shakeScreen);
        dialogs.current = null;
    },

    showCoins: function (heading = null) {
        document.getElementById("dialogBackground").classList.add("on");
        document.getElementById("dialog").classList.add("on");
        document.getElementById("dialog").classList.add("coins");
        document.getElementById("dialog").addEventListener("transitionend", game.shakeScreen);
        dialogs.moreCoinsBackground(heading);
        dialogs.current = "coins";

    },

    hideCoins: function () {
        document.getElementById("dialogBackground").classList.remove("on");
        document.getElementById("dialog").classList.remove("on");
        document.getElementById("dialog").classList.remove("coins");
        document.getElementById("dialog").removeEventListener("transitionend", game.shakeScreen);
        dialogs.current = null;
    },

    showSettings: function (heading = null) {
        document.getElementById("dialogBackground").classList.add("on");
        document.getElementById("dialog").classList.add("on");
        document.getElementById("dialog").classList.add("settings");
        document.getElementById("dialog").addEventListener("transitionend", game.shakeScreen);
        dialogs.settingsBackground(heading);
        dialogs.current = "settings";

    },

    hideSettings: function () {
        document.getElementById("dialogBackground").classList.remove("on");
        document.getElementById("dialog").classList.remove("on");
        document.getElementById("dialog").classList.remove("settings");
        document.getElementById("dialog").removeEventListener("transitionend", game.shakeScreen);

        dialogs.current = null;
    },

    showLevel: function (heading = null) {
        document.getElementById("dialogBackground").classList.add("on");
        document.getElementById("dialog").classList.add("on");
        document.getElementById("dialog").classList.add("level");
        document.getElementById("dialog").addEventListener("transitionend", game.shakeScreen);
        dialogs.levelBackground(heading);
        dialogs.current = "level";

    },

    hideLevel: function () {
        document.getElementById("dialogBackground").classList.remove("on");
        document.getElementById("dialog").classList.remove("on");
        document.getElementById("dialog").classList.remove("level");
        document.getElementById("dialog").removeEventListener("transitionend", game.shakeScreen);

        dialogs.current = null;
    },

    showGameOver: function (heading = null) {
        document.getElementById("dialogBackground").classList.add("on");
        document.getElementById("dialog").classList.add("on");
        document.getElementById("dialog").classList.add("gameOver");
        document.getElementById("dialog").addEventListener("transitionend", game.shakeScreen);
        dialogs.gameOverBackground(heading);
        dialogs.current = "gameOver";
    },

    hideGameOver: function () {
        document.getElementById("dialogBackground").classList.remove("on");
        document.getElementById("dialog").classList.remove("on");
        document.getElementById("dialog").classList.remove("gameOver");
        document.getElementById("dialog").removeEventListener("transitionend", game.shakeScreen);
        dialogs.current = null;
    },

    moreLivesBackground: function () {
        game.context['dialogBackground'].clearRect(0, 0, game.width, game.height);
        game.context['dialog'].clearRect(0, 0, game.width, game.height);

        let dialogTopPos = game.height / 2 - 150;
        renderer.roundRect(
            game.context['dialogBackground'],
            game.width / 2 - 172.5,
            dialogTopPos - 20,
            345, 300, 30, true, true, themes[game.theme].greenBorder, renderer.textures.woodSmall, true
        );

        renderer.drawSprite(
            game.context['dialogBackground'],
            assets.list.items.vines,
            game.width / 2 - 50,
            dialogTopPos + 286, 0, 0.55, 455, 160, 1, 0, 0
        );

        renderer.drawSprite(
            game.context['dialogBackground'],
            assets.list.items.heart,
            game.width / 2 - 106,
            dialogTopPos + 98, 0, 0.15, 512, 512, 1, 0, 0, true
        );

        renderer.drawSprite(
            game.context['dialogBackground'],
            assets.list.backgrounds.greenWood2,
            game.width / 2,
            dialogTopPos + 202, 0, 0.20, 1219, 287, 1, 0, 0, true
        );

        renderer.drawSprite(
            game.context['dialogBackground'],
            assets.list.items.coin,
            game.width / 2 + 29,
            dialogTopPos + 201, 0, 0.05, 512, 512, 1, 0, 0, 20
        );

        renderer.drawSprite(
            game.context['dialogBackground'],
            assets.list.backgrounds.greenWood,
            game.width / 2 - 16,
            dialogTopPos - 16, -2, 0.25, 1219, 287, 1, 0, 0, true
        );

        renderer.drawSprite(
            game.context['dialogBackground'],
            assets.list.items.close,
            game.width / 2 + 156,
            dialogTopPos - 20, 0, 0.3, 169, 170, 1, 0, 0, true
        );
        renderer.writeText(game.context['dialogBackground'], (game.width / 2) + 40, dialogTopPos + 40, "Next life in:".toString(), 0.18, -5, 1, assets.list.fonts.white, "center", 0, false);
        renderer.writeText(game.context['dialogBackground'], (game.width / 2) - 40, dialogTopPos + 186, "Refill".toString(), 0.28, -5, 0.9, assets.list.fonts.white, "center", 0, false);
        renderer.writeText(game.context['dialogBackground'], (game.width / 2) + 68, dialogTopPos + 190, "100".toString(), 0.20, -5, 0.9, assets.list.fonts.white, "center", 0, false);
    },

    moreLives: function (force = false) {
        if (typeof oldTime === "undefined") {
            oldTime = 0;
        }
        if (lives.timeTillNext !== oldTime || force === true) {
            force = false;
            oldTime = lives.timeTillNext;
            game.context['dialog'].clearRect(0, 0, game.width, game.height);

            let dialogTopPos = game.height / 2 - 150;

            // renderer.drawSprite(
            //     game.context['dialog'],
            //     assets.list.items.vines2,
            //     game.width / 2 + 56,
            //     dialogTopPos - 46, 0, 0.35, 455, 160, 1, 0, 0, true
            // );

            if (lives.timeTillNext !== "Full") {

                renderer.writeText(game.context['dialog'], game.width / 2 - 105.5, dialogTopPos + 78, lives.count.toString(), 0.3, 0, 1, assets.list.fonts.white, "center", 0, false);

                renderer.writeText(game.context['dialog'], (game.width / 2) + 40, dialogTopPos + 80, lives.timeTillNext.toString(), 0.5, -5, 1, assets.list.fonts.green, "center", 0, true);
                if (lives.count > 0) {
                    renderer.writeText(game.context['dialog'], (game.width / 2) - 16, dialogTopPos - 36, "More Lives ?".toString(), 0.33, -5, 1, assets.list.fonts.white, "center", -0.04, true);
                } else {
                    renderer.writeText(game.context['dialog'], (game.width / 2) - 16, dialogTopPos - 36, "Out of Lives!".toString(), 0.33, -5, 1, assets.list.fonts.white, "center", -0.04, true);

                }
            } else {
                renderer.writeText(game.context['dialog'], game.width / 2 - 105.5, dialogTopPos + 78, lives.count.toString(), 0.3, 0, 1, assets.list.fonts.white, "center", 0, false);

                renderer.writeText(game.context['dialog'], (game.width / 2) + 40, dialogTopPos + 72, lives.timeTillNext.toString(), 0.5, 0, 1, assets.list.fonts.green, "center", 0, true);
                renderer.writeText(game.context['dialog'], (game.width / 2) - 16, dialogTopPos - 36, "Lives Full".toString(), 0.33, -5, 1, assets.list.fonts.white, "center", -0.04, true);

            }


        }
    },


    moreCoinsBackground: function (heading = null) {
        game.context['dialogBackground'].clearRect(0, 0, game.width, game.height);
        game.context['dialog'].clearRect(0, 0, game.width, game.height);

        let dialogTopPos = game.height / 2 - 230;
        renderer.roundRect(
            game.context['dialogBackground'],
            game.width / 2 - 172.5,
            dialogTopPos - 20,
            345, 470, 30, true, true, themes[game.theme].greenBorder, renderer.textures.woodSmall, true
        );


        renderer.drawSprite(
            game.context['dialogBackground'],
            assets.list.backgrounds.greenWood,
            game.width / 2 - 16,
            dialogTopPos - 16, -2, 0.25, 1219, 287, 1, 0, 0, true
        );

        renderer.drawSprite(
            game.context['dialogBackground'],
            assets.list.items.close,
            game.width / 2 + 156,
            dialogTopPos - 20, 0, 0.3, 169, 170, 1, 0, 0, true
        );

        if (heading !== null) {
            renderer.writeText(game.context['dialogBackground'], (game.width / 2) - 22, dialogTopPos - 35, heading.toString(), 0.22, -5, 1, assets.list.fonts.white, "center", -0.04, true);
        } else {
            renderer.writeText(game.context['dialogBackground'], (game.width / 2) - 22, dialogTopPos - 35, "Shop".toString(), 0.33, -5, 1, assets.list.fonts.white, "center", -0.04, true);
        }

        // renderer.drawSprite(
        //     game.context['dialogBackground'],
        //     assets.list.items.vines2,
        //     game.width / 2 + 56,
        //     dialogTopPos - 46, 0, 0.35, 455, 160, 1, 0, 0, true
        // );


        renderer.roundRect(
            game.context['dialogBackground'],
            game.width / 2 - 152.5,
            dialogTopPos + 40,
            305, 86, 30, true, true, themes[game.theme].brownBorderSmall, "rgba(255,255,255, 1)", true
        );

        renderer.drawSprite(
            game.context['dialogBackground'],
            assets.list.items.coinStack,
            game.width / 2 - 106,
            dialogTopPos + 86, 0, 0.09, 1000, 789, 1, 0, 0, false
        );

        renderer.roundRect(
            game.context['dialogBackground'],
            game.width / 2 - 152.5,
            dialogTopPos + 140,
            305, 86, 30, true, true, themes[game.theme].brownBorderSmall, "rgba(255,255,255, 1)", true
        );

        renderer.drawSprite(
            game.context['dialogBackground'],
            assets.list.items.coinStack,
            game.width / 2 - 106,
            dialogTopPos + 186, 0, 0.09, 1000, 789, 1, 0, 0, false
        );

        renderer.roundRect(
            game.context['dialogBackground'],
            game.width / 2 - 152.5,
            dialogTopPos + 240,
            305, 86, 30, true, true, themes[game.theme].brownBorderSmall, "rgba(255,255,255, 1)", true
        );

        renderer.drawSprite(
            game.context['dialogBackground'],
            assets.list.items.coinStack,
            game.width / 2 - 106,
            dialogTopPos + 286, 0, 0.09, 1000, 789, 1, 0, 0, false
        );

        renderer.roundRect(
            game.context['dialogBackground'],
            game.width / 2 - 152.5,
            dialogTopPos + 340,
            305, 86, 30, true, true, themes[game.theme].brownBorderSmall, "rgba(255,255,255, 1)", true
        );

        renderer.drawSprite(
            game.context['dialogBackground'],
            assets.list.items.coinStack,
            game.width / 2 - 106,
            dialogTopPos + 386, 0, 0.09, 1000, 789, 1, 0, 0, false
        );

        let currency = "_";

        if (app.locale !== "en-GB") {
            currency = "$";
        }

        renderer.writeText(game.context['dialogBackground'], (game.width / 2) - 20, dialogTopPos + 68, "100".toString(), 0.26, -5, 1, assets.list.fonts.white, "center", 0, false);
        renderer.writeText(game.context['dialogBackground'], (game.width / 2) - 20, dialogTopPos + 168, "500".toString(), 0.26, -5, 1, assets.list.fonts.white, "center", 0, false);
        renderer.writeText(game.context['dialogBackground'], (game.width / 2) - 20, dialogTopPos + 268, "1000".toString(), 0.26, -5, 1, assets.list.fonts.white, "center", 0, false);
        renderer.writeText(game.context['dialogBackground'], (game.width / 2) - 20, dialogTopPos + 368, "2000".toString(), 0.26, -5, 1, assets.list.fonts.white, "center", 0, false);

        renderer.writeText(game.context['dialogBackground'], (game.width / 2) + 86, dialogTopPos + 68, currency + "0.99", 0.26, -5, 1, assets.list.fonts.green, "center", 0, false);
        renderer.writeText(game.context['dialogBackground'], (game.width / 2) + 86, dialogTopPos + 168, currency + "2.99", 0.26, -5, 1, assets.list.fonts.green, "center", 0, false);
        renderer.writeText(game.context['dialogBackground'], (game.width / 2) + 86, dialogTopPos + 268, currency + "4.99", 0.26, -5, 1, assets.list.fonts.green, "center", 0, false);
        renderer.writeText(game.context['dialogBackground'], (game.width / 2) + 86, dialogTopPos + 368, currency + "6.99", 0.26, -5, 1, assets.list.fonts.green, "center", 0, false);

        renderer.drawSprite(
            game.context['dialogBackground'],
            assets.list.items.vines,
            game.width / 2 - 50,
            dialogTopPos + 456, 0, 0.55, 455, 160, 1, 0, 0
        );

    },

    settingsBackground: function (heading = null) {
        game.context['dialogBackground'].clearRect(0, 0, game.width, game.height);
        game.context['dialog'].clearRect(0, 0, game.width, game.height);

        let dialogHeight = 470;

        if (game.startMenu === "closed") {
            dialogHeight = 570;
        }

        let dialogTopPos = game.height / 2 - (dialogHeight / 2) + 20;

        renderer.roundRect(
            game.context['dialogBackground'],
            game.width / 2 - 172.5,
            dialogTopPos - 20,
            345, dialogHeight, 30, true, true, themes[game.theme].greenBorder, renderer.textures.woodSmall, true
        );

        renderer.drawSprite(
            game.context['dialogBackground'],
            assets.list.items.vines,
            game.width / 2 - 50,
            dialogTopPos + dialogHeight - 14, 0, 0.55, 455, 160, 1, 0, 0
        );

        renderer.drawSprite(
            game.context['dialogBackground'],
            assets.list.backgrounds.greenWood,
            game.width / 2 - 16,
            dialogTopPos - 16, -2, 0.25, 1219, 287, 1, 0, 0, true
        );

        renderer.drawSprite(
            game.context['dialogBackground'],
            assets.list.items.close,
            game.width / 2 + 156,
            dialogTopPos - 20, 0, 0.3, 169, 170, 1, 0, 0, true
        );

        // renderer.drawSprite(
        //     game.context['dialogBackground'],
        //     assets.list.items.vines2,
        //     game.width / 2 + 56,
        //     dialogTopPos - 46, 3, 0.35, 455, 160, 1, 0, 0, true
        // );

        if (heading !== null) {
            renderer.writeText(game.context['dialogBackground'], (game.width / 2) - 20, dialogTopPos - 36, heading.toString(), 0.22, -5, 1, assets.list.fonts.white, "center", -0.04, true);
        } else {
            renderer.writeText(game.context['dialogBackground'], (game.width / 2) - 20, dialogTopPos - 36, "Settings".toString(), 0.33, -5, 1, assets.list.fonts.white, "center", -0.04, true);
        }


        renderer.drawSprite(
            game.context['dialogBackground'],
            assets.list.backgrounds.greenWood2,
            game.width / 2,
            dialogTopPos + 76, 0, 0.25, 1219, 287, 1, 0, 0, 30
        );


        renderer.drawSprite(
            game.context['dialogBackground'],
            assets.list.backgrounds.greenWood4,
            game.width / 2,
            dialogTopPos + 176, 0, 0.25, 1219, 287, 1, 0, 0, 30
        );


        renderer.drawSprite(
            game.context['dialogBackground'],
            assets.list.backgrounds.greenWood,
            game.width / 2,
            dialogTopPos + 276, 3, 0.25, 1219, 287, 1, 0, 0, 30
        );


        renderer.drawSprite(
            game.context['dialogBackground'],
            assets.list.backgrounds.greenWood3,
            game.width / 2,
            dialogTopPos + 376, 0, 0.25, 1219, 287, 1, 0, 0, 30
        );

        if (game.startMenu === "closed") {
            renderer.drawSprite(
                game.context['dialogBackground'],
                assets.list.backgrounds.greenWood,
                game.width / 2,
                dialogTopPos + 476, 0, 0.25, 1219, 287, 1, 0, 0, 30
            );
        }

    },

    levelBackground: function (heading = null) {
        game.context['dialogBackground'].clearRect(0, 0, game.width, game.height);
        game.context['dialog'].clearRect(0, 0, game.width, game.height);

        //let dialogHeight = 470;

        //if (game.startMenu === "closed") {
            dialogHeight = 570;
        //}

        let dialogTopPos = game.height / 2 - (dialogHeight / 2) + 20;

        renderer.roundRect(
            game.context['dialogBackground'],
            game.width / 2 - 172.5,
            dialogTopPos - 20,
            345, dialogHeight, 30, true, true, themes[game.theme].greenBorder, renderer.textures.woodSmall, true
        );

        renderer.drawSprite(
            game.context['dialogBackground'],
            assets.list.items.vines,
            game.width / 2 - 50,
            dialogTopPos + dialogHeight - 14, 0, 0.55, 455, 160, 1, 0, 0
        );

        renderer.drawSprite(
            game.context['dialogBackground'],
            assets.list.backgrounds.greenWood,
            game.width / 2 - 16,
            dialogTopPos - 16, -2, 0.25, 1219, 287, 1, 0, 0, true
        );

        renderer.drawSprite(
            game.context['dialogBackground'],
            assets.list.items.close,
            game.width / 2 + 156,
            dialogTopPos - 20, 0, 0.3, 169, 170, 1, 0, 0, true
        );

        // renderer.drawSprite(
        //     game.context['dialogBackground'],
        //     assets.list.items.vines2,
        //     game.width / 2 + 56,
        //     dialogTopPos - 46, 3, 0.35, 455, 160, 1, 0, 0, true
        // );

        if (heading !== null) {
            renderer.writeText(game.context['dialogBackground'], (game.width / 2) - 20, dialogTopPos - 36, heading.toString(), 0.22, -5, 1, assets.list.fonts.white, "center", -0.04, true);
        } else {
            renderer.writeText(game.context['dialogBackground'], (game.width / 2) - 20, dialogTopPos - 36, "Level".toString(), 0.33, -5, 1, assets.list.fonts.white, "center", -0.04, true);
        }


        renderer.drawSprite(
            game.context['dialogBackground'],
            assets.list.backgrounds.greenWood2,
            game.width / 2,
            dialogTopPos + 76, 0, 0.25, 1219, 287, 1, 0, 0, 30
        );


        renderer.drawSprite(
            game.context['dialogBackground'],
            assets.list.backgrounds.greenWood4,
            game.width / 2,
            dialogTopPos + 176, 0, 0.25, 1219, 287, 1, 0, 0, 30
        );


        renderer.drawSprite(
            game.context['dialogBackground'],
            assets.list.backgrounds.greenWood,
            game.width / 2,
            dialogTopPos + 276, 3, 0.25, 1219, 287, 1, 0, 0, 30
        );


        renderer.drawSprite(
            game.context['dialogBackground'],
            assets.list.backgrounds.greenWood3,
            game.width / 2,
            dialogTopPos + 376, 0, 0.25, 1219, 287, 1, 0, 0, 30
        );

        //if (game.startMenu === "closed") {
            renderer.drawSprite(
                game.context['dialogBackground'],
                assets.list.backgrounds.greenWood,
                game.width / 2,
                dialogTopPos + 476, 0, 0.25, 1219, 287, 1, 0, 0, 30
            );
        //}

    },

    settings: function () {
        game.context['dialog'].clearRect(0, 0, game.width, game.height);
        let dialogHeight = 470;

        if (game.startMenu === "closed") {
            dialogHeight = 570;
        }

        let dialogTopPos = game.height / 2 - (dialogHeight / 2) + 20;

        renderer.writeText(game.context['dialog'], (game.width / 2) + 4, dialogTopPos + 58, "Sound " + (game.sound === "YES" ? "On" : "Off").toString(), 0.28, -5, 1, assets.list.fonts.green, "center", 0.04, false);
        renderer.writeText(game.context['dialog'], (game.width / 2) + 6, dialogTopPos + 158, "Music " + (game.music === "YES" ? "On" : "Off").toString(), 0.28, -5, 1, assets.list.fonts.green, "center", -0.03, false);
        renderer.writeText(game.context['dialog'], (game.width / 2) + 4, dialogTopPos + 244, "Restore".toString(), 0.28, -5, 1, assets.list.fonts.green, "center", 0.04, false);
        renderer.writeText(game.context['dialog'], (game.width / 2) + 4, dialogTopPos + 270, "Purchases".toString(), 0.28, -5, 1, assets.list.fonts.green, "center", 0.04, false);
        renderer.writeText(game.context['dialog'], (game.width / 2) + 4, dialogTopPos + 356, "Ads " + (game.advertsOn === "YES" ? "Off" : "On").toString(), 0.28, -5, 1, assets.list.fonts.green, "center", -0.03, false);

        if (game.startMenu === "closed") {
            renderer.writeText(game.context['dialog'], (game.width / 2) + 4, dialogTopPos + 458, "Quit Game", 0.28, -5, 1, assets.list.fonts.green, "center", -0.04, false);
        }
    },

    level: function (){
        game.context['dialog'].clearRect(0, 0, game.width, game.height);
        //let dialogHeight = 470;

        //if (game.startMenu === "closed") {
            dialogHeight = 570;
        //}

        let dialogTopPos = game.height / 2 - (dialogHeight / 2) + 20;

        renderer.writeText(game.context['dialog'], (game.width / 2) + 4, dialogTopPos + 58, "Classic".toString(), 0.28, -5, 1, assets.list.fonts.green, "center", 0.04, false);
        renderer.writeText(game.context['dialog'], (game.width / 2) + 6, dialogTopPos + 158, "Complex".toString(), 0.28, -5, 1, assets.list.fonts.green, "center", -0.03, false);
        renderer.writeText(game.context['dialog'], (game.width / 2) + 4, dialogTopPos + 254, "Classic Timed".toString(), 0.28, -5, 1, assets.list.fonts.green, "center", 0.04, false);
        renderer.writeText(game.context['dialog'], (game.width / 2) + 4, dialogTopPos + 356, "Complex Timed".toString(), 0.28, -5, 1, assets.list.fonts.green, "center", -0.03, false);

        //if (game.startMenu === "closed") {
            renderer.writeText(game.context['dialog'], (game.width / 2) + 4, dialogTopPos + 458, "Super Scores", 0.28, -5, 1, assets.list.fonts.green, "center", -0.04, false);
        //}
    },


    gameOverBackground: function (heading = null) {
        game.context['dialogBackground'].clearRect(0, 0, game.width, game.height);
        game.context['dialog'].clearRect(0, 0, game.width, game.height);

        let dialogHeight = 410;
        if (game.highScore) {
            dialogHeight = 510;
        }

        let dialogTopPos = game.height / 2 - (dialogHeight / 2.2);
        let dialogBottomPos = dialogTopPos + dialogHeight;
        renderer.roundRect(
            game.context['dialogBackground'],
            game.width / 2 - 172.5,
            dialogTopPos - 20,
            345, dialogHeight, 30, true, true, themes[game.theme].greenBorder, renderer.textures.woodSmall, true
        );


        renderer.drawSprite(
            game.context['dialogBackground'],
            assets.list.backgrounds.greenWood,
            game.width / 2,
            dialogTopPos - 16, -2, 0.25, 1219, 287, 1, 0, 0, true
        );

        //renderer.drawSprite(
        //     game.context['dialogBackground'],
        //     assets.list.items.close,
        //     game.width / 2 + 156,
        //     dialogTopPos - 20, 0, 0.3, 169, 170, 1, 0, 0, true
        // );

        if (heading !== null) {
            renderer.writeText(game.context['dialogBackground'], (game.width / 2) - 4, dialogTopPos - 35, heading.toString(), 0.22, -5, 1, assets.list.fonts.white, "center", -0.04, true);
        } else {
            renderer.writeText(game.context['dialogBackground'], (game.width / 2) - 4, dialogTopPos - 35, "Game Over".toString(), 0.33, -5, 1, assets.list.fonts.white, "center", -0.04, true);
        }

        if (game.highScore) {
            renderer.drawSprite(
                game.context['dialogBackground'],
                assets.list.items.trophy,
                game.width / 2,
                dialogTopPos + 85, 0, 0.2, 512, 512, 1, 0, 0, 45
            );

            renderer.writeText(game.context['dialogBackground'], (game.width / 2) - 4, dialogTopPos + 150, "New High Score".toString(), 0.33, -5, 1, assets.list.fonts.white, "center", 0, true);
            renderer.writeText(game.context['dialogBackground'], (game.width / 2) - 4, dialogTopPos + 205, score.count.toString(), 0.5, -5, 1, assets.list.fonts.green, "center", 0, true);

        } else {
            renderer.writeText(game.context['dialogBackground'], (game.width / 2) - 4, dialogTopPos + 55, "Score".toString(), 0.33, -5, 1, assets.list.fonts.white, "center", 0, true);
            renderer.writeText(game.context['dialogBackground'], (game.width / 2) - 4, dialogTopPos + 105, score.count.toString(), 0.5, -5, 1, assets.list.fonts.green, "center", 0, true);
        }

        renderer.drawSprite(
            game.context['dialogBackground'],
            assets.list.backgrounds.greenWood,
            game.width / 2,
            dialogBottomPos - 186, 3, 0.25, 1219, 287, 1, 0, 0, 30
        );


        renderer.drawSprite(
            game.context['dialogBackground'],
            assets.list.backgrounds.greenWood3,
            game.width / 2,
            dialogBottomPos - 86, 0, 0.25, 1219, 287, 1, 0, 0, 30
        );

        renderer.writeText(game.context['dialog'], (game.width / 2) + 4, dialogBottomPos - 206, "Try Again".toString(), 0.28, -5, 1, assets.list.fonts.green, "center", 0.04, false);

        renderer.writeText(game.context['dialog'], (game.width / 2) + 4, dialogBottomPos - 106, "Quit".toString(), 0.28, -5, 1, assets.list.fonts.green, "center", -0.03, false);
    },

};
