import React from 'react';
import { useParams } from 'react-router-dom';
import VisitProfileImage from './VisitProfileImage/VisitProfileImage';
import VisitProfileTab from './VisitProfileTab/VisitProfileTab';

const VisitProfile = () => {

    const {id} = useParams();
    // console.log('Visit id:',id);

    return (
        <div className='pb-10'>
            <VisitProfileImage id={id}></VisitProfileImage>
            <VisitProfileTab id={id}></VisitProfileTab>
        </div>
    );
};

export default VisitProfile;