import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PopularCourseCard from '../PopularCourseCard';


const PopularCourse = () => {
  const [popularCourses, setPopularCourses] = useState([]);

  useEffect(() => {
    axios.get('https://ai-course-server.vercel.app/popular-courses')
      .then(res => setPopularCourses(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <section className="py-16 px-4 md:px-10 lg:px-20 bg-gradient-to-tr from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white">
      <h2 className="text-4xl font-bold mb-12 text-center text-cyan-400 drop-shadow-lg">
        ⚡ Top Enrolled Courses
      </h2>
      <div className="grid md:grid-cols-2 gap-8">
        {popularCourses.map((course, index) => (
          <PopularCourseCard key={course._id} course={course} index={index} />
        ))}
      </div>
    </section>
  );
};

export default PopularCourse;

