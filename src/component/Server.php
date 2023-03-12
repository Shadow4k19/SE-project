<?php 
    $severname ="localhost";
    $username = "root";
    $password = "";
    $dbname = "grocerystore";

    try{
        $conn = new PDO("mysql:host="$severname ;dbname=$dbname, $username , $password);
        $conn->setAttribute(PDO::ATTR_ERMODE, PDO::ERRMODE_EXCEPTION);
        echo "Connected successfully" ;
    }
    catch(PDOException $e){
        echo "Connection failed: " .$e->get_Message();
    }
?>