import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaBookOpen, FaSignal, FaCalendarAlt, FaArrowRight } from 'react-icons/fa';

const LatestCourse = () => {
  const [latestCourses, setLatestCourses] = useState([]);

  useEffect(() => {
    fetch('https://ai-course-server.vercel.app/latest-courses')
      .then(res => res.json())
      .then(data => setLatestCourses(data))
      .catch(error => console.error("Failed to fetch courses", error));
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <h2 className="text-4xl font-extrabold mb-12 text-center text-cyan-500 tracking-wide font-mono">
        🚀 Latest Tech Courses
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {latestCourses.map(course => (
          <CourseCard key={course._id} course={course} />
        ))}
      </div>
    </div>
  );
};

const CourseCard = ({ course }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <motion.div
      ref={ref}
      whileHover={{ scale: 1.04 }}
      transition={{ duration: 0.3 }}
      className="relative group rounded-xl overflow-hidden shadow-xl  backdrop-blur-sm"
    >
      {/* Image with perspective and glow effect */}
      <div className="w-full h-56" style={{ perspective: 1000 }}>
        <motion.img
          initial={{ rotateY: 0 }}
          animate={inView ? { rotateY: 360 } : { rotateY: 0 }}
          transition={{ duration: 2.5, ease: 'easeInOut' }}
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover rounded-t-xl border-b border-cyan-500/20 shadow-inner"
          style={{ transformStyle: 'preserve-3d' }}
        />
      </div>

      {/* Overlay */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileHover={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm flex flex-col justify-center items-center text-white text-center px-4 opacity-0 group-hover:opacity-100"
      >
        <h3 className="text-2xl font-bold mb-3 font-mono text-cyan-400">
          {course.title || "Untitled Course"}
        </h3>
        <div className="text-sm space-y-2 mb-5 font-light">
          <p className="flex items-center gap-2 justify-center">
            <FaBookOpen className="text-cyan-300 animate-pulse" /> {course.category}
          </p>
          <p className="flex items-center gap-2 justify-center">
            <FaSignal className="text-cyan-300 animate-pulse" /> {course.level}
          </p>
          <p className="flex items-center gap-2 justify-center">
            <FaCalendarAlt className="text-cyan-300 animate-pulse" />{" "}
            {new Date(parseInt(course._id.substring(0, 8), 16) * 1000).toLocaleDateString()}
          </p>
        </div>
        <Link to={`/courseDetails/${course._id}`}>
          <button className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-2 rounded-full font-semibold shadow-md transition duration-300 hover:shadow-cyan-500/40">
            View Details <FaArrowRight />
          </button>
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default LatestCourse;
