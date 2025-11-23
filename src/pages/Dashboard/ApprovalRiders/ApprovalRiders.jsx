import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";

const ApprovalRiders = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

  const { data: riders = [] } = useQuery({
    queryKey: ["approvalRiders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders");
      return res.data;
    },
  });
    // console.log(riders);
    const updatedRiderStatus = (id , status) => {
        const updatedInfo = {
      status: status,
    };
      axiosSecure.patch(`/riders/${id}`, updatedInfo)
          .then((res) => {
      if (res.data.modifiedCount) {
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: `Rider has been ${status}`,
          showConfirmButton: false,
          timer: 2000,
        });
          queryClient.invalidateQueries(['approvalRiders']);
      }
    });
    }

  const handleApproveBtn = (id) => {
    updatedRiderStatus(id, "Approved")
    };
    
    const handleRejectedBtn = (id) => {
        updatedRiderStatus(id, "Rejected")
    }

  //   if (isLoading) {
  //     return <div>Loading...</div>;
  //   }

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
              <th>Status</th>
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
                  <span className={`${rider.status ==='Approved'? "bg-green-600 text-white border-0 px-2 py-1 rounded-lg text-sm":"badge badge-warning"}`}>{rider.status}</span>
                </td>

                {/* ACTION BUTTONS */}
                <td className="space-x-2">
                  <button
                    onClick={() => handleApproveBtn(rider._id)}
                     className={`btn btn-success btn-sm ${rider.status === 'Approved' ? 'btn-disabled' : ''}`}
                  >
                    Approve
                  </button>
                        <button onClick={() => handleRejectedBtn(rider._id)} className="btn btn-error btn-sm">Reject</button>
                        <button className="btn btn-secondary btn-sm">Delete</button>
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
