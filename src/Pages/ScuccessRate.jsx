import React from 'react';
import CountUp from 'react-countup';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { FaGraduationCap, FaUsers, FaThumbsUp } from 'react-icons/fa';
import { HiOutlineCheckCircle } from 'react-icons/hi';

const stats = [
  {
    id: 1,
    icon: <FaGraduationCap className="text-white text-4xl group-hover:scale-110 transition-transform" />,
    end: 850,
    suffix: '+',
    label: 'Courses Completed',
  },
  {
    id: 2,
    icon: <FaUsers className="text-white text-4xl group-hover:scale-110 transition-transform" />,
    end: 4000,
    suffix: '+',
    label: 'Students Trained',
  },
  {
    id: 3,
    icon: <HiOutlineCheckCircle className="text-white text-4xl group-hover:scale-110 transition-transform" />,
    end: 94,
    suffix: '%',
    label: 'Success Rate',
  },
  {
    id: 4,
    icon: <FaThumbsUp className="text-white text-4xl group-hover:scale-110 transition-transform" />,
    end: 1000,
    suffix: '+',
    label: 'Positive Reviews',
  },
];

const OurCourseSuccess = () => {
  return (
    <section className="relative bg-gradient-to-tr from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white py-15 overflow-hidden">
      {/* Glowing Particles Background */}
      <div className="absolute inset-0 opacity-30 pointer-events-none z-0"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-16 drop-shadow-xl"
        >
          🚀 Our Course Success Rate
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {stats.map((stat, i) => (
            <Tilt tiltMaxAngleX={6} tiltMaxAngleY={6} key={stat.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                className="group relative bg-white/5 border border-cyan-500/20 rounded-2xl p-8 backdrop-blur-md transition-all  hover:border-cyan-400 overflow-hidden"
              >
                {/* Shimmering Edge */}
                <div className="absolute inset-0 border-2 border-transparent rounded-2xl group-hover:border-cyan-400 animate-pulse pointer-events-none"></div>

                {/* Glowing Icon */}
                <div className="relative w-24 h-24 mx-auto mb-5">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full blur-2xl opacity-20"></div>
                  <div className="relative z-10 w-full h-full flex items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 shadow-lg">
                    {stat.icon}
                  </div>
                </div>

                {/* Animated Number */}
                <h3 className="text-4xl font-bold text-cyan-300 group-hover:text-white transition duration-300">
                  <CountUp end={stat.end} duration={2} suffix={stat.suffix} enableScrollSpy scrollSpyOnce />
                </h3>
                <p className="mt-2 text-sm text-gray-300">{stat.label}</p>
              </motion.div>
            </Tilt>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurCourseSuccess;
