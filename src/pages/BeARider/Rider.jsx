import React, { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import riderImg from "../../assets/agent-pending.png";

const Rider = () => {
  const [serviceCenter, setServiceCenter] = useState([]);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  // Load regions/districts
  useEffect(() => {
      fetch("/serviceCenter.json")
          .then((res) => res.json())
          .then((data) => {
              setServiceCenter(data);
          });
  }, []);

  // unique regions
  const regionsDuplicate = serviceCenter.map((c) => c.region);
  const regions = [...new Set(regionsDuplicate)];

  // Watch selected region
  const selectedRegion = useWatch({ control, name: "region" });

  const districtByRegion = (region) => {
    const regionDistricts = serviceCenter.filter((c) => c.region === region);
    return regionDistricts.map((d) => d.district);
  };

  // Submit rider info
  const handleRiderSubmit = async (data) => {
    try {
      const res = await axiosSecure.post("/riders", data);

      if (res.data.insertedId) {
        Swal.fire({
          title: "Successfully Applied!",
          text: "Your rider application has been submitted. We will reach to you in 145 days.",
          icon: "success",
          confirmButtonColor: "#2563eb",
          timer: 2500,
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: `Something went wrong.${error.message}`,
        icon: "error",
      });
    }
  };

  return (
    <div className="flex items-center">
      <div className="max-w-5xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-secondary mb-2">Be a Rider</h1>
        <p className="text-secondary mb-6">
          Become a rider and enjoy flexible earnings, fast delivery assignments,
          and seamless tracking.
        </p>

        <form
          onSubmit={handleSubmit(handleRiderSubmit)}
          className="shadow-lg p-8 rounded-lg bg-base-100"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Left Side */}
            <div>
              {/* Age */}
              <fieldset className="fieldset">
                <label className="label font-bold text-sm">Your Age</label>
                <input
                  type="number"
                  {...register("age", { required: true })}
                  className="input w-full"
                  placeholder="Your age"
                />
                {errors.age && (
                  <p className="text-red-600 text-sm">Age is required</p>
                )}
              </fieldset>

              {/* District dynamic */}
              <fieldset className="fieldset mt-4">
                <label className="label font-bold text-sm">Your Region</label>
                <select
                  {...register("region")}
                  className="select w-full"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select a region
                  </option>
                  {regions.map((region, i) => (
                    <option key={i} value={region}>
                      {region}
                    </option>
                  ))}
                </select>
              </fieldset>

              <fieldset className="fieldset mt-4">
                <label className="label font-bold text-sm">Your District</label>
                <select
                  {...register("district")}
                  className="select w-full"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select a district
                  </option>
                  {districtByRegion(selectedRegion).map((d, i) => (
                    <option key={i} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </fieldset>

              {/* Contact */}
              <fieldset className="fieldset mt-4">
                <label className="label font-bold text-sm">
                  Your Contact Number
                </label>
                <input
                  type="text"
                  {...register("contact", { required: true })}
                  className="input w-full"
                  placeholder="Phone number"
                />
                {errors.contact && (
                  <p className="text-red-600 text-sm">
                    Contact number required
                  </p>
                )}
              </fieldset>
            </div>

            {/* Right Side */}
            <div>
              {/* Name */}
              <fieldset className="fieldset">
                <label className="label font-bold text-sm">Your Name</label>
                <input
                  type="text"
                  {...register("name", { required: true })}
                  className="input w-full"
                  defaultValue={user?.displayName}
                />
                {errors.name && (
                  <p className="text-red-600 text-sm">Name is required</p>
                )}
              </fieldset>

              {/* Email */}
              <fieldset className="fieldset mt-4">
                <label className="label font-bold text-sm">Your Email</label>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  className="input w-full"
                  defaultValue={user?.email}
                />
                {errors.email && (
                  <p className="text-red-600 text-sm">Email required</p>
                )}
              </fieldset>

              {/* NID */}
              <fieldset className="fieldset mt-4">
                <label className="label font-bold text-sm">NID Number</label>
                <input
                  type="text"
                  {...register("nid", { required: true })}
                  className="input w-full"
                  placeholder="Your NID number"
                />
                {errors.nid && (
                  <p className="text-red-600 text-sm">NID required</p>
                )}
              </fieldset>
            </div>
          </div>

          {/* Full Width Warehouse */}
          <fieldset className="fieldset mt-8">
            <label className="label font-bold text-sm">
              Which Warehouse do you want to work?
            </label>
            <input
              type="text"
              {...register("preferredWarehouse", { required: true })}
              className="input w-full"
              placeholder="Enter preferred warehouse"
            />
            {errors.preferredWarehouse && (
              <p className="text-red-600 text-sm">This field is required</p>
            )}
          </fieldset>

          <button className="btn bg-primary mt-6 rounded-lg w-full text-lg">
            Submit Rider Application
          </button>
        </form>
      </div>
      <div>
        <img src={riderImg} alt="" />
      </div>
    </div>
  );
};

export default Rider;
