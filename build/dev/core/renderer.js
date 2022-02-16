let renderer = {
    textures: {},
    multiplier: window.devicePixelRatio || 1,
    angle: 0,
    buildTextures: function () {
        renderer.createCanvas(null, "assets");
        renderer.textures.woodSmall = game.context['assets'].createPattern(assets.list.backgrounds.woodSmall, "repeat");
        renderer.textures.wood = game.context['assets'].createPattern(assets.list.backgrounds.wood, "repeat");
        renderer.textures.steelSmall = game.context['assets'].createPattern(assets.list.backgrounds.steelSmall, "repeat");
        renderer.textures.steel = game.context['assets'].createPattern(assets.list.backgrounds.steel, "repeat");
    },

    drawBorder: function (context, start, colours) {

        for (i = 0; i < colours.length; i++) {
            context.beginPath();
            context.strokeStyle = colours[i];
            context.lineWidth = colours.length - i;
            context.moveTo(0, start);
            context.lineTo(game.width, start);
            context.stroke();

        }
    },

    roundRect: function (context, x, y, width, height, radius, fill, stroke, colours, fillStyle, shadow = false) {
        if (typeof stroke == 'undefined') {
            stroke = true;
        }
        if (typeof radius === 'undefined') {
            radius = 5;
        }
        if (typeof radius === 'number') {
            radius = {tl: radius, tr: radius, br: radius, bl: radius};
        } else {
            var defaultRadius = {tl: 0, tr: 0, br: 0, bl: 0};
            for (var side in defaultRadius) {
                radius[side] = radius[side] || defaultRadius[side];
            }
        }

        context.beginPath();
        context.moveTo(x + radius.tl, y);
        context.lineTo(x + width - radius.tr, y);
        context.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
        context.lineTo(x + width, y + height - radius.br);
        context.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
        context.lineTo(x + radius.bl, y + height);
        context.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
        context.lineTo(x, y + radius.tl);
        context.quadraticCurveTo(x, y, x + radius.tl, y);
        context.closePath();

        if (shadow === true) {
            context.shadowColor = 'rgba(0,0,0,0.2)';
            context.shadowBlur = 17;
            context.shadowOffsetX = 0;
            context.shadowOffsetY = 5;
        }


        if (fill === true) {
            context.fillStyle = fillStyle;
            context.fill();
        }

        if (colours !== null) {
            for (i = 0; i < colours.length; i++) {

                context.lineWidth = colours.length - i;
                context.strokeStyle = colours[i];
                if (stroke) {
                    context.stroke();
                }
            }
        }
        context.shadowBlur = 0;
        context.shadowOffsetX = 0;
        context.shadowOffsetY = 0;

    },

    createCanvas: function (container, id) {
        let canvasWidth = game.width;
        let canvasHeight = game.height;

        canvas = document.createElement('canvas');
        canvas.width = canvasWidth * renderer.multiplier;

        canvas.height = canvasHeight * renderer.multiplier;
        canvas.style.width = canvasWidth;
        canvas.style.height = canvasHeight;
        canvas.id = id;
        canvas.className = id;
        canvasContext = canvas.getContext('2d');
        canvasContext.scale(renderer.multiplier, renderer.multiplier);
        canvasContext.canvas = canvas;
        if (container !== null) {
            container.appendChild(canvas);
        }
        game.context[id] = canvasContext;

        return canvas;
    },

    drawSprite: function (context, imageObject, x, y, rotation, scale, width, height, alpha, xx, yy, shadow = false, shadowDepth = 0.5) {
        var w = imageObject.width;
        var h = imageObject.height;

        x += 0.5;
        y += 0.5;

        context.save();
        if (shadow !== false) {
            context.shadowColor = "rgba(0,0,0," + shadowDepth + ")";
            context.shadowBlur = shadow === true ? 20 : shadow;
            context.shadowOffsetX = 0;
            context.shadowOffsetY = 4;
        }
        context.globalAlpha = alpha;
        context.translate(x, y);
        context.rotate(rotation * Math.PI / 180);
        context.scale(scale, scale);
        context.drawImage(imageObject, xx, yy, width, height, -width / 2, -height / 2, width, height);
        context.restore();

        context.shadowBlur = 0;
        context.shadowOffsetX = 0;
    },

    writeText: function (context, x, y, str, ratio, spacing, alpha, font, position, rotation, shadow = true) {

        // x += 0.5;
        // x += 0.5;

        originX = x;
        originY = y;

        let sprite = fontMatrix;

        var width = 0;
        var widths = {};
        var di = 38;
        var space = sprite['space'];
        for (var i = 0; i < str.length; i++) {
            var res = str[i];
            if (typeof sprite[res] !== "undefined" || res === " ") {
                if (res != " ") {
                    width = width + ((sprite[res].w + spacing) * ratio);
                } else {
                    width = width + ((space + spacing) * ratio);
                }
                widths[i] = width;
            }
        }

        originX = x;
        originY = y;

        if (position == "left") {
            var x = x;
        } else if (position == "right") {
            var x = x - width;
        } else if (position == "center") {
            var x = x - (width / 2);
        }

        if (rotation !== 0) {
            y = y + 18;
            originY = originY + 18;
        }


        for (var i = 0; i < str.length; i++) {
            var res = str[i];

            if (typeof sprite[res] !== "undefined" || res === " ") {
                if (res != " ") {
                    if (position == "left") {
                        var radius = widths[i] - sprite[res].w / 2 - di / 4;
                    } else if (position == "right") {
                        var radius = widths[i] - width - sprite[res].w / 2 + di / 3;
                    } else if (position == "center") {
                        var radius = widths[i] - (width / 2) - (sprite[res].w / Math.PI);
                    }
                    var xx = originX + radius * Math.cos(rotation);
                    var yy = originY + radius * Math.sin(rotation);


                    context.save();
                    if (shadow === true) {
                        context.shadowColor = 'rgba(0,0,0,0.5)';
                        context.shadowBlur = 6;
                        context.shadowOffsetX = 0;
                        context.shadowOffsetY = 6;
                    }

                    context.globalAlpha = alpha;
                    if (rotation !== 0) {
                        context.translate(xx, yy);

                    } else {
                        context.translate(x, y);

                    }
                    context.rotate(rotation);
                    context.scale(ratio / 2, ratio / 2);
                    if (rotation !== 0) {
                        context.drawImage(
                            font,

                            (sprite[res].x * 2),
                            (sprite[res].y * 2),

                            (sprite[res].w * 2),
                            (sprite[res].h * 2),

                            0,
                            0 - sprite[res].h,

                            (sprite[res].w * 2),
                            (sprite[res].h * 2)
                        );
                    } else {
                        context.drawImage(
                            font,

                            (sprite[res].x * 2),
                            (sprite[res].y * 2),

                            (sprite[res].w * 2),
                            (sprite[res].h * 2),

                            0,
                            (-(sprite[res].h * ratio) / 2),

                            (sprite[res].w * 2),
                            (sprite[res].h * 2)
                        );
                    }
                    context.restore();

                    x = x + (sprite[res].w + spacing) * ratio;
                } else {

                    x = x + (space + spacing) * ratio;

                }
            }


        }
    },


    topBarContent: function () {
        // game.context['control'].clearRect(0, 0, game.width, game.height);
        renderer.writeText(game.context['control'], 35 * game.scale, 17 * game.scale, Math.floor(lives.count).toString(), 0.2 * game.scale, -5, 1, assets.list.fonts.white, "center", 0, false);
        if(levels[game.level].timer !== false){
            renderer.writeText(game.context['control'], (game.width / 2), 8 * game.scale, score.count.toString(), 0.3 * game.scale, -5, 1, assets.list.fonts.green, "center", 0, true);

        } else {
            renderer.writeText(game.context['control'], (game.width / 2), 14 * game.scale, score.count.toString(), 0.3 * game.scale, -5, 1, assets.list.fonts.green, "center", 0, true);

        }
        renderer.writeText(game.context['control'], (game.width - (35 * game.scale)), 17 * game.scale, coins.count.toString(), 0.2 * game.scale, -5, 1, assets.list.fonts.white, "center", 0, false);

    },

    createBackground: function (context) {

        context.clearRect(0, 0, game.width, game.height);

        renderer.background(context);

        game.calculateBlockSize();

        renderer.roundRect(context,
            game.width / 2 - (game.gridWidth / 2) - game.blockSize / 6,
            game.gridAreaTop - game.blockSize / 5,
            game.gridWidth + game.blockSize / 3,
            game.gridHeight + game.blockSize / 3,
            5 * game.scale,
            true,
            true,
            themes[game.theme].brownBorder,
            "rgba(0,0,0,0.2)", true
        );


        renderer.roundRect(
            context,
            -10,
            -10,
            game.width + 20,
            (game.topHeight * game.scale) + 3 + 10,
            0,
            true,
            true,
            themes[game.theme].greenBorder,
            renderer.textures.woodSmall, true
        );

        renderer.roundRect(
            context,
            -10,
            game.height - (game.bottomHeight * game.scale),
            game.width + 20,
            200 * game.scale + 10,
            0,
            true,
            true,
            themes[game.theme].greenBorder,
            renderer.textures.woodSmall, true
        );


        renderer.drawSprite(
            context,
            assets.list.backgrounds.footerShadow,
            game.width / 2,
            game.height - (game.bottomHeight * game.scale) + 0.5 + ((310 * game.scale) / 4), 0, 0.5 * game.scale, 972, 310, 0.6, 0, 0
        );

        height = 170;

        renderer.drawSprite(
            context,
            assets.list.items.vines2,
            game.width - 455 / 5.5,
            game.height - (game.bottomHeight * game.scale) + (455 * game.scale) / (104 * game.scale) - 6, 5, 0.45, 455, 160, 1, 0, 0
        );
        renderer.drawSprite(
            context,
            assets.list.items.vines,
            455 / 5.5,
            (game.topHeight * game.scale) + (300 * game.scale) / (80 * game.scale), -6, 0.45, 455, 160, 1, 0, 0
        );

        renderer.roundRect(
            context,
            60 * game.scale, game.height - (56 * game.scale), game.width - 120 * game.scale, (height * game.scale), 14 * game.scale, true, true, themes[game.theme].brownBorder, "rgba(0,0,0,0.3)", true
        );

        /*icon backs*/
        renderer.roundRect(
            context,
            -20 * game.scale, 10 * game.scale, 120 * game.scale, 35 * game.scale, 20 * game.scale, true, true, themes[game.theme].brownBorderSmall, "rgba(0,0,0,0.2)", true
        );

        renderer.roundRect(
            context,
            game.width - (120 * game.scale) + (20 * game.scale), 10 * game.scale, 160 * game.scale, 35 * game.scale, 20 * game.scale, true, true, themes[game.theme].brownBorderSmall, "rgba(0,0,0,0.2)", true
        );

        renderer.drawSprite(
            context,
            assets.list.items.coin,
            game.width - (120 * game.scale) + (39 * game.scale),
            27 * game.scale, 0, 0.05 * game.scale, 512, 512, 1, 0, 0, true
        );

        renderer.drawSprite(
            context,
            assets.list.items.heart,
            (120 * game.scale) - (41 * game.scale),
            28 * game.scale, 0, 0.05 * game.scale, 512, 512, 1, 0, 0, true
        );

        if (game.advertsOn === "ON" && helpers.isCordova()) {
            renderer.drawBorder(
                context,
                (game.height) - (themes[game.theme].brownBorderSmall.length / 2),
                themes[game.theme].brownBorderSmall,
                true);
        }

        renderer.drawSprite(
            context,
            assets.list.items.trophy,
            game.width - 28 * game.scale,
            game.height - (game.advertsOn === "ON" && helpers.isCordova() ? 30 : 26) * game.scale, 0, 0.09 * game.scale, 512, 512, 1, 0, 0, 15
        );

        renderer.drawSprite(
            context,
            assets.list.items.cog,
            28 * game.scale,
            game.height - (game.advertsOn === "ON" && helpers.isCordova() ? 30 : 26) * game.scale, 0, 0.09 * game.scale, 512, 512, 1, 0, 0, 15
        );

    },

    createStartMenu: function (context) {
        game.startMenu = "open";

        context.clearRect(0, 0, game.width, game.height);

        if (game.scale < 1.3) {
            context.fillStyle = renderer.textures.steelSmall;
        } else {
            context.fillStyle = renderer.textures.steel;
        }
        context.rect(-0.5, -0.5, game.width + 1, game.height + 1);
        context.fill();

        renderer.drawSprite(
            context,
            assets.list.items.ivy2,
            game.width / 2 - 300,
            (game.height * 0.30) * game.scale, 90, 0.45 * game.scale, 1024, 492, 0.5, 0, 0, true
        );

        renderer.drawSprite(
            context,
            assets.list.items.ivy,
            game.width / 2 + 350,
            (game.height * 0.30) * game.scale, 90, 0.45 * game.scale, 1024, 492, 0.5, 0, 0, true
        );

        renderer.drawSprite(
            context,
            assets.list.items.ivy,
            game.width / 2,
            (game.height * 0.15) * game.scale, 0, 0.35 * game.scale, 1024, 492, 0.9, 0, 0, true
        );

        renderer.drawSprite(
            context,
            assets.list.items.ivy2,
            game.width / 2,
            (game.height * 0.35) * game.scale, 180, 0.40 * game.scale, 1024, 492, 0.8, 0, 0, true
        );

        renderer.drawSprite(
            context,
            assets.list.items.ivy,
            game.width / 2,
            (game.height * 0.75) * game.scale, 0, 0.4 * game.scale, 1024, 492, 0.7, 0, 0, true
        );

        renderer.drawSprite(
            context,
            assets.list.items.ivy,
            game.width / 2,
            (game.height * 0.65) * game.scale, 180, 0.6 * game.scale, 1024, 492, 0.8, 0, 0, true
        );

        renderer.drawSprite(
            context,
            assets.list.items.ivy2,
            game.width / 2,
            game.height, 0, 0.9 * game.scale, 1024, 492, 0.8, 0, 0, true
        );

        /* internal assets */

        renderer.angle += 0.03;
        let t = (
            Math.cos(renderer.angle)
        ) * 10;
        renderer.drawSprite(
            context,
            assets.list.items.logo,
            game.width / 2 - (t * 2) - 6 * game.scale,
            170 * game.scale - (t / 12), t / 2, 0.22 * game.scale, 1418, 1444, 1, 0, 0, false
        );

        renderer.drawSprite(
            context,
            assets.list.backgrounds.newWood,
            game.width / 2,
            380 * game.scale, 2, 0.22 * game.scale, 1219, 287, 1, 0, 0, true
        );

        renderer.drawSprite(
            context,
            assets.list.backgrounds.newWood3,
            game.width / 2,
            450 * game.scale, 1, 0.22 * game.scale, 1219, 287, 1, 0, 0, true
        );

        renderer.drawSprite(
            context,
            assets.list.backgrounds.newWood2,
            game.width / 2,
            520 * game.scale, 0, 0.22 * game.scale, 1219, 287, 1, 0, 0, true
        );

        renderer.writeText(context, (game.width / 2), 360 * (game.scale * 1.005), "Play".toString(), 0.4 * game.scale, -5, 1, assets.list.fonts.green, "center", 0, false);
        renderer.writeText(context, (game.width / 2), 436 * game.scale, "High Scores".toString(), 0.24 * game.scale, -5, 1, assets.list.fonts.green, "center", 0, false);
        renderer.writeText(context, (game.width / 2), 506 * game.scale, "Settings".toString(), 0.24 * game.scale, -5, 1, assets.list.fonts.green, "center", 0, false);

        /* end internal assets */

        renderer.drawSprite(
            context,
            assets.list.items.ivy,
            game.width / 2 + 80,
            20, 180, 0.5 * game.scale, 1024, 492, 0.9, 0, 0, true
        );

        renderer.drawSprite(
            context,
            assets.list.items.nail,
            game.width / 2,
            24 * game.scale, 0, 0.35 * game.scale, 81, 74, 1, 0, 0, true
        );

        if (game.advertsOn === "NO") {
            renderer.drawSprite(
                context,
                assets.list.items.ivy,
                game.width / 2,
                (game.height * 0.95), 0, 0.45 * game.scale, 1024, 492, 1, 0, 0, true
            );
        }

        renderer.drawSprite(
            context,
            assets.list.items.ivy2,
            game.width / 2 - 20 * game.scale,
            305 * game.scale, -9, 0.32 * game.scale, 1024, 492, 1, 0, 0, true
        );
        renderer.roundRect(
            context,
            -20 * game.scale, 10 * game.scale, 120 * game.scale, 35 * game.scale, 20 * game.scale, true, true, themes[game.theme].stoneBorderSmall, "rgba(0,0,0,0.4)", true
        );

        renderer.roundRect(
            context,
            game.width - (120 * game.scale) + (20 * game.scale), 10 * game.scale, 160 * game.scale, 35 * game.scale, 20 * game.scale, true, true, themes[game.theme].stoneBorderSmall, "rgba(0,0,0,0.4)", true
        );

        renderer.drawSprite(
            context,
            assets.list.items.coin,
            game.width - (120 * game.scale) + (39 * game.scale),
            27 * game.scale, 0, 0.05 * game.scale, 512, 512, 1, 0, 0, true
        );

        renderer.drawSprite(
            context,
            assets.list.items.heart,
            (120 * game.scale) - (41 * game.scale),
            28 * game.scale, 0, 0.05 * game.scale, 512, 512, 1, 0, 0, true
        );

        renderer.writeText(context, 35 * game.scale, 17 * game.scale, Math.floor(lives.count).toString(), 0.2 * game.scale, -5, 1, assets.list.fonts.white, "center", 0, false);
        renderer.writeText(context, (game.width - (35 * game.scale)), 17 * game.scale, coins.count.toString(), 0.2 * game.scale, -5, 1, assets.list.fonts.white, "center", 0, false);

    },

    background: function (context) {
        if (game.scale < 1.3) {
            context.fillStyle = renderer.textures.steelSmall;
        } else {
            context.fillStyle = renderer.textures.steel;
        }

        context.rect(-0.5, -0.5, game.width + 1, game.height + 1);
        context.fill();

        renderer.drawSprite(
            context,
            assets.list.items.ivy,
            game.width / 2,
            0, 180, 0.5 * game.scale, 1024, 492, 0.9, 0, 0, true
        );

        renderer.drawSprite(
            context,
            assets.list.items.ivy2,
            game.width / 2 - 300,
            (game.height * 0.30) * game.scale, 90, 0.45 * game.scale, 1024, 492, 0.5, 0, 0, true
        );

        renderer.drawSprite(
            context,
            assets.list.items.ivy,
            game.width / 2 + 350,
            (game.height * 0.30) * game.scale, 90, 0.45 * game.scale, 1024, 492, 0.5, 0, 0, true
        );

        renderer.drawSprite(
            context,
            assets.list.items.ivy,
            game.width / 2,
            (game.height * 0.15) * game.scale, 0, 0.35 * game.scale, 1024, 492, 0.6, 0, 0, true
        );

        renderer.drawSprite(
            context,
            assets.list.items.ivy2,
            game.width / 2,
            (game.height * 0.35) * game.scale, 180, 0.40 * game.scale, 1024, 492, 0.6, 0, 0, true
        );

        renderer.drawSprite(
            context,
            assets.list.items.ivy,
            game.width / 2,
            (game.height * 0.75) * game.scale, 0, 0.4 * game.scale, 1024, 492, 0.6, 0, 0, true
        );

        renderer.drawSprite(
            context,
            assets.list.items.ivy,
            game.width / 2,
            (game.height * 0.65) * game.scale, 180, 0.6 * game.scale, 1024, 492, 0.6, 0, 0, true
        );

        renderer.drawSprite(
            context,
            assets.list.items.ivy2,
            game.width / 2,
            game.height, 0, 0.9 * game.scale, 1024, 492, 0.8, 0, 0, true
        );

        renderer.drawSprite(
            context,
            assets.list.items.ivy,
            game.width / 2,
            (game.height * 0.95), 0, 0.45 * game.scale, 1024, 492, 0.8, 0, 0, true
        );

        renderer.drawSprite(
            context,
            assets.list.items.ivy2,
            game.width / 2 - 20 * game.scale,
            305 * game.scale, 0, 0.30 * game.scale, 1024, 492, 0.7, 0, 0, true
        );
    },

    choicePiece: function (id, x, y) {

        if (game.selectedPieces[id].placed === true || game.selectedPieces[id].selected === true) {
            return;
        }

        let scale = 0.65;
        let shape = game.selectedPieces[id].shape;
        let height = ((shape.length - 1) * game.blockSize * 1.10 * scale) / 2;
        let width = ((shape[0].length - 1) * game.blockSize * scale) / 2;

        for (var shapeRow = shape.length; shapeRow >= 0; shapeRow--) {
            for (var shapeColumn in shape[shapeRow]) {
                if (shape[shapeRow][shapeColumn] === "X") {
                    renderer.drawSprite(
                        game.context['control'],
                        game.selectedPieces[id].asset,
                        x + (game.blockSize * scale * shapeColumn) - width,
                        y + (game.blockSize * scale * shapeRow) - height,
                        0,
                        game.blockSize / 128 * scale,
                        128,
                        170,
                        1,
                        0,
                        0,
                        40,
                        1
                    );
                } else if (shape[shapeRow][shapeColumn] !== 0) {
                    renderer.drawSprite(
                        game.context['control'],
                        game.blocks[shape[shapeRow][shapeColumn]],
                        x + (game.blockSize * scale * shapeColumn) - width,
                        y + (game.blockSize * scale * shapeRow) - height,
                        0,
                        game.blockSize / 128 * scale,
                        128,
                        170,
                        1,
                        0,
                        0,
                        40,
                        1
                    );
                }
            }
        }

        for (var shapeRow = shape.length; shapeRow >= 0; shapeRow--) {
            for (var shapeColumn in shape[shapeRow]) {
                if (shape[shapeRow][shapeColumn] === "X") {
                    renderer.drawSprite(
                        game.context['control'],
                        game.selectedPieces[id].asset,
                        x + (game.blockSize * scale * shapeColumn) - width,
                        y + (game.blockSize * scale * shapeRow) - height,
                        0,
                        game.blockSize / 128 * scale,
                        128,
                        170,
                        1,
                        0,
                        0
                    );
                } else if (shape[shapeRow][shapeColumn] !== 0) {
                    renderer.drawSprite(
                        game.context['control'],
                        game.blocks[shape[shapeRow][shapeColumn]],
                        x + (game.blockSize * scale * shapeColumn) - width,
                        y + (game.blockSize * scale * shapeRow) - height,
                        0,
                        game.blockSize / 128 * scale,
                        128,
                        170,
                        1,
                        0,
                        0
                    );
                }
            }
        }
    },

    choicePieces: function () {
        let top = game.height - (game.bottomHeight * game.scale) + (56 * game.scale);

        renderer.choicePiece(
            1,
            game.width / 2 - ((game.blockSize * 3)),
            top
        );

        renderer.choicePiece(
            2,
            game.width / 2,
            top
        );

        renderer.choicePiece(
            3,
            game.width / 2 + ((game.blockSize * 3)),
            top
        );
    },
    wobbleAngle: 0,
    gamePiece: function () {

        let top = game.height - (game.bottomHeight * game.scale) + (56 * game.scale);
        let left = game.width/2;
        if(game.selectedPiece===1){
            left = game.width / 2 - ((game.blockSize * 3));
        }
        if(game.selectedPiece===3){
            left = game.width / 2 + ((game.blockSize * 3));
        }

        scale = 0.65;
        let wobbleScale = 0;
        if (control.moved === true) {
            scale = 0.65 + (control.startY - control.mouseY) * 0.008;
            if(scale>1){
                scale = 1;
            }
            if(scale < 0.65){
                scale = 0.65;
            }
            renderer.wobbleAngle += 0.15;

            wobbleScale = ((
                Math.cos(renderer.wobbleAngle)
            ));
        }

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

        if(typeof game.selectedPieces === "undefined" ||  game.selectedPieces === null){
            return false;
        }

        let shape = game.selectedPieces[game.selectedPiece].shape;
        let height = ((shape.length - 1) * game.blockSize * 1.10 * scale) / 2 + offset;
        let width = ((shape[0].length - 1) * game.blockSize * scale) / 2;


        let x = control.moved === true ? control.mouseX : left;
        let y = control.moved === true ? control.mouseY : top;

        for (var shapeRow = shape.length; shapeRow >= 0; shapeRow--) {
            for (var shapeColumn in shape[shapeRow]) {
                if (shape[shapeRow][shapeColumn] === "X") {
                    renderer.drawSprite(
                        game.context['control'],
                        game.selectedPieces[game.selectedPiece].asset,
                        x + (game.blockSize * scale * shapeColumn) - width,
                        y + (game.blockSize * scale * shapeRow) - height,
                        (wobbleScale * 10),
                        game.blockSize / 128 * scale,
                        128,
                        170,
                        1,
                        0,
                        0,
                        40,
                        1
                    );
                } else if (shape[shapeRow][shapeColumn] !== 0) {
                    renderer.drawSprite(
                        game.context['control'],
                        game.blocks[shape[shapeRow][shapeColumn]],
                        (x + (game.blockSize * scale * shapeColumn) - width),
                        (y + (game.blockSize * scale * shapeRow) - height),
                        (wobbleScale * 10),
                        game.blockSize / 128 * scale,
                        128,
                        170,
                        1,
                        0,
                        0,
                        40,
                        1);
                }
            }
        }

        for (var shapeRow = shape.length; shapeRow >= 0; shapeRow--) {
            for (var shapeColumn in shape[shapeRow]) {
                if (shape[shapeRow][shapeColumn] === "X") {
                    renderer.drawSprite(
                        game.context['control'],
                        game.selectedPieces[game.selectedPiece].asset,
                        (x + (game.blockSize * scale * shapeColumn) - width),
                        (y + (game.blockSize * scale * shapeRow) - height),
                        (wobbleScale * 10),
                        game.blockSize / 128 * scale,
                        128,
                        170,
                        1,
                        0,
                        0);
                } else if (shape[shapeRow][shapeColumn] !== 0) {
                    renderer.drawSprite(
                        game.context['control'],
                        game.blocks[shape[shapeRow][shapeColumn]],
                        (x + (game.blockSize * scale * shapeColumn) - width),
                        (y + (game.blockSize * scale * shapeRow) - height),
                        (wobbleScale * 10),
                        game.blockSize / 128 * scale,
                        128,
                        170,
                        1,
                        0,
                        0);
                }
            }
        }
    },

    renderGrid: function () {
        let startX = game.width / 2 - game.gridWidth / 2;
        let startY = game.gridAreaTop + (game.blockSize / 8);

        let grid = game.grid;

        for (var gridRow = grid.length; gridRow >= 0; gridRow--) {

            for (var gridColumn in grid[gridRow]) {
                if (grid[gridRow][gridColumn] > 900) {
                    renderer.drawSprite(
                        game.context['control'],
                        game.blocks[91],
                        (startX + (game.blockSize * gridColumn)) + game.blockSize / 2,
                        (startY + (game.blockSize * gridRow)) + game.blockSize / 2,
                        0,
                        game.blockSize / 128,
                        128,
                        170,
                        1,
                        0,
                        0);
                }
                if (grid[gridRow][gridColumn] >= 0) {
                    renderer.drawSprite(
                        game.context['control'],
                        game.blocks[grid[gridRow][gridColumn] === 0 ? 91 : grid[gridRow][gridColumn]],
                        (startX + (game.blockSize * gridColumn)) + game.blockSize / 2,
                        (startY + (game.blockSize * gridRow)) + game.blockSize / 2,
                        0,
                        game.blockSize / 128,
                        128,
                        170,
                        1,
                        0,
                        0);
                }
            }
        }
        //
        // renderer.drawSprite(
        //     game.context['control'],
        //     game.blocks[helpers.randomNumber(1, 7)],
        //     startX - game.blockSize * 2,
        //     startY + game.blockSize / 2,
        //     0,
        //     game.blockSize / 128,
        //     128,
        //     170,
        //     1,
        //     0,
        //     0);


    },

    renderClock: function(){

        let time = helpers.formatTime(Math.abs(game.currentTimer));

        renderer.roundRect(
            game.context['control'],
            game.width /2  - (32 * game.scale),
            46 * game.scale,
            64 * game.scale,
            20 * game.scale,
            8 * game.scale, true, true, themes[game.theme].brownBorderSmall, renderer.textures.woodSmall, true
        );


        renderer.writeText(game.context['control'], (game.width /2), 48 * game.scale, time.toString(), 0.15 * game.scale, -5, 1, game.currentTimer < 10 ? assets.list.fonts.blue : assets.list.fonts.gold, "center", 0, false);
    },
};