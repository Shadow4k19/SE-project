<?php 
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    header("Access-Control-Allow-Methods: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Request-With");

    session_start();
    require_once "D:\kong game\Database\htdocs\php-react\Login-and-Register\Server.php";
    $method = $_SERVER['REQUEST_METHOD'];
    switch($method){
        case "GET":
            $sql = "SELECT * From products";
            $stmt = $pdo->prepare($sql);
            $stmt->execute();
            $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            echo json_encode($products);
            break;

        case "POST":
            $productdata = json_decode(file_get_contents("php://input"));
            if(isset($_FILES['Product_Image'])) {
                $path = "Upload/";
                $file = $path . basename($_FILES['Product_Image']['name']);
                $uploadOk = 1;
                $imageFileType = strtolower(pathinfo($file,PATHINFO_EXTENSION));
        
                $check = getimagesize($_FILES['Product_Image']['tmp_name']);
                if($check !== false) {
                    $uploadOk = 1;
                } else {
                    $error = "File is not an image.";
                    break;
                }
        
                if (file_exists($file)) {
                    $error = "File already exists.";
                    break;
                }
        
                if ($_FILES['Product_Image']['size'] > 500000) {
                    $error = "File is too large.";
                    break;
                }
        
                if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jepg") {
                    $error = "Only JPG, JPEG, PNG  files are allowed.";
                    break;
                }
        
                if ($uploadOk == 0) {
                    $error = "Sorry, your file was not uploaded.";
                    break;
                } else {
                    if (move_uploaded_file($_FILES['Product_Image']['tmp_name'], $file)) {
                        $imagePath = $file;
                    } else {
                        $error = "Sorry, there was an error uploading your file.";
                        break;
                    }
                }
            }
            $stmt = $pdo->prepare("INSERT INTO products(Product_ID,Product_Name,Product_Price,Product_Remaining,Date_Import,Product_Image,Product_Detail) VALUES(null,:name,:price,:remain,:date,:image,:detail)");
            $date = date('Y-m-d');
            $stmt->bindParam(':price',$productdata->Product_Price);
            $stmt->bindParam(':name',$productdata->Product_Name);
            $stmt->bindParam(':detail',$productdata->Product_Detail);
            $stmt->bindParam(':remain',$productdata->Product_Remaining);
            $stmt->bindParam(':image',$imagePath);
            $stmt->bindParam(':date', $date);
            $stmt->execute();
            $response = "Record Successfully";
            echo json_encode($response);
            break;
            case "PUT":
                $productdata = json_decode(file_get_contents("php://input"));
                $product_id = $_GET['Product_ID'];
                $stmt = $pdo->prepare("UPDATE products SET Product_Name = :name , Product_Price = :price , Product_Remaining = :remain, Product_Image = :image , Product_Detail = :detail WHERE Product_ID = :id");
                $stmt->bindParam(':name', $productdata->Product_Name);
                $stmt->bindParam(':price', $productdata->Product_Price);
                $stmt->bindParam(':remain', $productdata->Product_Remaining);
                $stmt->bindParam(':image', $productdata->Product_Image);
                $stmt->bindParam(':detail', $productdata->Product_Detail);
                $stmt->bindParam(':id', $product_id);
                $stmt->execute();
                $count = $stmt->rowCount();
                if ($count > 0) {
                  $response = "Record Updated Successfully";
                } else {
                  $response = "Update Failed";
                }
                echo json_encode($response);
                break;
                case "DELETE":
                    $product_id = $_GET['Product_ID'];
                    $stmt = $pdo->prepare("DELETE FROM products WHERE Product_ID = :id");
                    $stmt->bindParam(':id', $product_id);
                    $stmt->execute();
                
                    $count = $stmt->rowCount();
                    if($count > 0) {
                        $response = "Record Deleted Successfully";
                    } else {
                        $response = "Delete Failed";
                    }
                    echo json_encode($response);
                    break;                
    }
?>
