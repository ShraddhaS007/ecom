

import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { FaTrashAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "./Cart.css";

const Cart = () => {
  const { cart, currency, delivery_fee, removeFromCart } = useContext(ShopContext);
  const navigate = useNavigate();

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handlePlaceOrder = () => {
    // Navigate to the PlaceOrder page
    navigate("/PlaceOrder");
  };

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-items">
          {cart.map((item, index) => (
            <div key={index} className="cart-item">
              <img src={item.image[0]} alt={item.name} className="cart-item-image" />
              <div className="cart-item-details">
                <h2 className="cart-item-name">{item.name}</h2>
                <p>Size: {item.size}</p>
                <p>Price: {currency}{item.price}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
              <div className="cart-item-actions">
                <FaTrashAlt
                  className="remove-icon"
                  onClick={() => removeFromCart(item.id)}
                />
              </div>
            </div>
          ))}
          <div className="cart-summary">
            <p>Subtotal: {currency}{calculateTotal()}</p>
            <p>Delivery Fee: {currency}{delivery_fee}</p>
            <p>Total: {currency}{calculateTotal() + delivery_fee}</p>
            <button className="place-order" onClick={handlePlaceOrder}>
              Place Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
