let soundAssets = {};
let sound = {
    toggleSound: function(){
        if(game.sound==="NO"){
            game.sound = "YES"
        } else {
            game.sound = "NO";
        }
        localStorage.setItem("sound", game.sound);
    },
    toggleMusic: function(){
        if(game.music==="NO"){
            game.music = "YES";
            sound.play("music", true);
            sound.volume("music", 0.8);
        } else {
            game.music = "NO";
            sound.stop("music");
        }
        localStorage.setItem("music", game.music);
    },




    add: function (url, id, loop = false) {
        if (helpers.isCordova()) {
            window.plugins.NativeAudio.preloadComplex(id, url, 1, 1, 0, function (msg) {
            }, function (msg) {
                console.log('error: ' + msg);
            });
        } else {
            if(desktopSound){
                // let sound = document.createElement("audio");
                // sound.setAttribute("preload", "auto");
                // sound.setAttribute("allow", "autoplay");
                // if (loop) {
                //     sound.setAttribute("loop", true);
                // }
                // sound.id = "audio" + id;
                //
                // let source = document.createElement("source");
                // source.src = url;
                // sound.appendChild(source);
                //
                // document.body.appendChild(sound);

                soundAssets[id] = new Howl({
                    src: [url]
                });
            }

        }


    },

    addMusic: function (url, id) {
        if (helpers.isCordova()) {
            window.plugins.NativeAudio.preloadComplex(id, url, 0.4, 1, 0, function (msg) {
            }, function (msg) {
                console.log('error: ' + msg);
            });
        } else {
            if(desktopSound) {

                // let sound = document.createElement("audio");
                // sound.setAttribute("preload", "auto");
                // sound.setAttribute("allow", "autoplay");
                // sound.id = "audio" + id;
                //
                // let source = document.createElement("source");
                // source.src = url;
                // sound.appendChild(source);
                //
                // document.body.appendChild(sound);

                soundAssets[id] = new Howl({
                    src: [url],
                    loop:true
                });
                if(game.music==="YES"){
                    soundAssets[id].once('load', function(){
                        soundAssets[id].play();
                    });
                }

            }
        }

    },
    play: function (id, loop) {
        if (helpers.isCordova()) {
            if(loop){
                window.plugins.NativeAudio.loop(id);
            } else {
                window.plugins.NativeAudio.play(id);
            }
        } else {
            //sound.volume(id, 0.9);
            if(desktopSound) {
                //
                // document.getElementById("audio" + id).play();
                // if (loop) {
                //     document.getElementById("audio" + id).setAttribute("loop", true);
                // }

                soundAssets[id].play()
            }
        }

    },
    stop: function (id) {
        if (helpers.isCordova()) {
            window.plugins.NativeAudio.stop(id);
        } else {
            if(desktopSound) {
                soundAssets[id].stop();
                // document.getElementById("audio" + id).pause();
                // document.getElementById("audio" + id).currentTime = 0;
            }
        }

    },
    volume: function (id, level) {
        if (helpers.isCordova()) {
            window.plugins.NativeAudio.setVolumeForComplexAsset(id, level, function (e) {
            }, function (e) {
            });
        } else {
            if(desktopSound) {

                // document.getElementById("audio" + id).volume = level;
            }
        }
    }
};