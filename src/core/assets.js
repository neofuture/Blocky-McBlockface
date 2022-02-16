let assets = {
    list: {},
    loadedAssets: 0,
    assetTimer: null,
    load: function () {
        let imageAssets = {
            backgrounds: {
                wood: "assets/backgrounds/wood.png",
                steel: "assets/backgrounds/steel.png",
                woodSmall: "assets/backgrounds/woodSmall.png",
                steelSmall: "assets/backgrounds/steelSmall.png",
                footerShadow: "assets/backgrounds/footerShadow.png",
                brownWood: "assets/backgrounds/brownWood.png",
                greenWood: "assets/backgrounds/greenWood.png",
                greenWood2: "assets/backgrounds/greenWood2.png",
                greenWood3: "assets/backgrounds/greenWood3.png",
                greenWood4: "assets/backgrounds/greenWood4.png",
                newWood: "assets/backgrounds/newWood.png",
                newWood2: "assets/backgrounds/newWood2.png",
                newWood3: "assets/backgrounds/newWood3.png",
                newWood4: "assets/backgrounds/newWood4.png",
                orangeButton: "assets/backgrounds/orangeButton.png",
                greenButton: "assets/backgrounds/greenButton.png",
            },

            blocks: {
                black: "assets/blocks/black.png",
                blue: "assets/blocks/blue.png",
                bomb: "assets/blocks/bomb.png",
                bomb2: "assets/blocks/bomb2.png",
                bomb3: "assets/blocks/bomb3.png",
                bomb4: "assets/blocks/bomb4.png",
                copper: "assets/blocks/copper.png",
                copperBroken: "assets/blocks/copperBroken.png",
                cyan: "assets/blocks/cyan.png",
                flatWhite: "assets/blocks/flatWhite.png",
                green: "assets/blocks/green.png",
                halfBlack: "assets/blocks/halfBlack.png",
                halfWhite: "assets/blocks/halfWhite.png",
                ice: "assets/blocks/ice.png",
                iceBroken: "assets/blocks/iceBroken.png",
                orange: "assets/blocks/orange.png",
                purple: "assets/blocks/purple.png",
                red: "assets/blocks/red.png",
                steel: "assets/blocks/steel.png",
                steelBroken: "assets/blocks/steelBroken.png",
                stone: "assets/blocks/stone.png",
                stoneBroken: "assets/blocks/stoneBroken.png",
                water: "assets/blocks/water.png",
                white: "assets/blocks/white.png",
                wood: "assets/blocks/wood.png",
                yellow: "assets/blocks/yellow.png",
                heart: "assets/blocks/heart.png",
                coin: "assets/blocks/coin.png",
            },

            items: {
                coin: "assets/items/coin.png",
                coinStack: "assets/items/coinStack.png",
                heart: "assets/items/heart.png",
                vines: "assets/items/vines.png",
                vines2: "assets/items/vines2.png",
                close: "assets/items/close.png",
                trophy: "assets/items/trophy.png",
                cog: "assets/items/cog.png",
                ivy: "assets/items/ivy.png",
                ivy2: "assets/items/ivy2.png",
                logo: "assets/logo.png",
                nail: "assets/items/nail.png"
            },

            fonts: {
                white: "assets/fonts/white.png",
                green: "assets/fonts/green.png",
                blue: "assets/fonts/blue.png",
                gold: "assets/fonts/gold.png",
                red: "assets/fonts/red.png",
            },

            sprites: {
                blueCloud: "assets/sprites/blueCloud.png",
                greenCloud: "assets/sprites/greenCloud.png",
                goldCloud: "assets/sprites/goldCloud.png",
                redCloud: "assets/sprites/redCloud.png",
                swirl: "assets/sprites/swirl.png",
                explosion: "assets/sprites/explosion.png"
            },


        };

        let sounds = {
            swish: {
                type: "sound",
                asset: "assets/sounds/swish.mp3"
            },
            swoosh: {
                type: "sound",
                asset: "assets/sounds/swoosh.mp3"
            },
            explosion: {
                type: "sound",
                asset: "assets/sounds/explosion.wav"
            },
            click: {
                type: "sound",
                asset: "assets/sounds/click.wav"
            },
            zing: {
                type: "sound",
                asset: "assets/sounds/zing.wav"
            },
            bonus: {
                type: "sound",
                asset: "assets/sounds/bonus.wav"
            },
            beep: {
                type: "sound",
                asset: "assets/sounds/beep.wav"
            },
            music: {
                type: "music",
                asset: "assets/sounds/music.mp3"
            }

        };

        assetCount = 0;
        for (var key in imageAssets) {
            if (typeof imageAssets[key] === "object") {
                assets.list[key] = {};
                for (var subKey in imageAssets[key]) {
                    assets.list[key][subKey] = ui.loadSprite(imageAssets[key][subKey]);
                    assetCount++;
                }
            } else {
                assets.list[key] = ui.loadSprite(imageAssets[key]);
                assetCount++;
            }
        }

        for (var key in sounds) {
            if (sounds[key].type === "sound") {
                sound.add(sounds[key].asset, key);
            }
            if (sounds[key].type === "music") {
                sound.addMusic(sounds[key].asset, key, true);
            }
        }

        assets.assetTimer = setInterval(function () {
            if (assets.loadedAssets === assetCount) {
                clearTimeout(assets.assetTimer);
                game.start();
            }
        }, 100);
    }
};