import React from 'react';
import useAuth from '../../Hooks/useAuth';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import { MdLocationOn, MdLockOpen, MdLockOutline, MdVerified } from 'react-icons/md';
import { FaBirthdayCake, FaEnvelope, FaUserEdit, FaVenusMars } from 'react-icons/fa';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useNavigate } from 'react-router-dom';

const ProfileInfo = () => {

    const {user} = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const {data:mainUser={}} = useQuery({
        queryKey: ['mainUser'],
        enabled: !!user?.email,
        queryFn: async() => {
            const res = await axiosPublic.get(`/users/${user?.email}`);
            return res.data
        }
    })

    const {
        name,
        email,
        image,
        isVerified,
        bio,
        gender,
        location,
        birthdate,
        createdAt,
        profileLocked,
        coverPhoto,
        isPrivete,
    } = mainUser;

    const handleGoEdit = () => {
        navigate('/myProfile/info/edit')
    }

    return (
        <div className=" min-h-screen">
        {/* Curved Gradient Top */}
        <div className="relative bg-gradient-to-r from-[#FF6B6B] via-[#FFD6A5] to-[#FF6B6B] h-48 rounded-b-[50%] shadow-md">
        </div>

        {/* Profile Card */}
        <div className="max-w-3xl mx-auto px-5 -mt-24 z-10 relative">
            <div className="bg-gradient-to-b from-[cyan]/40 to-[red]/40 shadow-xl rounded-2xl px-6 py-8 flex flex-col  gap-8 items-center border border-[#FF6B6B]/30  relative">

            <button onClick={handleGoEdit} className='absolute top-5 right-5 btn '>
                <FaUserEdit className='text-2xl' />
            </button>
            
            {/* Profile Image */}
            <div className="relative shrink-0">
                <img
                src={image}
                alt="Profile"
                className="h-36 w-36 md:h-40 md:w-40 rounded-full object-cover border-4 border-[#FF6B6B] shadow-lg"
                />
                {profileLocked && (
                <div className="absolute bottom-1 right-1 bg-[#FF6B6B] p-1 rounded-full">
                    <MdLockOutline className="text-white text-sm" />
                </div>
                )}
            </div>

            {/* Info */}
            <div className="flex-1 max-w-md mx-auto text-center md:text-left space-y-5">
                <h2 className="text-3xl font-bold flex items-center justify-center md:justify-start gap-2  text-white">
                {name}
                {isVerified && <MdVerified className="text-blue-500 text-xl" />}
                </h2>

                <p className=" text-sm">
                {bio || 'No bio provided.'}
                </p>

                <p className=" flex items-center gap-2 justify-center md:justify-start text-sm">
                <FaEnvelope className="text-[#FF6B6B]" /> {email}
                </p>

                <div className="flex flex-wrap mt-3 gap-4 justify-center md:justify-start text-sm ">
                <div className="flex items-center gap-2">
                    <MdLocationOn className="text-pink-500" /> {location || 'Unknown'}
                </div>
                <div className="flex items-center gap-2">
                    <FaVenusMars className="text-purple-500" /> {gender || 'Not set'}
                </div>
                <div className="flex items-center gap-2">
                    <FaBirthdayCake className="text-orange-500" />
                    {birthdate ? dayjs(birthdate).format('D MMM, YYYY') : 'Not set'}
                </div>
                </div>

                <p className="text-sm  mt-1">
                Joined: {createdAt ? dayjs(createdAt).format('D MMM YYYY') : 'Unknown'}
                </p>
            </div>
            </div>

            {/* Private Profile Message */}
            {isPrivete && (
            <div className="mt-6 p-4 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded-lg flex items-center gap-3 shadow-sm">
                <MdLockOpen className="text-xl" />
                <span>This profile is marked as private.</span>
            </div>
            )}
        </div>
        </div>
    );
};

export default ProfileInfo;