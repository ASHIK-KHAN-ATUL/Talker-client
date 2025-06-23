import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from '../../Components/Navbar/Navbar';
import useAuth from '../../Hooks/useAuth';

const HomeLayout = () => {

    const {isDark, setIsDark} = useAuth();

    return (
        <div className={` min-h-screen ${isDark ? 'bg-black/70 text-white' : ' bg-gray-200 text-black'}`}>
            <Navbar></Navbar>
            <Outlet></Outlet>
        </div>
    );
};

export default HomeLayout;