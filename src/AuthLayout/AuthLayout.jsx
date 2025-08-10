import React from 'react';

import { Outlet } from 'react-router';
import Navbar from '../Shared/Navbar';

const AuthLayout = () => {
    return (
        <div>
            <div className='mx-auto bg-base-100 min-h-screen'>
            <header>
                <Navbar></Navbar>
            </header>
            <main>
                <Outlet></Outlet>
            </main>
        </div>
        </div>
    );
};

export default AuthLayout;