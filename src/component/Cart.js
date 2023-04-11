import React, { useState } from "react";
import ShoppingCart from "./Shopping_cart";
import axios from "axios";
import user from "./User.js";
import '../Cart.css';

export default function ShoppingCartComponent() {
  const [cart, setCart] = useState(new ShoppingCart().getCart());
  const path = "cart";
  let Total_price = 0;
  const [paymentPopup, setPaymentPopup] = useState(false);

  const handleEditClosePopup = () => {
    setPaymentPopup(false);
  };

  const remove = (productId) => {
    const shoppingCart = new ShoppingCart();
    shoppingCart.removeFromCart(productId);
    setCart(shoppingCart.getCart());
  };

  const clearCart = () => {
    console.log(cart);
    const confirmed = window.confirm(
      `Are you sure you want buy?`
    );
    if (confirmed && user.getStatus() === 'true') {
      setPaymentPopup(true);
      if (paymentPopup === false) {
        axios
          .post(
            `http://localhost/php-react/Login-and-Register/Purchase.php?Cus_ID=${user.getUserid()}&Total_price=${Total_price}&path=${path}`, cart
          )
          .then((response) => {
            if (response.data === "Purchase is success") {
              alert("Purchase is success");
            } else {
              alert(response.data);
            }
          })
          .catch((error) => {
            console.log(error);
          });
        const shoppingCart = new ShoppingCart();
        shoppingCart.clearCart();
        setCart(shoppingCart.getCart());
      }
    } else {
      alert("You haven't login yet");
    }

  };

  const increase = (productId) => {
    const newCart = [...cart];
    const selectedProduct = newCart.find((product) => product.Product_ID === productId);
    if (selectedProduct.quantity < selectedProduct.Product_Remaining) {
      selectedProduct.quantity++;
      setCart(newCart);
    }
    else {
      alert("Product Remaining not enough");
    }
  };

  const decrease = (productId) => {
    const newCart = [...cart];
    const selectedProduct = newCart.find((product) => product.Product_ID === productId);
    if (selectedProduct.quantity > 1) {
      selectedProduct.quantity--;
      setCart(newCart);
    } else {
      alert("Already lowest product quantity");
    }
  };

  return (
    <div className="container-cart">
      <h1>Shopping Cart</h1>
      <table className="table-cart">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((product) => (
            <tr key={product.Product_ID}>
              <td>{product.Product_Name}</td>
              <td>{product.Product_Price}</td>
              <td>{product.quantity}</td>
              <td>
                <button className="btn-increase" onClick={() => increase(product.Product_ID)}>+</button>
                <button className="btn-decrease" onClick={() => decrease(product.Product_ID)}>-</button>
                <button onClick={() => remove(product.Product_ID)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {cart.length > 0 && (
        <div>
          <p className="text-cart">Total: {Total_price = cart.reduce((total, product) => total + product.Product_Price * product.quantity, 0)} Baht</p>
          <button onClick={clearCart}>Purchase</button>
        </div>
      )}
      {cart.length === 0 && <p className="text-empty">Your cart is empty</p>}
      {paymentPopup && (
        <div className="popup-payment">
          <div className="popup-content-payment">
            <img src="./Upload/Payment.jpg" style={{ width: "400px", height: "400px", marginLeft: "10%" }} alt=""></img>
            <button className="btnedit" onClick={handleEditClosePopup}>Submit</button>
          </div>
        </div >
      )}
    </div>
  );
}
