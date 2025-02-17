


// import React, { useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { ShopContext } from "../context/ShopContext";
// import axios from "axios";
// import "./PlaceOrder.css";

// const PlaceOrder = () => {
//   const { cart, currency, delivery_fee, addOrder ,userId ,backendUrl} = useContext(ShopContext);
//   const navigate = useNavigate();
//   const [userDetails, setUserDetails] = useState({
//     name: "",
//     address: "",
//     pincode: "",
//     contact: "",
//   });
//   const [paymentMethod, setPaymentMethod] = useState("");

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUserDetails((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handlePaymentChange = (e) => {
//     setPaymentMethod(e.target.value);
//   };

//   // const calculateTotal = () => {
//   //   return cart.reduce((total, item) => total + item.price * item.quantity, 0);
//   // };
//   const calculateTotal = () => {
//     return cart.reduce((total, item) => total + (Number(item.price) || 0) * (Number(item.quantity) || 0), 0);
//   };
  

//   const handleSubmit = async () => {
//     const token = localStorage.getItem("token"); // Retrieve the token
//     if (!token) {
//       alert("User is not logged in.");
//       return;
//     }
  
//     // Prepare the payload
//     const order = {
//       userId, // Ensure `userId` is correctly retrieved from the decoded token or state
//       items: cart.map((item) => ({
//         itemId: item._id,
//         name:item.name,
//         quantity: item.quantity, // Ensure `cart` includes quantity
//         size: item.size || "default",
//         price:item.price // Optional size field (if applicable)
//       })),
//       amount: Math.round(Number(calculateTotal()) + Number(delivery_fee)),

//     //  amount: calculateTotal() + delivery_fee, // Total order amount
//       address: {
//         name: userDetails.name,
//         address: userDetails.address,
//         pincode: userDetails.pincode,
//         contact: userDetails.contact,
//       },
//       paymentMethod, // E.g., "Cash on Delivery"
//     };
  
//     console.log("Order payload:", order); // Log the payload for debugging
   
//     if(paymentMethod==="stripe"){
//       try {
//         const responseStripe= await axios.post(
//           `${backendUrl}/api/order/stripe`,
//           order,
//           { headers: { token } }
//         );
//         if (responseStripe.data.success) {
//           const {session_url}=responseStripe.data
//           window.location.replace(session_url)
         
//         } else {
//           alert(`Failed to place order: ${responseStripe.data.message}`);
//         }
//       } catch (error) {
//         console.error("Error placing order:", error.responseStripe?.data || error);
//       alert("An error occurred while placing the order.");
//       }
        
//     }else{
//     try {
//       // Send the POST request with token in the headers
//       const response = await axios.post(
//         `${backendUrl}/api/order/place`,
//         order,
//         { headers: { token } } // Pass token in headers
//       );
  
//       if (response.data.success) {
//         alert("Order placed successfully!");
//         navigate("/orders"); // Redirect to orders page
//       } else {
//         alert(`Failed to place order: ${response.data.message}`);
//       }
//     } catch (error) {
//       console.error("Error placing order:", error.response?.data || error);
//       alert("An error occurred while placing the order.");
//     }
//   } 
//   };
  
  
  

//   return (
//     <div className="place-order-container">
//       <div className="order-form">
//         <h2>Shipping Information</h2>
//         <form>
//           <label>Name</label>
//           <input
//             type="text"
//             name="name"
//             value={userDetails.name}
//             onChange={handleChange}
//             required
//           />

//           <label>Address</label>
//           <textarea
//             name="address"
//             value={userDetails.address}
//             onChange={handleChange}
//             required
//           />

//           <label>Pincode</label>
//           <input
//             type="text"
//             name="pincode"
//             value={userDetails.pincode}
//             onChange={handleChange}
//             required
//           />

//           <label>Contact</label>
//           <input
//             type="text"
//             name="contact"
//             value={userDetails.contact}
//             onChange={handleChange}
//             required
//           />
//         </form>
//       </div>

//       <div className="order-summary">
//         <h3>Total Price: {currency}{calculateTotal()}</h3>
//         <p>Delivery Fee: {currency}{delivery_fee}</p>
//         <p>Total: {currency}{calculateTotal() + delivery_fee}</p>

//         <h4>Payment Methods:</h4>
//         <div>
//           <input
//             type="radio"
//             name="payment"
//             value="stripe"
//             onChange={handlePaymentChange}
//           />{" "}
//           Stripe
//         </div>
        
//         <div>
//           <input
//             type="radio"
//             name="payment"
//             value="cod"
//             onChange={handlePaymentChange}
//           />{" "}
//           Cash on Delivery
//         </div>

//         <button onClick={handleSubmit} className="buy-button">
//           Buy
//         </button>
//       </div>
//     </div>
//   );
// };

// export default PlaceOrder;

import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import "./PlaceOrder.css";

const PlaceOrder = () => {
  const { cart, currency, delivery_fee, userId, backendUrl } = useContext(ShopContext);
  const navigate = useNavigate();
  const location = useLocation();
  const product = location.state?.product || null; // Check if a single product is passed

  const [userDetails, setUserDetails] = useState({
    name: "",
    address: "",
    pincode: "",
    contact: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    console.log("Product received for Buy Now:", product);
  }, [product]);

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
    if (product) {
      return Number(product.price) * (Number(product.quantity) || 1);
    }
    return cart.reduce((total, item) => total + (Number(item.price) || 0) * (Number(item.quantity) || 0), 0);
  };

  const validateForm = () => {
    let newErrors = {};
    if (!userDetails.name.trim()) newErrors.name = "Name is required";
    if (!userDetails.address.trim()) newErrors.address = "Address is required";
    if (!userDetails.pincode.trim()) newErrors.pincode = "Pincode is required";
    if (!userDetails.contact.trim()) newErrors.contact = "Contact is required";
    if (!paymentMethod) newErrors.paymentMethod = "Select a payment method";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      alert("Please fill all required fields.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("User is not logged in.");
      return;
    }

    const selectedItems = product
      ? [{ itemId: product._id, name: product.name, quantity: product.quantity || 1, size: product.size || "default", price: product.price }]
      : cart.map((item) => ({
          itemId: item._id,
          name: item.name,
          quantity: item.quantity,
          size: item.size || "default",
          price: item.price,
        }));

    const order = {
      userId,
      items: selectedItems,
      amount: Math.round(Number(calculateTotal()) + Number(delivery_fee)),
      address: { ...userDetails },
      paymentMethod,
    };

    console.log("Order payload:", order);

    if (paymentMethod === "stripe") {
      try {
        const responseStripe = await axios.post(`${backendUrl}/api/order/stripe`, order, { headers: { token } });
        if (responseStripe.data.success) {
          window.location.replace(responseStripe.data.session_url);
        } else {
          alert(`Failed to place order: ${responseStripe.data.message}`);
        }
      } catch (error) {
        console.error("Error placing order:", error.responseStripe?.data || error);
        alert("An error occurred while placing the order.");
      }
    } else {
      try {
        const response = await axios.post(`${backendUrl}/api/order/place`, order, { headers: { token } });
        if (response.data.success) {
          alert("Order placed successfully!");
          navigate("/orders");
        } else {
          alert(`Failed to place order: ${response.data.message}`);
        }
      } catch (error) {
        console.error("Error placing order:", error.response?.data || error);
        alert("An error occurred while placing the order.");
      }
    }
  };

  return (
    <div className="place-order-container">
      <div className="order-form">
        <h2>Shipping Information</h2>
        <form>
          <label>Name</label>
          <input type="text" name="name" value={userDetails.name} onChange={handleChange} required />
          {errors.name && <span className="error">{errors.name}</span>}

          <label>Address</label>
          <textarea name="address" value={userDetails.address} onChange={handleChange} required />
          {errors.address && <span className="error">{errors.address}</span>}

          <label>Pincode</label>
          <input type="text" name="pincode" value={userDetails.pincode} onChange={handleChange} required />
          {errors.pincode && <span className="error">{errors.pincode}</span>}

          <label>Contact</label>
          <input type="text" name="contact" value={userDetails.contact} onChange={handleChange} required />
          {errors.contact && <span className="error">{errors.contact}</span>}
        </form>
      </div>

      <div className="order-summary">
        <h3>Total Price: {currency}{calculateTotal()}</h3>
        <p>Delivery Fee: {currency}{delivery_fee}</p>
        <p>Total: {currency}{calculateTotal() + delivery_fee}</p>

        <h4>Payment Methods:</h4>
        <div>
          <input type="radio" name="payment" value="stripe" onChange={handlePaymentChange} /> Stripe
        </div>
        <div>
          <input type="radio" name="payment" value="cod" onChange={handlePaymentChange} /> Cash on Delivery
        </div>
        {errors.paymentMethod && <span className="error">{errors.paymentMethod}</span>}

        <button onClick={handleSubmit} className="buy-button">
          Buy
        </button>
      </div>
    </div>
  );
};

export default PlaceOrder;
