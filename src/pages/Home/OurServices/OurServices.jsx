import React from 'react';
import serviceImg from "../../../assets/service.png";

const OurServices = () => {
    return (
        <div className='bg-secondary mt-24 p-24 rounded-4xl'>
            <div className='text-center'> 
                <h2 className='font-bold text-4xl text-white py-4'>Our Services</h2>
                <p className='font-semibold text-white text-[16px]'>Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.</p>
            </div>
            {/* card layout  */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 '> 
                {/* cards */}
                <div className='bg-white hover:bg-[#CAEB66] transition-all duration-300 hover:shadow-xl hover:shadow-[#caeb66]/20 p-6 rounded-3xl flex flex-col items-center text-center'> 
                    <img className='bg-gradient-to-b from-[#7BACDF] to-[#B3DAFE] p-3 rounded-full ' src={serviceImg} alt="Service Img" />
                    <h2 className='font-bold text-secondary py-5 text-2xl'>Express  & Standard Delivery</h2>
                    <p className='font-semibold text-[16px] text-[#606060] '>We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.</p>
                </div>
                <div className='bg-white hover:bg-[#CAEB66] transition-all duration-300 hover:shadow-xl hover:shadow-[#caeb66]/20 p-6 rounded-3xl flex flex-col items-center text-center'> 
                    <img className='bg-gradient-to-b from-[#7BACDF] to-[#B3DAFE] p-3 rounded-full ' src={serviceImg} alt="Service Img" />
                    <h2 className='font-bold text-secondary py-5 text-2xl'>Nationwide Delivery</h2>
                    <p className='font-semibold text-[16px] text-[#606060] '>We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.</p>
                </div>
                <div className='bg-white hover:bg-[#CAEB66] transition-all duration-300 hover:shadow-xl hover:shadow-[#caeb66]/20 p-6 rounded-3xl flex flex-col items-center text-center'> 
                    <img className='bg-gradient-to-b from-[#7BACDF] to-[#B3DAFE] p-3 rounded-full ' src={serviceImg} alt="Service Img" />
                    <h2 className='font-bold text-secondary py-5 text-2xl'>Fulfillment Solution</h2>
                    <p className='font-semibold text-[16px] text-[#606060] '>We also offer customized service with inventory management support, online order processing, packaging, and after sales support.</p>
                </div>
                <div className='bg-white hover:bg-[#CAEB66] transition-all duration-300 hover:shadow-xl hover:shadow-[#caeb66]/20 p-6 rounded-3xl flex flex-col items-center text-center'> 
                    <img className='bg-gradient-to-b from-[#7BACDF] to-[#B3DAFE] p-3 rounded-full ' src={serviceImg} alt="Service Img" />
                    <h2 className='font-bold text-secondary py-5 text-2xl'>Cash on Home Delivery</h2>
                    <p className='font-semibold text-[16px] text-[#606060] '>100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.</p>
                </div>
                <div className='bg-white hover:bg-[#CAEB66] transition-all duration-300 hover:shadow-xl hover:shadow-[#caeb66]/20 p-6 rounded-3xl flex flex-col items-center text-center'> 
                    <img className='bg-gradient-to-b from-[#7BACDF] to-[#B3DAFE] p-3 rounded-full ' src={serviceImg} alt="Service Img" />
                    <h2 className='font-bold text-secondary py-5 text-2xl'>Corporate Service / Contract In Logistics</h2>
                    <p className='font-semibold text-[16px] text-[#606060] '>Customized corporate services which includes warehouse and inventory management support.</p>
                </div>
                <div className='bg-white hover:bg-[#CAEB66] transition-all duration-300 hover:shadow-xl hover:shadow-[#caeb66]/20 p-6 rounded-3xl flex flex-col items-center text-center'> 
                    <img className='bg-gradient-to-b from-[#7BACDF] to-[#B3DAFE] p-3 rounded-full ' src={serviceImg} alt="Service Img" />
                    <h2 className='font-bold text-secondary py-5 text-2xl'>Parcel Return</h2>
                    <p className='font-semibold text-[16px] text-[#606060] '>Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.</p>
                </div>
            </div>
        </div>
    );
};

export default OurServices;