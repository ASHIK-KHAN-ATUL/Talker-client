import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const VisitProfilePostedPhoto = ({id}) => {

    const visitedId = id;
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();

    const {data: posts=[],isLoading, refetch} = useQuery({
        queryKey:['posts', visitedId],
        enabled: !!visitedId,
        queryFn: async()=>{
            const res= await axiosSecure.get(`/posts/image/user/visit/${visitedId}`)
            return res.data;
        }
    })
    console.log('Posts:', posts)

    return (
        <div className="w-[95%] max-w-4xl  bg-white/50 p-3 mx-auto grid grid-cols-2 md:grid-cols-3 gap-4">
            {posts.map(post => (
                <img
                    key={post._id}
                    src={post?.postImage}
                    alt="Posted"
                    className="rounded object-cover h-48 w-48 shadow-md border border-[#FF6B6B]"
                />
            ))}
        </div>
    );
};

export default VisitProfilePostedPhoto;