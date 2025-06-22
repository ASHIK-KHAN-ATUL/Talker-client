import React from 'react';
import { useParams } from 'react-router-dom';
import VisitProfileImage from './VisitProfileImage/VisitProfileImage';
import VisitProfileTab from './VisitProfileTab/VisitProfileTab';

const VisitProfile = () => {

    const {id} = useParams();
    console.log('Visit id:',id);

    return (
        <div className='min-h-screen'>
            <VisitProfileImage id={id}></VisitProfileImage>
            <VisitProfileTab></VisitProfileTab>
        </div>
    );
};

export default VisitProfile;