import React from 'react';
import { FaRobot, FaShieldAlt, FaChalkboardTeacher, FaUsers, FaRocket, FaBrain } from 'react-icons/fa';
import { HiArrowNarrowRight } from 'react-icons/hi';
import { motion } from 'framer-motion';
import { Link } from 'react-router';

const features = [
  {
    icon: <FaChalkboardTeacher className="text-4xl text-cyan-400" />,
    title: 'Expert Instructors',
    description: 'Learn from AI professionals shaping the future with NLP, ML, and deep learning.',
    delay: 0.2,
    gradient: 'from-cyan-500 to-blue-500'
  },
  {
    icon: <FaUsers className="text-4xl text-purple-400" />,
    title: 'Global Learner Network',
    description: 'Collaborate with peers and mentors from top institutions and companies.',
    delay: 0.4,
    gradient: 'from-purple-500 to-fuchsia-500'
  },
  {
    icon: <FaRocket className="text-4xl text-amber-400" />,
    title: 'Career-Focused Training',
    description: 'Build portfolio-worthy projects to land real AI jobs in top firms.',
    delay: 0.6,
    gradient: 'from-amber-500 to-pink-500'
  },
];

const AboutUs = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-tr from-[#0f172a] via-[#1e293b] to-[#020617] text-white py-28 px-6 lg:px-20">
      {/* Particle Background */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-cyan-500/20"
            
            animate={{
              y: [null, (Math.random() - 0.5) * 50],
              opacity: [null, Math.random() * 0.3 + 0.1],
            }}
            transition={{
              duration: Math.random() * 10 + 5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      
     

      <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, x: -40 }}
          whileInView={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative group flex justify-center"
        >
          <div className="relative w-full max-w-90 h-80 rounded-3xl overflow-hidden border border-cyan-500/30 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg shadow-2xl shadow-cyan-500/10 group-hover:shadow-cyan-500/20 transition-all duration-500">
            <img
              src="https://i.ibb.co/twGs8fzm/ai1.webp"
              alt="AI Innovation"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6">
              <FaBrain className="text-4xl text-cyan-400 mb-3" />
             
            </div>
          </div>
          
          <motion.div 
            className="absolute -bottom-8 -right-2 w-70 h-55 rounded-2xl overflow-hidden border border-purple-500/30 bg-white/10 shadow-xl "
            initial={{ x: 20, y: 20 }}
            animate={{ x: [20, 10, 20], y: [20, 25, 20] }}
            transition={{
              duration: 6,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          >
            <img
              src="https://i.ibb.co/LXWZzsTn/ai2.webp"
              alt="Tech"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </motion.div>

        {/* Text + Features Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-cyan-900/30 border border-cyan-500/30">
            <span className="w-2 h-2 rounded-full bg-cyan-400 mr-2 animate-pulse"></span>
            <span className="text-sm text-cyan-400 tracking-wider font-medium">ABOUT OUR MISSION</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
            Shaping the <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Future</span> of AI Education
          </h2>
          
          <p className="text-lg text-gray-300 leading-relaxed">
            We're pioneering a new era of AI education, combining cutting-edge research with practical applications to empower the next generation of innovators.
          </p>

          {/* Highlights - Enhanced with animated borders */}
          <div className="space-y-6">
            <motion.div 
              className="flex items-start gap-5 p-4 rounded-xl bg-gradient-to-r from-white/5 to-white/0 border-l-2 border-cyan-400/50 hover:border-cyan-400 transition-all"
              whileHover={{ x: 5 }}
            >
              <div className="p-3 rounded-lg bg-cyan-900/20 border border-cyan-400/20">
                <FaRobot className="text-2xl text-cyan-400" />
              </div>
              <div>
                <h4 className="text-xl font-semibold text-white">Next-Gen Learning</h4>
                <p className="text-gray-400 mt-2">
                  Adaptive AI platforms that evolve with your learning journey and career goals.
                </p>
              </div>
            </motion.div>
            
            <motion.div 
              className="flex items-start gap-5 p-4 rounded-xl bg-gradient-to-r from-white/5 to-white/0 border-l-2 border-purple-400/50 hover:border-purple-400 transition-all"
              whileHover={{ x: 5 }}
            >
              <div className="p-3 rounded-lg bg-purple-900/20 border border-purple-400/20">
                <FaShieldAlt className="text-2xl text-purple-400" />
              </div>
              <div>
                <h4 className="text-xl font-semibold text-white">Global Recognition</h4>
                <p className="text-gray-400 mt-2">
                  Accredited programs recognized by leading tech companies and academic institutions.
                </p>
              </div>
            </motion.div>
          </div>

          <Link to='/'>
          <motion.button 
            className="mt-6 inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-cyan-500/30 group"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>Explore Our Programs</span>
            <HiArrowNarrowRight className="text-xl group-hover:translate-x-1 transition-transform" />
          </motion.button>
          </Link>
        </motion.div>
      </div>

     
      <div className="relative z-10 mt-28 max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block mb-4 px-6 py-2 rounded-full bg-white/5 border border-white/10">
            <span className="text-cyan-400 font-medium">WHY WE STAND OUT</span>
          </div>
          <h3 className="text-4xl font-bold text-white">
            The <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Competitive Edge</span>
          </h3>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Our unique approach combines academic rigor with real-world AI applications to deliver unparalleled learning experiences.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((item, index) => (
            <motion.div
              key={index}
              className="relative rounded-2xl overflow-hidden p-8 text-center bg-white/5 backdrop-blur-md hover:shadow-xl transition-all duration-300 group"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: item.delay }}
              whileHover={{ y: -10 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 from-white/5 to-white/10 z-0"></div>
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 bg-gradient-to-br from-white/10 to-white/5 border border-white/10">
                  {item.icon}
                </div>
                <h4 className="text-2xl font-bold text-white mb-4">{item.title}</h4>
                <p className="text-gray-400 text-base leading-relaxed">{item.description}</p>
                
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Floating AI Elements */}
      <motion.div 
        className="absolute top-1/4 left-1/4 w-8 h-8 rounded-full bg-cyan-400/20 blur-md"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      <motion.div 
        className="absolute bottom-1/3 right-1/3 w-6 h-6 rounded-full bg-purple-400/20 blur-md"
        animate={{
          y: [0, -20, 0],
          opacity: [0.4, 0.8, 0.4]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
    </section>
  );
};

export default AboutUs;