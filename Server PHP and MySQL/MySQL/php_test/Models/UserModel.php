<?php


    include("../config/ConnectClass.php");


    class userModel{

        private $db;
        private $User;

        public function __construct(){

            $this -> db =  Connect::connectionTo();
            $this -> users = array();
            
            

        }

        public function getAllUsers(){


            mysqli_select_db($this->db,"db_test_users");

            $query = "SELECT * FROM users";
            $result = mysqli_query($this->db, $query);

            if($result){
                
                while($row = mysqli_fetch_array($result)){

                    $this->users[] = ($row);
                    
                }
            }

            return $this->users;

        }

        public function insertUser($registrationDatePost, $namePost, $addressPost, $phonePost, $curpPost){

            mysqli_select_db($this->db,"db_test_users");

            $query = "INSERT INTO users (registrationDate, name, address, phone, curp) values($registrationDatePost, $namePost, $addressPost, $phonePost, $curpPost);"; 
            $querySelect = "SELECT u.* FROM users u order by ID desc limit 1;";

            $result = mysqli_query($this->db, $query);
            $resultSelect = mysqli_query($this->db, $querySelect);
            $data = array();

            if($result){
                
    
                while($row = mysqli_fetch_array($resultSelect)){

                    $data[] = ($row);
                    
                }
            }
            else{
                
                    $data[] = "NO";
                
                }
            

            return $data;

        }

        public function editUser($idPost, $registrationDatePost, $namePost, $addressPost, $phonePost, $curpPost){

            mysqli_select_db($this->db,"db_test_users");

            $query = "UPDATE users SET registrationDate=$registrationDatePost, name=$namePost, address=$addressPost, phone=$phonePost, curp=$curpPost WHERE ID=$idPost;";
            $result = mysqli_query($this->db, $query);
            $data = array();

            if($result){
                
                if($result){
    
                    $data[] = "OK";
                
                }else{
                
                    $data[] = "NO";
                
                }
            }

            return $data;

        }

        public function deleteUser($idPost){

            mysqli_select_db($this->db,"db_test_users");

            $query = "DELETE  FROM users WHERE ID='$idPost';";
            $result = mysqli_query($this->db, $query);
            $data = array();

            if($result){
                
                if($result){
    
                    $data[] = "OK";
                
                }else{
                
                    $data[] = "NO";
                
                }
            }

            return $data;

        }

    }

?>