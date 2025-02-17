

import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import "./Orders.css";

const Orders = () => {
  const { token, userId, backendUrl } = useContext(ShopContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        console.log("Fetching orders for user:", userId); // Debugging
    
        const response = await axios.post(
          `${backendUrl}/api/order/userorders`,
          { userId }, // Request body
          { headers: { token } } // Headers
        );
    
        console.log("API Response:", response.data); // Debugging response
    
        if (response.data.success) {
          setOrders(response.data.orders);
        } else {
          console.error("Error fetching orders:", response.data.message);
        }
      } catch (error) {
        console.error("Fetch Orders Error:", error.response?.data || error.message);
      }
     };
   

    fetchOrders();
  }, [userId, backendUrl]);

  return (
    <div className="orders-container">
      <h1>Your Orders</h1>
      {orders.length === 0 ? (
        <p>No orders placed yet.</p>
      ) : (
        orders.map((order, index) => (
          <div key={index} className="order-card">
            <h2>Order {index + 1}</h2>
            <p>Status: {order.status}</p>
            <h3>Items:</h3>
            <ul>
              
              {order.items.map((item, idx) => (
  <li key={idx} className="order-item">
    <a href={`/product/${item.itemId}`} className="order-link">
      <img src={item.image} alt={item.name} className="order-img" />
      <div className="order-details">
        <p>{item.name}</p>
        <p>{item.quantity} x ${item.price}</p>
      </div>
    </a>
  </li>
))}
            </ul>
            <p>Total: {order.amount}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;

