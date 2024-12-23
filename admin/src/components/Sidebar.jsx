import React from 'react';
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-buttons">
        <NavLink 
          to="/add" 
          className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
          <img src={assets.add_icon} alt="Add Items" className="sidebar-icon" />
          <span className="sidebar-text">Add Items</span>
        </NavLink>
        <NavLink 
          to="/list" 
          className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
          <img src={assets.order_icon} alt="List Items" className="sidebar-icon" />
          <span className="sidebar-text">List Items</span>
        </NavLink>
        <NavLink 
          to="/orders" 
          className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
          <img src={assets.order_icon} alt="Orders" className="sidebar-icon" />
          <span className="sidebar-text">Orders</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
