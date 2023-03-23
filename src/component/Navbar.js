import React, { useState } from "react";
import { Link } from "react-router-dom";
import '../navbar.css';
import Login from "./Login";

export default function Navbar() {

  function checkstatus() {
    if(Login.user.getStatus() === false){
      Login.setstatuslogin(true);
    }
  }

  return (
    <div>
      <header>
        <h2 className="logo">ร้านขายของออน์ไลน์</h2>
        <a href="/product-management">Management</a>
        <nav>
          {Login.statuslogin? (
            <button className="btnLogin" onChange={checkstatus}>
              Logout
            </button>
          ) : (
            <button className="btnLogin" onChange={checkstatus}>
              <Link to="/login" className="Link">
                Login
              </Link>
            </button>
          )}
        </nav>
      </header>
    </div>
  );
}
