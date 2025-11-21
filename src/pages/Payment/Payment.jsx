import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Payment = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data: parcel = [], isLoading } = useQuery({
    queryKey: ["payment", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${id}`);
      return res.data;
    },
  });

  const handlePayment = async () => {
    const paymentInfo = {
      cost: parcel.cost,
      id: parcel._id,
      senderEmail: parcel.senderEmail,
      parcelName: parcel.parcelName,
    };

    const res = await axiosSecure.post(`/create-checkout-session`, paymentInfo);
    window.location.href = res.data.url;
  };

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <span className="loading loading-infinity loading-xl"></span>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 p-5">
      <div className="bg-white shadow-xl rounded-xl p-10 w-full max-w-lg text-center border">
        <h2 className="text-3xl font-bold text-gray-800 mb-3">
          Confirm Your Payment
        </h2>

        <p className="text-gray-600 mb-6">
          You are about to pay for this parcel delivery.
        </p>

        <div className="bg-gray-50 border rounded-lg p-6 mb-6">
          <h3 className="text-xl font-semibold text-gray-800">
            Parcel: <span className="text-blue-600">{parcel.parcelName}</span>
          </h3>
          <p className="text-lg mt-2">
            <span className="font-medium">Amount:</span>{" "}
            <span className="text-green-600 font-bold">
              ${parcel.cost}
            </span>
          </p>
        </div>

        <button
          onClick={handlePayment}
          className="btn bg-primary text-black px-6 py-2 rounded-lg text-lg"
        >
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default Payment;
