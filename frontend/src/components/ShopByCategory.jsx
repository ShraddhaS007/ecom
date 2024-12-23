// import React from "react";
// import { Link } from "react-router-dom";
// import "./ShopByCategory.css";
// import { assets } from "../assets/assets";


// const categories = [
//     { name: "Traditional", link: "/Traditional", image: assets.trad },
//     { name: "TopWear", link: "/tw", image: assets.tw },
//     { name: "BottomWear", link: "/bw", image: assets.bw },
//     { name: "Lehengas", link: "/lehe", image: assets.lehe },
//     { name: "Dresses", link: "/dress", image: assets.dress },
//   ];
  

// const ShopByCategory = () => {
//   return (
//     <div className="shop-by-category">
//       <h2 className="heading">Shop by Category</h2>
//       <div className="categories-container">
//         {categories.map((category, index) => (
//           <a href={category.link} className="category-card" key={index}>
//             <img src={category.image} alt={category.name} className="category-image" />
//             <span className="category-name">{category.name}</span>
//           </a>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ShopByCategory;


import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "./ShopByCategory.css";
import { assets } from "../assets/assets";

const categories = [
  { name: "Traditional", link: "/Traditional", image: assets.trad },  // Ensure the link is to '/traditional'
  { name: "TopWear", link: "/top", image: assets.tw },
  { name: "BottomWear", link: "/bottom", image: assets.bw },
  { name: "Lehengas", link: "/lehe", image: assets.lehe },
  { name: "Dresses", link: "/dress", image: assets.dress },
];

const ShopByCategory = () => {
  return (
    <div className="shop-by-category">
      <h2 className="heading">Shop by Category</h2>
      <div className="categories-container">
        {categories.map((category, index) => (
          <Link to={category.link} className="category-card" key={index}> {/* Use Link instead of a */}
            <img src={category.image} alt={category.name} className="category-image" />
            <span className="category-name">{category.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ShopByCategory;
