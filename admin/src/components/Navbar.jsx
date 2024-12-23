// import React from 'react'
// import {Link} from 'react-router-dom'
// import './Navbar.css';


// const Navbar = ({setToken}) => {
//   return (
//     <div className='abc'>
//           <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
//       <h1 className="gradient-text">Mytalorzone By Sahiba</h1>
//       <Link to="/Logout"><button onClick={()=>setToken('')}>Logout</button></Link>
//     </div>
    
   
//     </div>
//   )
// }

// export default Navbar

import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ setToken }) => {
  return (
    <div className="navbar">
      <div className="navbar-container">
        <h1 className="navbar-title">Mytalorzone By Sahiba</h1>
        <div className='abc'>
        <Link to="/Logout">
          <button className="logout-button" onClick={() => setToken('')}>Logout</button>
        </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
