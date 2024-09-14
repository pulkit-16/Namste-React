import React, { useState } from "react";
import { LOGO_URL } from "../utils/constants";
import { Link } from "react-router-dom";
import useInternetStatus from "../utils/useInternetStatus";
import { IoSunny, IoMoon } from "react-icons/io5";

const Header = ({ dark, darkModeHandler }) => {
  const [isLogin, setIsLogin] = useState(false);
  const onlineStatus = useInternetStatus();

  return (
    <header className="bg-white  dark:bg-gray-900  dark:text-white shadow-md  ">
      <div>
        <div className="container mx-auto flex justify-between items-center px-5 mb-4">
          {/* Logo Section */}
          <div className="w-24 ">
            <img className="h-15" alt="logo-img" src={LOGO_URL} />
          </div>

          {/* Navigation Menu */}
          <nav className="flex items-center space-x-10 ">
            <span className="text-sm">
              Online Status: {onlineStatus ? "✅" : "🔴"}
            </span>
            <ul className="flex text-l font-semibold  space-x-10">
              <li>
                <Link className="text-gray-700 dark:text-white hover:text-yellow-500" to="/">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-700 hover:text-yellow-500   dark:text-white"
                  to="/about"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-700 hover:text-yellow-500  dark:text-white"
                  to="/contact"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-700 hover:text-yellow-500  dark:text-white"
                  to="/grocery"
                >
                  Grocery
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-700 hover:text-yellow-500  dark:text-white"
                  to="/cart"
                >
                  Cart
                </Link>
              </li>
              <li>
                <button
                  className="text-gray-700 hover:text-yellow-500   dark:text-white "
                  onClick={() => setIsLogin(!isLogin)}
                >
                  {isLogin ? "Logout" : "Login"}
                </button>
              </li>
              <li>
                <button onClick={darkModeHandler} className="p-2">
                  {dark ? (
                    <IoSunny className="text-yellow-400" />
                  ) : (
                    <IoMoon className="text-blue-900" />
                  )}
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
