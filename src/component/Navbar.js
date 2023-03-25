import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../navbar.css";
import Login from "./Login";

export default function Navbar() {
  const [statuslogin, setStatusLogin] = useState(false);

  function checkStatus() {
    if (Login.user.getStatus() === false) {
      setStatusLogin(true);
    }else{
      setStatusLogin(false);
    }
  }

  return (
    <div>
      <header>
        <h2 className="logo">ร้านขายของออน์ไลน์</h2>
        <a href="/product-management">Management</a>
        <nav>
          {statuslogin ? (
            <>
              <span className="icon">
                <i class="bi bi-cart"></i>
              </span>
              <button className="btnLogin" onClick={checkStatus}>
                Logout
              </button>
            </>
          ) : (
            <>
            <span className="icon">
            <i class="bi bi-cart"></i>
            </span>
            <button className="btnLogin" onClick={checkStatus}>
              <Link to="/login" className="Link">
                Login
              </Link>
            </button>
            </>
          )}
        </nav>
      </header>
    </div>
  );
}
