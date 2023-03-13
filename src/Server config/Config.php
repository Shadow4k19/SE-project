<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Request-With");
$db_host = "localhost"; // ชื่อโฮสต์ของฐานข้อมูล
$db_user = "root"; // ชื่อผู้ใช้งานฐานข้อมูล
$db_pass = ""; // รหัสผ่านของฐานข้อมูล
$db_name = "grocerystore"; // ชื่อฐานข้อมูล
?>
