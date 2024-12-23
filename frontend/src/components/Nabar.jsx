import React,{useState} from 'react'
import { Link } from "react-router-dom";
import { FaSearch, FaUserCircle, FaShoppingCart, FaHeart } from 'react-icons/fa';
import './Navbar.css';

const Nabar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  return (
    

     <nav className="navbar">
         
          <div className="navbar-line1">
            <div className="search-bar">
              <input type="text" placeholder="Search..." />
              <button type="submit">
                <FaSearch />
              </button>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
      <h1 className="gradient-text">Mytalorzone By Sahiba</h1>
    </div>
    
    <div className="some-component">
    <Link to="/Login"><button >Login</button></Link>
    </div>
      
            {/* <div className="logo"></div> */}
            <div className="icons">
              {/* <FaUserCircle className="icon" />
              <FaHeart className="icon" />
              <FaShoppingCart className="icon" /> */}
              {/* User Circle with Dropdown */}
      <div className="icon-dropdown">
        <FaUserCircle className="icon" onClick={toggleDropdown} />
        {isDropdownOpen && (
          <div className="dropdown-menu">
            <ul>
              <li><Link to="/profile" className="dropdown-item">My Profile</Link></li>
              <li><Link to="/orders" className="dropdown-item">My Orders</Link></li>
              <li><Link to="/logout" className="dropdown-item">Logout</Link></li>
            </ul>
            
            
            
          </div>
        )}
      </div>

      {/* Heart Icon with Link */}
      <Link to="/favorites">
        <FaHeart className="icon" />
      </Link>

      {/* Shopping Cart Icon with Link */}
      <Link to="/Cart">
        <FaShoppingCart className="icon" />
      </Link>
            </div>
          </div>
    
          
          <div className="navbar-line2">
            
            <div className="sections">
      <Link to="/" className="nav-link">Home</Link>
      {/* <Link to="/ProCol" className="nav-link">Collection</Link> */}
      <Link to="/ProCol" className="nav-link">Collection</Link>
      <Link to="/NewArrivals" className="nav-link">New Arrivals</Link>
      <Link to="/BestSellers" className="nav-link">Best Sellers</Link>
      {/* <Link to="/About" className="nav-link">About Us</Link>
      <Link to="/Contact" className="nav-link">Contact Us</Link> */}
      
    </div>
          </div>
        </nav>
      );
  
}

export default Nabar
