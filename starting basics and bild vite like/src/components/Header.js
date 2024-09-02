import { LOGO_URL } from "../utils/constants";

const Header = () => {
    return (
      <div className="nav-bar">
        <div className="logo">
          <img
            className="logo-img "
            alt="logo-img"
            src={LOGO_URL}
          ></img>
        </div>
        <div className="navItems">
          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Contact Us</li>
            <li>Cart</li>
          </ul>
        </div>
      </div>
    );
  };
  export default Header;