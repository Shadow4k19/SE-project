import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../navbar.css";
import User from "./User";
import Login from "./Login";

export default function Navbar() {
  const user = new User();

  function checkStatus() {
    if (user.getStatus() === 'true') {
      user.deleteUser();
      window.location.reload();
    } else {
      user.getStatus();
      console.log("Mai ru");
      window.location.reload();
    }
  }

  let button;
  if (user.getStatus() !== 'false') {
    if (Login.role !== "User" || Login.role !== "") {
      button = (
        <>
          <Link classname="manage" to="/product-management">Management</Link>
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
    console.log(user.getStatus());
  } else {
    button = (
      <>
        <Link to="/cart">
          <span className="icon">
            <i className="bi bi-cart"></i>
          </span>
        </Link>
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
