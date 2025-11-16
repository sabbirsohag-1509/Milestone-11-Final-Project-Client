import React from "react";
import trackingImg from "../../../assets/live-tracking.png";
import safeDeliveryImg from "../../../assets/safe-delivery.png";

const items = [
  {
    img: trackingImg,
    title: "Live Parcel Tracking",
    desc: "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
  },
  {
    img: safeDeliveryImg,
    title: "100% Safe Delivery",
    desc: "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
  },
  {
    img: safeDeliveryImg,
    title: "24/7 Call Center Support",
    desc: "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
  },
];

const SupportSection = () => {
  return (
    <div className="mt-24 space-y-6">
      {items.map((item, index) => (
        <div
          key={index}
          className="bg-white shadow-2xl p-6 md:p-8 rounded-3xl 
                     flex flex-col md:flex-row items-center md:items-start 
                     gap-6 md:gap-14 lg:gap-20"
        >
          <div className=" relative flex-shrink-0">
            <img
              src={item.img}
              alt={item.title}
              className="w-[120px] md:w-[150px] lg:w-[170px]"
                  />
                    <span className="absolute right-[-25px] top-0 h-full border-r-2 border-dashed border-[#03373D]"></span>
          </div>

          <div>
            <h2 className="text-xl md:text-2xl font-bold text-secondary">
              {item.title}
            </h2>

            <p className="text-[15px] md:text-[16px] py-4 text-[#606060] leading-relaxed">
              {item.desc}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SupportSection;
