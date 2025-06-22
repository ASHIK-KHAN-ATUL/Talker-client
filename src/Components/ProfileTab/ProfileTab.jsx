import React, { useState } from 'react';
import useAuth from '../../Hooks/useAuth';
import ShowPostByME from '../ShowPostByME/ShowPostByME';
import PostedImage from '../PostedImage/PostedImage';
import MyFollowers from '../MyFollowers/MyFollowers';

const ProfileTab = () => {

    const profileTab = ["Post", "Photos", "Followers", "Following"]
    const [activeTab, setActiveTab] = useState('Post');
    const {isDark} = useAuth();

    return (
        <div className={`max-w-4xl mx-auto mt-32 `}>

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

        </div>
    );
};

export default ProfileTab;