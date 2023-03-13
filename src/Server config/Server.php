<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Request-With");

// Load database credentials from a separate file or environment variables
include_once('Config.php');

// Create connection using PDO with prepared statements
try {
  $dsn = "mysql:host=$db_host;dbname=$db_name;charset=utf8mb4";
  $pdo = new PDO($dsn, $db_user, $db_pass);
  $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  
  // Test if the connection is successful
  if ($pdo) {
      echo "Connection to database is successful!";
  }
} catch (PDOException $e) {
  die("Connection failed: " . $e->getMessage());
}

?>

