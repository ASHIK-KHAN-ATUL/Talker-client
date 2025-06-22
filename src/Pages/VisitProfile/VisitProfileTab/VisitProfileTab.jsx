import React, { useState } from 'react';

const VisitProfileTab = () => {

    const profileTab = ["Post", "Photos", "Following", "Followers"]
    const [activeTab, setActiveTab] = useState('Post');

    return (
        <div className={`max-w-4xl mx-auto mt-32 `}>

            {/* Tabs  */}
            <div role="tablist" className="tabs tabs-border">
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


        </div>
    );
};

export default VisitProfileTab;