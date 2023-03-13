import axios from "axios";
import React, { useState } from "react";
import "../login.css";

export default function Login() {
  const [showLogin, setShowLogin] = useState(true);

  const toggleForm = () => {
    setShowLogin((prevShowLogin) => !prevShowLogin);
  };

  const [data, setData] = useState({
    username: "",
    password: "",
    email: "",
  });

  const submitFormLogin = (e) => {
    e.preventDefault();
    const sendData = {
      username: data.username,
      password: data.password
    };
    console.log(sendData);
    axios
      .post("http://localhost/php-react/Login-and-Register/Login.php", sendData)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const submitFormRegister = (e) => {
    e.preventDefault();
    const sendData = {
      username2: data.username,
      password2: data.password,
      email2: data.email
    };
    console.log(sendData);
    axios
      .post(
        "http://localhost/php-react/Login-and-Register/Register.php",
        sendData,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers":
            "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
            "Access-Control-Allow-Methods": "POST",
            "Content-Type": "application/json; charset=UTF-8"
          }
        }
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <div className={`wrapper ${showLogin ? "active" : ""}`}>
        {showLogin ? (
          <div className="form-box login">
            <h2>Login</h2>
            <form onSubmit={submitFormLogin}>
              <div className="input-box">
                <span className="icon">
                  <i className="bi bi-person"></i>
                </span>
                <input
                  type="text"
                  name="username"
                  required
                  onChange={handleChange}
                  value={data.username}
                />
                <label>Username</label>
              </div>
              <div className="input-box">
                <span className="icon">
                  <i className="bi bi-lock"></i>
                </span>
                <input
                  type="password"
                  name="password"
                  required
                  onChange={handleChange}
                  value={data.password}
                />
                <label>Password</label>
              </div>
              <div className="btnlog">
                <button className="btnlogin" name="login">
                  Login
                </button>
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
          <form onSubmit={submitFormRegister}>
            <div className="input-box">
              <span className="icon">
                <i className="bi bi-person"></i>
              </span>
              <input
                type="text"
                name="username"
                required
                onChange={handleChange}
                value={data.username}
              />
              <label>Username</label>
            </div>
            <div className="input-box">
              <span className="icon">
                <i className="bi bi-lock"></i>
              </span>
              <input
                type="password"
                name="password"
                required
                onChange={handleChange}
                value={data.password}
              />
              <label>Password</label>
            </div>
            <div className="input-box">
              <span className="icon">
                <i className="bi bi-envelope-fill"></i>
              </span>
              <input
                type="email"
                name="email"
                required
                onChange={handleChange}
                value={data.email}
              />
              <label>E-mail</label>
            </div>
            <div className="btnlog">
              <button className="btnlogin" name="register">
                Register
              </button>
            </div>
          </form>
          <div className="login-register">
            <p>
              Already have an account?
              <a href="#login" onClick={toggleForm}>
                Login
              </a>
            </p>
          </div>
        </div>
        )}
          </div>
          </div>
  )
}
          
