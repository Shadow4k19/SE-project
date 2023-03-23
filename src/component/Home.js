import React,{useState,useEffect} from "react"
import axios from "axios";
import '../Home.css';

export default function Home(){
    const [products, setProducts] = useState([]);
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
    return(
        <div className="container-home">
            <h1>Welcome to our online market</h1>
        <div className="card">
          {products.map((product) => (
            <div key={product.Product_ID}>
              <div>
                <img
                  src={product.Product_Image}
                  alt={product.Product_Name}
                />
                <div>
                  <h5>{product.Product_Name}</h5>
                  <p><h5>{product.Product_Detail}</h5></p>
                  <h6>
                    {product.Product_Price}
                  </h6>
                  <button>
                  <a href="#">
                    Add to Cart
                  </a>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
}