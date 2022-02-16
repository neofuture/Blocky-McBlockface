let app = {
    locale: "en-GB",
    initialise: function () {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    onDeviceReady: function () {
        this.receivedEvent('deviceready');
    },

    receivedEvent: function (id) {
        if (game.advertsOn === "YES") {
            initAds();
        }

        game.init();

        navigator.globalization.getLocaleName(
            function (locale) {
                app.locale = locale.value;
            },
            function () {
                alert('Error getting locale\n');
            }
        );

        var successCallback = function (user) {
            for (var thing in user) {
            }
        };

        var failureCallback = function (user) {
            for (var thing in user) {
                console.log(thing, user[thing]);
            }
        };

        gamecenter.auth(successCallback, failureCallback);


        store.register({
            id: 'blocksremoveads', // id without package name!
            alias: 'remove adverts',
            type: store.CONSUMABLE
        });

        store.register({
            id: 'blocks100coins', // id without package name!
            alias: '100 Coins',
            type: store.CONSUMABLE
        });
        store.register({
            id: 'blocks500coins', // id without package name!
            alias: '500 Coins',
            type: store.CONSUMABLE
        });
        store.register({
            id: 'blocks1000coins', // id without package name!
            alias: '1000 Coins',
            type: store.CONSUMABLE
        });
        store.register({
            id: 'blocks2000coins', // id without package name!
            alias: '2000 Coins',
            type: store.CONSUMABLE
        });

        store.when("remove adverts").approved(function (order) {
            game.turnAddsOff();
            order.finish();
        });

        store.when("100 Coins").approved(function (order) {
            coins.add(100);
            order.finish();
        });

        store.when("500 Coins").approved(function (order) {
            coins.add(500);
            order.finish();
        });

        store.when("1000 Coins").approved(function (order) {
            coins.add(1000);
            order.finish();
        });

        store.when("2000 Coins").approved(function (order) {
            coins.add(2000);
            order.finish();
        });

        store.error(function (error) {
            console.log('ERROR ' + error.code + ': ' + error.message);
        });
        store.refresh();

    }
};
game.getSessionSettings();


if (helpers.isCordova()) {
    app.initialise();
} else {
    game.init();
}

