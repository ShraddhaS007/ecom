import React, { useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import './ProCol.css';
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const ProCol = () => {
    const { products } = useContext(ShopContext);
    const [filters, setFilters] = useState({
        category: '',
        priceRange: [0, 10000],
        size: '',
    });
    const [sortOption, setSortOption] = useState('');

    //
    const location = useLocation();
const searchParams = new URLSearchParams(location.search);
const query = searchParams.get("q")?.toLowerCase() || "";
//

    const handleFilterChange = (key, value) => {
        setFilters((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    // const filteredProducts = products
    //     .filter((product) => {
    //         const { category, priceRange, size } = filters;

    //         const matchesCategory = category ? product.category === category : true;
    //         const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    //         const matchesSize = size ? product.sizes.includes(size) : true;

    //         return matchesCategory && matchesPrice && matchesSize;
    //     })
    //     .sort((a, b) => {
    //         if (sortOption === 'low-to-high') return a.price - b.price;
    //         if (sortOption === 'high-to-low') return b.price - a.price;
    //         return 0;
    //     });
  const filteredProducts = products
  .filter((product) => {
    const { category, priceRange, size } = filters;

    const matchesCategory = category ? product.category === category : true;
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesSize = size ? product.sizes.includes(size) : true;
    const matchesQuery = query
      ? product.name.toLowerCase().includes(query) ||
        product.description?.toLowerCase().includes(query) ||
        product.category?.toLowerCase().includes(query)
      : true;

    return matchesCategory && matchesPrice && matchesSize && matchesQuery;
  })
  .sort((a, b) => {
    if (sortOption === 'low-to-high') return a.price - b.price;
    if (sortOption === 'high-to-low') return b.price - a.price;
    return 0;
  });

    return (
        <div className="flex">
            {/* Sidebar */}
            <div className="w-1/4 p-4 border-r as">
                <h2 className="text-lg font-bold mb-4">Filters</h2>

                {/* Category Filter */}
                <div className="mb-4">
                    <h3 className="font-semibold">Category</h3>
                    {[
                        { label: 'Dress', value: 'dress' },
                        { label: 'Lehengas', value: 'lehe' },
                        { label: 'Topwear', value: 'topwear' },
                        { label: 'Bottomwear', value: 'bottomwear' }
                    ].map((category) => (
                        <div key={category.value}>
                            <input
                                type="radio"
                                id={category.value}
                                name="category"
                                value={category.value}
                                onChange={() => handleFilterChange('category', category.value)}
                            />
                            <label htmlFor={category.value}>{category.label}</label>
                        </div>
                    ))}
                </div>

                {/* Price Range Filter */}
                <div className="mb-4">
                    <h3 className="font-semibold">Price Range</h3>
                    <input
                        type="range"
                        min="0"
                        max="10000"
                        step="100"
                        value={filters.priceRange[1]}
                        onChange={(e) => handleFilterChange('priceRange', [0, Number(e.target.value)])}
                    />
                    <p>Up to: ₹{filters.priceRange[1]}</p>
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
                    <h2 className="text-lg font-bold">Products</h2>
                    <select className="border p-2" onChange={(e) => setSortOption(e.target.value)} value={sortOption}>
                        <option value="">Sort by</option>
                        <option value="low-to-high">Price: Low to High</option>
                        <option value="high-to-low">Price: High to Low</option>
                    </select>
                </div>

                {/* Product Grid */}
                <div className={filteredProducts.length > 0 ? "grid" : " no-results-grid"}>
    {filteredProducts.length > 0 ? (
        filteredProducts.map((product) => (
            <Link to={`/product/${product._id}`} key={product._id} className="product-card">
                <div className="border product-container">
                    <img
                        src={Array.isArray(product.image) ? product.image[0] : product.image}
                        alt={product.name}
                        className="product-image"
                    />
                    <div className="product-info">
                        <h3>{product.name}</h3>
                        <p>₹{product.price}</p>
                    </div>
                </div>
            </Link>
        ))
    ) : (
        <p className="no-results">No Results Found</p>
    )}
</div>

{/* <div className="grid">
    {filteredProducts.length > 0 ? (
        filteredProducts.map((product) => (
            <Link to={`/product/${product._id}`} key={product._id} className="product-card">
                <div className="border product-container">
                    <img
                        src={Array.isArray(product.image) ? product.image[0] : product.image}
                        alt={product.name}
                        className="product-image"
                    />
                    <div className="product-info">
                        <h3>{product.name}</h3>
                        <p>₹{product.price}</p>
                    </div>
                </div>
            </Link>
        ))
    ) : (
        <p className="no-results">No Results Found</p>
    )}
</div> */}

                
            </div>
        </div>
    );
};

export default ProCol;
