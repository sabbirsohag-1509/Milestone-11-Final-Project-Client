import React, { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from './../../hooks/useAuth';

const SendAParcel = () => {
  const [serviceCenter, setServiceCenter] = useState([]);
  const { register, handleSubmit, control } = useForm();
  const { user, loading } = useAuth();

  useEffect(() => {
    fetch(`serviceCenter.json`)
      .then((res) => res.json())
      .then((data) => {
        setServiceCenter(data);
      });
  }, []);

  const regionsDuplicate = serviceCenter.map((c) => c.region);
  const regions = [...new Set(regionsDuplicate)];
  // console.log(regions)
  const senderRegion = useWatch({ control, name: "senderRegion" });
  const receiverRegion = useWatch({ control, name: "receiverRegion" });

  const districtByRegion = (region) => {
    const regionDistricts = serviceCenter.filter((c) => c.region === region);
    const districts = regionDistricts.map((d) => d.district);
    return districts;
  };
//axios from hook
  const axiosSecure = useAxiosSecure();

  const parcelSubmitHandler = (data) => {
    console.log(data);
    const isDocument = data.parcelType === "document";
    const isSameDistrict = data.senderDistrict === data.receiverDistrict;
    const parcelWeight = parseFloat(data.parcelWeight);

    let cost = 0;
    if (isDocument) {
      cost = isSameDistrict ? 60 : 80;
    } else {
      if (parcelWeight < 3) {
        cost = isSameDistrict ? 110 : 150;
      } else {
        const minCharge = isSameDistrict ? 110 : 150;
        const extraWeight = parcelWeight - 3;
        const extraCharge = isSameDistrict
          ? extraWeight * 40
          : extraWeight * 40 + 40;

        cost = minCharge + extraCharge;
      }
    }
    console.log('cost', cost);
    data.cost = cost;

    Swal.fire({
      title: "Booking Confirmed!",
      html: `
      <div style="font-size:18px; margin-top:10px;">
        <strong>Total Shipping Cost:</strong>  
        <span style="color:#2563eb; font-size:22px;">${cost} ৳</span>
      </div>
      <p style="margin-top:10px; color:#64748b;">
        Thank you for booking with us. Your parcel is being processed.
      </p>
    `,
      icon: "success",
      confirmButtonText: "Proceed",
      confirmButtonColor: "#2563eb",
      background: "#f8fafc",
      color: "#1e293b",
      width: "420px",
      backdrop: `
      rgba(0,0,0,0.4)
      url("https://sweetalert2.github.io/images/nyan-cat.gif")
      left top
      no-repeat
    `,
    }).then((result) => {
      if (result.isConfirmed) {

        //save the parcel info to the database
        axiosSecure.post(`/parcels`, data)
          .then(res => {
            console.log('after saving parcel in database', res.data);
        })
        


        // Swal.fire({
        //   title: "✔ Completed!",
        //   text: "Your booking process is successfully saved.",
        //   icon: "success",
        //   confirmButtonText: "OK",
        //   confirmButtonColor: "#10b981",
        //   background: "#f0fdf4",
        //   color: "#065f46",
        //   width: "380px",
        // });
      }
    });
  };

  if (loading) {
    return <div> 
      <span className="loading loading-infinity loading-xl"></span>
    </div>
  }
 

  return (
    <div className="mt-14">
      <div>
        <h1 className="text-secondary font-bold text-5xl">Send A Parcel</h1>
        <h3 className="text-secondary font-bold text-3xl py-4">
          Enter your parcel details
        </h3>
      </div>
      {/* Document Type  */}
      <form onSubmit={handleSubmit(parcelSubmitHandler)}>
        <div className="flex items-center gap-20 py-4 shadow-lg p-6 rounded-lg w-1/2">
          <label className="label">
            <input
              type="radio"
              {...register("parcelType")}
              value={"document"}
              className="radio"
              defaultChecked
            />
            Document
          </label>
          <label className="label">
            <input
              type="radio"
              {...register("parcelType")}
              value={"not-document"}
              className="radio"
            />
            Not Document
          </label>
        </div>
        {/* Parcel Name & Weight  */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 my-4">
          <fieldset className="fieldset">
            <label className="label font-bold">Parcel Name</label>
            <input
              type="text"
              {...register("parcelName", { required: true })}
              className="input w-full"
              placeholder="Parcel Name"
            />
          </fieldset>
          <fieldset className="fieldset">
            <label className="label font-bold">Parcel Weight (KG)</label>
            <input
              type="number"
              {...register("parcelWeight", { required: true })}
              className="input w-full"
              placeholder="Parcel Weight"
            />
          </fieldset>
        </div>
        {/* //////  */}
        {/* sender details  */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 my-4">
          {/* sender name  */}
          <fieldset className="fieldset">
            <h4 className="text-xl font-semibold">Sender Details</h4>
            <label className="label font-bold text-sm">Sender Name</label>
            <input
              type="text"
              {...register("senderName", { required: true })}
              className="input w-full"
              defaultValue={user?.displayName}
            />
            {/* sender email  */}
            <label className="label font-bold text-sm">Sender Email</label>
            <input
              type="email"
              {...register("senderEmail", { required: true })}
              className="input w-full"
              defaultValue={user?.email}
            />
            {/* sender address  */}
            <label className="label font-bold text-sm mt-4">
              Sender Address
            </label>
            <input
              type="text"
              {...register("senderAddress", { required: true })}
              className="input w-full"
              placeholder="Sender Address"
            />
            {/* sender region  */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend text-sm ">
                Sender Region
              </legend>
              <select
                {...register("senderRegion")}
                defaultValue="Pick a region"
                className="select w-full"
              >
                <option disabled={true}>Pick a region</option>
                {regions.map((region, index) => (
                  <option key={index} value={region}>
                    {region}
                  </option>
                ))}
              </select>
            </fieldset>
            {/* sender district  */}

            <fieldset className="fieldset">
              <legend className="fieldset-legend text-sm ">
                Sender District
              </legend>
              <select
                {...register("senderDistrict")}
                defaultValue="Pick a district"
                className="select w-full"
              >
                <option disabled={true}>Pick a district</option>
                {districtByRegion(senderRegion).map((region, index) => (
                  <option key={index} value={region}>
                    {region}
                  </option>
                ))}
              </select>
            </fieldset>

            {/* sender phone number */}
            <label className="label font-bold text-sm mt-4">
              Sender Phone Number
            </label>
            <input
              type="text"
              {...register("senderPhoneNumber", { required: true })}
              className="input w-full"
              placeholder="Sender Phone Number"
            />

            {/* text-area pickup instruction */}
            <label className="label font-bold text-sm mt-4">
              Pickup Instruction
            </label>
            <textarea
              className="textarea h-24 w-full"
              type="text"
              {...register("pickupInstruction")}
              placeholder="Pickup Instruction"
            ></textarea>
          </fieldset>
          {/* Receiver Details  */}
          <div>
            <fieldset className="fieldset">
              <h4 className="text-xl font-semibold">Receiver Details</h4>
              <label className="label font-bold text-sm">Receiver Name</label>
              <input
                type="text"
                {...register("receiverName", { required: true })}
                className="input w-full"
                placeholder="Receiver Name"
              />
              {/* receiver email  */}
              <label className="label font-bold text-sm">Receiver Email</label>
              <input
                type="email"
                {...register("receiverEmail", { required: true })}
                className="input w-full"
                placeholder="Receiver Email"
              />
              {/* Receiver address  */}
              <label className="label font-bold text-sm mt-4">
                Receiver Address
              </label>
              <input
                type="text"
                {...register("receiverAddress", { required: true })}
                className="input w-full"
                placeholder="Receiver Address"
              />
              {/* receiver region  */}
              <fieldset className="fieldset">
                <legend className="fieldset-legend text-sm ">
                  Receiver Region
                </legend>
                <select
                  {...register("receiverRegion")}
                  defaultValue="Pick a region"
                  className="select w-full"
                >
                  <option disabled={true}>Pick a region</option>
                  {regions.map((region, index) => (
                    <option key={index} value={region}>
                      {region}
                    </option>
                  ))}
                </select>
              </fieldset>
              {/* receiver district  */}
              <fieldset className="fieldset">
                <legend className="fieldset-legend text-sm ">
                  Receiver District
                </legend>
                <select
                  {...register("receiverDistrict")}
                  defaultValue="Pick a district"
                  className="select w-full"
                >
                  <option disabled={true}>Pick a district</option>
                  {districtByRegion(receiverRegion).map((region, index) => (
                    <option key={index} value={region}>
                      {region}
                    </option>
                  ))}
                </select>
              </fieldset>
              {/* Receiver phone number */}
              <label className="label font-bold text-sm mt-4">
                Receiver Phone Number
              </label>
              <input
                type="text"
                {...register("receiverPhoneNumber", { required: true })}
                className="input w-full"
                placeholder="Receiver Phone Number"
              />

              {/* text-area pickup instruction */}
              <label className="label font-bold text-sm mt-4">
                Delivery Instruction
              </label>
              <textarea
                className="textarea h-24 w-full"
                type="text"
                {...register("deliveryInstruction")}
                placeholder="Delivery Instruction"
              ></textarea>
            </fieldset>
          </div>
        </div>

        <button className="btn bg-primary rounded-lg mt-5">
          Proceed to Confirm Booking
        </button>
      </form>
    </div>
  );
};

export default SendAParcel;
