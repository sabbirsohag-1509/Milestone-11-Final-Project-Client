import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Pie, PieChart, Cell, Legend, Tooltip } from "recharts";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#0088fe"];

const AdminDashboardHome = () => {
  const axiosSecure = useAxiosSecure();

  const { data: deliveryStats = [] } = useQuery({
    queryKey: ["delivery-status-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/parcels/delivery-status/stats");
      return res.data;
    },
  });

  const chartData = deliveryStats.map((stat) => ({
    name: stat._id,
    value: stat.count,
  }));

  return (
    <div className="p-6 space-y-8">
      <h2 className="text-4xl font-bold text-center">📊 Admin Dashboard</h2>

      {/* Stats Section */}
      <div className="grid md:grid-cols-3 gap-6">
        {deliveryStats.map((stat) => (
          <div
            key={stat._id}
            className="shadow-xl rounded-xl p-6 bg-base-100 border hover:shadow-2xl transition"
          >
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-full bg-primary/20">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="w-8 h-8 stroke-current text-primary"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </div>

              <div>
                <p className="text-lg font-semibold text-secondary">{stat._id}</p>
                <p className="text-4xl font-bold">{stat.count}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pie Chart Section */}
      <div className="bg-base-100 rounded-2xl shadow-xl p-6 border max-w-xl mx-auto">
        <h3 className="text-xl font-semibold text-center mb-4">Delivery Status Chart</h3>

        <div className="flex justify-center">
          <PieChart width={350} height={350}>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              outerRadius={120}
              dataKey="value"
              label
            >
              {chartData.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            
            <Legend></Legend>
            <Tooltip></Tooltip>
          </PieChart>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardHome;
