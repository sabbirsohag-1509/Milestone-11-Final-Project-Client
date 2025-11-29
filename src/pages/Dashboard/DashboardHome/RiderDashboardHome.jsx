import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#0088fe"];

const RiderDailyDelivery = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const today = new Date().toISOString().split("T")[0];

  const { data: perDayStats = [], isLoading } = useQuery({
    queryKey: ["rider-per-day", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/riders/delivery/per-day?email=${user?.email}&date=${today}`
      );
      return res.data;
    },
  });

  const chartData = perDayStats.map((stat) => ({
    name: stat._id,
    value: stat.count,
  }));

  return (
    <div className="bg-base-100 rounded-2xl shadow-xl p-6 border max-w-xl mx-auto">
      <h3 className="text-xl font-semibold text-center mb-4">
        Rider Daily Delivery Count
      </h3>

      {/* LOADING UI */}
      {isLoading && (
        <p className="text-center text-sm text-gray-400">Loading…</p>
      )}

      {/* NO DATA UI */}
      {!isLoading && chartData.length === 0 && (
        <p className="text-center text-sm text-red-500">
          No delivery found for today.
        </p>
      )}

      {/* PIE CHART */}
      {chartData.length > 0 && (
        <div className="flex justify-center mt-4">
          <PieChart width={350} height={350}>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              outerRadius={120}
              label
              dataKey="value"
            >
              {chartData.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>

            <Legend />
            <Tooltip />
          </PieChart>
        </div>
      )}
    </div>
  );
};

export default RiderDailyDelivery;
