import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { FaHeart, FaRegCommentDots, FaRegHeart } from 'react-icons/fa';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAuth from '../../Hooks/useAuth';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';


dayjs.extend(relativeTime);


const Showpost = () => {

    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const {user} = useAuth();
    // console.log(user)
    const navigate = useNavigate();

    const {data:posts=[], refetch} = useQuery({
        queryKey: ['posts'],
        queryFn: async()=> {
            const res = await axiosPublic.get('/posts');
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
        // console.log(postId);
        axiosSecure.patch(`/posts/${postId}/like`, {
            userId: mainUser?._id
        });
        refetch();
    }
    // console.log('user for like', mainUser?._id)

    return (
        <div className='w-[95%] max-w-3xl mx-auto'>
            {
                posts.map(post => (
                    <div key={post._id} className='bg-[#FF6B6B]/40 border border-[#FF6B6B]  roounded-xl drop-shadow p-2 md:p-4 pb-0 mb-2 md:mb-5 rounded'>
                        {/* Author Info */}
                        <div className='flex gap-5 items-center mb-3'>
                            <Link to={post.authorEmail === user?.email? `/profile/${mainUser._id}` : `/profile/visit/${post.author_id}`}>
                                <img src={post.authorImage} className='h-10 w-10 rounded-full object-cover' alt="Author Image" />
                            </Link>
                            <div>
                                <p className='font-semibold'>{post.authorName}</p>
                                <p className="text-sm ">{dayjs(post.postCreateAt).fromNow()}</p>
                            </div>
                        </div>

                        {/* Post Text */}
                        <p className='mb-3 whitespace-pre-wrap'>{post.postText}</p>

                        {/* Post Image */}
                        {post.postImage && (
                             <img src={post.postImage} alt="Post" className="rounded-lg mb-4 h-[300px] lg:h-[450px] lg:w-[70%] mx-auto object-cover " />
                        )}

                        {/* Like and  Comment */}
                        <div className=' flex gap-20 text-xl'>
                            <div className='flex gap-2'>
                                <button className='cursor-pointer' onClick={() => {handleLike(post._id); refetch()}}>
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

export default Showpost;