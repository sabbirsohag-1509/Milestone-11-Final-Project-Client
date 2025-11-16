import React from "react";
import locationImg from "../../../assets/location-merchant.png";
import beAMerchantImg from "../../../assets/be-a-merchant-bg.png";

const MerchantCustomer = () => {
  return (
      <div className="bg-secondary rounded-4xl p-8 md:p-12 lg:p-14 mt-20 bg-cover bg-center bg-no-repeat relative overflow-hidden">
          {/* //bG image  */}
          <img className="absolute -top-2" src={beAMerchantImg} alt="" />
      {/* Content Wrapper */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
        {/* Middle Content */}
        <div className="text-center lg:text-left max-w-xl">
          <h2 className="text-white font-bold text-3xl md:text-4xl lg:text-[40px] leading-tight">
            Merchant and Customer Satisfaction is Our First Priority
          </h2>

          <p className="text-white text-[16px] py-5 leading-relaxed">
            We offer the lowest delivery charge with the highest value along
            with 100% safety of your product. ZapShift Courier delivers your
            parcels to every corner of Bangladesh right on time.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mt-5">
            <button className="px-6 py-3 bg-[#CAEB66] text-secondary font-semibold rounded-full hover:bg-[#b7e235] transition btn">
              Become a Merchant
            </button>

            <button className="px-6 py-3  bg-transparent border border-[#CAEB66] text-[#CAEB66] font-semibold transition rounded-full btn">
              Earn with ZapShift Courier
            </button>
          </div>
        </div>

        {/* Right Image */}
        <img
          src={locationImg}
          alt="Location"
          className="w-[250px] md:w-[350px] lg:w-[400px] object-contain relative z-10"
        />
      </div>
    </div>
  );
};

export default MerchantCustomer;
