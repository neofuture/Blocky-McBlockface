let score = {
    highScore: [],
    init: function () {
        if (localStorage.getItem("highScore" + game.level) === null) {
            score.highScore[game.level] = 0;
        } else {
            score.highScore[game.level] = parseInt(localStorage.getItem("highScore" + game.level));
        }
        score.reset();
    },


    award: function (count = 1) {
        if (!game.run) {
            return false;
        }
        timer = 0;
        if (count > 20) {

            animation.cloudBurst(game.context['effects'], game.width / 2, game.height / 3 + 20 * game.scale, 0.8, assets.list.sprites.blueCloud);
            animation.flashText(game.context['effects'], assets.list.fonts.blue, "+" + count, game.width / 2, game.height / 3 - 10 * game.scale, 30, 0, "up", 0.4 * game.scale);

            animation.flashText(game.context['effects'], assets.list.fonts.blue, config.coolWords[helpers.randomNumber(0, config.coolWords.length - 1)], game.width / 2, game.height / 3 + 50 * game.scale, 50, 0.2 * game.scale, "out");

            timer = 500;
        }
        setTimeout(function () {
            score.add(count);
        }, timer);
    },

    add: function (count = 1) {
        if (!game.run) {
            return false;
        }
        for (var i = 0; i < count; i++) {
            setTimeout(function () {
                score.count++;
                animation.renderContext("control");
            }, i * 6);
        }
    },

    remove: function (count = 1) {
        for (var i = 0; i < count; i++) {
            setTimeout(function () {
                score.count--;
            }, i);
            animation.renderContext("control");

        }
    },

    save: function () {
        if (score.count > game.highScores[game.level]) {
            game.highScores[game.level] = score.count;
        }
        localStorage.setItem("highScore" + game.level, game.highScores[game.level]);

        if (helpers.isCordova()) {
            var data = {
                score: score.count,
                leaderboardId: "blocks" + game.level
            };
            gamecenter.submitScore(function (...args) {
                console.log(...args);
            }, function (...args) {
                console.log(args);
            }, data);
        }
    },

    reset: function () {
        score.count = 0;
        animation.renderContext("control");
    }
};