import React, { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router';
import logo from '../assets/logo.png'

import { toast } from 'react-toastify';
import { AuthContext } from './Provider/AuthProvider';
import userImg from '../assets/user.avif'

const Navbar = () => {

  const {user, logout}=useContext(AuthContext);
   const navigate = useNavigate();
  const handleLogout = () => {
    logout()
      .then(() => {
        toast.success('You have logged out successfully');
        navigate('/'); 
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const links=<>
    <li>
  <NavLink
    to="/"
    className={({ isActive }) =>
      `relative font-semibold px-3 py-1 rounded-lg transition-all duration-300 group ${
        isActive ? "text-cyan-500" : "hover:text-cyan-400"
      }`
    }
  >
    Home
    {/* Underline effect on hover */}
    <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-cyan-600 rounded-full transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
  </NavLink>
</li>

{
  user && <> 
  <li>
  <NavLink
    to="/addCourse"
    className={({ isActive }) =>
      `relative font-semibold px-3 py-1 rounded-lg transition-all duration-300 group ${
        isActive ? "text-cyan-500" : "hover:text-cyan-400"
      }`
    }
  >
   Add Course
    {/* Underline effect on hover */}
    <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-cyan-600 rounded-full transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
  </NavLink>
</li>
  </>
}
    

{
  user && <> 
    <li>
  <NavLink
    to="/manageCourse"
    className={({ isActive }) =>
      `relative font-semibold px-3 py-1 rounded-lg transition-all duration-300 group ${
        isActive ? "text-cyan-500" : "hover:text-cyan-400"
      }`
    }
  >
  Manage Course
    {/* Underline effect on hover */}
    <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-cyan-600 rounded-full transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
  </NavLink>
</li>
  </>
}
  
    {
      user &&
      <>
      <li>
  <NavLink
    to="/myEnrolledCourse"
    className={({ isActive }) =>
      `relative font-semibold px-3 py-1 rounded-lg transition-all duration-300 group ${
        isActive ? "text-cyan-500" : "hover:text-cyan-400"
      }`
    }
  >
   My Enrolled Course
    {/* Underline effect on hover */}
    <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-cyan-600 rounded-full transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
  </NavLink>
</li>
       </>
    }
    <li>
  <NavLink
    to="/instructors"
    className={({ isActive }) =>
      `relative font-semibold px-3 py-1 rounded-lg transition-all duration-300 group ${
        isActive ? "text-cyan-500" : "hover:text-cyan-400"
      }`
    }
  >
   Instructors
    {/* Underline effect on hover */}
    <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-cyan-600 rounded-full transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
  </NavLink>
</li>
  
  
    <li>
  <NavLink
    to="/aboutUs"
    className={({ isActive }) =>
      `relative font-semibold px-3 py-1 rounded-lg transition-all duration-300 group ${
        isActive ? "text-cyan-500" : "hover:text-cyan-400"
      }`
    }
  >
   About Us
    {/* Underline effect on hover */}
    <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-cyan-600 rounded-full transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
  </NavLink>
</li>

       
 
    
  </>
  return (
    <div className="absolute top-0 left-0 w-full z-50">
      <div className="navbar px-4 lg:px-12 py-5 font-medium bg-gray-900/60 text-white backdrop-blur-md">
        {/* Navbar Start */}
        <div className="navbar-start">
          <div className="dropdown lg:hidden">
            <label tabIndex={0} className="btn btn-ghost text-white">
              <svg xmlns="http://www.w3.org/2000/svg"
                   className="h-6 w-6" fill="none"
                   viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </label>
            <ul tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 bg-gray-900/80 backdrop-blur-md rounded-box w-52">
              {links}
            </ul>
          </div>
          <div className='flex'>
            <img src={logo} alt="" className='w-20 h-15 text-cyan-500' />
            <a 
  
  className="text-4xl relative top-2 font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 via-cyan-600 to-white bg-clip-text text-transparent drop-shadow-lg transition-all duration-300"
>
  NeuroNest
</a>

          </div>
        </div>

        {/* Navbar Center */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 space-x-1 ml-10 mt-2">
            {links}
          </ul>
        </div>

        {/* Navbar End */}
        <div className='navbar-end'>
                    {user ? (
  <>
<div className="dropdown dropdown-bottom dropdown-end">
  <div
    tabIndex={0}
    className="w-10 cursor-pointer h-10 ml-40 rounded-full p-[2px] bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 transition duration-300"
  >
    <div className="rounded-full w-full h-full bg-[#0f172a] overflow-hidden">
      <img
        src={user?.photoURL || userImg}
        alt="User Profile"
        className="object-cover w-full h-full"
        title={user?.displayName || 'User'}
      />
    </div>
  </div>

  <ul
    tabIndex={0}
    className="dropdown-content menu bg-[#0f172a] mt-3 z-[999] p-4 w-56  rounded-xl border border-cyan-800 animate-fade-in backdrop-blur-md text-white space-y-2"
  >
    <li>
      <Link
        to="/userProfile"
        className="px-4 py-2 rounded-md hover:bg-cyan-700/20 transition-colors duration-300 font-medium"
      >
         My Profile
      </Link>
    </li>
    
    <li>
      <button
        onClick={handleLogout}
        className="w-full px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 cursor-pointer rounded-md font-semibold transition duration-300 shadow-md"
      >
         Log Out
      </button>
    </li>
  </ul>

  
</div>

    
    
  </>
) : (

<>
   
   <div className='flex gap-3'>
    <button>
    <Link className='btn bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-10 border-hidden' to='/auth/register'>
      Register
    </Link>
  </button>
  
  <button>
    <Link className='btn bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-10 border-hidden' to='/auth/login'>
      Login
    </Link>
  </button>
   </div>
</>
)}
        </div>

      </div>
    </div>
  );
};

export default Navbar;
