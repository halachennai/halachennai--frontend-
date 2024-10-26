import React from "react";
import "./Footer.css";
import logo from "../Assets/Custom/logo.png";
import instagram_icon from "../Assets/Frontend_Assets/instagram_icon.png";
import youtube_icon from "../Assets/Frontend_Assets/youtube_icon.png";
import DeliveryNote from "../DeliveryNote/DeliveryNote";

const Footer = () => {
  return (
    <div className="footer">
      <DeliveryNote />
      <div className="footer-logo">
        <img src={logo} alt="" />
      </div>
      <ul className="footer-links">
        <li>Products</li>
        <li>About</li>
        <li>Contact</li>
      </ul>
      <div className="footer-social-icon">
        <div className="footer-icons-container">
          <a href="https://www.instagram.com/hala.chennai?igsh=b3NiOXM0M2RpYnIz">
            <img src={instagram_icon} alt="" />
          </a>
        </div>
        <div className="footer-icons-container">
          <a href="https://www.youtube.com/@HalaChennai">
            <img src={youtube_icon} alt="" />
          </a>
        </div>
      </div>

      <div className="footer-copyright">
        <hr />
        <p>Copyright @ 2024 - All Right Reserved</p>
      </div>
    </div>
  );
};

export default Footer;
