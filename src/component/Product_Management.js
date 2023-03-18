import axios from "axios";
import { useEffect, useState } from "react";
import React from "react";
import { Link } from "react-router-dom";
import '../Product_Management.css';

export default function Product_management() {
    const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost/php-react/React-api/Product.php")
      .then(response => {
        console.log(response.data);
        setProducts(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <div className="contrainer">
        <button className="btnadd">
          <Link to="/add-product">+Add</Link>
        </button>
        <table>
          <thead>
            <tr>
              <th align="center">ID</th>
              <th align="center">Product Name</th>
              <th align="center">Product Detail</th>
              <th align="center">Price</th>
              <th align="center">Count Remaining</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.Product_ID}>
                <td>{product.Product_ID}</td>
                <td>{product.Product_Name}</td>
                <td>{product.Product_Detail}</td>
                <td>{product.Product_Price}</td>
                <td>{product.Product_Remaining}</td>
                <td>
                  <button className="btnedit">Edit</button>
                  <button className="btndel">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
