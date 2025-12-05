// import { supabase } from '../supabase-client'

import React, { useEffect, useState } from "react";
import "../CSS/user.css";

import { Link, useLocation } from "react-router-dom";
 import { TiShoppingCart } from "react-icons/ti";
 import { CgProfile } from "react-icons/cg";
import { HiMenuAlt3, HiX } from "react-icons/hi";


function Header() {
  const location = useLocation();

  // Static Navbar Links
  const navLinks = [
    { path: "/shop", label: "Shop" },
    { path: "/shop/men", label: "Men" },
    { path: "/shop/women", label: "Women" },
    { path: "/shop/kids", label: "Kids" },
  ];


  return (
    <nav className="sticky top-0 z-50 bg-white backdrop-blur-lg shadow-md border-b border-gray-100 transition-all duration-300  ">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl md:text-3xl font-extrabold text-gray-800 tracking-tight hover:text-gray-900 transition-colors"
        >
          Shop<span className="text-blue-600">Here</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`relative text-[16px] font-medium transition-all duration-300 ${
                location.pathname === link.path
                  ? "text-blue-600 after:w-full"
                  : "text-gray-700 hover:text-blue-600"
              } after:content-[''] after:absolute after:w-0 after:h-[2px] after:left-0 after:-bottom-1 after:bg-blue-600 after:transition-all after:duration-300 hover:after:w-full`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right Icons */}
        <div className="flex items-center space-x-5">

          {/* Cart */}
          <Link
            to="/cart"
            className="relative group hover:scale-110 transition-transform duration-300"
          >
            <TiShoppingCart className="text-2xl text-gray-800 group-hover:text-blue-600 transition-colors" />
          </Link>

          {/* Profile */}
          <Link
            to="/logins"
            className="flex items-center gap-1 hover:scale-110 transition-transform duration-300"
          >
            <CgProfile className="text-2xl text-gray-800 hover:text-blue-600 transition-colors" />
            <span className="hidden sm:block text-sm font-medium text-gray-700 hover:text-blue-600">
              Login
            </span>
          </Link>

          {/* Mobile Menu Icon (Disabled State) */}
          <button className="md:hidden text-3xl text-gray-700 focus:outline-none">
            <HiMenuAlt3 />
          </button>
        </div>
      </div>


    </nav>
  );
}

export default Header;