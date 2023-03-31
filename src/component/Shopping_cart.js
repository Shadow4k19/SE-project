class ShoppingCart {
  constructor() {
    this.cart = JSON.parse(localStorage.getItem("cart")) || [];
  }

  getCart() {
    return this.cart;
  }

  addToCart(product) {
    const existingProduct = this.cart.find((p) => p.Product_ID === product.Product_ID);
    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      this.cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(this.cart));
  }

  removeFromCart(productID) {
    this.cart = this.cart.filter((product) => product.Product_ID !== productID);
    localStorage.setItem("cart", JSON.stringify(this.cart));
  }

  clearCart() {
    this.cart = [];
    localStorage.removeItem("cart");
  }
}

export default ShoppingCart;
