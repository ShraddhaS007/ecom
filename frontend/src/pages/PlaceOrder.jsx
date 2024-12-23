import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import "./PlaceOrder.css";

const PlaceOrder = () => {
  const { cart, currency, delivery_fee, addOrder } = useContext(ShopContext);
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    name: "",
    address: "",
    pincode: "",
    contact: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleSubmit = () => {
    const totalPrice = calculateTotal() + delivery_fee;
    const order = {
      userDetails,
      items: cart,
      total: totalPrice,
      paymentMethod,
      status: "Processing",
    };
    addOrder(order); // Add order to the context
    navigate("/orders"); // Navigate to orders page
  };

  return (
    <div className="place-order-container">
      <div className="order-form">
        <h2>Shipping Information</h2>
        <form>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={userDetails.name}
            onChange={handleChange}
            required
          />

          <label>Address</label>
          <textarea
            name="address"
            value={userDetails.address}
            onChange={handleChange}
            required
          />

          <label>Pincode</label>
          <input
            type="text"
            name="pincode"
            value={userDetails.pincode}
            onChange={handleChange}
            required
          />

          <label>Contact</label>
          <input
            type="text"
            name="contact"
            value={userDetails.contact}
            onChange={handleChange}
            required
          />
        </form>
      </div>

      <div className="order-summary">
        <h3>Total Price: {currency}{calculateTotal()}</h3>
        <p>Delivery Fee: {currency}{delivery_fee}</p>
        <p>Total: {currency}{calculateTotal() + delivery_fee}</p>

        <h4>Payment Methods:</h4>
        <div>
          <input
            type="radio"
            name="payment"
            value="stripe"
            onChange={handlePaymentChange}
          />{" "}
          Stripe
        </div>
        <div>
          <input
            type="radio"
            name="payment"
            value="razorpay"
            onChange={handlePaymentChange}
          />{" "}
          Razorpay
        </div>
        <div>
          <input
            type="radio"
            name="payment"
            value="cod"
            onChange={handlePaymentChange}
          />{" "}
          Cash on Delivery
        </div>

        <button onClick={handleSubmit} className="buy-button">
          Buy
        </button>
      </div>
    </div>
  );
};

export default PlaceOrder;
