// import React, { useContext } from "react";
// import { ShopContext } from "../context/ShopContext";
// import "./Orders.css";

// const Orders = () => {
//   const { orders } = useContext(ShopContext);

//   return (
//     <div className="orders-container">
//       <h1>Your Orders</h1>
//       {orders.length === 0 ? (
//         <p>No orders placed yet.</p>
//       ) : (
//         orders.map((order, index) => (
//           <div key={index} className="order-card">
//             <h2>Order #{index + 1}</h2>
//             <p>Status: {order.status}</p>
//             <h3>Items:</h3>
//             <ul>
//               {order.items.map((item, idx) => (
//                 <li key={idx}>
//                   {item.name} - {item.quantity} x {item.price}
//                 </li>
//               ))}
//             </ul>
//             <p>Total: {order.total}</p>
//             <button className="track-order-button">Track Order</button>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default Orders;


import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import "./Orders.css";

const Orders = () => {
  const { userId, backendUrl } = useContext(ShopContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/order/userorders`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId }),
        });

        const data = await response.json();
        if (data.success) {
          setOrders(data.orders);
        }
      } catch (error) {
        console.error("Fetch Orders Error:", error);
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
            <p>Total: {order.amount}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;
