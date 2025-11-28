import React from "react";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";
import Forbidden from "../../components/Forbidden/Forbidden";

const RiderRoute = ({ children }) => {
  const { loading } = useAuth();
  const { role, roleLoading } = useRole();

  if (loading || roleLoading) {
    return (
      <div>
        <span className="loading loading-infinity loading-xl"></span>
      </div>
    );
  }

  if (role !== "Rider") {
    return (
      <div>
        <Forbidden></Forbidden>
      </div>
    );
  }

  return <div>{children}</div>;
};

export default RiderRoute;
