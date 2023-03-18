<?php 
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    header("Access-Control-Allow-Methods: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Request-With");

    session_start();
    require_once "Server.php";
    $method = $_SERVER['REQUEST_METHOD'];
    switch($method){
        /*case "POST":
            $productdata = json_decode(file_get_contents("php://input"));
            $stmt = $pdo->prepare("INSERT INTO products()")*/

        case "GET":
            $sql = "SELECT * From products";
            $stmt = $pdo->prepare($sql);
            $stmt->execute();
            $products = $stmt->fetchALL(PDO::FETCH_ASSOC);
            
            echo json_encode($products);
            break;
    }
?>