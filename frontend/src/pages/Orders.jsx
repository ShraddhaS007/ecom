import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import "./Orders.css";

const Orders = () => {
  const { orders } = useContext(ShopContext);

  return (
    <div className="orders-container">
      <h1>Your Orders</h1>
      {orders.length === 0 ? (
        <p>No orders placed yet.</p>
      ) : (
        orders.map((order, index) => (
          <div key={index} className="order-card">
            <h2>Order #{index + 1}</h2>
            <p>Status: {order.status}</p>
            <h3>Items:</h3>
            <ul>
              {order.items.map((item, idx) => (
                <li key={idx}>
                  {item.name} - {item.quantity} x {item.price}
                </li>
              ))}
            </ul>
            <p>Total: {order.total}</p>
            <button className="track-order-button">Track Order</button>
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;
