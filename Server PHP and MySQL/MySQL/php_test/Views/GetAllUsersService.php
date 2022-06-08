<?php

    header('Access-Control-Allow-Origin: *');
    
    require_once "../Controllers/UserController.php";

    $users = new UserController();
    echo json_encode($users -> getAllUsers());

?>