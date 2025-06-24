import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { FaHeart, FaRegCommentDots, FaRegHeart } from 'react-icons/fa';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAuth from '../../Hooks/useAuth';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { BsThreeDotsVertical } from 'react-icons/bs';
import Swal from 'sweetalert2';

const ShowPostByME = () => {

    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const {user} = useAuth();
    // console.log(user);
    const navigate = useNavigate();
    const [openDot, setOpenDot] = useState(null);

    const {data:posts=[], refetch} = useQuery({
        queryKey: ['posts'],
        enabled: !!user,
        queryFn: async()=> {
            const res = await axiosSecure.get(`/posts/user/${user?.email}`);
            return res.data; 
        }
    })

    // console.log('Posts', posts)

    const {data:mainUser=[]} = useQuery({
        queryKey: ['mainUser'],
        enabled: !!user?.email,
        queryFn: async() => {
            const res = await axiosPublic.get(`/users/${user?.email}`);
            return res.data
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
    // console.log('user for like', mainUser?._id)

    if(posts.length === 0){
        return (
            <div className=' flex items-center justify-center text-lg font-semibold'>
                No post upload yet
            </div>
        )
    }

    const handleDelete = async(id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
            }).then(async(result) => {
            if (result.isConfirmed) {

                const res = await axiosSecure.delete(`/posts/post/${id}`);
                if(res.data.deletedCount > 0){
                    
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                    });
                refetch();
                }
            }
            });
    }

    return (
        <div className='w-[95%] max-w-4xl mx-auto '>
            {
                posts.map(post => (
                    <div key={post._id} className='bg-[#FF6B6B]/40 border border-[#FF6B6B]  roounded-xl drop-shadow p-4 pb-0 mb-5 relative'>

                        {/* 3 dot  */}
                        <button className='absolute -right-3 top-1 btn bg-transparent text-2xl border-none shadow-none' onClick={()=>setOpenDot(openDot === post._id ? null : post._id)}>
                            <BsThreeDotsVertical />
                            {
                                openDot === post._id && (
                                    <div className={`absolute z-10 bg-white text-red-500 top-8 right-6 rounded w-32 p-2`}>
                                        <button onClick={()=>handleDelete(post._id)} className='block w-full text-left px-3 py-1 hover:bg-red-100 text-sm rounded'>Delete Post</button>
                                    </div>
                                )
                            }
                        </button>


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
                                <button className='cursor-pointer' onClick={() => {handleLike(post._id), refetch()}}>
                                    {
                                        post.likes?.includes(mainUser._id) ?  <FaHeart className='text-red-500' /> : <FaRegHeart/>
                                    }
                                    </button>    
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

export default ShowPostByME;