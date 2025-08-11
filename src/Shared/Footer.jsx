import React from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub, FaRocket } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'

const Footer = () => {
  const socialLinks = [
    { Icon: FaFacebookF, href: "https://facebook.com", color: "hover:text-[#1877f2]" },
    { Icon: FaTwitter, href: "https://twitter.com", color: "hover:text-[#1da1f2]" },
    { Icon: FaLinkedinIn, href: "https://linkedin.com", color: "hover:text-[#0a66c2]" },
    { Icon: FaGithub, href: "https://github.com", color: "hover:text-gray-200" },
  ];

  const links = <>
  <li>
                  <Link
                    to='/aboutUs'
                    className="group flex items-center hover:text-cyan-400 transition duration-200"
                  >
                    <span className="w-1 h-1 bg-cyan-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    About Us
                  </Link>
                </li>
  <li>
                  <Link
                    to='/contact'
                    className="group flex items-center hover:text-cyan-400 transition duration-200"
                  >
                    <span className="w-1 h-1 bg-cyan-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    to='/faq'
                    className="group flex items-center hover:text-cyan-400 transition duration-200"
                  >
                    <span className="w-1 h-1 bg-cyan-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link
                    to='/privacy'
                    className="group flex items-center hover:text-cyan-400 transition duration-200"
                  >
                    <span className="w-1 h-1 bg-cyan-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    Privacy Policy
                  </Link>
                </li>
  </>

// { to: "/courses", label: "Courses" },
    // { to: "/about", label: "About Us" },
    // { to: "/contact", label: "Contact" },
    // { to: "/faq", label: "FAQ" },
    // { to: "/blog", label: "Blog" },
    // { to: "/privacy", label: "Privacy Policy" }

  return (
    <footer className="bg-gradient-to-b from-[#0b1120] to-[#0f172a] text-gray-300 pt-20 pb-12 px-4 border-t border-cyan-900/30">
      <div className="max-w-7xl mx-auto">
        {/* Decorative top element */}
        <div className="flex justify-center mb-12">
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-r from-cyan-600 to-blue-600 p-3 rounded-full shadow-lg"
          >
            <FaRocket className="text-white text-xl" />
          </motion.div>
        </div>

        <div className="grid gap-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {/* Logo & Tagline */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center mb-4">
              <img src={logo} alt="" className='w-15 h-10' />
              <h1 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 tracking-tight">
                NeuroNest
              </h1>
             
            </div>
            <p className="text-sm leading-relaxed text-gray-400 mb-4">
              Dive into a universe of tech knowledge. From basics to breakthroughs — your journey starts here.
            </p>
            <div className="flex items-center text-xs text-gray-500 mt-2">
              <span className="h-2 w-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
              <span>1,024 active learners</span>
            </div>
          </motion.div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            
            <h2 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-blue-300 mb-4 pb-2 border-b border-cyan-900/30 inline-block">
              Explore
            </h2>
            <ul className="grid gap-2 text-sm">
             {links}
            </ul>
          </motion.div>

          {/* Newsletter Signup */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h2 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-blue-300 mb-4 pb-2 border-b border-cyan-900/30 inline-block">
              Stay Updated
            </h2>
            <p className="text-sm text-gray-400 mb-4">
              Join our newsletter for the latest tech insights and exclusive content.
            </p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Your email address"
                className="bg-[#1e293b] border border-cyan-900/30 text-sm rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 w-full transition-all duration-300 hover:border-cyan-500/30"
              />
              <Link to='/auth/register'>
              <button
                type="submit"
                className="relative overflow-hidden bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-medium px-6 py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-cyan-500/20 w-full group"
              >
                <span className="relative z-10 flex items-center justify-center">
                  Subscribe
                  <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </button>
              </Link>
            </form>
          </motion.div>

          {/* Socials */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h2 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-blue-300 mb-4 pb-2 border-b border-cyan-900/30 inline-block">
              Connect With Us
            </h2>
            <p className="text-sm text-gray-400 mb-4">
              Join our growing community of tech enthusiasts.
            </p>
            <div className="flex gap-3">
              {socialLinks.map(({ Icon, href, color }, index) => (
                <motion.a
                  key={index}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  className={`text-gray-400 ${color} transition-colors duration-300 bg-[#1e293b] p-3 rounded-full`}
                >
                  <Icon className="text-lg" />
                </motion.a>
              ))}
            </div>
            <div className="mt-6 p-3 bg-cyan-900/10 rounded-lg border border-cyan-900/20">
              <p className="text-xs text-cyan-400 font-mono">
                <span className="text-gray-500">// </span> 
                "The best way to predict the future is to invent it."
              </p>
            </div>
          </motion.div>
        </div>

        {/* Bottom Text */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 border-t border-cyan-900/20 pt-8 flex flex-col md:flex-row justify-between items-center text-xs sm:text-sm text-gray-500"
        >
          <div>
            © {new Date().getFullYear()} <span className="text-cyan-400 font-semibold">NeuroNest</span>. All rights reserved.
          </div>
          <div className="mt-3 md:mt-0 flex gap-4">
            <Link to="/terms" className="hover:text-cyan-400 transition">Terms</Link>
            <Link to="/privacy" className="hover:text-cyan-400 transition">Privacy</Link>
            <Link to="/cookies" className="hover:text-cyan-400 transition">Cookies</Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;