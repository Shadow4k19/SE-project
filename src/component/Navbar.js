import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../navbar.css";
import Login from "./Login";

export default function Navbar() {
  const [statuslogin, setStatusLogin] = useState(false);

  function checkStatus() {
    if (statuslogin === false) {
      setStatusLogin(true);
      Login.setstatuslogin(true);
      console.log(Login.statuslogin);
    } else {
      setStatusLogin(false);
      Login.setstatuslogin(false);
      console.log(Login.statuslogin);
    }
  }

  let button;
  if (statuslogin) {
    if(Login.role !== "User" || Login.role !== ""){
    button = (
      <>
        <Link classname = "pmanage" to="/product-management">Management</Link>
        <Link to="/cart">
          <span className="icon">
            <i className="bi bi-cart"></i>
          </span>
        </Link>
        <button className="btnLogin" onClick={checkStatus}>
          Logout
        </button>
      </>
    );
    }else{
      button = (
        <>
          <Link to="/cart">
            <span className="icon">
              <i className="bi bi-cart"></i>
            </span>
          </Link>
          <button className="btnLogin" onClick={checkStatus}>
            Logout
          </button>
        </>
      );
    }
  } else {
    button = (
      <>
        <span className="icon">
          <i className="bi bi-cart"></i>
        </span>
        <button className="btnLogin" onClick={checkStatus}>
          <Link to="/login" className="Link">
            Login
          </Link>
        </button>
      </>
    );
  }

  return (
    <div>
      <header>
        <h2 className="logo">ร้านขายของออน์ไลน์</h2>
        <nav>{button}</nav>
      </header>
    </div>
  );
}
