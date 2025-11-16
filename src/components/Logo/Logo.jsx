import React from 'react';
import logo from "../../assets/logo.png";
import { NavLink } from 'react-router';

const Logo = () => {
    return (
        <NavLink to="/"> 
             <div className='flex items-end'>
            <img src={logo} alt="" />
            <h3 className="text-3xl font-bold -ms-3">zapShift</h3>
        </div>
       </NavLink>
    );
};

export default Logo;