<?php

    header('Access-Control-Allow-Origin: *');
    
    require_once "../Controllers/UserController.php";

    $registrationDatePost = $_GET["registrationDate"];
    $namePost = $_GET["name"];
    $addressPost = $_GET["address"];
    $phonePost = $_GET["phone"];
    $curpPost = $_GET["curp"];

    $users = new UserController();
    echo json_encode($users -> insertUser($registrationDatePost, $namePost, $addressPost, $phonePost, $curpPost));

?>