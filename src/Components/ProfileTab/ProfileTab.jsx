import React, { useState } from 'react';
import useAuth from '../../Hooks/useAuth';
import ShowPostByME from '../ShowPostByME/ShowPostByME';
import PostedImage from '../PostedImage/PostedImage';
import MyFollowers from '../MyFollowers/MyFollowers';
import MyFollowing from '../MyFollowing/MyFollowing';
import { useQuery } from '@tanstack/react-query';
import { FaEdit, FaEye } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const ProfileTab = () => {

    const profileTab = ["Post", "Photos", "Followers", "Following"]
    const [activeTab, setActiveTab] = useState('Post');
    const {isDark} = useAuth();
    const {user} = useAuth();
    const navigate = useNavigate();

    const {data: mainUser=[], refetch, isLoading} = useQuery({
        queryKey:['mainUser'],
        enabled: !user?.email,
        queryFn: async()=> {
            const res = await axiosSecure.get(`/users/user/${user?.email}` )
            return res.data;
        }
    })
    // console.log(mainUser):

    const handleViewInfo = () => {
        navigate('/myProfile/info');
    }
    const handleInfoEdit = () => {
        navigate('/myProfile/info/edit');
    }



    return (
        <div className={`max-w-4xl mx-auto mt-32 `}>

                    <div className="bg-[#FF6B6B]/40 border border-[#FF6B6B] shadow-md rounded p-6 mb-10 w-[95%] max-w-3xl mx-auto relative">
                        <div className='absolute top-2 right-2'>
                            <button onClick={handleViewInfo} className='btn btn-sm bg-transparent border-none shadow-none text-xl'><FaEye  /></button>
                            <button onClick={handleInfoEdit} className='btn btn-sm bg-transparent border-none shadow-none text-xl'><FaEdit /></button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-4 text-sm">
                            <p><span className="font-semibold">Email:</span> {mainUser.email || 'Not set'}</p>
                            <p><span className="font-semibold">Bio:</span> {mainUser.bio || 'Not set'}</p>
                            <p><span className="font-semibold">Gender:</span> {mainUser.gender || 'Not set'}</p>
                            <p><span className="font-semibold">Location:</span> {mainUser.location || 'Unknown'}</p>
                            <p><span className="font-semibold">Birthdate:</span> {mainUser.birthdate || 'Not provided'}</p>
                            <p><span className="font-semibold">Status:</span> {mainUser.status}</p>
                            <p><span className="font-semibold">Verified:</span> {mainUser.isVerified ? 'Yes' : 'No'}</p>
                            <p><span className="font-semibold">ProfileLocked:</span> {mainUser.profileLocked ? 'Yes' : 'No'}</p>
                            <p><span className="font-semibold">Private Profile:</span> {mainUser.isPrivete ? 'Yes' : 'No'}</p>
                            <p><span className="font-semibold">Register With:</span> {mainUser.authProvider}</p>
                        </div>
                    </div>

            {/* Tabs  */}
            <div role="tablist" className="tabs tabs-border mb-10">
                {
                    profileTab.map((tab, idx) =>
                        <a 
                            key={idx} 
                            role="tab"  className={`tab font-medium transition-all duration-200 ${      activeTab === tab   ? 'tab-active ' : 'text-[#FF6B6B]/60' }`}
                            style={{ color: activeTab === tab ? '#FF6B6B' : 'rgba(255, 107, 107, 0.6)' }}
                            onClick={()=>setActiveTab(tab)} >{tab}</a>
                     )
                }
            </div>

            {/* Show Content */}

            {/* MyPost */}
            {
                activeTab === 'Post' && <ShowPostByME></ShowPostByME>
            }

            {/* my Posted Image */}
            {
                activeTab === 'Photos' && <PostedImage></PostedImage>
            }

            {/* My Followers  */}
            {
                activeTab === 'Followers' && <MyFollowers></MyFollowers>
            }

            {/* My Following */}
            {
                activeTab === 'Following' && <MyFollowing></MyFollowing>
            }

        </div>
    );
};

export default ProfileTab;