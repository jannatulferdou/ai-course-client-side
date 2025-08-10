import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUserGraduate, FaArrowRight, FaSearch, FaStar, FaChalkboardTeacher } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';
import Loading from '../../Shared/Loading/Loading';

const Instructors = () => {
  const [instructors, setInstructors] = useState([]);
  const [filteredInstructors, setFilteredInstructors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const response = await axios.get('https://ai-course-server.vercel.app/courses');
        const uniqueInstructors = response.data.reduce((acc, course) => {
          if (course.instructor && !acc.some(i => i.name === course.instructor.name)) {
            acc.push({
              id: course._id,
              name: course.instructor.name,
              bio: course.instructor.bio,
              experience: course.instructor.experience,
              image: course.instructor.image || 'https://i.ibb.co/bMwBFxgk/logo.png',
              category: course.category,
              rating: course.rating || 4.5,
              coursesCount: response.data.filter(c => c.instructor?.name === course.instructor.name).length
            });
          }
          return acc;
        }, []);
        setInstructors(uniqueInstructors);
        setFilteredInstructors(uniqueInstructors);
      } catch (error) {
        console.error('Error fetching instructors:', error);
        Swal.fire({
          title: 'Error',
          text: 'Failed to load instructors',
          icon: 'error',
          background: '#1e293b',
          color: 'white'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchInstructors();
  }, []);

  useEffect(() => {
    let results = instructors;
    
    if (searchTerm) {
      results = results.filter(instructor =>
        instructor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        instructor.bio.toLowerCase().includes(searchTerm.toLowerCase()) ||
        instructor.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (activeCategory !== 'All') {
      results = results.filter(instructor => 
        instructor.category.toLowerCase() === activeCategory.toLowerCase()
      );
    }

    setFilteredInstructors(results);
  }, [searchTerm, activeCategory, instructors]);

  const categories = ['All', ...new Set(instructors.map(i => i.category))];

  const handleViewProfile = (instructorId) => {
    navigate(`/instructor/${instructorId}`);
  };

  if (loading) {
    return <Loading></Loading>;
  }

  return (
    <div className="bg-gradient-to-tr from-[#0f172a] via-[#1e293b] to-[#020617] min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto mt-20">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
              Meet Our
            </span>{' '}
            <span className="text-white">Instructors</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Learn from industry pioneers and academic experts in AI and technology
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          

          <div className="flex flex-wrap justify-center gap-3">
            {categories.map(category => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === category 
                    ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-500/30' 
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Instructors Grid */}
        {filteredInstructors.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            
            <h3 className="text-xl font-medium text-gray-300 mb-2">No instructors found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setActiveCategory('All');
              }}
              className="mt-4 text-cyan-400 hover:text-cyan-300 font-medium"
            >
              Reset filters
            </button>
          </motion.div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredInstructors.map((instructor) => (
              <motion.div
                key={instructor.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -5 }}
                className="bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-gray-700 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-cyan-500/10"
              >
                <div className="p-6">
                  <div className="flex flex-col items-center mb-6">
                    <div className="relative mb-4 group">
                      
                       <div className="relative mb-4">
                      <img
                        src={instructor.image}
                        alt={instructor.name}
                        className="w-24 h-24 rounded-full object-cover border-4 border-cyan-600/50 hover:border-cyan-400 transition-all duration-300"
                        onError={(e) => {
                          e.target.src = 'https://i.ibb.co/bMwBFxgk/logo.png';
                        }}
                      />
                      <div className="absolute -bottom-2 -right-2 bg-cyan-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                        {instructor.category}
                      </div>
                    </div>
                    </div>
                    <h3 className="text-xl font-bold text-white text-center">{instructor.name}</h3>
                   
                  </div>

                  <div className="flex justify-center gap-4 mb-6">
                    <div className="flex items-center text-sm text-gray-300">
                      <FaStar className="text-yellow-400 mr-1" />
                      <span>{instructor.rating}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-300">
                      <FaChalkboardTeacher className="text-cyan-400 mr-1" />
                      <span>{instructor.coursesCount} courses</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-300">
                      <FaUserGraduate className="text-purple-400 mr-1" />
                      <span>{instructor.experience}</span>
                    </div>
                  </div>

                  <p className="text-gray-300 text-sm mb-6 line-clamp-3 text-center">{instructor.bio}</p>

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleViewProfile(instructor.id)}
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-medium py-2 px-4 rounded-xl transition-all duration-300 shadow-lg shadow-cyan-500/20"
                  >
                    View Profile <FaArrowRight />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

      
      </div>
    </div>
  );
};

export default Instructors;