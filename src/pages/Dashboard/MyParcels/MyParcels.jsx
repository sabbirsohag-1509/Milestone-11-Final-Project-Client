import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { MdPageview } from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";
import { IoTrashSharp } from "react-icons/io5";
import Swal from "sweetalert2";
import { Link } from "react-router";

const MyParcels = () => {
  const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

  // Fetch data from DB
  const {
    data: parcels = [],
    isLoading,
      error,
    refetch,
  } = useQuery({
    queryKey: ["myParcels", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user.email}`);
      return res.data;
    },
  });

  // Delete handler
  const deleteHandlerBtn = (id) => {
    // console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/parcels/${id}`).then((res) => {
        //   console.log(res.data);
            if (res.data.deletedCount) {
              // refetch data refresh the data
              refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your parcel request has been deleted.",
              icon: "success",
            });
            }

        });
      }
    });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">
        All My Parcels: {parcels.length}
      </h1>

      <div className="overflow-x-auto">
        <table className="table">
          {/* Table head */}
          <thead className="bg-primary text-white">
            <tr>
              <th>#</th>
              <th>Parcel Name</th>
              <th>Type</th>
              <th>Weight (KG)</th>
              <th>Receiver</th>
              <th>From</th>
              <th>To</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          {/* Table body */}
          <tbody>
            {parcels.map((parcel, index) => (
              <tr key={parcel._id}>
                <th>{index + 1}</th>
                <td>{parcel.parcelName}</td>
                <td className="capitalize">{parcel.parcelType}</td>
                <td>{parcel.parcelWeight}</td>
                <td>{parcel.receiverName}</td>

                {/* From */}
                <td>
                  {parcel.senderDistrict}, {parcel.senderRegion}
                </td>

                {/* To */}
                <td>
                  {parcel.receiverDistrict}, {parcel.receiverRegion}
                </td>
                {/* Payment */}
                <td> 
                  {
                    parcel.paymentStatus === 'Paid' ?<span className="badge badge-success">Paid</span> :
                    <Link to={`/dashboard/payment/${parcel._id}`} className="badge badge-warning">Pay</Link>
                  }
                </td>

                {/* Status */}
                <td>
                  <span className="badge badge-info">Pending</span>
                </td>
                {/* view details, edit, delete */}
                <td className="flex">
                  <button className="flex gap-1 items-center py-1 px-2.5 hover:bg-primary rounded-xl cursor-pointer">
                    <MdPageview />
                    Details
                  </button>
                  <button className="flex gap-1 items-center py-1 px-2.5 hover:bg-primary rounded-xl cursor-pointer">
                    <FaUserEdit />
                    Edit
                  </button>
                  <button
                    onClick={() => deleteHandlerBtn(parcel._id)}
                    className="flex gap-1 items-center py-1 px-2.5 hover:bg-primary rounded-xl cursor-pointer"
                  >
                    <IoTrashSharp />
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

export default MyParcels;
