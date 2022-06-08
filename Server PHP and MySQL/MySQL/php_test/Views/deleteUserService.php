<?php

    header('Access-Control-Allow-Origin: *');

    require_once "../Controllers/UserController.php";

    $id = $_GET["ID"];

    $users = new UserController();
    echo json_encode($users -> deleteUser($id));

?>