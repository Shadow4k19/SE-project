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
                    $uploadOk = 0;
                    $response = "File is not an image.";
                    echo json_encode($response);
                    break;
                }
        
                if (file_exists($file)) {
                    $uploadOk = 0;
                    $response = "File already exists.";
                    echo json_encode($response);
                    break;
                }
        
                if ($_FILES['Product_Image']['size'] > 500000) {
                    $uploadOk = 0;
                    $response = "File is too large.";
                    echo json_encode($response);
                    break;
                }
        
                if($imageFileType != "jpg" && $imageFileType != "png") {
                    $uploadOk = 0;
                    $response = "Only JPG, JPEG, PNG & GIF files are allowed.";
                    echo json_encode($response);
                    break;
                }
        
                if ($uploadOk == 0) {
                    $response = "Sorry, your file was not uploaded.";
                    echo json_encode($response);
                    break;
                } else {
                    if (move_uploaded_file($_FILES['Product_Image']['tmp_name'], $file)) {
                        $imagePath = $file;
                    } else {
                        $response = "Sorry, there was an error uploading your file.";
                        echo json_encode($response);
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
            $stmt->bindParam(':price',$productdata->Product_Price);
            $stmt->bindParam(':name',$productdata->Product_Name);
            $stmt->bindParam(':detail',$productdata->Product_Detail);
            $stmt->bindParam(':remain',$productdata->Product_Remaining);
            $stmt->bindParam(':image',$productdata->Product_Image);
            $stmt->bindParam(':id', $product_id);
            $stmt->execute();

            $count = $stmt->rowCount();
            if($count > 0) {
                $response = "Record Updated Successfully";
            } else {
                $response = "Update Failed";
            }
            echo json_encode($response);
    }
?>
