import React from 'react';
import { Link } from 'react-router';
import { FaTimesCircle } from "react-icons/fa";

const PaymentCancelled = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md text-center">
                
                <FaTimesCircle className="w-20 h-20 text-red-600 mx-auto mb-4" />

                <h1 className="text-3xl font-bold text-red-600 mb-3">
                    Payment Cancelled
                </h1>
                
                <p className="text-gray-600 text-lg mb-6">
                    Your payment could not be completed.  
                    Please try again.
                </p>

                <Link to="/dashboard/my-parcels">
                    <button className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg shadow-md transition">
                        Try Again
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default PaymentCancelled;
