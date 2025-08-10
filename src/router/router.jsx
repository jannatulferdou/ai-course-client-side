import React from 'react';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import Root from '../Root/Root';
import Home from '../Home/Home';
import CourseDetails from '../Pages/courses/CourseDetails';

import ErrorPage from '../Shared/ErrorPage/ErrorPage';
import EnrollForm from '../Pages/courses/EnrollForm';
import MyEnrolledCourse from '../Pages/courses/MyEnrolledCourse';
import CourseForm from '../Pages/AddCourse/CourseForm';
import EditCourseForm from '../Pages/editCourse/EditCourseForm';

import Instructors from '../Pages/Instructors/Instructors';
import Instructor from '../Pages/Instructors/Instructor';
import ManageCourses from '../Pages/Managecourse/ManageCourses';
import AboutUs from '../Shared/AboutUs';
import Contact from '../Pages/Contact';
import Faq from '../Pages/Faq';
import PrivacyPolicy from '../Pages/PrivacyPolicy';
import Terms from '../Pages/Terms';
import Cookies from '../Pages/Cookies';
import Login from '../Shared/JoinWebSite/Login';
import Register from '../Shared/JoinWebSite/Register';
import AuthLayout from '../AuthLayout/AuthLayout';
import UserProfile from '../Pages/UserProfile/UserProfile';
import PrivateRoute from '../Shared/Provider/PriveteRoute';
import UpdateProfile from '../Pages/UserProfile/UpdateProfile';



const router = createBrowserRouter([
    {
        path: "/",
      errorElement:<ErrorPage></ErrorPage>,   
    Component:Root,
   
    children:[
        {
            index:true,
            path:'/',
            Component:Home
            
        },
        {
            path:'/courseDetails/:id',
            
            element:<CourseDetails></CourseDetails>
         
        },
        {
            path:'/enrollForm/:id',
            element: <PrivateRoute><EnrollForm></EnrollForm></PrivateRoute>
        },  
        {
            path:'/myEnrolledCourse',
            element:<PrivateRoute><MyEnrolledCourse></MyEnrolledCourse></PrivateRoute>
        },
        {
            path:'/addCourse',
            element:<PrivateRoute><CourseForm></CourseForm></PrivateRoute>

        },
        {
            path:'/editCourseForm/:id',
            element: <PrivateRoute><EditCourseForm></EditCourseForm></PrivateRoute>
        },
        {
            path:'/instructors',
            Component:Instructors
        
        },
        {
            path:'/instructor/:id',
            element:<PrivateRoute><Instructor></Instructor></PrivateRoute>
        },
        {
            path: '/manageCourse',
            element:<PrivateRoute><ManageCourses></ManageCourses></PrivateRoute>
        },
         {
            path:'/userProfile',
            Component: UserProfile
        },
        {
            path:'/update-profile',
            element: <PrivateRoute><UpdateProfile></UpdateProfile></PrivateRoute>

        },
        {
            path:'/aboutUs',
            Component:AboutUs
        },
        {
            path:'/contact',
            Component:Contact
        },
        {
            path:'/faq',
            Component:Faq
        },
        {
            path:'/privacy',
            Component:PrivacyPolicy
        },
        {
            path:'/terms',
            Component: Terms
        },
        {
            path:'/cookies',
            Component:Cookies

        },
       
     
    ]
    },
         {
        path:'/auth',
        element: <AuthLayout></AuthLayout>,
        children:[
            {
                path:'/auth/login',
                Component:Login
            },
            {
                path:'/auth/register',
                Component:Register
            },
            
        ]


    },
])


export default router;