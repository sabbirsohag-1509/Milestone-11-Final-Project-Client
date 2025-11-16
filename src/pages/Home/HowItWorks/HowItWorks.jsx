import React from 'react';
import bookingImg from "../../../assets/bookingIcon.png"

const HowItWorks = () => {
    return (
        <div className='mt-24 max-w-5xl mx-auto'>
            <div> 
                <h3 className='font-bold text-secondary text-2xl md:text-3xl mb-5'>How it Works</h3>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6'> 
                <div className='bg-gray-100 p-8 rounded-3xl'> 
                    <img src={bookingImg} alt="" />
                    <h2 className='font-bold text-xl text-secondary py-4'>Booking Pick & Drop</h2>
                    <p className='font-semibold text-[16px] text-[#606060]'>From personal packages to business shipments — we deliver on time, every time.</p>
                </div>
                <div className='bg-gray-100 p-8 rounded-3xl'> 
                    <img src={bookingImg} alt="" />
                    <h2 className='font-bold text-xl text-secondary py-4'>Cash On Delivery</h2>
                    <p className='font-semibold text-[16px] text-[#606060]'>From personal packages to business shipments — we deliver on time, every time.</p>
                </div>
                <div className='bg-gray-100 p-8 rounded-3xl'> 
                    <img src={bookingImg} alt="" />
                    <h2 className='font-bold text-xl text-secondary py-4'>Delivery Hub</h2>
                    <p className='font-semibold text-[16px] text-[#606060]'>From personal packages to business shipments — we deliver on time, every time.</p>
                </div>
                <div className='bg-gray-100 p-8 rounded-3xl'> 
                    <img src={bookingImg} alt="" />
                    <h2 className='font-bold text-xl text-secondary py-4'>Booking SME & Corporate</h2>
                    <p className='font-semibold text-[16px] text-[#606060]'>From personal packages to business shipments — we deliver on time, every time.</p>
                </div>
            </div>
        </div>
    );
};

export default HowItWorks;