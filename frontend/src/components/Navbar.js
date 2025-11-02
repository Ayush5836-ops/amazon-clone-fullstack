import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-left">
        <h2 className="logo">Amazon Clone</h2>
      </div>
      <div className="nav-right">
        <Link to="/">Home</Link>
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
        <Link to="/cart">Cart 🛒</Link>
      </div>
    </nav>
  );
};

export default Navbar;
