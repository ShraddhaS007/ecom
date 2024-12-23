import React, { useState ,useContext} from "react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const NewArrival = () => {
  const navigate = useNavigate();
  const { products }=useContext(ShopContext);
  const [wishlist, setWishlist] = useState({});

  const handleProductClick = (id) => {
    navigate(`/product/${id}`); // Navigate to product details page
  };

  const toggleWishlist = (id) => {
    setWishlist((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>New Arrivals</h2>
      <div style={styles.cardContainer}>
        {products
          .filter((product) => product.newArrival) // Assuming you have `newArrival` flag
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
                    e.stopPropagation();
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
      <button style={styles.viewMoreButton} onClick={() => navigate("/NewArrivals")}>
        View More
      </button>
    </div>
  );
};

const styles = {
  container: {
    marginTop:"30px",
    padding: "2rem",
    background: "linear-gradient(135deg, #f7c6d7, #f1d0e8)", // Light pink gradient
    color: "black",
    textAlign: "center",
  },
  heading: {
    marginBottom: "1.5rem",
    fontSize: "3rem",
    fontWeight: "bold",
    background: "linear-gradient(135deg,rgb(253, 65, 159),rgb(240, 197, 229)) ",
    // WebkitBackgroundClip: "text",
    color: "white",
  },
  cardContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", // Grid layout for cards
    gap: "1.5rem",
    justifyContent: "center",
  },
  card: {
    background: "#fff",
    borderRadius: "12px",
    padding: "1rem",
    cursor: "pointer",
    boxShadow: "0 6px 15px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
  },
  cardHover: {
    transform: "scale(1.05)",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)",
  },
  imageContainer: {
    position: "relative",
    marginBottom: "1rem",
  },
  image: {
    width: "100%",
    height: "340px",
    borderRadius: "12px",
    objectFit: "cover",
  },
  wishlistButton: {
    position: "absolute",
    top: "10px",
    right: "10px",
    background: "rgba(255, 255, 255, 0.7)",
    border: "none",
    borderRadius: "50%",
    padding: "0.5rem",
    cursor: "pointer",
    fontSize: "1.5rem",
  },
  productName: {
    fontSize: "1.2rem",
    fontWeight: "bold",
    marginTop: "0.5rem",
    color: "#333",
  },
  productPrice: {
    fontSize: "1rem",
    marginTop: "0.5rem",
    color: "#ff8da2", // Soft pink price text
  },
  viewMoreButton: {
    marginTop: "2rem",
    padding: "1rem 2rem",
    background: "linear-gradient(135deg,rgb(253, 65, 159),rgb(240, 197, 229))",
    border: "none",
    borderRadius: "25px",
    color: "white",
    fontSize: "1.2rem",
    cursor: "pointer",
    transition: "background 0.3s ease",
  },

  // Add responsive styling
  '@media (max-width: 768px)': {
    heading: {
      fontSize: "1.8rem",
    },
    cardContainer: {
      gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", // Fewer columns on smaller screens
    },
    card: {
      width: "100%",
      padding: "1rem",
    },
    productName: {
      fontSize: "1rem",
    },
    productPrice: {
      fontSize: "0.9rem",
    },
  },

  '@media (max-width: 480px)': {
    container: {
      marginTop:"20px",
    },
    heading: {
      fontSize: "1.6rem",
    },
    cardContainer: {
      height:"200vh",
      gridTemplateColumns: "1fr", // Stack cards in a single column for mobile screens
    },
    card: {
      width: "100%",
      padding: "1rem",
    },
    wishlistButton: {
      fontSize: "1.2rem",
      padding: "0.4rem",
    },
    productName: {
      fontSize: "0.9rem",
    },
    productPrice: {
      fontSize: "0.8rem",
    },
  },

};

export default NewArrival;
