import React, { useContext } from 'react';
import { Link } from 'react-router-dom'; 
import { AuthContext } from '../../Shared/Provider/AuthProvider';

const UserProfile = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className='min-h-screen  py-20 pt-30 flex justify-center items-center bg-gradient-to-tr from-[#0f172a] via-[#1e293b] to-[#020617] px-4'>
      <div className='w-full max-w-2xl p-8 rounded-2xl backdrop-blur-lg border border-cyan-800/30 bg-white/5 shadow-xl text-white'>
        <div className='flex flex-col items-center'>
          {/* Profile Image with gradient border */}
          <div className="p-[4px] rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 shadow-lg mb-6">
            <div className="bg-[#0f172a] rounded-full w-48 h-48 overflow-hidden">
              <img
                src={user?.photoURL}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* User Info */}
          <div className='text-center space-y-3'>
            <h1 className='text-4xl font-extrabold tracking-tight'>{user?.displayName}</h1>
            <p className='text-lg'>
              <span className='text-cyan-400 font-medium'>Email:</span> {user?.email}
            </p>
          </div>

          {/* Edit Button */}
          <Link to='/update-profile'>
            <button className='mt-8 px-6 py-2 rounded-md bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold shadow-md transition duration-300'>
              Edit Profile
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
