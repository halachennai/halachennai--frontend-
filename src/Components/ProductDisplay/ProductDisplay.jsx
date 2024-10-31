import React, { useContext, useState, useEffect } from "react";
import "./ProductDisplay.css";
import star_icon from "../Assets/Frontend_Assets/star_icon.png";
import star_dull_icon from "../Assets/Frontend_Assets/star_dull_icon.png";
import { ShopContext } from "../../Context/ShopContext";
import size_chart from "../Assets/Custom/SizeChart.jpeg";

const ProductDisplay = (props) => {
  const { product } = props;
  const { addToCart } = useContext(ShopContext);
  const [mainImage, setMainImage] = useState(product.image);
  const [customizationInput, setCustomizationInput] = useState("-");
  const [selectedSize, setSelectedSize] = useState("");

  useEffect(() => {
    // Update the main image when product.image changes
    setMainImage(product.image);
  }, [product.image]);

  const handleAddToCart = () => {
    if (selectedSize === "") {
      alert("Please select a size.");
      return;
    }

    addToCart(product.id, customizationInput, selectedSize);
    setCustomizationInput("-");
    setSelectedSize("");
  };

  return (
    <div className="productdisplay">
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          <img
            src={product.image}
            alt="Main Product"
            onClick={() => setMainImage(product.image)}
          />
          <img
            src={product.subimage1 || product.image}
            alt="Product Image 1"
            onClick={() => setMainImage(product.subimage1 || product.image)}
          />
          <img
            src={product.subimage2 || product.image}
            alt="Product Image 2"
            onClick={() => setMainImage(product.subimage2 || product.image)}
          />
          {/* <img
            src={product.subimage3 || product.image}
            alt="Product Image 3"
            onClick={() => setMainImage(product.subimage3 || product.image)}
          /> */}
          <img
            src={size_chart}
            alt="Size chart"
            onClick={() => setMainImage(size_chart)}
          />
        </div>
        <div className="productdisplay-img">
          <img className="productdisplay-main-img" src={mainImage} alt="Main" />
        </div>
      </div>
      <div className="productdisplay-right">
        <h1>{product.name}</h1>
        <div className="productdisplay-right-stars">
          {[...Array(4)].map((_, index) => (
            <img key={index} src={star_icon} alt="Star" />
          ))}
          <img src={star_dull_icon} alt="Empty Star" />
          <p>(122)</p>
        </div>
        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-price-old">
            Rs.{product.old_price}
          </div>
          <div className="productdisplay-right-price-new">
            Rs.{product.new_price}
          </div>
        </div>
        <div className="productdisplay-right-size">
          <h1>Select Size</h1>
          <div className="productdisplay-right-sizes">
            {["S", "M", "L", "XL", "XXL"].map((size) => (
              <div
                key={size}
                className={selectedSize === size ? "size-selected" : ""}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </div>
            ))}
          </div>

          <div className="customization-box">
            <h2>Customization</h2>
            <p>Enter your Name & Number (Max 18 letters and 2 numbers)</p>
            <input
              type="text"
              maxLength={20}
              placeholder="Enter Name and Number"
              value={customizationInput}
              onChange={(e) => setCustomizationInput(e.target.value || "-")}
            />
            <p>₹300.00</p>
          </div>

          <button onClick={handleAddToCart}>ADD TO CART</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDisplay;
