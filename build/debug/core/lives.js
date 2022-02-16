let lives = {
    newLifeEvery: 360, //9000,
    maxLives: 9,
    count: 0,
    lastLife: 0,
    timeTillNext: 0,
    init: function () {

        if (localStorage.getItem("count") === null) {
            lives.count = lives.maxLives;
            lives.lastLife = helpers.epoch();
        } else {
            lives.count = parseInt(localStorage.getItem("count"));
            lives.lastLife = parseInt(localStorage.getItem("lastLife"));
        }

        lives.check();
        setInterval(lives.check, 1000);
    },

    check: function () {

        if (
            lives.count < lives.maxLives &&
            lives.lastLife + lives.newLifeEvery <= helpers.epoch()
        ) {
            let livesToAdd = Math.floor((helpers.epoch() - lives.lastLife) / lives.newLifeEvery);

            let lastLifeTime = helpers.epoch();
            if (livesToAdd > 1) {
                lastLifeTime = lives.lastLife + (livesToAdd * lives.newLifeEvery);
            }

            lives.add(livesToAdd, lastLifeTime);
        }
        lives.timeTillNext = lives.reportWaitTime();
        lives.save();
    },

    empty: function () {
        lives.count = 0;
        lives.lastLife = helpers.epoch();
        lives.save();
    },
    award: function (count = 1) {
        setTimeout(function () {
            lives.add(count, helpers.epoch(), true);
        }, 400);

        setTimeout(function () {
            animation.flashText(game.context['effects'], assets.list.fonts.red, "+" + count, game.width / 2, game.height / 3 - 10 * game.scale, 20, 0.4, "upLeft", 0.3 * game.scale);
            animation.flashImage(game.context['effects'], assets.list.items.heart, game.width /2, game.height / 3 + 75 * game.scale, 30, 0.07 * game.scale, "out", 0.08 * game.scale);
        });
    },

    add: function (count = 1, time = helpers.epoch(), overCount = false) {
        lives.count += count;
        lives.lastLife = time;
        lives.save(overCount);
        animation.renderContext("control");
    },

    use: function () {
        lives.count--;
        if (lives.count < 0) {
            lives.count = 0;
        }
        if (lives === 0) {
            dialogs.showLives();
        }
        lives.save();
        animation.renderContext("control");
    },

    reset: function () {
        lives.count = lives.maxLives;
        lives.lastLife = helpers.epoch();
        lives.save();
        animation.renderContext("control");
    },

    save: function (overCount) {
        if (lives.count > lives.maxLives && overCount === false) {
            lives.count = lives.maxLives;
        }

        localStorage.setItem("count", lives.count);
        localStorage.setItem("lastLife", lives.lastLife);
    },

    reportWaitTime: function () {
        if (lives.count === lives.maxLives) {
            return "Full";
        }
        return helpers.formatTime(Math.abs(helpers.epoch() - lives.lastLife - lives.newLifeEvery));
    }
};