import React, { use } from 'react';

import { Navigate, useLocation } from 'react-router';


import Loading from '../Loading/Loading';
import { AuthContext } from './AuthProvider';


const PrivateRoute = ({children}) => {

    const {user, loading}=use(AuthContext);

    const location=useLocation()



    if(loading){
        return <Loading></Loading>
    }

    if(user && user?.email){
        return children;

    }
    return <Navigate to={'/auth/login'} state={location.pathname}></Navigate>
};

export default PrivateRoute;
