import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import '../ShowDetail_History.css';

export default function ShowDetail_order() {
    const [products, setProducts] = useState([]);
    const { receipt_number } = useParams();
    
    useEffect(() => {
        axios
            .get(`http://localhost/php-react/Login-and-Register/Purchase.php/${receipt_number}`)
            .then((response) => {
                if (response.data === "Product not found" || response.data === "Receipt number not found") {

                } else {
                    setProducts(response.data);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, [receipt_number]);
    return (
        <div className="contrainer-showdetail">
            <div className="contrainer-show">
                <button className="btn-back">
                    <a href="/order">Back</a>
                </button>
                <table className="table-cart">
                    <thead>
                        <tr>
                            <th>Product_ID</th>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, index) => (
                            <tr key={index}>
                                <td>{product.product_ID}</td>
                                <td>{product.Product_Name}</td>
                                <td>{product.Product_Price}</td>
                                <td>{product.purchase_quantity}</td>
                            </tr>
                        ))}
                        {products.length === 0 && (
                            <p className="text-empty">Product is empty</p>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
