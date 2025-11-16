import React from 'react';
import errorImg from "../../assets/error.png";
import { Link } from 'react-router';

const Error = () => {
    return (
        <div className='flex flex-col justify-center items-center py-5'>
            <div> 
                <img className='' src={errorImg} alt="" />
            </div>
            <div> 
                <h2 className='text-3xl font-bold text-center text-red-600'>Oops! Page Not Found</h2>
            </div>
            <div> 
                <Link to="/">
                    <button className='btn rounded-full bg-[#CAEB66] mx-auto block mt-4'>Go to Home</button>
                </Link>
            </div>
        </div>
    );
};

export default Error;