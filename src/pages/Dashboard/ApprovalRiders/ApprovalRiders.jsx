import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";

const ApprovalRiders = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const { data: riders = [], isLoading } = useQuery({
    queryKey: ["approvalRiders", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders");
      return res.data;
    },
  });
  // console.log(riders);
  const updatedRiderStatus = (rider, status) => {
    const updatedInfo = {
      status: status,
      email: rider.email,
    };
    axiosSecure.patch(`/riders/${rider._id}`, updatedInfo)
      .then((res) => {
      if (res?.data?.modifiedCount || res?.data?.result?.modifiedCount) {
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: `Rider has been ${status}`,
          showConfirmButton: false,
          timer: 2000,
        });
        queryClient.invalidateQueries(["approvalRiders"]);
      }
    });
  };

  const handleApproveBtn = (rider) => {
    updatedRiderStatus(rider, "Approved");
  };

  const handleRejectedBtn = (rider) => {
    updatedRiderStatus(rider, "Rejected");
  };
  //delete rider
  const deleteRiderBtn = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/riders/${id}`).then((res) => {
          if (res.data.deletedCount) {
            Swal.fire({
              position: "top-center",
              icon: "success",
              title: "Rider has been deleted",
              showConfirmButton: false,
              timer: 2000,
            });

            queryClient.invalidateQueries(["approvalRiders"]);
          }
        });
      }
    });
  };

  //   // Show loading state

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2 className="text-4xl font-bold text-secondary mb-6">
        Riders Pending Approval: {riders.length}
      </h2>

      <div className="overflow-x-auto shadow-lg rounded-lg bg-base-100 p-4">
        <table className="table table-zebra w-full">
          <thead className="text-lg">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>NID No.</th>
              <th>District</th>
              <th>Application Status</th>
              <th>Work Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {riders.map((rider, index) => (
              <tr key={rider._id} className="text-base">
                <td>{index + 1}</td>
                <td>{rider.name}</td>
                <td>{rider.email}</td>
                <td>{rider.nid}</td>
                <td>{rider.district}</td>
                <td>
                  <span
                    className={`${
                      rider.status === "Approved"
                        ? "bg-green-600 text-white border-0 px-2 py-1 rounded-lg text-sm"
                        : "badge badge-warning"
                    }`}
                  >
                    {rider.status}
                  </span>
                </td>

                {/* Work Status  */}
                <td> 
                  {rider.workStatus}
                </td>

                {/* ACTION BUTTONS */}
                <td className=" flex gap-2 items-center">
                  <button
                    onClick={() => handleApproveBtn(rider)}
                    className={`btn btn-success btn-sm ${
                      rider.status === "Approved" ? "btn-disabled" : ""
                    }`}
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleRejectedBtn(rider)}
                    className="btn btn-error btn-sm"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => deleteRiderBtn(rider._id)}
                    className="btn btn-secondary btn-sm "
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApprovalRiders;
