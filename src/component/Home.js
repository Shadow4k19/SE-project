import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Home.css";
import ShoppingCart from "./Shopping_cart";

export default function Home() {
  const [products, setProducts] = useState([]);
  const shoppingCart = new ShoppingCart();

  useEffect(() => {
    axios
      .get("http://localhost/php-react/React-api/Product.php")
      .then((response) => {
        console.log(response.data);
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleAddToCart = (product) => {
    shoppingCart.addToCart(product);
  };

  return (
    <div className="container-home">
      <h1>Welcome to our online market</h1>
      <div className="card">
        {products.map((product) => (
          <div key={product.Product_ID}>
            <div>
              <img src={product.Product_Image} alt={product.Product_Name} />
              <div>
                <h5>{product.Product_Name}</h5>
                <p>
                  <h5>{product.Product_Detail}</h5>
                </p>
                <h6>{product.Product_Price}</h6>
                <button onClick={() => handleAddToCart(product)}>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
