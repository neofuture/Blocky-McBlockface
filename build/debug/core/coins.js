let coins = {
    coins: 0,
    init: function () {
        if (localStorage.getItem("coins") === null) {
            coins.count = 400;
        } else {
            coins.count = parseInt(localStorage.getItem("coins"));
        }
    },

    add: function (count = 1) {
        coins.save(Math.abs(count));

        for (var i = 0; i < count; i++) {
            setTimeout(function () {
                coins.count++;
                animation.renderContext('control');
            }, i);
        }

    },

    award: function (count = 1) {
        setTimeout(function () {
            coins.add(count);
        },400);
        setTimeout(function () {
            animation.flashText(game.context['effects'], assets.list.fonts.gold, "+" + count, game.width / 2, game.height / 3 - 10 * game.scale, 20, 0.4, "upRight", 0.3 * game.scale);
            animation.flashImage(game.context['effects'], assets.list.items.coin, game.width /2, game.height / 3 + 75 * game.scale, 30, 0.07 * game.scale, "out", 0.08 * game.scale);

        });
    },
    spend: function (count = 0) {

        coins.save(-Math.abs(count));


        for (var i = 0; i < count; i++) {
            setTimeout(function () {
                coins.count--;
                animation.renderContext('control');
            }, i);
        }
    },

    empty: function () {
        coins.count = 0;
        coins.save(0);
    },

    canSpend: function (count) {
        return count <= coins.count;
    },

    save: function (count) {
        localStorage.setItem("coins", coins.count + count);
    }
};