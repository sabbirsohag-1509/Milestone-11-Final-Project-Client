import React from 'react';
import useAuth from './../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const PaymentHistory = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: history = [], isLoading } = useQuery({
        queryKey: ['payment-history', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payment-history?email=${user?.email}`);
            return res.data;
        }
    });

    if (isLoading) {
        return <div className="text-center py-10 text-lg font-medium">Loading...</div>;
    }

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">
                Payment History <span className="text-primary">({history.length})</span>
            </h1>

            <div className="overflow-x-auto rounded-xl shadow-md">
                <table className="min-w-full text-sm text-left border-collapse">
                    <thead className="bg-primary text-black">
                        <tr>
                            <th className="py-3 px-4">Parcel Info</th>
                            <th className="py-3 px-4">Recipient Info</th>
                            <th className="py-3 px-4">Tracking Number</th>
                            <th className="py-3 px-4">Payment Info</th>
                            <th className="py-3 px-4 text-center">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {history.map((item, idx) => (
                            <tr key={idx} className="border-b hover:bg-gray-100">
                                
                                {/* Parcel Info */}
                                <td className="py-3 px-4">
                                    <p><span className="font-semibold">Name:</span> {item.parcelName}</p>
                                    <p><span className="font-semibold">Sender:</span> {item.customerEmail}</p>
                                </td>

                                {/* Recipient Info */}
                                <td className="py-3 px-4">
                                    <p><span className="font-semibold">Recipient:</span> {item.receiverName}</p>
                                    <p><span className="font-semibold">Phone:</span> {item.receiverPhone}</p>
                                </td>

                                {/* Tracking Number */}
                                <td className="py-3 px-4 font-medium text-blue-600">
                                    {item.trackingId}
                                </td>

                                {/* Payment Info */}
                                <td className="py-3 px-4">
                                    <p><span className="font-semibold">Amount:</span> ${item.amount}</p>
                                    <p><span className="font-semibold">Status:</span> {item.paymentStatus}</p>
                                    <p className="text-xs text-gray-500">
                                        {new Date(item.paidAt).toLocaleString()}
                                    </p>
                                </td>

                                {/* Action */}
                                <td className="py-3 px-4 text-center">
                                    <button 
                                        className="px-4 py-2 bg-primary text-black rounded-lg hover:bg-blue-700 hover:text-white transition"
                                        onClick={() => alert(`Tracking: ${item.trackingId}`)}
                                    >
                                        View
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

export default PaymentHistory;
