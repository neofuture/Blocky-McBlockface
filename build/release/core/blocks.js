let blocks = {

    selectGamePieces: function () {
        game.selectedPieces = [];
        game.selectedPieces[1] = blocks.getPiece();
        game.selectedPieces[2] = blocks.getPiece();
        game.selectedPieces[3] = blocks.getPiece();
    },

    getPiece: function (id = -1, orientation = -1, colour = -1) {
        if (id === -1) {
            id = helpers.randomNumber(0, levels[game.level].standardPieces - 1);

            if (helpers.randomNumber(0, 50) === 1) {
                id = levels[game.level].standardPieces;
            }
            if (helpers.randomNumber(0, 150) === 2) {
                id = levels[game.level].standardPieces + 1;
            }
            if (helpers.randomNumber(0, 500) === 3) {
                id = levels[game.level].standardPieces + 2;
            }
        }

        if (orientation === -1) {
            orientation = helpers.randomNumber(0, 3);
        }

        if (colour === -1) {
            colour = helpers.randomNumber(1, 7);
        }

        return blocks.returnPiece(id, orientation, colour);
    },

    returnPiece: function (id, orientation, colour) {

        let thisPiece = [];
        let selectedPiece = levels[game.level].shapes[id];
        for (var row in selectedPiece) {
            thisPiece[row] = selectedPiece[row].slice();
        }

        for (i = 0; i < orientation; i++) {
            thisPiece = blocks.rotate90Degrees(thisPiece);
        }

        if (Math.abs(thisPiece.length % 2) === 1 && Math.abs(thisPiece[0].length % 2) === 1 && (thisPiece.length > 1 || thisPiece[0].length > 1)) {
            if (thisPiece[Math.floor(thisPiece.length / 2)][Math.floor(thisPiece[0].length / 2)] === "X") {

                /*
                    998: assets.list.blocks.coin,
                    999: assets.list.blocks.heart
                */
                if (helpers.randomNumber(0, 50) === 2 && lives.count < 3) {
                    thisPiece[Math.floor(thisPiece.length / 2)][Math.floor(thisPiece[0].length / 2)] = 999;
                }

                if (helpers.randomNumber(0, 50) === 2 && coins.count < 200) {
                    thisPiece[Math.floor(thisPiece.length / 2)][Math.floor(thisPiece[0].length / 2)] = 998;
                }
            }
        }

        let piece = {};
        piece.shape = thisPiece;
        piece.orientation = orientation;
        piece.selected = false;
        piece.placed = false;
        piece.colour = colour;
        piece.asset = game.blocks[colour];

        return piece;
    },

    rotate90Degrees: function (matrix) {
        var output = [];
        for (var i = 0; i < matrix[0].length; i++) {
            for (var j = matrix.length - 1; j >= 0; j--) {
                if (typeof output[i] === "undefined") {
                    output[i] = [];
                }
                output[i][matrix.length - 1 - j] = matrix[j][i];
            }
        }
        return output;
    },

    willFit: function (shape, orientation) {
        let coordinates = false;

        for (var gridRow in game.grid) {
            for (var gridColumn in game.grid[gridRow]) {
                if (game.grid[gridRow][gridColumn] === 0) {

                    let result = blocks.willFitAtCoordinates(gridColumn, gridRow, shape, orientation);
                    if (result.coordinates !== false) {
                        return {coordinates: result.coordinates, orientation: parseInt(orientation)};
                    }
                }

            }
        }
        return {coordinates: coordinates, orientation: parseInt(orientation)};
    },

    willFitAtCoordinates: function (gridColumn, gridRow, shape, orientation) {
        let coordinates = false;

        loop:
            for (var shapeRow in shape) {
                for (shapeColumn in shape[shapeRow]) {

                    if (typeof game.grid[parseInt(gridRow) + parseInt(shapeRow)] !== "undefined") {
                        if (typeof game.grid[parseInt(gridRow) + parseInt(shapeRow)][parseInt(gridColumn) + parseInt(shapeColumn)] !== "undefined") {
                            if (
                                game.grid[parseInt(gridRow) + parseInt(shapeRow)][parseInt(gridColumn) + parseInt(shapeColumn)] !== 0 &&
                                shape[shapeRow][shapeColumn] !== 0 &&
                                !(shape[shapeRow][shapeColumn] >= 300 && shape[shapeRow][shapeColumn] <= 304)
                            ) {
                                break loop;
                            } else {
                                if (shape.length - 1 === parseInt(shapeRow) && shape[shapeRow].length - 1 === parseInt(shapeColumn)) {
                                    coordinates = [parseInt(gridColumn), parseInt(gridRow)];
                                }
                            }
                        } else {
                            break loop;
                        }
                    } else {
                        break loop;
                    }
                }
            }
        return {coordinates: coordinates, orientation: parseInt(orientation)};
    },

    placeAtCoordinates: function (gridColumn, gridRow, shape) {
        let lifeAward = 0;
        let coinAward = 0;
        let tnt = false;
        if (game.sound === "YES") {
            sound.play("click");
        }

        for (var shapeRow in shape.shape) {
            for (shapeColumn in shape.shape[shapeRow]) {


                if (shape.shape[shapeRow][shapeColumn] === "X") {
                    game.grid[parseInt(gridRow) + parseInt(shapeRow)][parseInt(gridColumn) + parseInt(shapeColumn)] = shape.colour;
                    score.add(config.blockScore);
                } else if (shape.shape[shapeRow][shapeColumn] > 0 && (shape.shape[shapeRow][shapeColumn] < 300 || shape.shape[shapeRow][shapeColumn] > 304)) {
                    game.grid[parseInt(gridRow) + parseInt(shapeRow)][parseInt(gridColumn) + parseInt(shapeColumn)] = shape.shape[shapeRow][shapeColumn];
                }


                if (shape.shape[shapeRow][shapeColumn] >= 300 && shape.shape[shapeRow][shapeColumn] <= 304) {
                    tnt = true;
                    animation.renderContext("control");
                    let radius = 1;
                    for (var r = -radius; r <= radius; r++) {
                        for (var c = -radius; c <= radius; c++) {
                            if (typeof game.grid[parseInt(gridRow) + r + parseInt(shapeRow)] !== "undefined") {
                                if (typeof game.grid[parseInt(gridRow) + r + parseInt(shapeRow)][parseInt(gridColumn) + c + parseInt(shapeColumn)] !== "undefined") {

                                    if (game.grid[parseInt(gridRow) + r + parseInt(shapeRow)][parseInt(gridColumn) + c + parseInt(shapeColumn)] > 0) {

                                        if (
                                            game.grid[parseInt(gridRow) + r + parseInt(shapeRow)][parseInt(gridColumn) + c + parseInt(shapeColumn)] < 300 ||
                                            game.grid[parseInt(gridRow) + r + parseInt(shapeRow)][parseInt(gridColumn) + c + parseInt(shapeColumn)] > 304

                                        ) {
                                            if (game.grid[parseInt(gridRow) + r + parseInt(shapeRow)][parseInt(gridColumn) + c + parseInt(shapeColumn)] === 999) {
                                                lifeAward += config.lifeAward;
                                                game.grid[parseInt(gridRow) + r + parseInt(shapeRow)][parseInt(gridColumn) + c + parseInt(shapeColumn)] = 0;
                                            }

                                            if (game.grid[parseInt(gridRow) + r + parseInt(shapeRow)][parseInt(gridColumn) + c + parseInt(shapeColumn)] === 998) {
                                                coinAward += config.coinAward;
                                                game.grid[parseInt(gridRow) + r + parseInt(shapeRow)][parseInt(gridColumn) + c + parseInt(shapeColumn)] = 0;
                                            }
                                            score.add(1);
                                        }

                                    }
                                    setTimeout(function (gridRow, gridColumn, shapeRow, shapeColumn, r, c) {
                                        game.grid[parseInt(gridRow) + r + parseInt(shapeRow)][parseInt(gridColumn) + c + parseInt(shapeColumn)] = 0;

                                        blocks.showExplosion(
                                            parseInt(gridRow) + r + parseInt(shapeRow),
                                            parseInt(gridColumn) + c + parseInt(shapeColumn)
                                        );

                                        game.shakeScreen();
                                    }, (30 * helpers.randomNumber(1, 20)), gridRow, gridColumn, shapeRow, shapeColumn, r, c);
                                }
                            }
                        }
                    }
                }
            }
        }
        if(tnt){
            if(game.sound==="YES"){
                sound.play("explosion");
            }
        }
        if (lifeAward > 0) {
            setTimeout(function () {
                lives.award(lifeAward);
            }, 800);
        }

        if (coinAward > 0) {
            setTimeout(function () {
                coins.award(coinAward);
            }, 1000);
        }
        // setTimeout(function () {
        //     blocks.checkGrid();
        // }, 1000);
    },

    checkGrid: function () {
        if(!game.run){
            return;
        }
        var rows = [];
        var columns = [];
        var fullRows = [];
        var fullColumns = [];
        var gridClean = true;
        for (var gridRow in game.grid) {
            for (var gridColumn in game.grid[gridRow]) {
                if (typeof columns[gridColumn] === "undefined") {
                    columns[gridColumn] = [];
                }
                if (typeof rows[gridRow] === "undefined") {
                    rows[gridRow] = [];
                }

                if (game.grid[gridRow][gridColumn] !== 0) {
                    gridClean = false;
                    rows[gridRow].push(gridRow);
                    columns[gridColumn].push(gridRow);
                }
            }
        }
console.log("CLEAN", gridClean);

        if (gridClean) {
            score.award(config.cleanGrid);
        }

        for (var column in columns) {
            if (columns[column].length === game.grid.length) {
                fullColumns.push(column);
            }
        }

        for (var row in rows) {
            if (rows[row].length === game.grid[0].length) {
                fullRows.push(row);
            }
        }
        let rowPoints = 0;
        let columnPoints = 0;
        for (var row in fullRows) {
            blocks.blankRow(fullRows[row], fullRows.length + fullColumns.length);
            rowPoints += config.rowScore;

        }

        for (var column in fullColumns) {
            blocks.blankColumn(fullColumns[column], fullColumns.length + fullColumns.length);
            columnPoints += config.columnScore;
        }

        if (fullColumns.length > 0 || fullRows.length > 0) {
            if (game.sound === "YES") {
                sound.play("swish");
            }
        }

        score.award((rowPoints * fullRows.length) + (columnPoints * fullColumns.length));

        setTimeout(blocks.checkForGameOver, 500);
    },

    blankRow: function (gridRow) {
        let lifeAward = 0;
        let coinAward = 0;

        for (var gridColumn in game.grid[gridRow]) {

            if (game.grid[gridRow][gridColumn] === 999) {
                lifeAward += config.lifeAward;
            }

            if (game.grid[gridRow][gridColumn] === 998) {
                coinAward += config.coinAward;
            }
            setTimeout(function (gridRow, gridColumn) {

                blocks.showBlockDestroyed(gridRow, gridColumn);

                game.grid[gridRow][gridColumn] = 0;
                animation.renderContext("control");
            }, 30 + (gridColumn * 30), gridRow, gridColumn);
        }

        if (lifeAward > 0) {
            setTimeout(function () {
                lives.award(lifeAward);
            }, 800);
        }

        if (coinAward > 0) {
            setTimeout(function () {
                coins.award(coinAward);
            }, 1000);
        }

    },

    blankColumn: function (column, multiplier) {

        let lifeAward = 0;
        let coinAward = 0;

        for (var gridRow in game.grid) {
            for (var gridColumn in game.grid[gridRow]) {
                if (gridColumn === column && game.grid[gridRow][gridColumn] > 0) {
                    if (game.grid[gridRow][gridColumn] === 999) {
                        lifeAward += config.lifeAward;
                    }

                    if (game.grid[gridRow][gridColumn] === 998) {
                        coinAward += config.coinAward;
                    }

                    setTimeout(function (gridRow, gridColumn) {

                        blocks.showBlockDestroyed(gridRow, gridColumn);

                        game.grid[gridRow][gridColumn] = 0;
                        animation.renderContext("control");
                    }, 30 + ((game.grid.length - gridRow) * 30), gridRow, gridColumn);
                }
            }
        }

        if (lifeAward > 0) {
            setTimeout(function () {
                lives.award(lifeAward);
            }, 800);
        }

        if (coinAward > 0) {
            setTimeout(function () {
                coins.award(coinAward);
            }, 1000);
        }


    },

    checkForGameOver: function () {
        let gameOver = true;
        for (var piece in game.selectedPieces) {
            if (game.selectedPieces[piece].placed === false) {
                if (blocks.willFit(game.selectedPieces[piece].shape, game.selectedPieces[piece].orientation).coordinates !== false) {
                    gameOver = false;
                }
            }
        }

        if (gameOver) {
            game.gameOver();
        }
    },

    showExplosion: function (gridRow, gridColumn) {
        let startX = game.width / 2 - game.gridWidth / 2;
        let startY = game.gridAreaTop + (game.blockSize / 8);

        animation.playExplosion(
            game.context['control'],
            1,
            startX + gridColumn * game.blockSize + game.blockSize / 2,
            startY + gridRow * game.blockSize + game.blockSize / 1.85
        );

    },

    showBlockDestroyed: function (gridRow, gridColumn) {

        let startX = game.width / 2 - game.gridWidth / 2;
        let startY = game.gridAreaTop + (game.blockSize / 8);
        let asset = null;

        let whichAsset = helpers.randomNumber(1, 3);

        if (whichAsset == 1) {
            asset = assets.list.sprites.greenCloud;
        }
        if (whichAsset == 2) {
            asset = assets.list.sprites.goldCloud;
        }
        if (whichAsset == 3) {
            asset = assets.list.sprites.blueCloud;
        }

        animation.cloudBurst(
            game.context['control'],
            startX + gridColumn * game.blockSize + game.blockSize / 2,
            startY + gridRow * game.blockSize + game.blockSize / 1.85,
            helpers.randomNumber(3, 4) / 10,
            asset,
            helpers.randomNumber(0, 360)
        );
    }
};