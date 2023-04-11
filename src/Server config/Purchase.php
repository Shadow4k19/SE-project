<?php 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

session_start();
require_once "Server.php";

date_default_timezone_set('Asia/Bangkok');
$method = $_SERVER['REQUEST_METHOD'];

switch($method){
    case "POST":
        $data = json_decode(file_get_contents("php://input"));
        $path = $_GET['path'];
        if($path === 'History'){
            $data = json_decode(file_get_contents("php://input"));
            $id = $data->User_ID;
            if (isset($id)) {
                $stmt = $pdo->prepare("SELECT receipt_number FROM purchases WHERE user_ID = :id");
                $stmt->bindParam(':id', $id);
                $stmt->execute();
                $receipts = $stmt->fetchAll();
                if ($receipts) {
                    $allReceipts = array();
                    $fetchedReceiptNumbers = array();
                    foreach ($receipts as $receipt) {
                        $receiptNumber = $receipt['receipt_number'];
                        if (!in_array($receiptNumber, $fetchedReceiptNumbers)) {
                            $stmt2 = $pdo->prepare("SELECT * FROM receipts WHERE receipt_number = :number");
                            $stmt2->bindParam(':number', $receiptNumber);
                            $stmt2->execute();
                            $allReceipts[] = $stmt2->fetchAll();
                            array_push($fetchedReceiptNumbers, $receiptNumber);
                        }
                    }
                    echo json_encode($allReceipts);
                } else {
                    $error = "No receipt";
                    echo json_encode($error);
                }
            } else {
                $error = "ID is null";
                echo json_encode($error);
            }
            break;
        }else if($path === 'Order'){
            try{
                $stmt = $pdo->prepare("SELECT * FROM receipts");
                $stmt->execute();
                $responce = $stmt->fetchAll(PDO::FETCH_ASSOC);
                echo json_encode($responce);
                break;
            } catch(PDOException $e) {
                echo "Error";
            }
        }else{
            $productdata = json_decode(file_get_contents("php://input"));
            if(isset($productdata)){
                $receipt_number = uniqid();
                $date = date('Y-m-d');
                $current_time = time();
                $time = date('H:i:s',$current_time);
                $totalprice = $_GET['Total_price'];
                $error = '';
                foreach($productdata as $product){
                    $product_ID = $product->Product_ID;
                    $product_name = $product->Product_Name;
                    $product_quantity = $product->quantity;
                    $cus_ID = $_GET['Cus_ID'];
                    $stmt_chk_qty = $pdo->prepare("SELECT Product_Remaining FROM products WHERE Product_ID = :id");
                    $stmt_chk_qty->bindParam(':id', $product_ID);
                    $stmt_chk_qty->execute();
                    $product_remaining = $stmt_chk_qty->fetchColumn();
                    if($product_remaining < $product_quantity){
                        $error .= "Product ".$product_name." quantity is not enough. \n";
                    }
                }
                if(!empty($error)){
                    echo json_encode(array("message" => $error));
                }else{
                    $stmt = $pdo->prepare("INSERT INTO receipts(receipt_date,receipt_time,receipt_totalprice,receipt_number) VALUES (:date,:time,:ttprice,:number)");
                    $stmt->bindParam(':date',$date);
                    $stmt->bindParam(':time',$time);
                    $stmt->bindParam(':ttprice',$totalprice);
                    $stmt->bindParam(':number',$receipt_number);
                    $stmt->execute();
                    foreach($productdata as $product){
                        $product_ID = $product->Product_ID;
                        $product_quantity = $product->quantity;
                        $stmt2 = $pdo->prepare("UPDATE products SET Product_Remaining = Product_Remaining - :quantity WHERE Product_ID = :product_id");
                        $stmt2->bindParam(':quantity',$product_quantity);
                        $stmt2->bindParam(':product_id',$product_ID);
                        $stmt2->execute();
                        $stmt3 = $pdo->prepare("INSERT INTO purchases(purchase_date,purchase_time,purchase_quantity,product_ID,receipt_number,user_ID) VALUES (:date,:time,:quantity,:product_id,:number,:user_id)");
                        $stmt3->bindParam(':date',$date);
                        $stmt3->bindParam(':time',$time);
                        $stmt3->bindParam(':quantity',$product_quantity);
                        $stmt3->bindParam(':product_id',$product_ID);
                        $stmt3->bindParam(':user_id',$cus_ID);
                        $stmt3->bindParam(':number',$receipt_number);
                        $stmt3->execute();
                    }
                    $responce = "Purchase is success";
                    echo json_encode($responce);
                }
            }else{
                $error = "Input is null";
            }
            break;
        }
    case "GET":
        $path = explode('/', $_SERVER['REQUEST_URI']);
        $receipt_number = $path[4];
        if ($receipt_number) {
            $stmt = $pdo->prepare("SELECT * FROM purchases WHERE receipt_number = :number");
            $stmt->bindParam(":number", $receipt_number);
            $stmt->execute();
            $responses = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $result = array(); 
            foreach ($responses as $response) {
                $product_ID = $response['product_ID'];
                $stmt2 = $pdo->prepare("SELECT Product_Name , Product_Price FROM products WHERE Product_ID = :id");
                $stmt2->bindParam(":id", $product_ID);
                $stmt2->execute();
                $response2 = $stmt2->fetch(PDO::FETCH_ASSOC);
                if ($response2) {
                    $result[] = array_merge($response, $response2); 
                } else {
                    echo "Product not found";
                }
            }
            echo json_encode($result);
        } else {
            echo "Receipt number not found";
        }               
        break;

        case "PUT":
            $receipt_number = $_GET['Receipt_ID'];
            if(isset($receipt_number)){
                $data = json_decode(file_get_contents("php://input"));
                $receipt_status = $data->Status;
                $stmt = $pdo->prepare("UPDATE receipts SET Status_receipt = :receipt WHERE receipt_id=:number");
                $stmt->bindParam(":receipt",$receipt_status);
                $stmt->bindParam(":number",$receipt_number);
                $stmt->execute();
                echo json_encode("Record Updated Successfully");
                break;   
            }else{
                echo "Update Failed";
                break;  
            }        
    default:
        break;
}
$pdo = null;
?>