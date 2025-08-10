import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaBrain, FaClock, FaStar, FaRegStar, FaStarHalfAlt } from 'react-icons/fa';
import { MdPriceChange } from 'react-icons/md';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const bgGradients = [
  'from-[#1f2937] to-[#111827]',
  'from-[#0f172a] to-[#1e293b]',
  'from-[#0d1117] to-[#161b22]',
  'from-[#1a1a2e] to-[#16213e]'
];

const PopularCourseCard = ({ course, index }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} className="text-yellow-400" />);
    }
    if (halfStar) {
      stars.push(<FaStarHalfAlt key="half" className="text-yellow-400" />);
    }
    while (stars.length < 5) {
      stars.push(<FaRegStar key={`empty-${stars.length}`} className="text-yellow-400" />);
    }
    return stars;
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        delay: inView ? index * 0.15 : 0,
        duration: 0.6,
        ease: 'easeOut'
      }}
      className={`rounded-3xl p-6 flex flex-col md:flex-row items-center justify-between bg-gradient-to-br ${bgGradients[index % bgGradients.length]} border border-cyan-700/30`}
    >
      <img
        src={course.image}
        alt={course.title}
        className="w-full md:w-44 h-44 object-cover rounded-2xl mb-4 md:mb-0 md:mr-6 border-2 border-cyan-500 shadow-inner"
      />
      <div className="flex-1 text-gray-300">
        <h3 className="text-xl font-bold text-cyan-300 mb-2">{course.title}</h3>
        <p className="text-sm leading-relaxed mb-3">
          {course.description.slice(0, 110)}...
        </p>
        <div className="text-sm flex flex-wrap items-center gap-4 mb-2 text-gray-400">
          <span className="flex items-center gap-2">
            <FaBrain className="text-cyan-400" /> {course.level}
          </span>
          <span className="flex items-center gap-2">
            <FaClock className="text-cyan-400" /> {course.duration}
          </span>
          <span className="flex items-center gap-2">
            <MdPriceChange className="text-cyan-400" /> ৳ {course.price}
          </span>
        </div>

        {/* Rating */}
        {course.rating && (
          <div className="flex items-center gap-1 mb-2 text-yellow-400 text-sm">
            {renderStars(course.rating)}
            <span className="ml-2 text-gray-300">({course.rating.toFixed(1)})</span>
          </div>
        )}

        <Link
          to={`/courseDetails/${course._id}`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-black bg-cyan-400 hover:bg-cyan-300 px-4 py-2 rounded-full transition duration-200 mt-2 shadow-md"
        >
          View Details <FaArrowRight />
        </Link>
      </div>
    </motion.div>
  );
};

export default PopularCourseCard;

