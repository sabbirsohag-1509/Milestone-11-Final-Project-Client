import React from 'react';
import useAuth from '../../hooks/useAuth';
import useRole from '../../hooks/useRole';
import Forbidden from '../../components/Forbidden/Forbidden';

const AdminRoute = ({children}) => {
    const { loading } = useAuth();
    const { role, roleLoading } = useRole();
    
    if (loading || roleLoading) {
        return <div> 
            <span className="loading loading-infinity loading-xl"></span>
        </div>
    }

    if (role !== 'Admin') {
        return <div>
            <Forbidden></Forbidden>
        </div>
    }

    return (
        <div>
            {children}
        </div>
    );
};

export default AdminRoute;