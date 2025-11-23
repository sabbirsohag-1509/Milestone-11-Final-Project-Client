import React from "react";
import { Link, NavLink, Outlet } from "react-router";
import Logo from "../components/Logo/Logo";

const DashBoardLayout = () => {
  return (
    <div className=" max-w-6xl mx-auto drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar w-full bg-base-300">
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost"
          >
            {/* Sidebar toggle icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
              className="my-1.5 inline-block size-4"
            >
              <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
              <path d="M9 4v16"></path>
              <path d="M14 10l2 2l-2 2"></path>
            </svg>
          </label>
          <div className="flex justify-between w-full items-center gap-4">
            <div className="px-4">
              <Logo></Logo>
            </div>
            <div>
              <h1 className="font-bold text-2xl text-secondary">Dashboard:</h1>
            </div>
          </div>
        </nav>
        {/* Page content here */}
        <Outlet></Outlet>
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
          {/* Sidebar content here */}
          <ul className="menu w-full grow">
            {/* List item */}
            <li>
              <Link
                to="/"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Homepage"
              >
                {/* Home icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                  className="my-1.5 inline-block size-4"
                >
                  <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
                  <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                </svg>
                <span className="is-drawer-close:hidden">Homepage</span>
              </Link>
            </li>
            {/* Send a Parcel */}
            <li>
              <NavLink to="/send-parcel">
                <span
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Send a Parcel"
                >
                  {/* Send Parcel icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="my-1.5 inline-block size-4"
                  >
                    <rect x="3" y="6" width="18" height="12" rx="2" />
                    <path d="M3 10h18" />
                    <path d="M9 6v4" />
                    <path d="M15 6v4" />
                  </svg>

                  <span className="is-drawer-close:hidden ml-2">
                    Send a Parcel
                  </span>
                </span>
              </NavLink>
            </li>
            {/* My Parcel  */}
            <li>
              <NavLink to="/dashboard/my-parcels">
                <span
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="My Parcels"
                >
                  {/* Parcel icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2"
                    fill="none"
                    stroke="currentColor"
                    className="my-1.5 inline-block size-4"
                  >
                    <path d="M21 16V8a2 2 0 0 0-1-1.732l-7-4.286a2 2 0 0 0-2 0l-7 4.286A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.732l7 4.286a2 2 0 0 0 2 0l7-4.286A2 2 0 0 0 21 16z"></path>
                    <path d="M3.27 6.96l8.73 5.34a2 2 0 0 0 2 0l8.73-5.34"></path>
                    <path d="M12 22V12"></path>
                  </svg>
                  <span className="is-drawer-close:hidden ml-2">
                    My Parcels
                  </span>
                </span>
              </NavLink>
            </li>
            {/* Payment History  */}
            <li>
              <NavLink to="/dashboard/payment-history">
                <span
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Payment History"
                >
                  {/* Payment History icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2"
                    fill="none"
                    stroke="currentColor"
                    className="my-1.5 inline-block size-4"
                  >
                    <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-10V6m0 12v-2"></path>
                    <path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"></path>
                  </svg>
                  <span className="is-drawer-close:hidden ml-2">
                    Payment History
                  </span>
                </span>
              </NavLink>
            </li>
            {/* Approve Rider  */}
            <li> 
              <NavLink to="/dashboard/approve-riders">
                <span
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Approve Riders"
                >
                  {/* Approve Rider icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2"
                    fill="none"
                    stroke="currentColor"
                    className="my-1.5 inline-block size-4"
                  >
                    <path d="M12 20h9"></path>
                    <path d="M12 4h9"></path> 
                    <path d="M4 12h16"></path>
                    <path d="M3 3l18 18"></path>
                  </svg>
                  <span className="is-drawer-close:hidden ml-2">
                    Approve Riders
                  </span>
                </span>
              </NavLink>
            </li>

            {/* List item */}
            <li>
              <button
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Settings"
              >
                {/* Settings icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                  className="my-1.5 inline-block size-4"
                >
                  <path d="M20 7h-9"></path>
                  <path d="M14 17H5"></path>
                  <circle cx="17" cy="17" r="3"></circle>
                  <circle cx="7" cy="7" r="3"></circle>
                </svg>
                <span className="is-drawer-close:hidden">Settings</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashBoardLayout;
