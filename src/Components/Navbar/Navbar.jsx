import React, { useState } from 'react';
import logo from '../../assets/Mainlogo.png'
import { IoMenu, IoNotificationsOutline } from 'react-icons/io5';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';
import { toast } from 'react-toastify';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { MdDarkMode, MdLightMode } from 'react-icons/md';
import { FaRegUserCircle } from 'react-icons/fa';

const Navbar = () => {

    const {user, logout ,  isDark, setIsDark} = useAuth();
    // console.log('Navbar user',user);
    const navigate = useNavigate();
    const loaction = useLocation();
    // console.log(loaction)
    // console.log('Theme : ' ,isDark)

    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();
 
    const {data: mainUser=[], refetch} = useQuery({
        queryKey:['mainUser'],
        enabled: !!user?.email,
        queryFn: async()=> {
            const res = await axiosPublic.get(`/users/${user?.email}`)
            return res.data;
        }
    })
    // console.log('Navbar mainuser',mainUser)

    const [isDoT, setIsDot] = useState(false);
    // console.log(isDoT);

    const handleLogout = () => {
        logout()
        .then(()=> {
            toast.info('Logout Success');
            navigate('/')
        })
        .catch(error => console.log(error))
    }

    const handleProfile = () => {
        navigate(`/profile/${mainUser?._id}`)
    }
    const handleProfileinfo = () => {
        navigate(`/myProfile/info`)
    }

    const toggleTheme = () => {
        setIsDark(prev => !prev);
    }

    return (
        <div className="navbar shadow-sm px-2 lg:px-10 py-0 border-b border-[#FF6B6B]">

        <Link to={'/'} className="navbar-start">
            <img src={logo} className='h-14' alt="" />
        </Link>

        <div className="navbar-end flex gap-3">
            {
                user?.email? 
                 <div onClick={handleProfile} className='h-12 w-12 rounded-full border-2 border-[#FF6B6B] overflow-hidden cursor-pointer'>
                    <img  src={user.photoURL} className='w-full h-full object-cover' alt="" />
                 </div>
                : 
                (
                    loaction.pathname === '/login' ? 
                    (<Link to={'/register'} className='btn btn-outline border-2 btn-sm text-[#FF6B6B] border-[#FF6B6B] font-semibold'>Register</Link>) : 
                    (<Link to={'/login'} className='btn btn-outline border-2 btn-sm text-[#FF6B6B] border-[#FF6B6B] font-semibold'>Login</Link>)
                )
            }
            <div className="btn btn-ghost btn-circle text-[#FF6B6B]">
                <div className="indicator">
                    <span className='text-2xl'><IoNotificationsOutline /></span>
                    <span className="badge badge-xs bg-[#FF6B6B] indicator-item scale-75"></span>
                </div>
            </div>

            <div onClick={()=> {if(!user){toast.warn('Please  Login First'); navigate('/login');return;} setIsDot(!isDoT)}} className='bg-[#FF6B6B] cursor-pointer  p-2 rounded relative'>
                <div className={`text-2xl  ease-in-out transition-transform duration-300
                     ${isDoT? 'rotate-180' : 'rotate-0'} `}><IoMenu />
                </div>

                {
                    isDoT && 

                    <div onClick={(e) => e.stopPropagation()}  className={`p-5 w-[300px] bg-[#FF6B6B]/95 border-2 absolute  z-50 rounded right-0 top-10 font-semibold flex flex-col gap-5 `}>



                        <div className={`flex gap-2 justify-between px-4 items-center text-xl  border p-2 rounded`}> 
                            <span className='mr-2 text-base'>Theme :</span>
                            <span><MdLightMode /></span>
                            <input type="checkbox" value="synthwave" className="toggle theme-controller"  onChange={toggleTheme}/>
                            <span><MdDarkMode /></span>
                        </div>

                        <div className='flex items-center justify-between border p-1 rounded'>
                            <img src={user?.photoURL} className='h-10 w-10 object-cover rounded-full border-2' alt="" /> 
                            <p>{user?.displayName}</p>
                            <button onClick={() => {handleLogout() ; setIsDot(false)}} className='btn btn-outline btn-sm hover:bg-cyan-400 hover:border-none duration-500'>Logout</button>
                        </div>
                        
                    </div>
                }
            </div>

        </div>

        </div>
    );
};

export default Navbar;