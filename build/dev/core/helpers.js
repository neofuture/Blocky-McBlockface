let helpers = {
    randomNumber: function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    isCordova: function () {
        return (typeof cordova !== "undefined");
    },
    epoch: function () {
        return Math.floor(new Date().getTime() / 1000);
    },
    formatTime: function (secs) {
        var hours = Math.floor(secs / (60 * 60));

        var divisor_for_minutes = secs % (60 * 60);
        var minutes = Math.floor(divisor_for_minutes / 60);

        var divisor_for_seconds = divisor_for_minutes % 60;
        var seconds = Math.ceil(divisor_for_seconds);

        return (hours > 0 ? hours + ":" : "") + helpers.str_pad_left(minutes, '0', 2) + ":" + helpers.str_pad_left(seconds, '0', 2)


    },
    str_pad_left: function (string, pad, length) {
        return (new Array(length + 1).join(pad) + string).slice(-length);
    },

};

// var expandedLog = (function(MAX_DEPTH){
//
//     return function(item, depth){
//
//         depth    = depth || 0;
//         isString = typeof item === 'string';
//         isDeep   = depth > MAX_DEPTH
//
//         if (isString || isDeep) {
//             console.log(item);
//             return;
//         }
//
//         for(var key in item){
//             console.group(key + ' : ' +(typeof item[key]) + ' : ' + item[key]);
//             expandedLog(item[key], depth + 1);
//             console.groupEnd();
//         }
//     }
// })(2);


var lastCalledTime;
var lastFPSupdate;
var fps;

function requestAnimFrame() {

    if(!lastCalledTime) {
        lastCalledTime = performance.now();
        lastFPSupdate = 0;
        fps = 0;
        return;
    }
    delta = (performance.now() - lastCalledTime)/1000;
    lastCalledTime = performance.now();
    fps = 1/delta;
    if(Math.floor(lastCalledTime/250) !== lastFPSupdate){
        lastFPSupdate = Math.floor(lastCalledTime/250);
        document.getElementById("fps").innerHTML = Math.floor(fps)+ " fps";

    }
}