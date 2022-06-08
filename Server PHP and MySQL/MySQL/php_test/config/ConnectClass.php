<?php


    class Connect{
        

        public static function connectionTo(){

            $conection = mysqli_connect("localhost","root", ""); 
            
            return $conection;

        }



    }

?>