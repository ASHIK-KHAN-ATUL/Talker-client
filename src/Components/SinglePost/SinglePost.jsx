import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { FaHeart, FaRegCommentDots, FaRegHeart } from 'react-icons/fa';
import useAuth from '../../Hooks/useAuth';
import { IoIosSend } from 'react-icons/io';
import { toast } from 'react-toastify';


const SinglePost = () => {

    const {id} = useParams();
    // console.log(id);
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();
    const {user} = useAuth()
    const [commentText, setCommentText] = useState('')


    const {data:singlePost=[], refetch} = useQuery({
        queryKey: ['singlePost',id],
        queryFn: async()=> {
            const res = await axiosPublic.get(`/posts/singlepost/${id}`);
            return res.data; 
        }
    })
    // console.log(singlePost)

    // Like post
    const handleLike = async(postId) => {
        if(!user || !mainUser?._id){
            toast.error('Please Login To Like Post');
            return;
        }
        // console.log(postId);
        await axiosSecure.patch(`/posts/${postId}/like`, {
            userId: mainUser?._id
        });
        refetch();
    }
    // console.log('user for like', mainUser?._id)

    const {data:mainUser={}} = useQuery({
        queryKey: ['mainUser'],
        enabled: !!user?.email,
        queryFn: async() => {
            const res = await axiosPublic.get(`/users/${user?.email}`);
            return res.data
        }
    })

    const handleCommentSubmit = async() => {
        if(!commentText.trim()) return;

        const newComment ={
            postId: id,
            cmtText: commentText,
            parentId: null,
            userId : mainUser._id,
            userName: mainUser.name,
            userImage: mainUser.image,
            createAt: new Date()
        }

        await axiosSecure.post('/comments', newComment)
        .then(res => {
            if(res.data.insertedId){
                toast.success('Comment Send Success');
                setCommentText('');
                refetchComments();
            }else{
                toast.error('Failed to comment')
            }
        })
    } 


    // Get the Comments
    const {data:comments=[], refetch:refetchComments} = useQuery({
        queryKey: ['comments',id],
        queryFn: async()=> {
            const res = await axiosSecure.get(`/comments/post/${id}`)
            return res.data
        }
    })
    console.log('Comment: ', comments)


    return (
        <div className='py-10'>
            <div className="bg-[#FF6B6B]/40 rounded-lg shadow-lg p-5 md:p-6 border border-[#FF6B6B]  w-[95%] max-w-2xl mx-auto">
                {/* Author Info */}
                <div className="flex items-center gap-4 mb-4">
                    <img
                    src={singlePost.authorImage}
                    alt="Author"
                    className="w-12 h-12 rounded-full object-cover border-2 border-[#FF6B6B]"
                    />
                    <div>
                    <p className="font-semibold ">{singlePost.authorName}</p>
                    <p className="text-sm ">{dayjs(singlePost.postCreateAt).fromNow()}</p>
                    </div>
                </div>

                {/* Post Text */}
                <p className=" text-base whitespace-pre-wrap mb-4 leading-relaxed">
                    {singlePost.postText}
                </p>

                {/* Post Image */}
                {singlePost.postImage && (
                    <img
                    src={singlePost.postImage}
                    alt="Post"
                    className="rounded-xl  object-cover mx-auto max-h-[450px] w-auto mb-3 border border-[#FF6B6B]/50"
                    />
                )}

                {/* Like and  Comment */}
                <div className=' flex gap-20 text-xl'>
                    <div className='flex gap-2'>
                        <button className='cursor-pointer' onClick={() => {handleLike(singlePost._id)}}>
                            {
                                singlePost?.likes?.includes(mainUser._id) ?  <FaHeart className='text-red-500' /> : <FaRegHeart/>
                            }
                        </button>    
                        <span className='mb-1'>{singlePost?.likes?.length}</span>                           
                    </div>
                    <div>
                        <button >{<FaRegCommentDots className='cursor-pointer'  />}</button>                                  
                    </div>
                </div>

                {/* Give Comment */}
                <div className='flex items-center justify-between p-2 bg-white/40 rounded-2xl my-3 px-5'>
                    <img className='h-10 w-10 rounded-full border border-white object-cover' src={mainUser.image} alt="" />
                    <textarea value={commentText} onChange={(e)=> setCommentText(e.target.value)} className='rounded-xl border border-[#FF6B6B] outline-0 w-[80%] p-2 font-medium' name="" id="" rows={1}></textarea>
                    <button onClick={handleCommentSubmit}><IoIosSend className='text-3xl cursor-pointer text-[#FF6B6B] btn bg-transparent border-none btn-sm shadow-none' /></button>
                </div>

                {/* Show commrent */}
                <div className='max-h-[200px] overflow-y-auto p-3 pb-0 drop-shadow-xl  shadow-sm rounded-lg flex flex-col gap-4'>
                    {
                        comments.length === 0 ? 

                        (<p className='text-center font-medium'>No Comments Yet..</p>) : 

                        (
                            comments.map((comment) => (
                                <div key={comment._id} className='flex gap-5 text-sm items-center py-1 '>
                                    <img src={comment.userImage} className='w-10 h-10 rounded-full object-cover border-2 border-[#FF6B6B]/50' alt="Image" />
                                    <div>
                                        <div className='flex gap-5'>
                                            <p className='font-semibold'>{comment.userName}</p>
                                            <p className='font-medium text-xs opacity-50'>{dayjs(comment.createAt).fromNow()}</p>
                                        </div>
                                        <p>{comment.cmtText}</p>
                                    </div>
                                </div>
                            ))
                        )
                    }
                </div>

            </div>
        </div>
    );
};

export default SinglePost;