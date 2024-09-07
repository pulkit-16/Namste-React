import React, { useState } from "react";
import { LOGO_URL } from "../utils/constants";
import { Link } from "react-router-dom";

const Header = () => {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <div className="nav-bar">
      <div className="logo">
        <img className="logo-img " alt="logo-img" src={LOGO_URL}></img>
      </div>
      <div className="navItems">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>

          <li>
            <Link to="/about">About</Link>
          </li>

          <li>
            <Link to="/contact">Contact Us</Link>
          </li>

          <li>Cart</li>
          
          <li>
            <button
              className="login"
              onClick={() => {
                setIsLogin(!isLogin);
                //console.log(isLogin);
              }}
            >
              {isLogin ? "Logout" : "Login"}
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default Header;
