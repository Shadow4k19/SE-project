<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Request-With");
$data = json_decode(file_get_contents("php://input"));

if(isset($data->username) && isset($data->password)) {
    $username = $data->username;
    $password = $data->password;

    session_start();
    require_once "Server.php";

    try {

        $stmt = $pdo->prepare("SELECT * FROM login WHERE Username = :username AND Password = :password");
        $stmt->bindParam(":username", $username);
        $stmt->bindParam(":password", $password);
        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            $user = $stmt->fetch();
            $response = array(
                "user_role" => $user['User_Role'],
                "user_id" => $user['ID'],
                "status" => "200"
            );
            echo json_encode($response);
        } else {
            $response = "202";
            echo json_encode($response);
        }
    } catch (PDOException $e) {
        $response = array("success" => false, "message" => "Connection failed: " . $e->getMessage());
        echo json_encode($response);
    }
} else {
    $response = array("success" => false, "message" => "Missing username or password in request body");
    echo json_encode($response);
}
 $pdo = null;
?>
