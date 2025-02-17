

import React, { useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import './ProCol.css';
import { Link } from 'react-router-dom';

const Top = () => {
  const { products } = useContext(ShopContext);
  const [filters, setFilters] = useState({
    priceRange: [0, 10000],
    size: '',
  });
  const [sortOption, setSortOption] = useState('');

  // Handle filter changes
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // Filter products for only the 'Traditional' category
  const filteredProducts = products
    .filter((product) => {
      const { priceRange, size } = filters;

      // Only show Traditional products
      const matchesCategory = product.category === 'topwear';
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      const matchesSize = size ? product.sizes.includes(size) : true;

      return matchesCategory && matchesPrice && matchesSize;
    })
    .sort((a, b) => {
      if (sortOption === 'low-to-high') return a.price - b.price;
      if (sortOption === 'high-to-low') return b.price - a.price;
      return 0;
    });

  return (
    <div className="flex">
      {/* Sidebar for filters */}
      <div className="w-1/4 p-4 border-r as">
        <h2 className="text-lg font-bold mb-4">Filters</h2>

        {/* Price Range Filter */}
        <div className="mb-4">
          <h3 className="font-semibold">Price Range</h3>
          <input
            type="range"
            min="0"
            max="10000"
            step="100"
            value={filters.priceRange[1]}
            onChange={(e) =>
              handleFilterChange('priceRange', [0, Number(e.target.value)])
            }
          />
          <p>Up to: ${filters.priceRange[1]}</p>
        </div>

        {/* Size Filter */}
        <div className="mb-4">
          <h3 className="font-semibold">Size</h3>
          {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
            <div key={size}>
              <input
                type="radio"
                id={size}
                name="size"
                value={size}
                onChange={() => handleFilterChange('size', size)}
              />
              <label htmlFor={size}>{size}</label>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="w-3/4 p-4 df">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">TopWear</h2>
          {/* Sort Options */}
          <select
            className="border p-2"
            onChange={(e) => setSortOption(e.target.value)}
            value={sortOption}
          >
            <option value="">Sort by</option>
            <option value="low-to-high">Price: Low to High</option>
            <option value="high-to-low">Price: High to Low</option>
          </select>
        </div>

        {/* Product List */}
        <div className="grid grid-cols-3 gap-4">
          {filteredProducts.map((product) => (
            <Link
              to={`/product/${product._id}`} // Dynamic route based on product ID
              key={product._id}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div className="border p-4">
                <img
                  src={Array.isArray(product.image) ? product.image[0] : product.image}
                  alt={product.name}
                  className="w-full h-40 object-cover mb-2"
                />
                <h3 className="font-semibold">{product.name}</h3>
                <p>${product.price}</p>
                <p>Category: {product.category}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Top;
