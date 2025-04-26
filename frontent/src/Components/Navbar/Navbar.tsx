import React from "react";
import { Link } from "react-router-dom";
import logo from "./logo.png";
import "./Navbar.css";

interface Props {}

const Navbar = (props: Props) => {
  return (
    <nav className="relative container mx-auto p-6">
      <div className="flex items-center justify-between">
        {/* Left Side: Logo + Nav Items */}
        <div className="flex items-center space-x-20">
          <Link to="/">
            <img src={logo} alt="Logo" className="h-8 w-auto" />
          </Link>

          <div className="hidden font-bold lg:flex space-x-6">
            <Link to="/search" className="text-black hover:text-darkBlue">
              Search
            </Link>
            <Link to="/design" className="text-black hover:text-darkBlue">
              Design Guide
            </Link>
     
          </div>
        </div>

        {/* Right Side: You can add more nav links here if needed */}
        {/* <div className="hidden lg:flex items-center space-x-6 text-back">
          <Link to="/about" className="hover:text-darkBlue">
            About
          </Link>
          <Link to="/contact" className="hover:text-darkBlue">
            Contact
          </Link>
        </div> */}
      </div>
    </nav>
  );
};

export default Navbar;
