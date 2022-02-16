<?php
$build = file("../version.txt");
$project = file("../project.txt");

?>
<html>
<head>
    <title>
        iPad <?php echo($project[0] ? " - " . $project[0] : "") ?> <?php echo($build[0] ? " - " . $build[0] : ""); ?>
    </title>
    <style>

        .iframe {
            border: none;
            left: calc(50% - 521px);
            top: calc(50% - 385px);
            position: relative;
            width: 1024px;
            height: 768px;
        }

        .iframer {
            border: none;
            top: calc(50% - 521px);
            left: calc(50% - 385px);
            position: relative;
            height: 1024px;
            width: 768px;
        }

        .body {
            height: 100%;
            width: 100%;
            background-image: url(images/ipad.png);
            background-position: center center;
            background-repeat: no-repeat;
            overflow: hidden;
        }

        .bodyr {
            height: 100%;
            width: 100%;
            background-image: url(images/ipadr.png);
            background-position: center center;
            background-repeat: no-repeat;
            overflow: hidden;
        }

        .ipadTop {
            z-index: 9999999;
            left: calc(50% - 513px);
            top: calc(50% - 377px);
            /*background:url(images/ipadTop.png);*/
            height: 22px;
            width: 1024px;
            position: absolute;

            text-align: center;
            font-family: "Helvetica Neue";
            font-size: 12px;
            padding-top: 4px;
            background-color: <?= $project[1] ?>;
            color: white;
            font-weight: 400;
            box-sizing: border-box;
            display:none;
        }

        .ipadTopr {
            z-index: 9999999;
            top: calc(50% - 513px);
            left: calc(50% - 377px);
            /*background: url(images/ipadTopr.png);*/
            height: 22px;
            width: 768px;
            position: absolute;
            text-align: center;
            font-family: "Helvetica Neue";
            font-size: 12px;
            padding-top: 4px;
            background-color: <?= $project[1] ?>;
            color: white;
            font-weight: 400;
            box-sizing: border-box;
            display:none;

        }

        button {
            background-color: #3366cc;
            color: white;
            border-radius: 4px;
            font-size: 14px;
            border: 0;
            width: 100px;
        }

        h1 {
            font-family: "Helvetica Neue";
            font-weight: 300;
        }


    </style>
    <meta http-equiv="cache-control" content="max-age=0"/>
    <meta http-equiv="cache-control" content="no-cache"/>
    <meta http-equiv="expires" content="0"/>
    <meta http-equiv="expires" content="Tue, 01 Jan 1980 1:00:00 GMT"/>
    <meta http-equiv="pragma" content="no-cache"/>
</head>
<body scroll="no" class="body">
<iframe src="../index.php" frameborder="0" class="iframe" id="iframe"></iframe>
<div class="ipadTop" id="headerExt">
    <span style="float:left;width:160px;text-align:left">&nbsp;iPad</span>
    <span id="time"></span>
    <span style="float:right;width:160px;text-align:right;background-image:url(images/battery.png);background-repeat:no-repeat;background-size:32px;background-position:right;margin-right:4px;">100%&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
</div>
<script>
    function rotate() {
        back = document.body;
        iframe = document.getElementById("iframe");
        headerExt = document.getElementById("headerExt");
        if (back.classList.contains("bodyr")) {
            back.classList.remove("bodyr");
            back.classList.add("body");
            iframe.classList.remove("iframer");
            iframe.classList.add("iframe");
            headerExt.classList.remove("ipadTopr");
            headerExt.classList.add("ipadTop");
        } else {
            back.classList.remove("body");
            back.classList.add("bodyr");
            iframe.classList.remove("iframe");
            iframe.classList.add("iframer");
            headerExt.classList.remove("ipadTop");
            headerExt.classList.add("ipadTopr");
        }
    }

    window.onload = function () {
        // addEventListener("dblclick", function() {
        //     var el = document.documentElement,
        //         rfs = el.requestFullscreen
        //             || el.webkitRequestFullScreen
        //             || el.mozRequestFullScreen
        //             || el.msRequestFullscreen
        //     ;
        //
        //     rfs.call(el);
        // });
    };

    function fullScreen() {
        var el = document.documentElement,
            rfs = el.requestFullscreen
                || el.webkitRequestFullScreen
                || el.mozRequestFullScreen
                || el.msRequestFullscreen
        ;

        rfs.call(el);

    }

    function setTime() {
        time = document.getElementById("time");
        now = new Date();
        time.innerHTML = now.getUTCHours() + ":" + (now.getMinutes() < 10 ? "0" : "") + now.getMinutes();
    }

    setTime();
    setInterval(setTime, 60000);
</script>
<script>document.addEventListener('contextmenu', function () {
        event.preventDefault();
    });</script>
<div style="position:fixed;bottom:0;text-align:center;width:calc(100% - 18px);box-sizing:border-box;">
    <button onclick="document.location.href='?loc=iphone';">iPhone</button>
    <button onclick="document.location.href='?loc=ipad';">iPad</button>
    <button onclick="rotate();">Rotate</button>
    <button onclick="fullScreen();">Full Screen</button>
</div>
</body>
</html>