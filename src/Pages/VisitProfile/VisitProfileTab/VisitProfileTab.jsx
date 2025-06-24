import React, { useState } from 'react';
import VisitProfilePosts from '../VisitProfilePosts/VisitProfilePosts';
import VisitProfilePostedPhoto from '../VisitProfilePostedPhoto/VisitProfilePostedPhoto';
import VisitedProfileFollowers from '../VisitedProfileFollowers/VisitedProfileFollowers';
import VisitedProfileFollowing from '../VisitedProfileFollowing/VisitedProfileFollowing';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';

const VisitProfileTab = ({id}) => {

    // console.log('Vister id:',id);
    const profileTab = ["Post", "Photos", "Following", "Followers"]
    const [activeTab, setActiveTab] = useState('Post');
    const axiosPublic = useAxiosPublic();

    const {data: visitedUser={}} = useQuery({
        queryKey: ['visitedUser', id],
        enabled:  !!id,
        queryFn: async()=>{
            const res = await axiosPublic.get(`/users/user/visit/${id}`);
            return res.data
        }
    })
    // console.log('visitedUser :', visitedUser);

    return (
        <div className={`max-w-4xl mx-auto mt-32 `}>

            {
                visitedUser?.profileLocked === false && (
                    <div className="bg-[#FF6B6B]/40 border border-[#FF6B6B] shadow-md rounded p-6 mb-10 w-[95%] max-w-3xl mx-auto">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-4 text-sm">
                            <p><span className="font-semibold">Email:</span> {visitedUser.email || 'Not set'}</p>
                            <p><span className="font-semibold">Gender:</span> {visitedUser.gender || 'Not set'}</p>
                            <p><span className="font-semibold">Location:</span> {visitedUser.location || 'Unknown'}</p>
                            <p><span className="font-semibold">Birthdate:</span> {visitedUser.birthdate || 'Not provided'}</p>
                            <p><span className="font-semibold">Status:</span> {visitedUser.status}</p>
                            <p><span className="font-semibold">Verified:</span> {visitedUser.isVerified ? 'Yes' : 'No'}</p>
                            <p><span className="font-semibold">Private Profile:</span> {visitedUser.isPrivete ? 'Yes' : 'No'}</p>
                        </div>
                    </div>
                )
            }

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

            
            {
                visitedUser?.profileLocked === false ? 

                (            
                    <>
                    {/* Show Content */}

                    {/* Post */}
                    {
                        activeTab === "Post" && <VisitProfilePosts id={id}></VisitProfilePosts>
                    }

                    {/* Photos */}
                    {
                        activeTab === "Photos" && <VisitProfilePostedPhoto id={id}></VisitProfilePostedPhoto>
                    }

                    {/* Following */}
                    {
                        activeTab === "Following" && <VisitedProfileFollowing id={id}></VisitedProfileFollowing>
                    }


                    {/* Followers */}
                    {
                        activeTab === "Followers" && <VisitedProfileFollowers id={id}></VisitedProfileFollowers>
                    }
                    </>
                )  :  

                (
                    <div className="text-center text-red-500 font-medium mt-10 flex flex-col items-center gap-2">
                        <span className="text-4xl">🔒</span>
                    This profile is locked. You cannot view the content.
                    </div>
                )


            }


        </div>
    );
};

export default VisitProfileTab;