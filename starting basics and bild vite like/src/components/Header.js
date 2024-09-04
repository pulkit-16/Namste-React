import React, { useState } from "react";
import { LOGO_URL } from "../utils/constants";



const Header = () => {

  const [isLogin, setIsLogin] = useState(false);

  return (
    <div className="nav-bar">
      <div className="logo">
        <img className="logo-img " alt="logo-img" src={LOGO_URL}></img>
      </div>
      <div className="navItems">
        <ul>
          <li>Home</li>
          <li>About Us</li>
          <li>Contact Us</li>
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
