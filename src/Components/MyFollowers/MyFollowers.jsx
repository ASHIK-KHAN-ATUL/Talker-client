import React from 'react';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const MyFollowers = () => {

    const {user} = useAuth();
    const axiosSecure = useAxiosSecure(); 

    const {data: mainUser=[], isLoading} = useQuery({
        queryKey:['mainUser'],
        enabled: !!user?.email,
        queryFn: async()=> {
            const res = await axiosSecure.get(`/users/user/${user?.email}` )
            return res.data;
        }
    })
    // console.log('Maniuser:', mainUser);

    const {data:followers=[], refetch} = useQuery({
        queryKey: ['followers'],
        enabled: !!mainUser._id,
        queryFn: async()=> {
            const res = await axiosSecure.get(`/users/user/${mainUser?._id}/followers`);
            return res.data;
        }
    })
    console.log('Followers:', followers)

    return (
        <div>
            
        </div>
    );
};

export default MyFollowers;