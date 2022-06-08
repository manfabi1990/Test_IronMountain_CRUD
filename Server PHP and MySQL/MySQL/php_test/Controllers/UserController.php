<?php


    class userController{


        public function getAllUsers(){

            require_once "../Models/UserModel.php";

            $users = new UserModel();
            return $users->getAllUsers();

        }

        public function insertUser($registrationDatePost, $namePost, $addressPost, $phonePost, $curpPost){

            require_once "../Models/UserModel.php";

            $users = new UserModel();
            return $users->insertUser($registrationDatePost, $namePost, $addressPost, $phonePost, $curpPost);
        }

        public function editUser($idPost, $registrationDatePost, $namePost, $addressPost, $phonePost, $curpPost){

            require_once "../Models/UserModel.php";

            $users = new UserModel();
            return $users->editUser($idPost, $registrationDatePost, $namePost, $addressPost, $phonePost, $curpPost);

        }

        public function deleteUser($idPost){

            require_once "../Models/UserModel.php";

            $users = new UserModel();
            return $users->deleteUser($idPost);

        }


    }


?>