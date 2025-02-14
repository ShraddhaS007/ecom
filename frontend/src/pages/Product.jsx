// import React, { useContext, useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { ShopContext } from "../context/ShopContext";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import "./Product.css";
// import { Link } from "react-router-dom";
// import RelatedProducts from "../components/RelatedProducts";

// const ProductPage = () => {
//   const { _id } = useParams(); // Get product id from URL
//   const { products, addToCart } = useContext(ShopContext);
//   const [selectedSize, setSelectedSize] = useState(null);
//   const [product, setProduct] = useState(null);
//   const [cartClicked, setCartClicked] = useState(false);


//   // Fetch product based on id when it changes
//   useEffect(() => {
//     const foundProduct = products.find((item) => item._id.toString() === _id);
//     if (foundProduct) {
//       setProduct(foundProduct);
//     }
//   }, [_id, products]);

//   // If product is not found
//   if (!product) {
//     return <h1 className="not-found">Product not found</h1>;
//   }

//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     arrows: true,
//   };

//   const handleAddToCart = () => {
//     if (!selectedSize) {
      
//       alert("Please select a size before adding to cart.");
//       return;
//     }

//     addToCart(product, selectedSize);

//     // Temporarily highlight the "Add to Cart" button

//     setCartClicked(true);
//     setTimeout(() => {
//       setCartClicked(false);
//     }, 300);
//   };

//   return (
//     <div className="product-page-container">
//       <div className="product-page">
//         {/* Left Section: Image Slider */}
//         <div className="image-slider">
//           <Slider {...settings}>
//             {Array.isArray(product.image) ? (
//               product.image.map((img, index) => (
//                 <img
//                   key={index}
//                   src={img}
//                   alt={`Product ${index + 1}`}
//                   className="product-slider-image"
//                 />
//               ))
//             ) : (
//               <img
//                 src={product.image}
//                 alt={product.name}
//                 className="product-slider-image"
//               />
//             )}
//           </Slider>
//         </div>

//         {/* Right Section: Product Details */}
//         <div className="product-details">
//           <h1 className="product-name">{product.name}</h1>
//           <p className="product-description">{product.description}</p>
//           <p className="product-price">Price: ₹{product.price}</p>

//           {/* Sizes */}
//           <div className="product-sizes">
//             <h3>Available Sizes:</h3>
//             {product.sizes.map((size, index) => (
//               <button
//                 key={index}
//                 className={`size-badge ${
//                   selectedSize === size ? "selected" : ""
//                 }`}
//                 onClick={() => setSelectedSize(size)}
//               >
//                 {size}
//               </button>
//             ))}
//           </div>

//           {/* Policies */}
//           <div className="product-policies">
//             <p>✅ 7-day return policy</p>
//             <p>✅ Cash on delivery available</p>
//             <p>✅ 100% original product</p>
//           </div>

//           {/* Action Buttons */}
//           <div className="action-buttons">
//             <button
//               className={`add-to-cart ${cartClicked ? "clicked" : ""}`}
//               onClick={handleAddToCart}
//             >
//               Add to Cart
//             </button>
//             <Link to="/PlaceOrder">
//             <button className="buy-now">Buy Now</button>
//             </Link>
//           </div>
//         </div>
//       </div>
//       {/* Related Products Section */}
//       <RelatedProducts category={product.category} currentProductId={product._id} />
//     </div>
//   );
// };

// export default ProductPage;


import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Product.css";
import { Link } from "react-router-dom";
import RelatedProducts from "../components/RelatedProducts";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductPage = () => {
  const { _id } = useParams(); // Get product id from URL
  const { products, addToCart } = useContext(ShopContext);
  const [selectedSize, setSelectedSize] = useState(null);
  const [product, setProduct] = useState(null);
  const [cartClicked, setCartClicked] = useState(false);

  // Fetch product based on id when it changes
  useEffect(() => {
    const foundProduct = products.find((item) => item._id.toString() === _id);
    if (foundProduct) {
      setProduct(foundProduct);
    }
  }, [_id, products]);

  // If product is not found
  if (!product) {
    return <h1 className="not-found">Product not found</h1>;
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Please select a size before adding to cart.", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        // theme: "colored",
      });
      return;
    }

    addToCart(product, selectedSize);

    // Show success toast
    toast.success(`${product.name} added to cart!`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      // theme: "colored",
    });

    // Temporarily highlight the "Add to Cart" button
    setCartClicked(true);
    setTimeout(() => {
      setCartClicked(false);
    }, 300);
  };

  return (
    <div className="product-page-container">
      <ToastContainer />
      <div className="product-page">
        {/* Left Section: Image Slider */}
        <div className="image-slider">
          <Slider {...settings}>
            {Array.isArray(product.image) ? (
              product.image.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Product ${index + 1}`}
                  className="product-slider-image"
                />
              ))
            ) : (
              <img
                src={product.image}
                alt={product.name}
                className="product-slider-image"
              />
            )}
          </Slider>
        </div>

        {/* Right Section: Product Details */}
        <div className="product-details">
          <h1 className="product-name">{product.name}</h1>
          <p className="product-description">{product.description}</p>
          <p className="product-price">Price: ₹{product.price}</p>

          {/* Sizes */}
          <div className="product-sizes">
            <h3>Available Sizes:</h3>
            {product.sizes.map((size, index) => (
              <button
                key={index}
                className={`size-badge ${selectedSize === size ? "selected" : ""}`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>

          {/* Policies */}
          <div className="product-policies">
            <p>✅ 7-day return policy</p>
            <p>✅ Cash on delivery available</p>
            <p>✅ 100% original product</p>
          </div>

          {/* Action Buttons */}
          <div className="action-buttons">
            <button
              className={`add-to-cart ${cartClicked ? "clicked" : ""}`}
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
            <Link to="/PlaceOrder">
              <button className="buy-now">Buy Now</button>
            </Link>
          </div>
        </div>
      </div>
      {/* Related Products Section */}
      <RelatedProducts category={product.category} currentProductId={product._id} />
    </div>
  );
};

export default ProductPage;
