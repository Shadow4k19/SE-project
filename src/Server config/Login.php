<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Request-With");
// Retrieve the username and password from the request body
$data = json_decode(file_get_contents("php://input"));

if (!$data) {
    //http_response_code(400); // Bad Request
    echo json_encode(array("message" => "Missing input"));
    die();
}

if(isset($data->username) && isset($data->password)) {
    $username = $data->username;
    $password = $data->password;

    // Connect to the database
    session_start();
    require_once "Server.php";

    try {

        // Check if the username and password are valid
        $stmt = $pdo->prepare("SELECT * FROM login WHERE Username = :username AND Password = :password");
        $stmt->bindParam(":username", $username);
        $stmt->bindParam(":password", $password);
        $stmt->execute();

        // If a user is found with the provided username and password, return a success response
        if ($stmt->rowCount() > 0) {
            $user = $stmt->fetch();
            $response = "200";
            echo $response;
        } else {
            $response = "202";
            echo $response;
        }
    } catch (PDOException $e) {
        $response = array("success" => false, "message" => "Connection failed: " . $e->getMessage());
        echo json_encode($response);
    }
} else {
    $response = array("success" => false, "message" => "Missing username or password in request body");
    echo json_encode($response);
}
 // Close the database connection
 $pdo = null;
?>
