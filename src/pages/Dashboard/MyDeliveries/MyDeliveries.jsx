import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const MyDeliveries = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: parcels = [] } = useQuery({
    queryKey: ["my-deliveries", user?.email, "driver-assigned"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels/rider?riderEmail=${user?.email}&deliveryStatus=Rider Out for Delivery`
      );
      return res.data;
    },
  });

  const confirmBtnHandler = (parcel) => {
    const statusInfo = {
      deliveryStatus: "Rider is Arriving",
      riderArrivedTime: new Date().toISOString(),
      trackingId: parcel.trackingId,
    };
    axiosSecure
      .patch(`/parcels/${parcel._id}/status`, statusInfo)
      .then((res) => {
        if (res.data?.result?.modifiedCount > 0) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: `Delivery for parcel ${parcel.parcelName} confirmed successfully`,
          });
        }
      });
  };

  return (
    <div>
      <h2 className="text-3xl font-semibold mb-4">
        My Deliveries Pending to Pickup: {parcels.length}
      </h2>
      <div>
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Parcel</th>
                <th>Rider Name</th>
                <th>Rider Email</th>
                <th>Rider Id</th>
                <th>Confirm</th>
              </tr>
            </thead>
            <tbody>
              {parcels.map((parcel, index) => (
                <tr key={parcel._id}>
                  <th>{index + 1}</th>
                  <td>{parcel.parcelName}</td>
                  <td>{parcel.riderName}</td>
                  <td>{parcel.riderEmail}</td>
                  <td>{parcel.riderId}</td>
                  <td className="space-x-2">
                    <button
                      onClick={() => confirmBtnHandler(parcel)}
                      className="btn  btn-primary btn-sm text-black"
                    >
                      Confirm
                    </button>
                    <button className="btn btn-warning btn-sm text-black">
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyDeliveries;
