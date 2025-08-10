import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FaLinkedin, FaEnvelope, FaPhone, FaUserGraduate, FaArrowLeft, FaStar, FaChalkboardTeacher } from 'react-icons/fa';
import { FiClock, FiBook } from 'react-icons/fi';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';
import Loading from '../../Shared/Loading/Loading';

const Instructor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [instructor, setInstructor] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [courseResponse, allCoursesResponse] = await Promise.all([
          axios.get(`https://ai-course-server.vercel.app/courses/${id}`),
          axios.get('https://ai-course-server.vercel.app/courses')
        ]);

        const instructorData = courseResponse.data.instructor;
        const instructorCourses = allCoursesResponse.data.filter(
          course => course.instructor?.name === instructorData.name
        );

        setInstructor({
          ...instructorData,
          rating: courseResponse.data.rating || 4.5
        });
        setCourses(instructorCourses);
      } catch (error) {
        console.error('Error fetching data:', error);
        Swal.fire({
          title: 'Error',
          text: 'Failed to load instructor data',
          icon: 'error',
          background: '#1e293b',
          color: 'white'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <Loading></Loading>;
  }

  if (!instructor) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center text-white py-20"
      >
        <p className="text-xl">Instructor not found</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 text-cyan-400 hover:text-cyan-300 font-medium"
        >
          Back to instructors
        </button>
      </motion.div>
    );
  }

  return (
    <div className="bg-gradient-to-tr from-[#0f172a] via-[#1e293b] to-[#020617] min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 pt-30">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mb-8 transition-colors"
          whileHover={{ x: -3 }}
        >
          <FaArrowLeft /> Back to Instructors
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-gray-700"
        >
          {/* Instructor Header */}
          <div className="md:flex">
            <div className="md:w-1/3 p-8 flex justify-center items-center">
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full opacity-0 group-hover:opacity-30 blur-md transition-opacity duration-500"></div>
                <img
                  src={instructor.image || 'https://i.ibb.co/bMwBFxgk/logo.png'}
                  alt={instructor.name}
                  className="relative w-64 h-64 rounded-full object-cover border-4 border-gray-700 group-hover:border-cyan-500 transition-all duration-500 z-10"
                  onError={(e) => {
                    e.target.src = 'https://i.ibb.co/bMwBFxgk/logo.png';
                  }}
                />
              </motion.div>
            </div>
            <div className="md:w-2/3 p-8">
              <motion.h1 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-3xl md:text-4xl font-bold text-cyan-400 mb-2"
              >
                {instructor.name}
              </motion.h1>
              
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center text-gray-300">
                  <FaUserGraduate className="mr-2 text-cyan-400" />
                  <span>{instructor.experience} experience</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <FaStar className="mr-2 text-yellow-400" />
                  <span>{instructor.rating} Rating</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <FaChalkboardTeacher className="mr-2 text-purple-400" />
                  <span>{courses.length} Courses</span>
                </div>
              </div>

              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-gray-300 mb-8 leading-relaxed"
              >
                {instructor.bio}
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className=" mb-2"
              >
                {instructor.linkedin && (
                  <motion.a
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    href={`https://${instructor.linkedin.replace(/^https?:\/\//, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2  px-5 py-3 rounded-xl transition-all duration-300 shadow-lg"
                  >
                    <FaLinkedin className="text-cyan-400 text-lg" />
                    <span>{instructor.linkedin}</span>
                  </motion.a>
                )}
                <motion.a
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  href={`mailto:${instructor.contact.email}`}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl transition-all duration-300 shadow-lg"
                >
                  <FaEnvelope className="text-cyan-400 text-lg" />
                  <span>{instructor.contact.email}</span>
                </motion.a>
                <motion.a
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  
                  className="flex items-center gap-2 px-5 py-3 rounded-xl transition-all duration-300 shadow-lg"
                >
                  <FaPhone className="text-cyan-400 text-lg" />
                  <span>{instructor.contact.phone}</span>
                </motion.a>
              </motion.div>
            </div>
          </div>

          {/* Instructor's Courses */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
            className="border-t border-gray-700 p-8"
          >
            <h2 className="text-2xl font-bold text-cyan-400 mb-6">Courses by {instructor.name}</h2>
            
            {courses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course, index) => (
                  <motion.div
                    key={course._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    whileHover={{ y: -5 }}
                    className={`bg-gray-700/50 hover:bg-gray-700/70 rounded-xl overflow-hidden border border-gray-600 hover:border-cyan-500 transition-all duration-300 shadow-lg ${
                      index === 0 ? 'mt-8' : ''
                    }`}
                  >
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={course.image} 
                        alt={course.title} 
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                   <Link to={`/courseDetails/${course._id}`}>
                    <div className="p-5">
                      <h3 className="font-bold text-lg mb-2 line-clamp-1">{course.title}</h3>
                      <div className="flex justify-between items-center text-sm text-gray-300">
                        <div className="flex items-center gap-1">
                          <FiClock className="text-cyan-400" />
                          <span>{course.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <FiBook className="text-cyan-400" />
                          <span>{course.level}</span>
                        </div>
                      </div>
                    </div>
                   </Link>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-gray-400">No courses found for this instructor</p>
              </div>
            )}
          </motion.div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-16 bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-4">
              <div className="text-4xl font-bold text-cyan-400 mb-2">{courses.length}</div>
              <p className="text-gray-300">Courses Taught</p>
            </div>
            <div className="p-4">
              <div className="text-4xl font-bold text-cyan-400 mb-2">{instructor.experience}</div>
              <p className="text-gray-300">Years Experience</p>
            </div>
            <div className="p-4">
              <div className="text-4xl font-bold text-cyan-400 mb-2">{instructor.rating}</div>
              <p className="text-gray-300">Average Rating</p>
            </div>
            <div className="p-4">
              <div className="text-4xl font-bold text-cyan-400 mb-2">100%</div>
              <p className="text-gray-300">Student Satisfaction</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Instructor;