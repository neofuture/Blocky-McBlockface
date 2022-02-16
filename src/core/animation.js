let animation = {
    contextTimer: [],
    context: [],
    renderContext: function (context) {
        animation.context[context] = true;
        clearTimeout(animation.contextTimer[context]);
        animation.contextTimer[context] = setTimeout(function () {
            animation.context[context] = false;
        }, 200);
    },

    test: function () {
        for (var i = 0; i < 500; i++) {
            setTimeout(function () {
                animation.playTest(game.context['effects'], 1, helpers.randomNumber(0, game.width), helpers.randomNumber(0, game.height));
            }, helpers.randomNumber(0, 3000));
        }
    },

    cloud: function (amount = 500, timer = 2000) {

        let startX = game.width / 2 - game.gridWidth / 2;
        let startY = game.gridAreaTop;

        for (var i = 0; i < amount; i++) {
            setTimeout(function () {
                animation.playCloud(game.context['effects'], 0.5, helpers.randomNumber(startX, startX + (game.blockSize * 10)), helpers.randomNumber(startY, startY + (game.blockSize * 10)));
            }, helpers.randomNumber(0, timer));
        }
    },

    explosion: function () {
        let startX = game.width / 2 - game.gridWidth / 2;
        let startY = game.gridAreaTop;
        for (var ii = 0; ii < 5; ii++) {
            setTimeout(function () {
                for (var i = 0; i < 10; i++) {
                    setTimeout(function () {
                        animation.playExplosion(game.context['effects'], 1, helpers.randomNumber(startX, startX + (game.blockSize * 10)), helpers.randomNumber(startY, startY + (game.blockSize * 10)));
                        game.shakeScreen();

                    }, i * 20);
                }
                game.shakeScreen();
            }, ii * helpers.randomNumber(200, 300));
        }
    },

    playTest: function (context, steps, x, y) {
        let object = assets.list.sprites.swirl.cloneNode();
        object.coords = {x: x, y: y};
        let rotation = helpers.randomNumber(0, 360);
        animation.animate(context, 0, object, 140, 140, 1, 40, steps, rotation);
    },

    playCloud: function (context, steps, x, y) {
        let object = assets.list.sprites.blueCloud.cloneNode();
        object.coords = {x: x, y: y};
        let rotation = helpers.randomNumber(0, 360);
        let scale = helpers.randomNumber(50, 100) / 100 * game.scale;
        animation.animate(context, 0, object, 192, 192, scale, 40, steps, rotation);
    },

    playExplosion: function (context, steps, x, y) {
        let object = assets.list.sprites.explosion.cloneNode();
        object.coords = {x: x, y: y};
        let rotation = helpers.randomNumber(0, 360);
        let scale = helpers.randomNumber(50, 100) / 100 * game.scale;
        animation.animate(context, 0, object, 256, 256, scale, 72, steps, rotation);
    },

    animate: function (context, tick, object, width, height, scale, frames, steps = 1, rotation = 1) {

        animation.renderContext(context.canvas.id);
        animation.animateSprite(context, object, object.coords.x, object.coords.y, rotation, scale, width, height, 1, steps);
        tick++;

        if (typeof object.stop === "undefined") {
            if (tick < frames || frames === -1) {
                requestAnimationFrame(function () {
                    animation.animate(context, tick, object, width, height, scale, frames, steps, rotation);
                });
            }
        }
    },

    animateSprite: function (context, imageObject, x, y, rotation, scale, width, height, alpha, steps) {
        var h = imageObject.height;
        var w = imageObject.width;

        x += 0.5;
        y += 0.5;

        imageObject.framesWidth = w / width;
        imageObject.framesHeight = h / height;

        if (!imageObject.frameHeight) {
            imageObject.frameHeight = 0;
        }

        if (!imageObject.frameWidth) {
            imageObject.frameWidth = 0;
        }

        if (imageObject.frameWidth >= imageObject.framesWidth) {
            imageObject.frameWidth = 0;
            imageObject.frameHeight++;
        }

        if (imageObject.frameHeight >= imageObject.framesHeight) {
            imageObject.frameHeight = 0;
        }

        context.save();
        context.globalAlpha = alpha;
        context.translate(x, y);
        context.rotate(rotation * Math.PI / 180);
        context.scale(scale, scale);
        context.drawImage(imageObject, (parseInt(imageObject.frameWidth) * width), (parseInt(imageObject.frameHeight) * height), width, height, -width / 2, -height / 2, width, height);
        context.restore();

        imageObject.frameWidth = imageObject.frameWidth + steps;
    },

    cloudBurst: function (context, x, y, scale, asset, rotation = 0) {
        setTimeout(function () {
            let object = asset.cloneNode();
            let object2 = asset.cloneNode();
            let object3 = asset.cloneNode();
            let object4 = asset.cloneNode();

            object.coords = {x: x, y: y - (35 * scale * game.scale)};
            object2.coords = {x: x, y: y + (35 * scale * game.scale)};

            object3.coords = {x: x - (35 * scale * game.scale), y: y};
            object4.coords = {x: x + (35 * scale * game.scale), y: y};

            animation.animate(context, 0, object, 192, 192, scale * game.scale, 40, 0.5, 0 + rotation);
            animation.animate(context, 0, object2, 192, 192, scale * game.scale, 40, 0.5, 180 + rotation);
            animation.animate(context, 0, object3, 192, 192, scale * game.scale, 40, 0.5, 270 + rotation);
            animation.animate(context, 0, object4, 192, 192, scale * game.scale, 40, 0.5, 90 + rotation);
        });

    },

    /*
    animation.flashText(game.context['effects'], assets.list.fonts.white, "Bonus", game.width/2, game.height/3, 50, 0.4, "out")
    animation.flashText(game.context['effects'], assets.list.fonts.white, "+50", game.width/2, game.height/3, 50, 0.4, "up")
    animation.flashText(game.context['effects'], assets.list.fonts.white, "Go", game.width/2, game.height/3, 50, 0.4, "down")

    animation.flashImage(game.context['effects'], assets.list.items.coin, 300, 400, 40, 0.4, "up", 0.8)
    */

    flashImage: function (context, imageObject, x, y, frames, ratio, fadeStyle, maxRatio = 1) {
        setTimeout(function () {
            animation.animateImage(context, imageObject, x, y, frames, ratio, 0, 0, fadeStyle, maxRatio);
        });
    },

    animateImage: function (context, imageObject, x, y, frames, ratio, tick = 0, opacity = 0, fadeStyle, maxRatio) {

        let fadeFrames = 20;
        opacity = opacity + 0.1;
        if (opacity > 1) {
            opacity = 1;
        }

        if (fadeStyle === "up" || fadeStyle === "upRight" || fadeStyle === "upLeft") {
            ratio = ratio + 0.02;
            fadeFrames = 36;
        }

        if (fadeStyle === "out") {
            ratio = ratio + 0.001;
            fadeFrames = 20;
        }

        if (ratio > maxRatio) {
            ratio = maxRatio;
        }

        if (ratio > 0) {
            //renderer.writeText(game.context['effects'], x, y, text.toString(), ratio * game.scale, -5, opacity, font, "center", 0, true);

            renderer.drawSprite(
                context,
                imageObject,
                x,
                y, 0, ratio * game.scale, 512, 512, opacity, 0, 0, true
            );

        }
        tick++;

        if (tick < frames) {
            requestAnimationFrame(function () {
                animation.animateImage(context, imageObject, x, y, frames, ratio, tick, opacity, fadeStyle, maxRatio);
            });
        } else {
            requestAnimationFrame(function () {
                animation.fadeImage(context, imageObject, x, y, fadeFrames, ratio, 0, 1, fadeStyle);
            });
        }
        animation.renderContext(context.canvas.id);
    },

    fadeImage: function (context, imageObject, x, y, frames, ratio, tick = 0, opacity = 1, fadeStyle) {

        opacity = opacity - (1 / frames);

        if (fadeStyle === "up") {
            y = y - ((tick * 1.5));
            ratio = ratio - ((tick / 4) / 100);
        }

        if (fadeStyle === "upRight") {
            y = y - ((tick * 1.5));
            x = x + ((tick * (game.width / game.height) * 2));
            ratio = ratio - ((tick / 4) / 100);
        }

        if (fadeStyle === "upLeft") {
            y = y - ((tick * 1.5));
            x = x - ((tick * (game.width / game.height) * 2));
            ratio = ratio - ((tick / 4) / 100);
        }

        if (fadeStyle === "out") {
            y = y + ((tick / 10));
            ratio = ratio + ((tick / 8) / 100);
        }

        if (fadeStyle === "down") {
            y = y + ((tick / 2));
            ratio = ratio + ((tick / 8) / 100);
        }

        tick++;
        if (opacity < 0) {
            opacity = 0;
        }
        if (ratio > 0) {
            renderer.drawSprite(
                context,
                imageObject,
                x,
                y, 0, ratio * game.scale, 512, 512, opacity, 0, 0, true
            );
        }
        if (tick < frames) {
            requestAnimationFrame(function () {
                animation.fadeImage(context, imageObject, x, y, frames, ratio, tick, opacity, fadeStyle);
            });
        }
        animation.renderContext(context.canvas.id);
    },


    flashText: function (context, font, text, x, y, frames, ratio, fadeStyle, maxRatio = 1) {
        setTimeout(function () {
            animation.animateText(context, font, text, x, y, frames, ratio, 0, 0, fadeStyle, maxRatio);
        });
        if (game.sound === "YES") {
            setTimeout(function () {
                sound.play("bonus");
            }, 200);
        }
    },

    animateText: function (context, font, text, x, y, frames, ratio, tick = 0, opacity = 0, fadeStyle, maxRatio) {

        let fadeFrames = 20;
        opacity = opacity + 0.1;
        if (opacity > 1) {
            opacity = 1;
        }

        if (fadeStyle === "up" || fadeStyle === "upRight" || fadeStyle === "upLeft") {
            ratio = ratio + 0.02;
            fadeFrames = 36;
        }

        if (fadeStyle === "out") {
            ratio = ratio + 0.001;
            fadeFrames = 20;
        }

        if (ratio > maxRatio) {
            ratio = maxRatio;
        }

        if (ratio > 0) {
            renderer.writeText(game.context['effects'], x, y, text.toString(), ratio * game.scale, -5, opacity, font, "center", 0, true);

        }
        tick++;

        if (tick < frames) {
            requestAnimationFrame(function () {
                animation.animateText(context, font, text, x, y, frames, ratio, tick, opacity, fadeStyle, maxRatio);
            });
        } else {
            requestAnimationFrame(function () {
                animation.fadeText(context, font, text, x, y, fadeFrames, ratio, 0, 1, fadeStyle);
            });
        }
        animation.renderContext(context.canvas.id);
    },

    fadeText: function (context, font, text, x, y, frames, ratio, tick = 0, opacity = 1, fadeStyle) {

        opacity = opacity - (1 / frames);

        if (fadeStyle === "up") {
            y = y - ((tick * 1.5));
            ratio = ratio - ((tick / 4) / 100);
        }

        if (fadeStyle === "upRight") {
            y = y - ((tick * 1.5));
            x = x + ((tick * (game.width / game.height) * 2));
            ratio = ratio - ((tick / 4) / 100);
        }

        if (fadeStyle === "upLeft") {
            y = y - ((tick * 1.5));
            x = x - ((tick * (game.width / game.height) * 2));
            ratio = ratio - ((tick / 4) / 100);
        }

        if (fadeStyle === "out") {
            y = y + ((tick / 10));
            ratio = ratio + ((tick / 8) / 100);
        }

        if (fadeStyle === "down") {
            y = y + ((tick / 2));
            ratio = ratio + ((tick / 8) / 100);
        }

        tick++;
        if (opacity < 0) {
            opacity = 0;
        }
        if (ratio > 0) {
            renderer.writeText(game.context['effects'], x, y, text.toString(), ratio * game.scale, -5, opacity, font, "center", 0, true);
        }
        if (tick < frames) {
            requestAnimationFrame(function () {
                animation.fadeText(context, font, text, x, y, frames, ratio, tick, opacity, fadeStyle);
            });
        }
        animation.renderContext(context.canvas.id);
    }
};

