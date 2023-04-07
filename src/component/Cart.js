import React, { useState } from "react";
import ShoppingCart from "./Shopping_cart";
import '../Cart.css';

export default function ShoppingCartComponent() {
  const [cart, setCart] = useState(new ShoppingCart().getCart());

  const remove = (productId) => {
    const shoppingCart = new ShoppingCart();
    shoppingCart.removeFromCart(productId);
    setCart(shoppingCart.getCart());
  };

  const clearCart = () => {
    const confirmed = window.confirm(
      `Are you sure you want buy?`
    );
    if (confirmed) {
      const shoppingCart = new ShoppingCart();
      shoppingCart.clearCart();
      setCart(shoppingCart.getCart());
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
          <p className="text">Total: {cart.reduce((total, product) => total + product.Product_Price * product.quantity, 0)} Baht</p>
          <button onClick={clearCart}>Purchase</button>
        </div>
      )}
      {cart.length === 0 && <p className="text">Your cart is empty</p>}
    </div>
  );
}
