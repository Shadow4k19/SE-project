import React, { useState } from "react";
import "../login.css";

export default function Login() {
  const [showLogin, setShowLogin] = useState(true);

  const toggleForm = () => {
    setShowLogin((prevShowLogin) => !prevShowLogin);
  };

  return (
    <div className="container">
      <div className={`wrapper ${showLogin ? "active" : ""}`}>
        {showLogin ? (
          <div className="form-box login">
            <h2>Login</h2>
            <form action="#">
              <div className="input-box">
                <span className="icon">
                  <i className="bi bi-person"></i>
                </span>
                <input type="text" required />
                <label>Username</label>
              </div>
              <div className="input-box">
                <span className="icon">
                  <i className="bi bi-lock"></i>
                </span>
                <input type="password" required />
                <label>Password</label>
              </div>
              <div className="btnlog">
                <button className="btnlogin">Login</button>
              </div>
              <div className="login-register">
                <p>
                  Don't have an account?
                  <a href="#register" onClick={toggleForm}>
                    Register
                  </a>
                </p>
              </div>
            </form>
          </div>
        ) : (
          <div className="form-box register">
            <h2>Register</h2>
            <form action="#">
              <div className="input-box">
                <span className="icon">
                  <i className="bi bi-person"></i>
                </span>
                <input type="text" required />
                <label>Username</label>
              </div>
              <div className="input-box">
                <span className="icon">
                  <i className="bi bi-lock"></i>
                </span>
                <input type="password" required />
                <label>Password</label>
              </div>
              <div className="input-box">
                <span className="icon">
                  <i className="bi bi-envelope-fill"></i>
                </span>
                <input type="email" required />
                <label>E-mail</label>
              </div>
              <div className="btnlog">
                <button className="btnlogin">Register</button>
              </div>
              <div className="login-register">
                <p>
                  Already have an account?
                  <a href="#login" onClick={toggleForm}>
                    Login
                  </a>
                </p>
              </div>
            </form>
          </div>)}
          </div>
          </div>
  )}
          
