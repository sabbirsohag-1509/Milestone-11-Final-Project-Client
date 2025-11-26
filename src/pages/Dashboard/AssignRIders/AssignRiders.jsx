import { useQuery } from "@tanstack/react-query";
import React, { useRef } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AssignRiders = () => {
    const axiosSecure = useAxiosSecure();
    const riderModalRef = useRef();

  const { data: parcels = [] } = useQuery({
    queryKey: ["parcels", "pending-pickup"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels?deliveryStatus=Pending-Pickup`
      );
      return res.data;
    },
  });
    ///
    const openAssignRiderModal = (parcel) => {
        riderModalRef.current.showModal();
    }
    
  return (
    <div>
      <h2 className="text-3xl font-bold p-3">
        Assign Riders:({parcels.length})
      </h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Parcel Name</th>
              <th>Cost</th>
              <th>Created At</th>
              <th>Sender Name</th>
              <th>Pickup District</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, index) => (
              <tr>
                <th>{index + 1}</th>
                <td>{parcel.parcelName}</td>
                <td>{parcel.cost}</td>
                <td>{parcel.createdAt}</td>
                <td>{parcel.senderName}</td>
                <td>{parcel.senderDistrict}</td>
                <td>
                  <button onClick={()=>openAssignRiderModal(parcel)} className="btn btn-primary text-black rounded-md">
                    Assign Riders
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
          </div>
          
          {/* MODAL  */}
      <dialog ref={riderModalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">
            Press ESC key or click the button below to close
          </p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AssignRiders;
