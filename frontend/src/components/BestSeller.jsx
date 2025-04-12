

import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const Bestseller = () => {
  const { products }=useContext(ShopContext);
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState({}); // Track wishlist state

  const handleProductClick = (id) => {
    navigate(`/product/${id}`); // Navigate to product details page
  };

  return (
    <div style={styles.container}>
      <div style={styles.headingContainer}>
        <h2 style={styles.heading}>Bestsellers</h2>
      </div>
      <div style={styles.cardContainer}>
        {products
          .filter((product) => product.bestseller)
          .map((product) => (
            <div
              key={product._id}
              style={styles.card}
              onClick={() => handleProductClick(product._id)}
            >
              <div style={styles.imageContainer}>
                <img
                  src={product.image[0]}
                  alt={product.name}
                  style={styles.image}
                  onMouseOver={(e) => (e.currentTarget.src = product.image[1])}
                  onMouseOut={(e) => (e.currentTarget.src = product.image[0])}
                />
                {/* <button
                  style={{
                    ...styles.wishlistButton,
                    color: wishlist[product.id] ? "red" : "grey",
                  }}
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering onClick for the card
                    toggleWishlist(product.id);
                  }}
                >
                  ❤️
                </button> */}
              </div>
              <h3 style={styles.productName}>{product.name}</h3>
              <p style={styles.productPrice}>${product.price}</p>
              
            </div>
          ))}
      </div>
      <button style={styles.viewMoreButton} onClick={() => navigate("/BestSellers")}>
        View More
      </button>
    </div>
    
  );
};

const styles = {
  container: {
    padding: "2rem",
    background: "white", // White page background
    color: "black",
    textAlign: "center",
  },
  headingContainer: {
    background: "linear-gradient(135deg,rgb(255, 158, 207),rgb(249, 44, 249))", // Gradient for heading
    padding: "1rem",
    borderRadius: "8px",
    marginBottom: "2rem",
    
  },
  heading: {
    
    fontSize: "3rem",
    fontWeight: "bold",
    fontFamily: "'Dancing Script', cursive",
    margin: "0",
    color: "white",
  },
  cardContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "3rem",
    justifyContent: "center",
  },
  card: {
    background: "linear-gradient(135deg,rgb(254, 176, 215),rgb(252, 161, 252))", // Gradient for heading
    borderRadius: "10px",
    width: "100%",
    maxWidth: "300px",
    padding: "1rem",
    cursor: "pointer",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
   
    textAlign: "center",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  },
  imageContainer: {
    position: "relative",
    overflow: "hidden",
    borderRadius: "10px",
  },
  image: {
    width: "100%",
    height: "340px",
    objectFit: "cover",
  },
  wishlistButton: {
    position: "absolute",
    top: "10px",
    right: "10px",
    background: "transparent",
    border: "none",
    borderRadius: "50%",
    padding: "0.3rem", // Smaller button size
    cursor: "pointer",
    fontSize: "1rem",
    boxShadow: "none",
  },
  productName: {
    marginTop: "1rem",
    fontSize: "1.4rem",
    fontWeight: "bold",
    color: "black",
  },
  productPrice: {
    marginTop: "0.5rem",
    fontSize: "1.1rem",
    color: "#ff007f",
  },
  viewMoreButton: {
    marginTop: "2rem",
    padding: "0.8rem 2rem",
    fontSize: "1.2rem",
    color: "white",
    background: "linear-gradient(135deg, #7b2cbf, #9d4edd)", // Gradient purple button
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background 0.3s ease",
  },
};

export default Bestseller;
