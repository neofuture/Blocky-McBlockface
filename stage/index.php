<?php

if (!$_GET['loc']) {
    $_GET['loc'] = "ipad";
}

include_once($_GET['loc'] . ".php");