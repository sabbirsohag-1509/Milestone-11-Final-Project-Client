import React from 'react';
import customerTop from "../../../assets/customer-top.png";
import Reviews from '../Reviews/Reviews';

const CustomerSaying = () => {
    return (
        <div className="mt-24 px-5 md:px-0 flex flex-col items-center text-center">

            {/* Wrapper */}
            <div className="max-w-2xl flex flex-col items-center">

                {/* Top Icon / Image */}
                <img
                    className="mb-4"
                    src={customerTop}
                    alt="Customer Icon"
                />

                {/* Heading */}
                <h2 className="font-bold text-3xl md:text-4xl lg:text-[40px] text-secondary py-5 leading-tight">
                    What our customers are sayings
                </h2>

                {/* Paragraph */}
                <p className="text-[16px] text-[#606060] leading-relaxed">
                    Enhance posture, mobility, and well-being effortlessly with Posture Pro.
                    Achieve proper alignment, reduce pain, and strengthen your body with ease!
                </p>

            </div>
        </div>
    );
};

export default CustomerSaying;
