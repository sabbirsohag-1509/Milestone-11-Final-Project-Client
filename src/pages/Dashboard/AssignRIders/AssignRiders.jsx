import { useQuery } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AssignRiders = () => {
  const axiosSecure = useAxiosSecure();
  const riderModalRef = useRef();
  const [selectedParcel, setSelectedParcel] = useState(null);

  // Fetch parcels with Pending-Pickup
  const { data: parcels = [] , refetch: refetchParcels} = useQuery({
    queryKey: ["parcels", "pending-pickup"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?deliveryStatus=Pending-Pickup`);
      return res.data;
    },
  });

  // Fetch riders for selected parcel
  const { data: riders = []  } = useQuery({
    queryKey: ['riders', selectedParcel?.senderDistrict, 'Available'],
    enabled: !!selectedParcel,
    queryFn: async () => {
      const district = selectedParcel.senderDistrict.trim();
      const res = await axiosSecure.get(
        `/riders?status=Approved&district=${district}&workStatus=Available`
      );
      return res.data;
      
    },
  });

  // Open modal and select parcel
  const openAssignRiderModal = (parcel) => {
    setSelectedParcel(parcel);
    riderModalRef.current.showModal();
  };

  // Assign rider handler 
  const handleAssignRider = (rider) => {
    const riderAssignInfo = {
      riderId: rider._id,
      riderName: rider.name,
      riderEmail: rider.email,
      parcelId: selectedParcel._id,
      parcelName: selectedParcel.parcelName,
      trackingId: selectedParcel.trackingId, 
    };
    try {
       axiosSecure.patch(`/parcels/${selectedParcel._id}`, riderAssignInfo)
        .then(res => {
          if(res.data?.result?.modifiedCount > 0){
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: `Rider ${rider.name} assigned to parcel ${selectedParcel.parcelName} successfully`,
            })
            riderModalRef.current.close();
            refetchParcels();
          }
        });
    } catch (error) {
      console.error("Error assigning rider:", error);   
   }
    
  };

  return (
    <div>
      <h2 className="text-3xl font-bold p-3">
        Assign Riders: ({parcels.length})
      </h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
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
              <tr key={parcel._id}>
                <th>{index + 1}</th>
                <td>{parcel.parcelName}</td>
                <td>{parcel.cost}</td>
                <td>{new Date(parcel.createdAt).toLocaleString()}</td>
                <td>{parcel.senderName}</td>
                <td>{parcel.senderDistrict}</td>
                <td>
                  <button
                    onClick={() => openAssignRiderModal(parcel)}
                    className="btn btn-primary text-black btn-sm"
                  >
                    Find Riders
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <dialog ref={riderModalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box w-11/12 max-w-3xl">
          <h3 className="font-bold text-lg mb-4">
            Available Riders in {selectedParcel?.senderDistrict || ""}
          </h3>

          {riders.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="table table-zebra w-full">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {riders.map((rider, idx) => (
                    <tr key={rider._id}>
                      <th>{idx + 1}</th>
                      <td>{rider.name}</td>
                      <td>{rider.email}</td>
                      <td>
                        <button
                          className="btn btn-success btn-sm"
                          onClick={() => handleAssignRider(rider)}
                        >
                          Assign
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>No riders available in this district</p>
          )}

          <div className="modal-action mt-4">
            <form method="dialog">
              <button className="btn btn-secondary">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AssignRiders;
