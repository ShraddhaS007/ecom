import React from "react";
import { useParams } from "react-router-dom";

const ProductDetails = ({ products }) => {
  const { id } = useParams();
  const product = products.find((item) => item.id === id);

  if (!product) {
    return <h2>Product not found!</h2>;
  }

  return (
    <div style={{ padding: "2rem", color: "#333", textAlign: "center" }}>
      <h1>{product.name}</h1>
      <img
        src={product.image[0]}
        alt={product.name}
        style={{
          width: "300px",
          height: "auto",
          borderRadius: "10px",
          objectFit: "cover",
        }}
      />
      <p>{product.description}</p>
      <h3>${product.price}</h3>
    </div>
  );
};

export default ProductDetails;
