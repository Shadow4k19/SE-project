<?php 
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    header("Access-Control-Allow-Methods: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

    session_start();
    require_once "Server.php";

    $method = $_SERVER['REQUEST_METHOD'];

    switch($method){
        case "GET":
            $path = explode('/', $_SERVER['REQUEST_URI']);
            if(isset($path[4]) && $path[4] == 'drink'){
                $sql = "SELECT * FROM products WHERE Type_product = 'drink'";
                $stmt = $pdo->prepare($sql);
                $stmt->execute();
                $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
                echo json_encode($products); 
                break;
            }
            else if(isset($path[4])  && $path[4] == 'food'){
                $sql = "SELECT * FROM products WHERE Type_product = 'food'";
                $stmt = $pdo->prepare($sql);
                $stmt->execute();
                $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
                echo json_encode($products); 
                break;
            }
            else if(isset($path[4])  && $path[4] == 'other'){
                $sql = "SELECT * FROM products WHERE Type_product = 'other'";
                $stmt = $pdo->prepare($sql);
                $stmt->execute();
                $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
                echo json_encode($products); 
                break;
            }
            else{
                $sql = "SELECT * FROM products";
                $stmt = $pdo->prepare($sql);
                $stmt->execute();
                $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
                echo json_encode($products);
                break;
            }
        

        case "POST":
            $imagePath = "";
            $product_name = $_POST['Product_Name'];
            $product_price = $_POST['Product_Price'];
            $product_remain = $_POST['Product_Remaining'];
            $product_detail = $_POST['Product_Detail'];
            try{
            if(isset($_FILES['Product_Image'])) {
                $path = "D:/โหลดคลิปคิดเวลา/SE/SE program/my-app/public/Upload/";
                $file = $path . basename($_FILES['Product_Image']['name']);
                $uploadOk = 1;
                $imageFileType = strtolower(pathinfo($file,PATHINFO_EXTENSION));
        
                $check = getimagesize($_FILES['Product_Image']['tmp_name']);
                if($check !== false) {
                    $uploadOk = 1;
                } else {
                    $error = "File is not an image.";
                    echo $error;
                    break;
                }
        
                if (file_exists($file)) {
                    $error = "File already exists.";
                    echo $error;
                    break;
                }
        
                if ($_FILES['Product_Image']['size'] > 500000) {
                    $error = "File is too large.";
                    echo $error;
                    break;
                }
        
                if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg") {
                    $error = "Only JPG, JPEG, PNG files are allowed.";
                    echo $error;
                    break;
                }
        
                if ($uploadOk == 0) {
                    $error = "Sorry, your file was not uploaded.";
                    echo $error;
                    break;
                } else {
                    if (move_uploaded_file($_FILES['Product_Image']['tmp_name'], $file)) {
                        $imagePath = basename($_FILES['Product_Image']['name']);
                    } else {
                        $error = "Sorry, there was an error uploading your file.";
                        echo $error;
                        break;
                    }
                }
            }else{
                $error = "Image is empty";
                echo $error;
            }
            if(isset($product_name)){
                $stmt = $pdo->prepare("INSERT INTO products(Product_ID,Product_Name,Product_Price,Product_Remaining,Date_Import,Product_Image,Product_Detail) VALUES(null,:name,:price,:remain,:date,:image,:detail)");
                $date = date('Y-m-d');
                $stmt->bindParam(':price',$product_price);
                $stmt->bindParam(':name', $product_name);
                $stmt->bindParam(':detail',$product_detail);
                $stmt->bindParam(':remain',$product_remain);
                $stmt->bindParam(':image',$imagePath);
                $stmt->bindParam(':date', $date);
                $stmt->execute();
                $response = "Record Successfully";
                echo json_encode($response);
        }else{
            echo "Null";
        }
        }catch (Exception $e){
            echo $e;
        }
            break;
            
        case "PUT":
            try {
                $productdata = json_decode(file_get_contents("php://input"));
                $product_id = $productdata->Product_ID;
            
                    /*if(isset($_FILES['Product_Image'])) {
                        $path = "Upload/";
                        $file = $path . basename($_FILES['Product_Image']['name']);
                        $uploadOk = 1;
                        $imageFileType = strtolower(pathinfo($file,PATHINFO_EXTENSION));
                        if (file_exists($file)) {
                            $imagePath = $file;
                            break;
                        }else{
                            $check = getimagesize($_FILES['Product_Image']['tmp_name']);
                            if($check !== false) {
                                $uploadOk = 1;
                            } else {
                                $error = "File is not an image.";
                                echo $error;
                                break;
                            }
                    
                            if ($_FILES['Product_Image']['size'] > 500000) {
                                $error = "File is too large.";
                                echo $error;
                                break;
                            }
                    
                            if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg") {
                                $error = "Only JPG, JPEG, PNG files are allowed.";
                                echo $error;
                                break;
                            }
                    
                            if ($uploadOk == 0) {
                                $error = "Sorry, your file was not uploaded.";
                                echo $error;
                                break;
                            } else {
                                if (move_uploaded_file($_FILES['Product_Image']['tmp_name'], $file)) {
                                    $imagePath = $file;
                                } else {
                                    $error = "Sorry, there was an error uploading your file.";
                                    echo $error;
                                    break;
                                }
                            }
                        }
                    } else {
                        $imagePath = $productdata->Product_Image;
                    }*/
                    $sql = "UPDATE products SET Product_Name=:name, Product_Price=:price, Product_Remaining=:remain, Product_Detail=:detail ,Type_product= :type_p WHERE Product_ID=:product_id";
                    $stmt = $pdo->prepare($sql);
                    $stmt->bindParam(':name', $productdata->Product_Name);
                    $stmt->bindParam(':price', $productdata->Product_Price);
                    $stmt->bindParam(':remain', $productdata->Product_Remaining);
                    $stmt->bindParam(':detail', $productdata->Product_Detail);
                    $stmt->bindParam(':type_p',$productdata->Type_product);
                    //$stmt->bindParam(':image', $imagePath);
                    $stmt->bindParam(':product_id', $product_id);
                    $stmt->execute();
                    $response = "Record Updated Successfully";
                    echo json_encode($response);
                } catch (Exception $e){
                    echo $e;
                }
                break;
            

        case "DELETE":
            try{
            $product_id = $_GET['Product_ID'];
            $sql = "DELETE FROM products WHERE Product_ID=:product_id";
            $stmt = $pdo->prepare($sql);
            $stmt->bindParam(':product_id',$product_id);
            $stmt->execute();
            
            $response = "Record Deleted Successfully";
            echo json_encode($response);
            }catch(Exception $e){
                echo $e;
            }
            break;

        default:
            break;
    }
?>