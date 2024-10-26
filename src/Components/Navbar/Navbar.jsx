import React, { useState, useRef, useContext } from "react";
import "./Navbar.css";
import logo from "../Assets/Custom/logo.png";
import cart_icon from "../Assets/Frontend_Assets/cart_icon.png";
import { Link } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";
import nav_dropdown from "../Assets/Custom/dropdown.jpg";
import { FaRegUserCircle } from "react-icons/fa";

export const Navbar = () => {
  const [menu, setMenu] = useState("home");
  const { getTotalCartItems } = useContext(ShopContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const menuRef = useRef();

  const dropdown_toggle = (e) => {
    menuRef.current.classList.toggle("nav-menu-visible");
    e.target.classList.toggle("open");
  };

  return (
    <div className="navbar">
      <Link style={{ textDecoration: "none" }} to="/">
        <div className="nav-logo">
          <img src={logo} alt="Logo" />
        </div>{" "}
      </Link>

      <img
        className="nav-dropdown"
        onClick={dropdown_toggle}
        src={nav_dropdown}
        alt="Dropdown Toggle"
      />
      <ul ref={menuRef} className="nav-menu">
        <li onClick={() => setMenu("home")}>
          <Link style={{ textDecoration: "none" }} to="/">
            Home
          </Link>
          {/* {menu === "home" && <hr />} */}
        </li>
        {/* Dropdown Menu for T-Shirts */}
        <li
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="dropdown-menu"
        >
          <span style={{ cursor: "pointer" }}>Categories</span>
          {dropdownOpen && (
            <div className="dropdown-content">
              <Link to="/tshirt" style={{ textDecoration: "none" }}>
                Jersey
              </Link>
            </div>
          )}
          {menu === "tshirt" && <hr />}
        </li>
        <li onClick={() => setMenu("contact")}>
          {menu === "contact" && <hr />}
        </li>
      </ul>
      <div className="nav-login-cart">
        {localStorage.getItem("auth-token") ? (
          <button
            onClick={() => {
              localStorage.removeItem("auth-token");
              localStorage.removeItem("email");
              window.location.replace("/");
            }}
          >
            Logout
          </button>
        ) : (
          <Link to="/login" style={{ textDecoration: "none" }}>
            <button>Login</button>
          </Link>
        )}
        <Link to="/cart" style={{ textDecoration: "none" }}>
          <img src={cart_icon} alt="Cart Icon" />
        </Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div>
        <Link to="/userpage">
          <FaRegUserCircle />
        </Link>
      </div>
    </div>
  );
};
