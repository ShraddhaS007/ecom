import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { FaTrashAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "./Cart.css";

const Cart = () => {
  const {
    cart,
    setCart,
    currency,
    delivery_fee,
    addToCart,
    removeFromCart,
    fetchCart,
    userId,
    backendUrl,
  } = useContext(ShopContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCartData = async () => {
      if (!userId) {
        setError("Please log in to view your cart.");
        return;
      }
      setLoading(true);
      try {
        await fetchCart(); // Just call fetchCart, as it already updates the state
        setError(""); // Clear any previous error
      } catch (err) {
        setError("An error occurred while fetching cart data.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchCartData();
  }, [userId]); // Fetch cart whenever userId changes
  

  const handleAddToCart = async (item) => {
    try {
      await addToCart(item, item.size); // Update database
      setCart((prevCart) => {
        const existingItemIndex = prevCart.findIndex(
          (cartItem) =>
            cartItem._id === item._id && cartItem.size === item.size
        );
        if (existingItemIndex !== -1) {
          const updatedCart = [...prevCart];
          updatedCart[existingItemIndex].quantity += 1;
          return updatedCart;
        }
        return [...prevCart, { ...item, quantity: 1 }];
      });
    } catch (error) {
      setError("Failed to add item to cart.");
    }
  };

  const handleRemoveFromCart = async (item) => {
    setLoading(true);
    setError("");
  
    try {
      const response = await removeFromCart(item._id, item.size);
      
      if (response && response.success) {
        // Update cart only if backend confirms removal
        setCart((prevCart) =>
          prevCart.filter(
            (cartItem) => !(cartItem._id === item._id && cartItem.size === item.size)
          )
        );
      } else {
        setError("Failed to remove item from cart.");
      }
    } catch (error) {
      console.error("Remove from Cart Error:", error);
      setError("Failed to remove item from cart.");
    } finally {
      setLoading(false);
    }
  };
  
  

  const calculateTotal = () =>
    cart.reduce((total, item) => total + item.quantity * item.price, 0);

  const handlePlaceOrder = () => {
    navigate("/PlaceOrder");
  };

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      {loading ? (
        <p>Loading your cart...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-items">
          {/* {cart.map((item, index) => (
            <div key={index} className="cart-item">
              <img
                src={item.image || "/default-image.png"} // Replace with default if image is not provided
                alt={item.name}
                className="cart-item-image"
              />
              <div className="cart-item-details">
                <h2 className="cart-item-name">{item.name}</h2>
                <p>Size: {item.size}</p>
                <p>Price: {currency}
                  {item.price}
                </p>
                <p>Quantity: {item.quantity}</p>
              </div>
              <div className="cart-item-actions">
                <FaTrashAlt
                  className="remove-icon"
                  onClick={() => handleRemoveFromCart(item)}
                />
                
              </div>
            </div>
          ))} */}
          {cart.map((item, index) => (
  <div key={index} className="cart-item">
    <Link to={`/product/${item._id}`} className="cart-item-link">
      <img
        src={item.image || "/default-image.png"}
        alt={item.name}
        className="cart-item-image"
      />
      <div className="cart-item-details">
        <h2 className="cart-item-name">{item.name}</h2>
        <p>Size: {item.size}</p>
        <p>Price: {currency}{item.price}</p>
        <p>Quantity: {item.quantity}</p>
      </div>
    </Link>
    <div className="cart-item-actions">
      <FaTrashAlt
        className="remove-icon"
        onClick={() => handleRemoveFromCart(item)}
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

