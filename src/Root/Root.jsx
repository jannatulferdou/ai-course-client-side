import React from 'react';
import Navbar from '../Shared/Navbar';
import { Outlet, useNavigation } from 'react-router';
import Footer from '../Shared/Footer';
import Loading from '../Shared/Loading/Loading';

const Root = () => {
    const {state}=useNavigation()
    return (
        <div className='bg-gradient-to-tr from-[#0f172a] via-[#1e293b] to-[#020617]'>
            <Navbar></Navbar>
            {state=='loading' ? <Loading></Loading> : <Outlet></Outlet>}
            <Footer></Footer>
        </div>
    );
};

export default Root;