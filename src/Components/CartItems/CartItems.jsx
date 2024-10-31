import React, { useContext, useEffect, useState } from "react";
import "./CartItems.css";
import { ShopContext } from "../../Context/ShopContext";
import remove_icon from "../Assets/Frontend_Assets/cart_cross_icon.png";
import RazorpayButton from "./RazorpayButton";
import ProfileNote from "../ProfileNote/ProfileNote";
import UserPage from "../../Pages/userpage";

const CartItems = () => {
  const { getTotalCartAmount, all_product, cartItems, removeFromCart } =
    useContext(ShopContext);

  const [cartItemsArray, setCartItemsArray] = useState([]);

  // Delivery options and default delivery charge
  const deliveryOptions = [
    { label: "Chennai", value: 45 },
    { label: "Outside of Chennai", value: 75 },
    { label: "Bangalore", value: 100 },
    { label: "Kerala", value: 100 },
    { label: "North India", value: 180 },
  ];
  const [deliveryCharge, setDeliveryCharge] = useState(45);

  // Update delivery charge when dropdown selection changes
  const handleDeliveryChange = (event) => {
    setDeliveryCharge(parseInt(event.target.value, 10));
  };

  const logCartItemsArray = () => {
    const cartArray = all_product
      .map((product) => {
        if (cartItems[product.id] && cartItems[product.id][0] > 0) {
          const [quantity, customizations] = cartItems[product.id];
          return customizations.map((customization) => ({
            productName: product.name,
            price: product.new_price,
            quantity: 1,
            customization: customization[0],
            size: customization[1],
            totalPrice: product.new_price * quantity,
          }));
        }
        return null;
      })
      .flat()
      .filter((item) => item !== null);

    console.log(cartArray); // Log the array
    return cartArray;
  };

  useEffect(() => {
    // Log the cart items array when the component mounts
    const itemsArray = logCartItemsArray(); // Get the cart items array
    setCartItemsArray(itemsArray); // Update the state
  }, [cartItems, all_product]); // Dependencies that trigger this effect when changed

  // Log the cartItemsArray whenever it updates
  useEffect(() => {
    console.log("Cart Items Array: ", cartItemsArray);
  }, [cartItemsArray]); // Dependencies that trigger this effect when changed

  return (
    <div className="cartitems">
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {all_product.map((product) => {
        if (cartItems[product.id] && cartItems[product.id][0] > 0) {
          // Extracting quantity and customizations from cartItems
          const [quantity, customizations] = cartItems[product.id];

          return (
            <div key={product.id}>
              {customizations.map((customization, index) => {
                const [customName, customSize] = customization;

                // Check if customization name is "-"
                const isCustomized = customName.trim() !== "-";
                // Price logic: Add ₹300 only if customized (i.e., name is not "-")
                const priceWithCustomization = isCustomized
                  ? product.new_price + 300
                  : product.new_price;

                return (
                  <div key={`${product.id}-${index}`}>
                    <div className="cartitems-format cartitems-format-main">
                      <img
                        src={product.image}
                        alt=""
                        className="carticon-product-icon"
                      />
                      <p>{product.name}</p>
                      <p>Rs.{priceWithCustomization}</p>
                      <button className="cartitems-quantity">1</button>
                      <p>Rs.{priceWithCustomization}</p>
                      <img
                        className="cartitems-remove-icon"
                        src={remove_icon}
                        onClick={() => {
                          removeFromCart(product.id, customName, customSize);
                        }}
                      />
                    </div>
                    <div className="custom-details">
                      {/* Display customization */}
                      <p>Customization: {customName ? customName : "-"}</p>
                      <p>Size: {customSize}</p>
                    </div>
                    <hr />
                  </div>
                );
              })}
            </div>
          );
        }
        return null;
      })}
      {/* <ProfileNote /> */}
      <UserPage />
      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Cart Totals</h1>
          <div>
            <div className="cartitems-total-item">
              <p>Subtotal</p>
              <p>Rs.{getTotalCartAmount() + deliveryCharge}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Shipping Fee</p>
              <select onChange={handleDeliveryChange} defaultValue={45}>
                {deliveryOptions.map((option) => (
                  <option key={option.label} value={option.value}>
                    {option.label} - ₹{option.value}
                  </option>
                ))}
              </select>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Total</h3>
              <h3>Rs.{getTotalCartAmount() + deliveryCharge}</h3>
            </div>
          </div>
          <RazorpayButton
            amount={getTotalCartAmount() + deliveryCharge}
            cartValues={cartItemsArray}
          />
        </div>
      </div>
    </div>
  );
};

export default CartItems;
