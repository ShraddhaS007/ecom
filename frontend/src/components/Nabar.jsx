// import React,{useContext, useState} from 'react'
// import { Link } from "react-router-dom";
// import { FaSearch, FaUserCircle, FaShoppingCart, FaHeart } from 'react-icons/fa';
// import './Navbar.css';
// import { ShopContext } from '../context/ShopContext';
// import { useNavigate } from 'react-router-dom';

// const Nabar = () => {
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const {token,setToken}=useContext(ShopContext);
//   const navigate = useNavigate(); 

//   const logout=()=>{
//     console.log("Navigate function",navigate);
//     navigate('/Login')
//     localStorage.removeItem('token')
//     // setToken('')
//     setIsDropdownOpen(false);
    
         
//   }
 

//   const toggleDropdown = () => {
//     setIsDropdownOpen(!isDropdownOpen);
//   };
//   return (
    

//      <nav className="navbar">
         
//           <div className="navbar-line1">
//             <div className="search-bar">
//               <input type="text" placeholder="Search..." />
//               <button type="submit">
//                 <FaSearch />
//               </button>
//             </div>
//             <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
//       <h1 className="gradient-text">Mytalorzone By Sahiba</h1>
//     </div>
    
//     <div className="some-component">
//     <Link to="/Login"><button >Login</button></Link>
//     </div>
      
           
//             <div className="icons">
              
//       <div className="icon-dropdown">
//         <FaUserCircle className="icon" onClick={toggleDropdown} />
//         {isDropdownOpen && (
//           <div className="dropdown-menu">
//             <ul>
//               <li><Link to="/profile" className="dropdown-item">My Profile</Link></li>
//               <li><Link to="/orders" className="dropdown-item">My Orders</Link></li>
//               <li onClick={logout}className="dropdown-item">Logout</li>
//             </ul>
            
            
            
//           </div>
//         )}
//       </div>

//       {/* Heart Icon with Link */}
//       <Link to="/favorites">
//         <FaHeart className="icon" />
//       </Link>

//       {/* Shopping Cart Icon with Link */}
//       <Link to="/Cart">
//         <FaShoppingCart className="icon" />
//       </Link>
//             </div>
//           </div>
    
          
//           <div className="navbar-line2">
            
//             <div className="sections">
//       <Link to="/" className="nav-link">Home</Link>
//       {/* <Link to="/ProCol" className="nav-link">Collection</Link> */}
//       <Link to="/ProCol" className="nav-link">Collection</Link>
//       <Link to="/NewArrivals" className="nav-link">New Arrivals</Link>
//       <Link to="/BestSellers" className="nav-link">Best Sellers</Link>
//       {/* <Link to="/About" className="nav-link">About Us</Link>
//       <Link to="/Contact" className="nav-link">Contact Us</Link> */}
      
//     </div>
//           </div>
//         </nav>
//       );
  
// }

// export default Nabar


import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaUserCircle, FaShoppingCart, FaHeart } from 'react-icons/fa';
import './Navbar.css';
import { ShopContext } from '../context/ShopContext';

const Nabar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { token, setToken } = useContext(ShopContext);
  const navigate = useNavigate();

  const handleProfileClick = () => {
    token ? null : navigate('/Login');
    setIsDropdownOpen(false);
  };

  const handleMouseEnter = () => {
    setIsDropdownOpen(true);
  };



  const logout = () => {
    navigate('/Login');
    localStorage.removeItem('token');
    setToken('');
    setIsDropdownOpen(false);
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
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#fff',
          }}
        >
          <h1 className="gradient-text">Mytalorzone By Sahiba</h1>
        </div>

        <div className="icons">
          <div
            className="icon-dropdown"
            onMouseEnter={handleMouseEnter}
           
          >
            <FaUserCircle className="icon" onClick={handleProfileClick} />
            { token && isDropdownOpen && (
              <div className="dropdown-menu">
                <ul>
                  <li>
                    <Link to="/profile" className="dropdown-item">
                      My Profile
                    </Link>
                  </li>
                  <li>
                    <Link to="/orders" className="dropdown-item">
                      My Orders
                    </Link>
                  </li>
                  <li onClick={logout} className="dropdown-item">
                    Logout
                  </li>
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
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/ProCol" className="nav-link">
            Collection
          </Link>
          <Link to="/NewArrivals" className="nav-link">
            New Arrivals
          </Link>
          <Link to="/BestSellers" className="nav-link">
            Best Sellers
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Nabar;
