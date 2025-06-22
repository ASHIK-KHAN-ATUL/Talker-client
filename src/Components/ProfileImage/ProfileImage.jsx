import useAuth from '../../Hooks/useAuth';
import { data } from 'react-router-dom';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { toast } from 'react-toastify';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import ShowPostByME from '../../Components/ShowPostByME/ShowPostByME';
import { MoonLoader } from 'react-spinners';


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const ProfileImage = () => {

    const {user, loading} = useAuth();
    // console.log(user);
    const axiosSecure =  useAxiosSecure();

    const {data: mainUser=[], refetch, isLoading} = useQuery({
        queryKey:['mainUser'],
        enabled: !user?.email,
        queryFn: async()=> {
            const res = await axiosSecure.get(`/users/user/${user?.email}` )
            return res.data;
        }
    })
    // console.log(mainUser);

    const {data:followers=[]} = useQuery({
            queryKey: ['followers'],
            enabled: !!mainUser._id,
            queryFn: async()=> {
            const res = await axiosSecure.get(`/users/user/${mainUser?._id}/followers`);
            return res.data;
        }
    })
    // console.log('Followers:', followers)

    
    if(isLoading){
    return (
        <div className="min-h-screen flex items-center justify-center">
            <MoonLoader color="#FF6B6B" />
        </div>
    )
 
    }

    const handleCoverPhotoChange = async(e) => {
        const imageFile = e.target.files[0];
        if(!imageFile) return;
        // upload in imgBB
        const formData = new FormData();
        formData.append('image', imageFile)
        const res = await fetch(image_hosting_api, {
            method: 'POST',
            body: formData
        })
        const result = await res.json();
        const imageURL = result?.data?.display_url;
        if(!imageURL) return;

        // Now update in DB
        const updateRes = await axiosSecure.patch(`/users/cover/${user?.email}`,{
            coverPhoto: imageURL,
        })
        if(updateRes.data.modifiedCount > 0){
            refetch();
            toast.success('Cover photo updated');
        }


    }

    return (
            <div className=' mb-10'>
                <div className='max-w-4xl  mx-auto relative mb-26'>

                    <div className='relative'>
                        {/* cover photo */}
                        <div className='h-[300px] bg-gray-400 '>
                            <img src={mainUser?.coverPhoto} className=' w-full h-[300px]  object-cover object-center' alt="cover photo" />
                        </div>

                        {/* upload btn  */}
                        <div className='absolute top-3 right-3'>
                            <label htmlFor="coverUpload" className='btn btn-xs '>Change Cover </label>
                            <input  type="file"  id="coverUpload"  accept="image/*" onChange={handleCoverPhotoChange} className="hidden" />
                        </div>
                    </div>

                    <div className='absolute w-full flex items-center gap-10 -bottom-24'>

                        {/* profile photo */}
                        <img src={mainUser?.image} alt="" className='h-32 w-32 object-cover rounded-full border-4 border-[#FF6B6B] transform shadow-xl bg-gray-400'/>

                        <div className='pt-10'>
                            <h1 className='text-3xl font-semibold'>{mainUser.name}</h1>
                            <div className='flex gap-5 font-medium'> 
                                <p>Followers {followers?.length}</p>
                                <p>Following {mainUser?.following?.length}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
};

export default ProfileImage;