import React, { useState } from 'react';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FaRegCommentDots, FaRegHeart } from 'react-icons/fa';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import useAuth from '../../../Hooks/useAuth';
import { toast } from 'react-toastify';

const VisitProfilePosts = ({id}) => {

    const visitedId = id;
    // console.log(visitedId);

    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const [openDot, setOpenDot] = useState(null);
    const {user} = useAuth();

    const {data:posts=[], refetch} = useQuery({
        queryKey: ['posts', visitedId],
        enabled: !!visitedId,
        queryFn: async()=> {
            const res = await axiosSecure.get(`/posts/user/visit/${visitedId}`);
            return res.data; 
        }
    })
    // console.log("posts:", posts);

    const {data:mainUser=[]} = useQuery({
        queryKey: ['mainUser'],
        enabled: !!user?.email,
        queryFn: async() => {
            const res = await axiosPublic.get(`/users/${user?.email}`);
            return res.data;
        }
    })

    // Like post
    const handleLike = async(postId) => {
        if(!user || !mainUser?._id){
            toast.error('Please Login To Like Post');
            return
        }
        console.log(postId);
        axiosSecure.patch(`/posts/${postId}/like`, {
            userId: mainUser?._id
        });
        refetch();
    }




    return (
        <div className='w-[95%] max-w-4xl mx-auto '>
            {
                posts.map(post => (
                    <div key={post._id} className='bg-[#FF6B6B]/40 border border-[#FF6B6B]  roounded-xl drop-shadow p-4 pb-0 mb-5 relative'>

                        {/* Author Info */}
                        <div className='flex gap-5 items-center mb-3'>
                            <img src={post.authorImage} className='h-10 w-10 rounded-full object-cover' alt="Author Image" />
                            <div>
                                <p className='font-semibold'>{post.authorName}</p>
                                <p className="text-sm text-gray-500">{dayjs(post.postCreateAt).fromNow()}</p>
                            </div>
                        </div>

                        {/* Post Text */}
                        <p className='mb-3 whitespace-pre-wrap'>{post.postText}</p>

                        {/* Post Image */}
                        {post.postImage && (
                             <img src={post.postImage} alt="Post" className="rounded-lg mb-4 h-[300px] lg:h-[450px] lg:w-[70%] mx-auto object-cover  " />
                        )}

                        {/* Like and  Comment */}
                        <div className=' flex gap-20 text-xl'>
                            <div className='flex gap-2'>
                                <button onClick={() => {handleLike(post._id), refetch()}}>{<FaRegHeart className={` cursor-pointer ${post.likes.includes(mainUser._id) ? 'text-red-500' : ''}`} />}</button>    
                                <span className='mb-1'>{post.likes.length}</span>                           
                            </div>
                            <div>
                                <button onClick={()=>navigate(`/posts/${post._id}`)}  >{<FaRegCommentDots className='cursor-pointer'  />}</button>                                  
                            </div>
                        </div>

                    </div>
                ))
            }
        </div>
    );
};

export default VisitProfilePosts;