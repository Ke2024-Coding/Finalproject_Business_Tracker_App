import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>Budget Tracker</h1>
      <ul className="nav-links">
        <li><Link to="/">Overview</Link></li>
        <li><Link to="/add-income">Add Income</Link></li>
        <li><Link to="/add-expenses">Add Expenses</Link></li>
        <li><Link to="/manage-categories">Manage Categories</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
