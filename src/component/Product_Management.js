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
    Product_Image: "",
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
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost/php-react/React-api/Product.php", newProduct)
      .then((response) => {
        console.log(response.data);
        if (response.data === "Record Successfully") {
          alert("Add Success");
          setShowAddPopup(false);
          window.location.reload();
        } else {
          alert("Add Failed");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEditSubmit = (event) => {
    event.preventDefault();
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
          <div>
            <div className="contrainer">
              <button className="btnadd" onClick={handleAddPopup}>
                +Add
              </button>
              <table>
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
              <tbody>
                {products.map((product) => (
                <tr key={product.Product_ID}>
                <td>{product.Product_ID}</td>
                <td>{product.Product_Name}</td>
                <td>{product.Product_Detail}</td>
                <td>{product.Product_Price}</td>
                <td>{product.Product_Remaining}</td>
                <td>
                  <button className = "btnedit" onClick={() => handleEditPopup(product)}>Edit</button>
                  <button className = "btndel" onClick={() => handleDelete(product)}>Delete</button>
                </td>
                </tr>
                ))}
              </tbody>
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
                            value={newProduct.Product_Image}
                            onChange={handleInputChange}
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
                      <h3>Edit Product</h3>
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
                      <label>Image</label>
                      <input
                          type="file"
                          name="Product_Image"
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
