import React, { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FiShieldOff } from "react-icons/fi";
import { FaUserShield } from "react-icons/fa";
import Swal from "sweetalert2";

const UsersManagement = () => {
  const axiosSecure = useAxiosSecure();
  const [searchText, setSearchText] = useState("");
  const { data: users = [], refetch } = useQuery({
    queryKey: ["usersManagement", searchText],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?searchText=${searchText}`);
      return res.data;
    },
  });

  //Handle Make Admin
  const handleMakeAdmin = (user) => {
    const roleInfo = {
      role: "Admin",
    };
    axiosSecure.patch(`/users/${user._id}/role`, roleInfo).then((res) => {
      if (res.data.modifiedCount) {
        refetch();
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: `${user.displayName} Marked as an Admin.`,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    });
  };
  //Handle Remove Admin
  const handleRemoveAdmin = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Do you really want to remove ${user.displayName} from Admin?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, remove!",
    }).then((result) => {
      if (result.isConfirmed) {
        const roleInfo = { role: "User" };
        axiosSecure.patch(`/users/${user._id}/role`, roleInfo).then((res) => {
          if (res.data.modifiedCount) {
            refetch();
            Swal.fire({
              position: "top-center",
              icon: "success",
              title: `${user.displayName} Removed from Admin.`,
              showConfirmButton: false,
              timer: 2000,
            });
          }
        });
      }
    });
  };

  return (
    <div>
      <h1 className="text-3xl font-bold p-3 ">
        Users Management({users.length})
      </h1>
      <p>Search:{searchText }</p>
      {/* searching users implementation  */}
      <div className="form-control w-1/3 mb-4 ml-3">
        <label className="input">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input onChange={(e)=>setSearchText(e.target.value)} type="search" required placeholder="Search Users" />
        </label>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>
                <span>#</span>
              </th>
              <th>User</th>
              <th>Email</th>
              <th>Admin Action</th>
              <th>Others Action</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <th>
                  <span>{index + 1}</span>
                </th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={user.photoURL}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{user.displayName}</div>
                      <div className="text-sm opacity-50">{user.role}</div>
                    </div>
                  </div>
                </td>
                <td>
                  {user.email || "N/A"}
                  <br />
                </td>
                <td>
                  {user.role === "Admin" ? (
                    <span
                      onClick={() => handleRemoveAdmin(user)}
                      className="text-green-600 font-semibold flex items-center cursor-pointer"
                    >
                      <FiShieldOff></FiShieldOff> Admin
                    </span>
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(user)}
                      className="btn btn-ghost text-red-600 btn-xs flex items-center cursor-pointer"
                    >
                      <FaUserShield></FaUserShield> Make Admin
                    </button>
                  )}
                </td>
                <th>
                  <button className="btn btn-ghost btn-xs">details</button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersManagement;
