import React, { useState } from 'react';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import useAuth from '../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const CreatePost = () => {

    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const {user} = useAuth();
    const navigate = useNavigate();

    // get the user
    const {data:mainUser=[], refetch} = useQuery({
        queryKey: ['mainUser'],
        enabled: !!user?.email,
        queryFn: async() => {
            const res = await axiosPublic.get(`/users/${user?.email}`);
            return res.data
        }
    })
    // console.log(mainUser)

    const [postText, setPostText] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const handleImageChange = e => {
        const file = e.target.files[0];
        if(file){
            setImageFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async(e) => {
        e.preventDefault();

        if(!postText.trim() && !imageFile){
            toast.error('Please Write Something Or Select An Image');
            refetch;
            return;
        }

        let imageUrl = '';

        if(imageFile){
            const formData = new FormData();
            formData.append('image', imageFile);
            const res = await fetch(image_hosting_api, {
                method: "POST",
                body: formData
            });

            const imgData = await res.json();
            if(imgData.success){
                imageUrl = imgData.data.url;
            }else{
                toast.error('Image Upload Failed')
            }
        }


        const postData = {
            authorName: mainUser.name,
            authorImage: mainUser.image,
            author_id: mainUser._id,
            authorEmail: mainUser.email,
            postText: postText,
            postImage: imageUrl,
            postCreateAt: new Date(),
            likes: []
        }

        axiosSecure.post('/talker/posts', postData)
        .then(res => {
            if(res.data.insertedId){
                console.log('Post Added In Database');
                toast.success('Post Create Done')
                navigate('/')
                setPostText('');
                setImageFile(null);
                setPreviewUrl(null);
            }
        })


    }

    return (
        <div className='max-w-3xl mx-auto bg-[#FF6B6B]/40 p-2 md:p-5 border-[#FF6B6B] border-2 rounded-md my-2 md:my-5 w-[95%]'>

            <div className=' flex items-center gap-3 mb-2 mb:mb-4'>
                <img src={mainUser.image} className='h-12 w-12 rounded-full object-cover' alt="User" />
                <h2 className='font-semibold text-lg'>{mainUser.name}</h2>
            </div>


            <form onSubmit={handleSubmit} >

                {/* post Text */}
                <textarea className='w-full bg-[#FF6B6B]/30 rounded-md border border-[#FF6B6B] focus:outline-none p-2 md:p-4' placeholder=" What's on your mind?" value={postText} onChange={(e)=> setPostText(e.target.value)} id="" rows={1}></textarea>

                {/* Image */}
                <div className=''>
                    <div className=' md:my-3 flex items-center justify-between'>
                        <input type="file" onChange={handleImageChange} className='file-input file-input-error file-input-bordered w-full max-w-xs text-white bg-[#FF6B6B]/30' id="" />
                        <button  type="submit" className="btn border-none px-6 py-2 bg-cyan-400 text-white font-semibold rounded hover:bg-[#ff4c4c] transition cursor-pointer" >  Post
                        </button>
                    </div>

                    {/* Image Preview */}
                    {
                        previewUrl && (
                                <img src={previewUrl} alt="Image Preview" className='mt-2 rounded-md  h-32 object-cover border border-[#FF6B6B]' />

                        )
                    }
                </div>


            </form>



        </div>
    );
};

export default CreatePost;