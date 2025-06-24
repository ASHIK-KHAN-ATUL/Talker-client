import React from 'react';
import logo from '../../assets/Mainlogo.png'
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';
import { toast } from 'react-toastify';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import GoogleLogin from '../../Shared/GoogleLogin';


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Register = () => {

    const {user, createUser, updateUserProfile} = useAuth();
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();

    const handleRegister = async(e) => {
        e.preventDefault();

        const form = new FormData(e.target);
        const name = form.get('name')
        const email = form.get('email')
        const imageFile = form.get('image')
        const password = form.get('password')

        const user = {name, email,imageFile, password}
        console.log(user)


        const formData = new FormData();
        formData.append('image', imageFile)
        const res = await fetch(image_hosting_api, {
            method: 'POST',
            body: formData
        })

        const result = await res.json();
        console.log(result);

        if(result?.success){
            const photoUrl = result.data.display_url;

            // create User
            createUser(email, password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                toast.success('Account Create successfully')


            // update user 
            updateUserProfile(name, photoUrl)
            .then( () => {
                toast.info('User Data Updated');
                navigate('/');


            // User data Save in DB
            const userInfo = {
                name: name,
                email: email,
                image: photoUrl,
                isVerified: false,
                authProvider: 'email',
                createdAt: new Date(),
                bio: '',
                location: '',
                gender: '',
                birthdate: '',
                profileLocked: false,
                coverPhoto: '',
                isPrivete: false,
                blockedUsers: [],
                followers: [],
                following: ['68514e67001a483d85f37b31', '6857c167413421291cf16d27'],
                posts: [],
                savedPosts: [],
                role: "user",
                status: "active",
                reports: [],   
            }
            axiosPublic.post('/users', userInfo)
            .then(res => {
                if(res.data.insertedId){
                    console.log('User Added to daatabase')
                }
            })
        })
        })
        }else{
            toast.error(('Something Went Wrong'))
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center ">
            <div className="bg-[#FF6B6B]/30 border border-[#FF6B6B] p-10 shadow-md w-full max-w-2xl">
                <div className=" mb-6 flex items-center justify-center text-[#FF6B6B]">
                    <p className='text-2xl font-semibold text-center'>Register to</p> 
                    <img src={logo} className='h-14' alt="" />
                </div>
                
                <form onSubmit={handleRegister}>

                    <div className="mb-10 ">
                        <label className="block mb-1 font-medium" >Name</label>
                        <input
                            type="name"
                            name='name'
                            id="name"
                            className="w-full px-4 py-2 border-b focus:outline-none text-[#FF6B6B] "
                        />
                    </div>

                    <div className="mb-10 ">
                        <label className="block mb-1 font-medium" >Email</label>
                        <input
                            type="email"
                            name='email'
                            id="email"
                            className="w-full px-4 py-2 border-b focus:outline-none text-[#FF6B6B] "
                        />
                    </div>

                    <div className="mb-10">
                        <label className="block mb-1 font-medium " >Profile Photo</label>
                        <input required type="file" name="image"  className="w-full px-4 py-2 text-[#FF6B6B]  border border-[#FF6B6B] border-dashed rounded-md file:mr-4 file:py-2 file:px-4  file:border-0 file:text-sm file:font-semibold file:bg-[#FF6B6B] file:text-white "
                            />
                    </div>

                    <div className="mb-10">
                        <label className="block mb-1 font-medium" htmlFor="password">Password</label>
                        <input
                            type="password"
                            name='password'
                            maxLength={12}
                            minLength={6}
                            id="password"
                            className="w-full px-4 py-2 border-b focus:outline-none text-[#FF6B6B] "
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#FF6B6B] text-white py-2 rounded-md hover:bg-[#00C6FF] duration-300 font-semibold cursor-pointer transition hover:scale-x-90 "
                    >
                        Register
                    </button>
                </form>
                <div className='mt-5'>
                    <p className='text-center text-sm'>Already have an account? <Link className='text-green-500' to={'/login'}>Login</Link></p>
                </div>

                <div className='flex justify-center items-center'>
                    <GoogleLogin></GoogleLogin>
                </div>
            </div>
        </div>
    );
};

export default Register;