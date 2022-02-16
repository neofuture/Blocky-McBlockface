let listeners = {
    attach: function (element) {
        element.addEventListener('mouseout', function (ev) {
            control.mouseX = -1;
            control.mouseY = -1;
            control.release(ev);
        }, false);

        /* start */
        element.addEventListener('mousedown', control.start, false);
        element.addEventListener('touchstart', control.start, false);

        /* move */
        element.addEventListener('mousemove', control.moving, false);
        element.addEventListener('touchmove', control.moving, false);

        /* end */
        element.addEventListener('mouseup', control.end, false);
        element.addEventListener('touchend', control.end, false);
    }
};

let resizeTimer = null;
window.onresize = function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function(){
        game.width = window.innerWidth;
        game.height = window.innerHeight;
        if (game.advertsOn === "ON" && helpers.isCordova()) {
            if(navigator.platform==="iPad"){
                game.height -= 90;
            } else {
                game.height -= 50;
            }
        }

        let canvasWidth = game.width;
        let canvasHeight = game.height;

        game.container.style.width = game.width;
        game.container.style.height = game.height;

        let canvases = document.querySelectorAll("canvas");
        [].forEach.call(canvases, function (canvas) {

            canvas.width = canvasWidth * renderer.multiplier;
            canvas.height = canvasHeight * renderer.multiplier;
            canvas.style.width = canvasWidth;
            canvas.style.height = canvasHeight;

            canvasContext = canvas.getContext('2d');
            canvasContext.scale(renderer.multiplier, renderer.multiplier);

            if (dialogs.current === "lives") {
                dialogs.moreLivesBackground();
                setTimeout(function () {
                    dialogs.moreLives(true);
                }, 100);
            }

            if (dialogs.current === "coins") {
                dialogs.moreCoinsBackground(game.context['background']);
            }

            if (dialogs.current === "settings") {
                dialogs.settingsBackground();
            }

            if (dialogs.current === "gameOver") {
                dialogs.gameOverBackground();
            }
            if (dialogs.current === "level") {
                dialogs.levelBackground();
            }

            if (game.startMenu === "open") {
                renderer.createStartMenu(game.context['startMenu']);
            }
        });

        game.calculateBlockSize();

        renderer.createBackground(game.context['background']);
        animation.renderContext("control");
    }, 100);


};