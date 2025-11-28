import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router";
import useAxios from "../../../hooks/useAxios";

const ParcelTrack = () => {
  const { trackingId } = useParams();
  const axiosInstance = useAxios();

  const { data: trackings = [] } = useQuery({
    queryKey: ["parcelTrack", trackingId],
    queryFn: async () => {
      const res = await axiosInstance.get(`/trackings/${trackingId}/logs`);
      return res.data;
    },
  });

  return (
    <div>
      <div className="p-8">
        <h2 className="text-3xl font-bold">
          Tracking Your Parcel: {trackingId}
        </h2>
        <p>Logs so far: {trackings.length}</p>
      </div>

      <ul className="timeline timeline-vertical mt-5 mb-10">
        {trackings.map((log, index) => (
          <li key={index}>
            <div className="timeline-start">
              {log.time || "N/A"}
            </div>

            <div className="timeline-middle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                  clipRule="evenodd"
                />
              </svg>
            </div>

            <div className="timeline-end timeline-box">
              <p className="font-semibold">{log.status}</p>
              <p className="text-sm text-gray-500">{log.location}</p>
            </div>

            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ParcelTrack;
