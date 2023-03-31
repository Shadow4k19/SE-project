import axios from "axios";
import React, { useState } from "react";
import User from "./User";
import { useNavigate } from "react-router-dom";
import "../login.css";

export default function Login() {
  const [showLogin, setShowLogin] = useState(true);
  const [statuslogin,setstatuslogin] = useState(false);
  let Username = "";
  let role = "";
  console.log(Username);
  console.log(role);
  const user = new User();
  const toggleForm = () => {
    setShowLogin((prevShowLogin) => !prevShowLogin);
  };

  const [data, setData] = useState({
    username: "",
    password: "",
    email: "",
  });

  const navigate = useNavigate();

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
        if(response.data === 200){ 
          alert("Login successful");
          user.setUsername(data.username);
          user.setLoginStatus(true);
          Username = data.username;
          role = "User";
          setstatuslogin(true);
          //console.log(user.getStatus());
          console.log(statuslogin);
          navigate(`/`);
        } else {
          console.log(typeof(response.data));
          alert("Wrong Username or Password"); 
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const submitFormRegister = (e) => {
    e.preventDefault();
    const sendData = {
      username: data.username,
      password: data.password,
      email: data.email
    };
    console.log(sendData);
    axios
      .post(
        "http://localhost/php-react/Login-and-Register/Register.php",
        sendData
      )
      .then((response) => {
        console.log(response.data);
        if(response.data === "Sucess"){
          toggleForm();
          alert("Registration successful");
          window.location.reload();
        }else if(response.data === "Email already  exists"){
          alert("Email already exists");
        }else if(response.data === "Username already exists"){
          alert("Username already exists");
        }else{
          alert("Email or Username already exists");
        }
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
          
