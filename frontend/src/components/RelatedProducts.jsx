import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";
import "./RelatedProducts.css";

const RelatedProducts = ({ category, currentProductId }) => {
  const { products } = useContext(ShopContext);

  // Filter products of the same category, excluding the current product
  const relatedProducts = products.filter(
    (product) => product.category === category && product._id !== currentProductId
  );

  if (relatedProducts.length === 0) {
    return null; // If no related products, don't render anything
  }

  return (
    <div className="related-products">
      <h2>Related Products</h2>
      <div className="related-products-grid">
        {relatedProducts.map((product) => (
          <Link
            to={`/product/${product._id}`}
            key={product._id}
            className="related-product-card"
          >
            <img
              src={Array.isArray(product.image) ? product.image[0] : product.image}
              alt={product.name}
              className="related-product-image"
            />
            <h3 className="related-product-name">{product.name}</h3>
            <p className="related-product-price">${product.price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
