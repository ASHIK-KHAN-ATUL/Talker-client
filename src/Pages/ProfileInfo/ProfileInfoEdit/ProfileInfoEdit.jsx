import React, { useState } from 'react';
import useAuth from '../../../Hooks/useAuth';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useNavigate } from 'react-router-dom';

const ProfileInfoEdit = () => {

    const {user} = useAuth();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const {data:mainUser={}, refetch} = useQuery({
        queryKey: ['mainUser'],
        enabled: !!user?.email,
        queryFn: async() => {
            const res = await axiosPublic.get(`/users/${user?.email}`);
            return res.data
        }
    })

    const [formData, setFormData] = useState({
        name: mainUser.name || '',
        bio: mainUser.bio || '',
        location: mainUser.location || '',
        gender: mainUser.gender || '',
        birthdate: mainUser.birthdate || '',
        profileLocked: mainUser.profileLocked || false,
        isPrivete: mainUser.isPrivete || false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axiosSecure.patch(`/users/user/update/${user?.email}`, formData)
        .then(res => {
            if (res.data.modifiedCount > 0) {
            toast.success('Profile updated successfully');
            navigate('/myProfile/info')
            refetch();
            } else {
            toast.info('No changes made');
            }
        })
    };



    return (
  <div className="max-w-2xl mx-auto p-5 ">
      <h2 className="text-2xl font-bold mb-4 text-center">Edit Profile Info</h2>

      <form onSubmit={handleSubmit} className="space-y-4 bg-[#FF6B6B]/40 border border-[#FF6B6B] rounded-md p-10">
        <div>
          <label className="label text-black font-semibold">Name</label>
          <input
            type="text"
            name="name"
            className="border-b-2 p-2 border-violet-500 w-full bg-transparent focus:outline-none"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="label text-black font-semibold">Bio</label>
          <textarea
            name="bio"
            className="border-b-2 p-2 border-violet-500 w-full bg-transparent focus:outline-none"
            rows={1}
            value={formData.bio}
            onChange={handleChange}
          ></textarea>
        </div>

        <div>
          <label className="label text-black font-semibold">Location</label>
          <input
            type="text"
            name="location"
            className="border-b-2 p-2 border-violet-500 w-full bg-transparent focus:outline-none"
            value={formData.location}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="label text-black font-semibold">Gender</label>
          <select
            name="gender"
            className="border-b-2 p-2 border-violet-500 w-full bg-transparent focus:outline-none"
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div>
          <label className="label text-black font-semibold">Birthdate</label>
          <input
            type="date"
            name="birthdate"
            className="border-b-2 p-2 border-violet-500 w-full bg-transparent focus:outline-none"
            value={formData.birthdate}
            onChange={handleChange}
          />
        </div>

        <div className="flex gap-5">
          <label className="cursor-pointer flex items-center gap-2 text-black font-semibold ">
            <input
              type="checkbox"
              name="profileLocked"
              className="checkbox bg-base-200 "
              checked={formData.profileLocked}
              onChange={handleChange}
            />
            Profile Locked
          </label>

          <label className="cursor-pointer flex items-center gap-2 text-black font-semibold">
            <input
              type="checkbox"
              name="isPrivete"
              className="checkbox bg-base-200"
              checked={formData.isPrivete}
              onChange={handleChange}
            />
            Private Profile
          </label>
        </div>

        <button type="submit" className="btn bg-[#FF6B6B] text-white w-full">
          Save Changes
        </button>

      </form>
    </div>
    );
};

export default ProfileInfoEdit;