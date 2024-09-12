import React, { useState } from "react";
import { LOGO_URL } from "../utils/constants";
import { Link } from "react-router-dom";
import useInternetStatus from "../utils/useInternetStatus";

const Header = () => {
  const [isLogin, setIsLogin] = useState(false);
  const onlineStatus = useInternetStatus();

  return (
    <header className="bg-white shadow-md  ">
      <div className="container mx-auto flex justify-between items-center p-2">
        {/* Logo Section */}
        <div className="w-28">
          <img className="h-15" alt="logo-img" src={LOGO_URL} />
        </div>

        {/* Navigation Menu */}
        <nav className="flex items-center space-x-4">
          <span className="text-sm">
            Online Status: {onlineStatus ? "✅" : "🔴"}
          </span>
          <ul className="flex space-x-4">
            <li>
              <Link className="text-gray-700 hover:text-blue-500" to="/">Home</Link>
            </li>
            <li>
              <Link className="text-gray-700 hover:text-blue-500" to="/about">About</Link>
            </li>
            <li>
              <Link className="text-gray-700 hover:text-blue-500" to="/contact">Contact Us</Link>
            </li>
            <li>
              <Link className="text-gray-700 hover:text-blue-500" to="/grocery">Grocery</Link>
            </li>
            <li>
              <Link className="text-gray-700 hover:text-blue-500" to="/cart">Cart</Link>
            </li>
            <li>
              <button
                className="text-gray-700 hover:text-blue-500 "
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? "Logout" : "Login"}
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;


