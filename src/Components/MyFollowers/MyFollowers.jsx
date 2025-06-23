import React from 'react';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { MdDeleteForever } from 'react-icons/md';
import { toast } from 'react-toastify';
import { MoonLoader } from 'react-spinners';

const MyFollowers = () => {

    const {user} = useAuth();
    const axiosSecure = useAxiosSecure(); 

    const {data: mainUser=[]} = useQuery({
        queryKey:['mainUser'],
        enabled: !!user?.email,
        queryFn: async()=> {
            const res = await axiosSecure.get(`/users/user/${user?.email}` )
            return res.data;
        }
    })
    // console.log('Maniuser:', mainUser);

    const {data:followers=[], refetch, isLoading} = useQuery({
        queryKey: ['followers'],
        enabled: !!mainUser._id,
        queryFn: async()=> {
            const res = await axiosSecure.get(`/users/user/${mainUser?._id}/followers`);
            return res.data;
        }
    })
    console.log('Followers:', followers)

    if (!followers || followers.length === 0) {
    return (
        <div className="w-full text-center text-red-600 py-10">
        You don’t have any followers yet.
        </div>
    );
    }

    if (isLoading) {
        return (
        <div className="min-h-screen flex items-center justify-center">
            <MoonLoader color="#FF6B6B" />
        </div>
    ) ;
    }

    return (
        <div className='w-[95%] max-w-4xl  mx-auto bg-white/50  p-2 lg:p-5 flex flex-col gap-3 '>
            {followers.map(follower => 
                (
                    <div key={follower._id} className='flex items-center bg-red-500/30 justify-between p-2 rounded-md'>
                        <img src={follower.image} className='h-12 w-12 object-cover rounded-full border border-[#FF6B6B]' alt="" />
                        <p className='font-semibold '>{follower.name}</p>
                        <button onClick={()=> toast.info('Coming Soon')} className='text-2xl font-semibold text-white  h-10 w-10 bg-[#FF6B6B]/70 rounded-full flex items-center justify-center cursor-pointer'>
                            <MdDeleteForever />
                        </button>
                    </div>
                )
            )}
        </div>
    );
};

export default MyFollowers;