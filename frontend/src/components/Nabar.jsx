


// import React, { useContext, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { FaSearch, FaUserCircle, FaShoppingCart, FaHeart } from 'react-icons/fa';
// import './Navbar.css';
// import { ShopContext } from '../context/ShopContext';


// const Nabar = () => {
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const { token, setToken ,addToCart , removeFromCart } = useContext(ShopContext);
//   const navigate = useNavigate();

//   const logout = () => {
//     navigate('/Login');
//     localStorage.removeItem('token');
//     setToken('');
//     setIsDropdownOpen(false);
//   };

//   // const toggleDropdown = () => {
//   //   setIsDropdownOpen((prev) => !prev);
//   // };
//   const handleProfileClick = () => {
//     token ? null : navigate('/Login');
//     setIsDropdownOpen(false);
//   };

//   const handleMouseEnter = () => {
//     setIsDropdownOpen(true);
//   };



  

//   return (
//     <nav className="navbar">
//       <div className="navbar-line1">
//         <div className="search-bar">
//           <input type="text" placeholder="Search..." />
//           <button type="submit">
//             <FaSearch />
//           </button>
//         </div>
//         <div
//           style={{
//             display: 'flex',
//             justifyContent: 'center',
//             alignItems: 'center',
//             backgroundColor: '#fff',
//           }}
//         >
//           <h1 className="gradient-text">Mytalorzone By Sahiba</h1>
//         </div>

//         <div className="icons">
//           <div
//             className="icon-dropdown"
//             onMouseEnter={handleMouseEnter}
           
//           >
//             <FaUserCircle className="icon" onClick={handleProfileClick} />
            

//             { token && isDropdownOpen && (
//               <div className="dropdown-menu">
//                 <ul>
//                   <li>
//                     <Link to="/profile" className="dropdown-item">
//                       My Profile
//                     </Link>
//                   </li>
                  
//                     {/* <Link to="/orders" className="dropdown-item">
//                       My Orders
//                     </Link> */}
//                     <li onClick={()=>navigate('/Orders')} className="dropdown-item">
//                       My Orders
                    
//                   </li>
//                   <li onClick={logout} className="dropdown-item">
//                     Logout
//                   </li>
//                 </ul>
//               </div>
//             )}
//           </div>

         

//           {/* Shopping Cart Icon with Link */}
//           <Link to="/Cart">
//             <FaShoppingCart className="icon" />
//           </Link>
//         </div>
//       </div>

//       <div className="navbar-line2">
//         <div className="sections">
//           <Link to="/" className="nav-link">
//             Home
//           </Link>
//           <Link to="/ProCol" className="nav-link">
//             Collection
//           </Link>
//           <Link to="/NewArrivals" className="nav-link">
//             New Arrivals
//           </Link>
//           <Link to="/BestSellers" className="nav-link">
//             Best Sellers
//           </Link>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Nabar;


import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaUserCircle, FaShoppingCart } from 'react-icons/fa';
import './Navbar.css';
import { ShopContext } from '../context/ShopContext';
import { toast} from "react-toastify";


const Nabar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { token, setToken } = useContext(ShopContext);
  const navigate = useNavigate();

  const logout = () => {
    navigate('/Login');
    localStorage.removeItem('token');
    setToken('');
    setIsDropdownOpen(false);
  };

  const handleProfileClick = () => {
    if (!token) navigate('/Login');
    setIsDropdownOpen(false);
  };

  const handleMouseEnter = () => {
    setIsDropdownOpen(true);
  };

  const handleCartClick = () => {
    const localToken = localStorage.getItem('token');
    if (localToken) {
      navigate('/Cart');
    } else {
        toast.error("Please login to access the cart!");
      // toast.error("Please login to access the cart!", {
      //   position: toast.POSITION.TOP_CENTER,
      //   autoClose: 3000,
      // });
    }
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
          <h1 className="gradient-text">Mytalorzone</h1>
        </div>

        <div className="icons">
          <div
            className="icon-dropdown"
            onMouseEnter={handleMouseEnter}
          >
            <FaUserCircle className="icon" onClick={handleProfileClick} />

            {token && isDropdownOpen && (
              <div className="dropdown-menu">
                <ul>
                  <li>
                    <Link to="/profile" className="dropdown-item">
                      My Profile
                    </Link>
                  </li>
                  <li
                    onClick={() => navigate('/Orders')}
                    className="dropdown-item"
                  >
                    My Orders
                  </li>
                  <li onClick={logout} className="dropdown-item">
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Shopping Cart Icon with Conditional Access */}
          <div onClick={handleCartClick}>
            <FaShoppingCart className="icon" />
          </div>
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

