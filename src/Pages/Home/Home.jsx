import React from 'react';
import CreatePost from '../../Components/CreatePost/CreatePost';
import Showpost from '../../Components/Showpost/Showpost';

const Home = () => {
    return (
        <div className='pb-10'>
            <CreatePost></CreatePost>
            <Showpost></Showpost>
        </div>
    );
};

export default Home;