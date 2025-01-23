// src/Navbar.js
import React from "react";
import { Link } from "react-scroll";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="brand-name">Krishi Dristi </div>
        <ul className="navbar-links">
          <li>
            <Link
              to="Page1"
              smooth={true}
              duration={500}
              spy={true}
              offset={-60} /* Adjust for navbar height */
              activeClass="active-link" /* Adds active-link class when this link is active */
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="Page2"
              smooth={true}
              duration={500}
              spy={true}
              offset={-60}
              activeClass="active-link"
            >
              Services
            </Link>
          </li>
          <li>
            <Link
              to="Page3"
              smooth={true}
              duration={500}
              spy={true}
              offset={-60}
              activeClass="active-link"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="contact"
              smooth={true}
              duration={500}
              spy={true}
              offset={-60}
              activeClass="active-link"
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
