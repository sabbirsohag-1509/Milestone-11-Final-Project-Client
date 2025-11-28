import React from "react";
import Logo from "../../../components/Logo/Logo";
import { NavLink, Link } from "react-router";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";

const Navbar = () => {
  const { user, logOutInfo } = useAuth();
  console.log(user);

  const logOutHandler = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out from zapShift!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#CAEB66",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log me out",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        logOutInfo();
        Swal.fire({
          icon: "success",
          title: "Logged out!",
          timer: 1200,
          showConfirmButton: false,
        });
      }
    });
  };

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
          Coverage Areas
        </NavLink>
      </li>
      <li>
        <NavLink to="/send-parcel" className={linkStyle}>
          Send a Parcel
        </NavLink>
      </li>
      <li>
        <NavLink to="/rider" className={linkStyle}>
          Be a Rider
        </NavLink>
      </li>
      {user && (
        <li>
          <NavLink to="/dashboard" className={linkStyle}>
            Dashboard
          </NavLink>
        </li>
      )}

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
        <ul className="menu menu-horizontal px-1 gap-2">{links}</ul>
      </div>

      {/* Right Side */}
      <div className="navbar-end">
        {/* If user is logged in */}
        {user ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="User"
                  src={user?.photoURL || "https://i.ibb.co/mb9zwfL/user.png"}
                />
              </div>
            </div>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-10 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li className="font-semibold px-2 pt-1">
                {user?.displayName || "User"}
              </li>
              <li className="text-sm px-2 pb-2">{user?.email}</li>

              <li>
                <button
                  onClick={logOutHandler}
                  className="text-red-600 font-semibold bg-[#CAEB66] "
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          // If user is NOT logged in
          <div className="flex gap-3">
            <Link
              to="/login"
              className="btn px-6 py-2 rounded-xl bg-[#dee1e7] text-black font-semibold shadow"
            >
              Login
            </Link>
            <Link
              to="/rider"
              className="btn px-6 py-2 rounded-xl bg-[#CAEB66] text-black font-semibold shadow"
            >
              Be a Rider
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
