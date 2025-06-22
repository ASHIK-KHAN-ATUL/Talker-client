import React from 'react';
import logo from '../../assets/Mainlogo.png'
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';
import { toast } from 'react-toastify';

const Login = () => {

    const {login} = useAuth();
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        const form = new FormData(e.target);
        const email = form.get('email')
        const password = form.get('password')

        login(email, password)
        .then(res => {
            // console.log(res.data)
            toast.success('Login Successfull');
            navigate('/');
        })


    }

    return (
        <div className="min-h-screen flex items-center justify-center ">
            <div className="bg-[#FF6B6B]/30 border border-[#FF6B6B] p-10 shadow-md w-full max-w-2xl">
                <div className=" mb-6 flex items-center justify-center text-[#FF6B6B]">
                    <p className='text-2xl font-semibold text-center'>Login to</p> 
                    <img src={logo} className='h-14' alt="" />
                </div>
                
                <form onSubmit={handleLogin}>
                    <div className="mb-10 ">
                        <label className="block mb-1 font-medium" >Email</label>
                        <input
                            type="email"
                            name='email'
                            id="email"
                            className="w-full px-4 py-2 border-b focus:outline-none text-[#FF6B6B] "
                        />
                    </div>

                    <div className="mb-10">
                        <label className="block mb-1 font-medium" htmlFor="password">Password</label>
                        <input
                            type="password"
                            name='password'
                            maxLength={12}
                            minLength={6}
                            id="password"
                            className="w-full px-4 py-2 border-b focus:outline-none text-[#FF6B6B] "
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#FF6B6B] text-white py-2 rounded-md hover:bg-[#00C6FF] duration-300 font-semibold cursor-pointer transition hover:scale-x-90"
                    >
                        Login
                    </button>
                </form>
                <div className='mt-5'>
                    <p className='text-center text-sm'>Don't have an account? <Link className='text-green-500' to={'/register'}>Register</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;