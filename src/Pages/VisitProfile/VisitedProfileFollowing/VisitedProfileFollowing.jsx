import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { MoonLoader } from 'react-spinners';
import { MdDeleteForever } from 'react-icons/md';
import { toast } from 'react-toastify';

const VisitedProfileFollowing = ({id}) => {

    const visitedId = id;
    // console.log(visitedId);
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

    const {data: visitedUser={}} = useQuery({
        queryKey:['visitedUser', visitedId],
        enabled: !!visitedId,
        queryFn: async()=> {
            const res= await axiosSecure.get(`/users/user/visit/${visitedId}`)
            return res.data;
        }
    })
    console.log('visitedUser', visitedUser);

    const {data:followingUser=[], isLoading} = useQuery({
        queryKey: ['followingUser', visitedUser?.following],
        enabled: !!visitedUser?.following?.length,
        queryFn: async()=>{
            const res = await axiosSecure.post('/users/user/following/details', {ids: visitedUser.following});
            return res.data;
        }
    })

    
    if (!followingUser || followingUser.length === 0) {
    return (
        <div className="w-full text-center text-red-600 py-10">
        You don't follow anyone yet.
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
        <div className='w-[95%] max-w-4xl mx-auto bg-white/50 p-2 lg:p-5 flex flex-col gap-3'>
            {followingUser.map(flw => 
                (
                    <div key={flw._id} className='flex items-center bg-red-500/30 justify-between p-2 rounded-md'>
                        <img src={flw.image} className='h-12 w-12 object-cover rounded-full border border-[#FF6B6B]' alt="" />
                        <p className='font-semibold '>{flw.name}</p>
                        <button onClick={()=> toast.info('Coming Soon')} className='text-2xl font-semibold text-white  h-10 w-10 bg-[#FF6B6B]/70 rounded-full flex items-center justify-center cursor-pointer'>
                            <MdDeleteForever />
                        </button>
                    </div>
                )
            )}
        </div>
    );
};

export default VisitedProfileFollowing;