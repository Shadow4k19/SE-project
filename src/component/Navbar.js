import React from "react";
import { Link } from "react-router-dom";
import "../navbar.css";
import userInstance from "./User.js";

export default function Navbar() {
  function checkStatus() {
    if (userInstance.getStatus() === 'true') {
      userInstance.deleteUser();
      window.location.reload();
    } else {
      window.location.reload();
    }
  }

  let button;
  if (userInstance.getStatus() !== 'false') {
    if (userInstance.getUserrole() === "admin") {
      button = (
        <>
          <Link className="manage" to="/history">History</Link>
          <Link className="manage" to="/order">Order</Link>
          <Link className="manage" to="/product-management">Manage</Link>
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
    } else {
      button = (
        <>
          <Link className="manage" to="/history">History</Link>
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
        <Link to="/cart">
          <span className="icon">
            <i className="bi bi-cart"></i>
          </span>
        </Link>
        <button className="btnLogin" onClick={checkStatus}>
          <Link to="/login" className="btnLogin-l">
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
