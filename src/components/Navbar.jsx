import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { Link, NavLink } from "react-router-dom";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Simulate checking authentication from localStorage or a context
  useEffect(() => {
    const token = localStorage.getItem('token'); // Or wherever you store the token
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <nav>
      <Link to="/" className="title">
        {isAuthenticated ? "Welcome" : "Login"}
      </Link>
      <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={menuOpen ? "open" : ""}>
        <li>
          <NavLink to="/about">About</NavLink>
        </li>
        <li>
          <NavLink to="/contact">Contact</NavLink>
        </li>
      </ul>
    </nav>
  );
};
