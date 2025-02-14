import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { backendUrl } from '../App';
import "./Orders.css";

const AdminOrders = ({token}) => {
 // const { token, backendUrl } = useContext(ShopContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.post(
          `${backendUrl}/api/order/allorders`, 
          {},  // Empty body since we're not sending any data
          { headers: { token } } // ✅ Correct way to pass headers
        );
    
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
  }, [backendUrl]);

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/order/updatestatus`,
        { orderId, status: newStatus },
        { headers: { token } }
      );

      if (response.data.success) {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId ? { ...order, status: newStatus } : order
          )
        );
      } else {
        console.error("Error updating status:", response.data.message);
      }
    } catch (error) {
      console.error("Update Status Error:", error.response?.data || error.message);
    }
  };

  return (
    <div className="admin-orders-container">
      <h1>All Orders</h1>
      {orders.length === 0 ? (
        <p>No orders available.</p>
      ) : (
        orders.map((order, index) => (
          <div key={index} className="order-card">
            <h2>Order #{index + 1}</h2>
            <p><strong>User ID:</strong> {order.userId}</p>
            <p><strong>Status:</strong> {order.status}</p>
            <h3>Items:</h3>
            <ul>
              {order.items.map((item, idx) => (
                <li key={idx} className="order-item">
                  <img src={item.image} alt={item.name} className="order-img" />
                  <div className="order-details">
                    <p>{item.name}</p>
                    <p>{item.quantity} x ₹{item.price}</p>
                  </div>
                </li>
              ))}
            </ul>
            <p><strong>Total:</strong> ₹{order.amount}</p>
            <label>Update Status:</label>
            <select
              value={order.status}
              onChange={(e) => updateOrderStatus(order._id, e.target.value)}
            >
              <option value="Order Placed">Order Placed</option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        ))
      )}
    </div>
  );
};

export default AdminOrders;
