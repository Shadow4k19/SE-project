<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Accept");
header("Access-Control-Allow-Methods: POST, PUT, PATCH, GET, DELETE, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Origin, X-Api-Key, X-Requested-With, Content-Type, Accept, Authorization");

$data = json_decode(file_get_contents("php://input"));

if(isset($data->username) && isset($data->password) && isset($data->email)) {
  $username = $data->username;
  $password = $data->password;
  $email = $data->email;

  session_start();
  require_once "Server.php";

  try{
    $check_data = $pdo->prepare("SELECT * FROM login WHERE email = :email");
    $check_data->bindParam(":email", $email);
    $check_data->execute();
    $row = $check_data->fetch(PDO::FETCH_ASSOC);
  
    $check_data2 = $pdo->prepare("SELECT * FROM login WHERE username = :username");
    $check_data2->bindParam(":username", $username);
    $check_data2->execute();
    $row2 = $check_data2->fetch(PDO::FETCH_ASSOC);
  
    if($row == $email){
      echo json_encode("Email Already exists");
    }else if($row2 == $username){
      echo json_encode("Username already exists");
    }else{
      $stmt = $pdo->prepare("INSERT INTO login (Username, Password, Email) VALUES(:username , :password , :email)");
      $stmt->bindParam(":username", $username);
      $stmt->bindParam(":password", $password);
      $stmt->bindParam(":email", $email);
      $stmt->execute();
  
      echo json_encode("Sucess");
    }
  }catch(PDOException $e){
    echo json_encode(array("message" => "Failed to register user" ,"error"=> $e));
  }
} else {
  $response = array("success" => false, "message" => "Missing username or password or email");
  echo json_encode($response);
}

$pdo = null;
?>
