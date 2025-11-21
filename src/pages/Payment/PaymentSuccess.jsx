import React, { useEffect, useState } from "react";
import { MdCheckCircle } from "react-icons/md";
import { useSearchParams } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const PaymentSuccess = () => {
  const [searchParams]= useSearchParams();
  const sessionId = searchParams.get("session_id");
  // console.log("Payment Success Session ID:", sessionId);
  const axiosSecure = useAxiosSecure();
  const [paymentInfo, setPaymentInfo] = useState();

  useEffect(() => { 
    if (sessionId) {
      axiosSecure.patch(`/payment-success/?session_id=${sessionId}`)
        .then(res => {
          // console.log("Payment success updated:", res.data);
          setPaymentInfo({
            transactionId: res.data.transactionId,
            trackingId: res.data.trackingId,
          })
      })
    }
  },[sessionId, axiosSecure]);

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100 p-5">
      <div className="bg-white rounded-xl shadow-2xl p-10 max-w-lg w-full text-center border">
        
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <MdCheckCircle className="text-green-500" size={90} />
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-800 mb-3">
          Payment Successful!
        </h1>

        {/* Subtitle */}
        <p className="text-gray-600 text-lg">
          Your payment has been processed successfully.
        </p>

        <p className="text-gray-500 mt-2">
          Thank you for your purchase.  
        </p>
        {/* Payment Details */}
        {paymentInfo && (
          <div className="bg-gray-50 border rounded-lg p-6 mt-6 text-left">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Payment Details
            </h3>
            <p className="text-gray-700 mb-2">
              <span className="font-medium">Transaction ID:</span>{" "}
              <span className="text-blue-600">{paymentInfo.transactionId}</span>  
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Tracking ID:</span>{" "}
              <span className="text-blue-600">{paymentInfo.trackingId}</span>
            </p>
          </div>
        )}

        {/* Button */}
        <div className="mt-6">
          <a
            href="/dashboard/my-parcels"
            className="btn bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg text-lg"
          >
            Go to Dashboard
          </a>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
