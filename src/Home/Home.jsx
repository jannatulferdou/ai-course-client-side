import React from 'react';
import Banner from './Banner';
import FreeCourses from '../Pages/FreeCourses';

import Courses from '../Pages/courses/course';
import LatestCourse from '../Pages/LatestCourse';
import PopularCourse from '../Pages/Popular/PopularCourse';
import Review from '../Pages/Review';
import OurCourseSuccess from '../Pages/ScuccessRate';
import Service from '../Pages/Service';


const Home = () => {
    return (
        <div className='bg-gradient-to-tr from-[#0f172a] via-[#1e293b] to-[#020617]'>
            <Banner></Banner>
            <FreeCourses></FreeCourses>
          
            <Courses></Courses>
            <LatestCourse></LatestCourse>
            <PopularCourse></PopularCourse>
            <Service></Service>
            <Review></Review>
            <OurCourseSuccess></OurCourseSuccess>
            
        </div>
    );
};

export default Home;