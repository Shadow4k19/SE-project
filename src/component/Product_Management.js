import axios from "axios";
import { useEffect, useState } from "react";
import React from "react";
import "../Product_Management.css";

export default function Product_management() {
  const [products, setProducts] = useState([]);
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [newProduct, setNewProduct] = useState({
    Product_Name: "",
    Product_Detail: "",
    Product_Price: "",
    Product_Remaining: "",
    Product_Image: null,
  });

  const handleAddPopup = () => {
    setShowAddPopup(true);
  };

  const handleClosePopup = () => {
    setShowAddPopup(false);
  };

  const handleEditPopup = (product) => {
    setShowEditPopup(true);
    setNewProduct({
      ...newProduct,
      ...product,
    });
  };


  const handleEditClosePopup = () => {
    setShowEditPopup(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(newProduct);
  };

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    setNewProduct(prevState => ({ ...prevState, Product_Image: file }));
    console.log(newProduct);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    //console.log(newProduct+"new");
    const formData = new FormData();
    console.log(formData);
    formData.append("Product_Name", newProduct.Product_Name);
    formData.append("Product_Detail", newProduct.Product_Detail);
    formData.append("Product_Price", newProduct.Product_Price);
    formData.append("Product_Remaining", newProduct.Product_Remaining);
    formData.append("Product_Image", newProduct.Product_Image);

    axios
      .post("http://localhost/php-react/React-api/Product.php", formData)
      .then((response) => {
        if (response.data === "Record Successfully") {
          alert("Add Success");
          setShowAddPopup(false);
          window.location.reload();
        } else {
          console.log(response.data);
          alert("Add Failed"+response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };


  const handleEditSubmit = (event) => {
    event.preventDefault();
    //console.log(newProduct);
    axios
      .put(
        `http://localhost/php-react/React-api/Product.php?Product_ID=${newProduct.Product_ID}`,
        newProduct
      )
      .then((response) => {
        console.log(response.data);
        if (response.data === "Record Updated Successfully") {
          alert("Update Success");
          setShowEditPopup(false);
          window.location.reload();
        } else {
          alert("Update Failed");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };


  const handleDelete = (product) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete product ${product.Product_Name}?`
    );
    if (confirmed) {
      axios
        .delete(
          `http://localhost/php-react/React-api/Product.php?Product_ID=${product.Product_ID}`
        )
        .then((response) => {
          console.log(response.data);
          if (response.data === "Record Deleted Successfully") {
            alert("Delete Success");
            window.location.reload();
          } else {
            alert("Delete Failed");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost/php-react/React-api/Product.php")
      .then((response) => {
        //console.log(response.data);
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className="contrainer-over">
  <div className="contrainer-manage">
    <button className="btnadd" onClick={handleAddPopup}>
      +Add
    </button>
    <table className="table-manage">
      <thead>
        <tr>
          <th align="center">ID</th>
          <th align="center">Product Name</th>
          <th align="center">Product Detail</th>
          <th align="center">Price</th>
          <th align="center">Remaining</th>
          <th align="center">Action</th>
        </tr>
      </thead>
      {products.length > 0 && (
        <tbody>
          {products.map((product) => (
            <tr key={product.Product_ID}>
              <td>{product.Product_ID}</td>
              <td>{product.Product_Name}</td>
              <td>{product.Product_Detail}</td>
              <td>{product.Product_Price}</td>
              <td>{product.Product_Remaining}</td>
              <td>
                <button className="btnedit" onClick={() => handleEditPopup(product)}>Edit</button>
                <button className="btndel" onClick={() => handleDelete(product)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      )}{products.length === 0 && <p className="text">Product is empty</p>}
    </table>
  </div>
      {showAddPopup && (
        <div className="popup">
          <div className="popup-content">
            <form onSubmit={handleSubmit}>
              <h3>Add Product</h3>
              <label>Product Name</label>
              <input
                type="text"
                name="Product_Name"
                value={newProduct.Product_Name}
                onChange={handleInputChange}
                required
              />
              <label>Product Detail</label>
              <input
                type="text"
                name="Product_Detail"
                value={newProduct.Product_Detail}
                onChange={handleInputChange}
                required
              />
              <label>Price</label>
              <input
                type="number"
                name="Product_Price"
                value={newProduct.Product_Price}
                onChange={handleInputChange}
                required
              />
              <label>Remaining</label>
              <input
                type="number"
                name="Product_Remaining"
                value={newProduct.Product_Remaining}
                onChange={handleInputChange}
                required
              />
              <label>Image</label>
              <input
                type="file"
                name="Product_Image"
                accept="Upload/*"
                onChange={handleFileInputChange}
                required
              />

              <button type="submit">Add</button>
              <button type="button" onClick={handleClosePopup}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
      {showEditPopup && (
        <div className="popup">
          <div className="popup-content">
            <form onSubmit={handleEditSubmit}>
              <h4>Edit Product</h4>
              <input type="hidden" name="Product_ID" value={newProduct.Product_ID} />
              <label>Product Name</label>
              <input
                type="text"
                name="Product_Name"
                value={newProduct.Product_Name}
                onChange={handleInputChange}
                required
              />
              <label>Product Detail</label>
              <input
                type="text"
                name="Product_Detail"
                value={newProduct.Product_Detail}
                onChange={handleInputChange}
                required
              />
              <label>Price</label>
              <input
                type="number"
                name="Product_Price"
                value={newProduct.Product_Price}
                onChange={handleInputChange}
                required
              />
              <label>Remaining</label>
              <input
                type="number"
                name="Product_Remaining"
                value={newProduct.Product_Remaining}
                onChange={handleInputChange}
                required
              />
              <button type="submit">Update</button>
              <button type="button" onClick={handleEditClosePopup}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
