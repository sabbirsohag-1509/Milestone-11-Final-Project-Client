import React from "react";
import Logo from "../../../components/Logo/Logo";
import { NavLink } from "react-router";

const Navbar = () => {
  const linkStyle = ({ isActive }) =>
    isActive
      ? "px-4 py-2 rounded-full bg-[#CAEB66] text-black font-semibold shadow-sm"
      : "px-4 py-2 rounded-full hover:bg-[#e9f8c2] transition-all font-medium";

  const links = (
    <>
      <li>
        <NavLink to="/" className={linkStyle}>
          Services
        </NavLink>
      </li>
      <li>
        <NavLink to="/coverage" className={linkStyle}>
          Coverage
        </NavLink>
      </li>
      <li>
        <NavLink to="/aboutUs" className={linkStyle}>
          About Us
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm">
      {/* Left Start */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>

          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>

        <a className="btn btn-ghost text-xl">
          <Logo />
        </a>
      </div>

      {/* Center Menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2">
          {links}
        </ul>
      </div>

      {/* Right Side Button (Optional) */}
      <div className="navbar-end">
        <button className="px-6 py-2 rounded-full bg-[#CAEB66] text-black font-semibold shadow">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Navbar;
