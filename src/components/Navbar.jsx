
import React from "react";
import { Link, NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        🪔 AURORA<span className="gold">DIWALI</span>
      </Link>

      <div className="nav-links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/diya">Light up Diya</NavLink>
        <NavLink to="/rangoli">Rangoli</NavLink>
        <NavLink to="/greetings">Greetings</NavLink>
        <NavLink to="/celebration">Fireworks</NavLink>
      </div>

      <Link to="/greetings" className="nav-button">
        Send a Wish ✨
      </Link>
    </nav>
  );
}

export default Navbar;
