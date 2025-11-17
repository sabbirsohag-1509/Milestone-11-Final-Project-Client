import React from "react";
import { useForm } from "react-hook-form";

const SendAParcel = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const parcelSubmitHandler = (data) => {
    console.log(data);
  };

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
              placeholder="Sender Name"
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
            {/* sender district  */}
            <label className="label font-bold text-sm mt-4">
              Sender District
            </label>
            <input
              type="text"
              {...register("senderDistrict", { required: true })}
              className="input w-full"
              placeholder="Sender District"
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
              {/* Receiver district  */}
              <label className="label font-bold text-sm mt-4">
                Receiver District
              </label>
              <input
                type="text"
                {...register("receiverDistrict", { required: true })}
                className="input w-full"
                placeholder="Receiver District"
              />
              {/* text-area pickup instruction */}
              <label className="label font-bold text-sm mt-4">
                Pickup Instruction
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
