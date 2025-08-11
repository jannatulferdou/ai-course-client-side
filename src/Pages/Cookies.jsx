import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaCookieBite, FaRegClock, FaLock, FaListUl, FaQuestionCircle } from 'react-icons/fa';
import Loading from '../Shared/Loading/Loading';

const Cookies = () => {
    const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loading />;
  }
  return (
    <section className="relative bg-gradient-to-br from-[#0c0c1d] to-[#1f2937] text-white py-24 px-6 pt-30 md:px-16 lg:px-32 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-[-80px] left-[-100px] w-[300px] h-[300px] bg-cyan-500/20 rounded-full blur-[160px] z-0" />
      <div className="absolute bottom-[-100px] right-[-100px] w-[300px] h-[300px] bg-purple-600/20 rounded-full blur-[160px] z-0" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 max-w-5xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-14">
          <FaCookieBite className="mx-auto text-5xl text-cyan-400 mb-4" />
          <h1 className="text-4xl md:text-5xl font-extrabold text-cyan-300 drop-shadow-md">
            Cookie Policy 
          </h1>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            How and why we use cookies to improve your experience across our platform.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-10 text-sm md:text-base text-gray-300 leading-relaxed">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-start gap-4"
          >
            <FaQuestionCircle className="text-xl text-cyan-400 mt-1" />
            <div>
              <h2 className="text-lg font-semibold text-cyan-300 mb-1">What Are Cookies?</h2>
              <p>
                Cookies are small data files stored on your device that help websites remember preferences,
                login info, and improve performance.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-start gap-4"
          >
            <FaListUl className="text-xl text-cyan-400 mt-1" />
            <div>
              <h2 className="text-lg font-semibold text-cyan-300 mb-1">Types of Cookies We Use</h2>
              <ul className="list-disc list-inside space-y-1">
                <li><strong>Essential:</strong> Required for login, navigation, and security.</li>
                <li><strong>Analytics:</strong> Helps us track usage and improve user experience.</li>
                <li><strong>Preference:</strong> Stores your theme, language, or settings.</li>
              </ul>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-start gap-4"
          >
            <FaRegClock className="text-xl text-cyan-400 mt-1" />
            <div>
              <h2 className="text-lg font-semibold text-cyan-300 mb-1">How Long Are Cookies Stored?</h2>
              <p>
                Session cookies are deleted after your visit ends, while persistent cookies stay until you
                delete them or they expire.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex items-start gap-4"
          >
            <FaLock className="text-xl text-cyan-400 mt-1" />
            <div>
              <h2 className="text-lg font-semibold text-cyan-300 mb-1">Managing Cookies</h2>
              <p>
                You can control cookies via your browser settings. Disabling some may impact certain
                platform features.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex items-start gap-4"
          >
            <FaCookieBite className="text-xl text-cyan-400 mt-1" />
            <div>
              <h2 className="text-lg font-semibold text-cyan-300 mb-1">Third-Party Cookies</h2>
              <p>
                Some services like Google Analytics or Stripe may set cookies of their own.
                We do not control their policies directly.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-14 text-center"
        >
          <p className="text-sm text-gray-400">Questions about cookies?</p>
          <a
            href="neuro@nest.com"
            className="text-cyan-400 font-medium underline hover:text-cyan-300"
          >
            Contact us at neuro@nest.com
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Cookies;
