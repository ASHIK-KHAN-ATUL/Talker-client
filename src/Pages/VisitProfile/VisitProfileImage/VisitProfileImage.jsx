import React from 'react';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const VisitProfileImage = ({id}) => {

    const axiosPublic = useAxiosPublic();

    const {data: visitUser ={}, isLoading, refetch} = useQuery({
        queryKey: ['visitUser', id],
        queryFn: async() => {
            const res = await axiosPublic.get(`users/user/visit/${id}`);
            return res.data;
        }
    })
    console.log('visit user :', visitUser)

    return (
            <div className=' mb-10'>
                <div className='max-w-4xl  mx-auto relative mb-26'>

                    <div className='relative'>
                        {/* cover photo */}
                        <div className='h-[300px] bg-gray-400 '>
                            <img src={visitUser?.coverPhoto} className=' w-full h-[300px]  object-cover object-center' alt="cover photo" />
                        </div>

                        {/* upload btn 
                        <div className='absolute top-3 right-3'>
                            <label htmlFor="coverUpload" className='btn btn-xs '>Change Cover </label>
                            <input  type="file"  id="coverUpload"  accept="image/*" onChange={handleCoverPhotoChange} className="hidden" />
                        </div> */}
                    </div>

                    <div className='absolute w-full flex items-center gap-10 -bottom-24'>

                        {/* profile photo */}
                        <img src={visitUser?.image} alt="" className='h-32 w-32 object-cover rounded-full border-4 border-[#FF6B6B] transform shadow-xl bg-gray-400'/>

                        <div className='pt-10'>
                            <h1 className='text-3xl font-semibold'>{visitUser.name}</h1>
                            <div className='flex gap-5'> 
                                <p>Followers {visitUser?.followers?.length}</p>
                                <p>Following {visitUser?.following?.length}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
};

export default VisitProfileImage;