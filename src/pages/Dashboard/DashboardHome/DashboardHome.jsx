import React from 'react';
import useRole from '../../../hooks/useRole';
import AdminDashboardHome from './AdminDashboardHome';
import RiderDashboardHome from './RiderDashboardHome';
import UserDashboardHome from './UserDashboardHome';

const DashboardHome = () => {
    const { role, roleLoading } = useRole();
    
    if (roleLoading) {
        return <div>Loading...</div>;
    }
    if (role === 'Admin') {
        return <AdminDashboardHome></AdminDashboardHome>
    }
    if (role === 'Rider') {
        return <RiderDashboardHome></RiderDashboardHome>
    }
    else if (role === 'User') {
        return <UserDashboardHome></UserDashboardHome>
    }
 
};

export default DashboardHome;