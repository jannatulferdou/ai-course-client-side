import React, { useEffect, useState } from "react";
import axios from "axios";
import { ArrowRight, Clock, Calendar, Zap } from "lucide-react";
import { motion } from "framer-motion";

import { MdKeyboardArrowRight } from "react-icons/md";
import { Link } from "react-router";
import { useInView } from "react-intersection-observer";
import Loading from "../../Shared/Loading/Loading";

// Course card component
const CourseCard = ({ course, index }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="relative group rounded-xl overflow-hidden bg-white/5 backdrop-blur-md border border-cyan-400/10 hover:border-cyan-400/30 transition-all duration-300 shadow-md hover:shadow-cyan-500/30"
    >
      <div className="relative h-72 overflow-hidden">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/90 to-transparent p-4 flex flex-col justify-end">
          <span className="text-xs font-mono text-cyan-400 bg-cyan-700/30 px-2 py-1 rounded w-max mb-2 tracking-wide uppercase">
            {course.category}
          </span>
          <h3 className="text-lg font-semibold text-white mb-1 line-clamp-2">
            {course.title}
          </h3>
          <div className="flex justify-between text-sm text-cyan-100/70 mb-1">
            <div className="flex items-center">
              <Clock size={14} className="mr-1" />
              {course.duration}
            </div>
            <div className="flex items-center">
              <Calendar size={14} className="mr-1" />
              {new Date(course.start_time).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </div>
          </div>
          <div className="flex justify-between text-xs text-cyan-200 font-mono mb-3">
            <span className="bg-cyan-600/20 px-2 py-1 rounded">
              {course.level}
            </span>
            <span className="text-cyan-300 font-bold">{course.price}</span>
          </div>
          <Link to={`/courseDetails/${course._id}`}>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="items-center text-sm bg-gradient-to-r from-cyan-500 to-indigo-600 text-white p-2 rounded-full w-8 h-8 shadow-md hover:shadow-cyan-500/30 transition-all"
            >
              <MdKeyboardArrowRight size={20} className="relative right-0.5 bottom-0.5" />
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

// Category filter button
const CategoryButton = ({ category, activeFilter, onClick }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={`px-5 py-2 rounded-full text-sm font-mono uppercase tracking-wide transition-all duration-300 border border-cyan-500 ${
      activeFilter === category
        ? "bg-cyan-600 text-white"
        : "bg-transparent text-cyan-400 hover:bg-cyan-500/20"
    }`}
  >
    {category}
  </motion.button>
);

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState("All");
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("https://ai-course-server.vercel.app/courses");
        setCourses(response.data);
      } catch (err) {
        console.error("Error fetching courses:", err);
        setError("Failed to load courses. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const categories = [
    "All",
    ...new Set(courses.map((course) => course.category.replace(/-/g, " "))),
  ];

  const filteredCourses =
    activeFilter === "All"
      ? courses
      : courses.filter(
          (course) =>
            course.category === activeFilter.toLowerCase().replace(/ /g, "-")
        );

  const visibleCourses = showAll ? filteredCourses : filteredCourses.slice(0, 6);

  if (loading) return <Loading />;
  if (error)
    return <div className="text-center py-20 text-red-400">{error}</div>;

  return (
    <div className="bg-gradient-to-tr from-[#0f172a] via-[#1e293b] to-[#020617] min-h-screen py-13 px-4 md:px-6 lg:px-15 font-sans">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block mb-4 text-xs font-mono text-cyan-400 bg-cyan-900/30 px-4 py-1 rounded-full tracking-wide"
          >
            <Zap size={14} className="inline mr-2" /> Featured Courses
          </motion.span>
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-5xl font-extrabold text-white mb-6 tracking-tight font-orbitron"
          >
            Master Cutting-Edge{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-500">
              Technologies
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="max-w-2xl mx-auto text-white text-lg"
          >
            Learn from industry experts and build real-world projects with our
            comprehensive tech courses.
          </motion.p>
        </div>

        {/* Categories */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <CategoryButton
              key={category}
              category={category}
              activeFilter={activeFilter}
              onClick={() => {
                setActiveFilter(category);
                setShowAll(false);
              }}
            />
          ))}
        </motion.div>

        {/* Course Grid */}
        {visibleCourses.length > 0 ? (
          <div className="grid gap-10 grid md:grid-cols-2 lg:grid-cols-3">
            {visibleCourses.map((course, index) => (
              <CourseCard key={course._id} course={course} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-cyan-400">
            No courses found in this category.
          </div>
        )}

        {/* View All Button */}
        {!showAll && filteredCourses.length > 6 && (
          <motion.div
            className="flex justify-center mt-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="relative overflow-hidden px-10 py-3 font-medium text-white bg-gradient-to-r from-cyan-500 to-indigo-600 rounded-full shadow-lg group"
              onClick={() => setShowAll(true)}
            >
              <span className="relative z-10 flex items-center tracking-wide font-mono uppercase">
                View All Courses <ArrowRight size={18} className="ml-2" />
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Courses;
