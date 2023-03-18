import React, { useState } from "react";
import { Link } from "react-router-dom";
import '../navbar.css';
import Login from "./Login";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  function checkstatus() {
    setIsLoggedIn((previsLoggedIn) => !previsLoggedIn);
    if(isLoggedIn === true){
      Login.setstatuslogin("");
    }
  }

  return (
    <div>
      <header>
        <h2 className="logo">ร้านขายของออน์ไลน์</h2>
        <nav>
          {isLoggedIn ? (
            <button className="btnLogin" onClick={checkstatus}>
              Logout
            </button>
          ) : (
            <button className="btnLogin" onClick={checkstatus}>
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
