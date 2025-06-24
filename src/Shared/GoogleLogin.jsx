import React from 'react';
import useAuth from '../Hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import useAxiosPublic from '../Hooks/useAxiosPublic';
import { FcGoogle } from 'react-icons/fc';


const GoogleLogin = () => {

    const {googleSign} = useAuth();
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();


    const handleWithGoogle = () => {
        googleSign()
        .then(res =>{
            // console.log(res.user)
            const user = res.user;

            const userInfo = {
                    name: user.displayName,
                    email: user.email,
                    image: user.photoURL,
                    isVerified: false,
                    authProvider: 'google',
                    createdAt: new Date(),
                    bio: '',
                    location: '',
                    gender: '',
                    birthdate: '',
                    profileLocked: false,
                    coverPhoto: '',
                    isPrivete: false,
                    blockedUsers: [],
                    followers: [],
                    following: ['68514e67001a483d85f37b31', '6857c167413421291cf16d27'],
                    posts: [],
                    savedPosts: [],
                    role: 'user',
                    status: 'active',
                    reports: [],
                };

                axiosPublic.post('/users', userInfo)
                .then(res => {
                    // console.log(res.data);
                        if (res.data.insertedId || res.data.message === 'user already exists') {
                            navigate('/');
                        }
                })



        })
    }


    return (
    <div className="mt-6 text-center">
      <button
        onClick={handleWithGoogle}
        className="flex items-center justify-center gap-2 border border-[#FF6B6B] hover:bg-[#FF6B6B] hover:text-white text-[#FF6B6B] py-2 px-4 rounded-md font-semibold transition"
      >
        <FcGoogle className="text-2xl" /> Register with Google
      </button>
    </div>
    );
};

export default GoogleLogin;