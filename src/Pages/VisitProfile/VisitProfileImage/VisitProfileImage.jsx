import React from 'react';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { toast } from 'react-toastify';
import useAuth from '../../../Hooks/useAuth';

const VisitProfileImage = ({id}) => {

    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const {user} = useAuth();

    const {data: visitUser ={}, refetch} = useQuery({
        queryKey: ['visitUser', id],
        queryFn: async() => {
            const res = await axiosPublic.get(`users/user/visit/${id}`);
            return res.data;
        }
    })
    // console.log('visit user :', visitUser);

    const handleFollow = async(id) => {
        const followingId = id;
        const res = await axiosSecure.patch(`users/user/follow/${user?.email}`,{followingId});
        if(res.data.success){
            console.log(res)
            toast.success(`${visitUser.name} ${res.data.following ? 'Followed by' : 'Unfollowed by'} You`);
            mainRefetch();
        }
    }

    const {data: mainUser ={}, refetch:mainRefetch } = useQuery({
        queryKey: ['mainUser', user?.email],
        enabled: !!user?.email,
        queryFn: async() => {
            const res = await axiosSecure.get(`users/user/${user?.email}`);
            return res.data;
        }
    })
    // console.log('mainUser :', mainUser);

    return (
            <div className=' mb-10'>
                <div className='max-w-4xl  mx-auto relative mb-26'>

                    <div className='relative'>
                        {/* cover photo */}
                        <div className='h-[300px] bg-gray-400 '>
                            <img src={visitUser?.coverPhoto} className=' w-full h-[300px]  object-cover object-center' alt="cover photo" />
                        </div>
                    </div>

                    <div className='absolute w-full flex items-center gap-10 -bottom-24'>

                        {/* profile photo */}
                        <img src={visitUser?.image} alt="" className='h-32 w-32 object-cover rounded-full border-4 border-[#FF6B6B] transform shadow-xl bg-gray-400'/>

                        <div className='pt-10'>

                            <h1 className='text-2xl md:text-3xl font-semibold'>   
                                {visitUser.name}
                            </h1>

                            <div className='flex flex-col md:flex-row md:gap-5 md;items-center'>
                                <div className='flex  gap-5 font-semibold'> 
                                    <p>Followers {visitUser?.followers?.length}</p>
                                    <p>Following {visitUser?.following?.length}</p>
                                </div>

                                <h2 onClick={()=>handleFollow(visitUser._id)} className='font-bold text-lg cursor-pointer w-fit'>{mainUser?.following?.includes(visitUser._id) ?
                                 <span className='text-blue-500'>Following</span> : <span className='text-green-500'>Follow+</span>
                                 }</h2>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
    );
};

export default VisitProfileImage;