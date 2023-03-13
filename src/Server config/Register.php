<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$data = json_decode(file_get_contents("php://input"));

session_start();
require_once "Server.php";

if (!$data) {
  http_response_code(400); // Bad Request
  echo json_encode(array("message" => "Missing input"));
  die();
}

$Username = $data->username;
$Password = $data->password;
$Email = $data->email;

if(!$Username || !$Password || !$Email){
  http_response_code(400); // Bad Request
  echo json_encode(array("message" => "Missing required parameters"));
  die();
}

try{
  $check_data = $pdo->prepare("SELECT * FROM login WHERE email = :email");
  $check_data->bindParam(":email", $Email);
  $check_data->execute();
  $row = $check_data->fetch(PDO::FETCH_ASSOC);

  $check_data2 = $pdo->prepare("SELECT * FROM login WHERE username = :username");
  $check_data2->bindParam(":username", $Username);
  $check_data2->execute();
  $row2 = $check_data2->fetch(PDO::FETCH_ASSOC);

  if($row && $row['email'] == $Email){
    echo json_encode(array("message" => "Email already exists"));
  }else if($row2 && $row2['username'] == $Username){
    echo json_encode(array("message" => "Username already exists"));
  }else{
    $passwordHash = password_hash($Password, PASSWORD_DEFAULT);
    $stmt = $pdo->prepare("INSERT INTO login(Username, Password, Email) 
                            VALUES(:username , :password , :email)");
    $stmt->bindParam(":username", $Username);
    $stmt->bindParam(":password", $passwordHash);
    $stmt->bindParam(":email", $Email);
    $stmt->execute();

    echo json_encode(array("message" => "User registered successfully"));
  }
}catch(PDOException $e){
  echo json_encode(array("message" => "Failed to register user"));
}
?>
