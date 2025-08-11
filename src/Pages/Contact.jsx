import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';
import Loading from '../Shared/Loading/Loading';

const contactMethods = [
  {
    icon: <FaEnvelope className="text-3xl text-cyan-400" />,
    title: "Email Us",
    info: "neuro@nest.com"
  },
  {
    icon: <FaPhoneAlt className="text-3xl text-cyan-400" />,
    title: "Call Us",
    info: "+880 2-9123499"
  },
  {
    icon: <FaMapMarkerAlt className="text-3xl text-cyan-400" />,
    title: "Visit Us",
    info: "Dhaka, Bangladesh"
  }
];

const Contact = () => {
    const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loading />;
  }
  return (
    <section className="relative bg-gradient-to-tr from-[#0f172a] via-[#1e293b] to-[#020617] text-white py-24 pt-30 px-6 lg:px-20 overflow-hidden">
      {/* Glowing background */}
      <div className="absolute top-[-20%] left-[-20%] w-[400px] h-[400px] bg-cyan-500/20 blur-[200px] rounded-full z-0" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[400px] h-[400px] bg-purple-600/20 blur-[180px] rounded-full z-0" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-extrabold text-cyan-400 drop-shadow-lg flex gap-4 text-center lg:ml-90 ml-20 md:ml-60"><FaPhoneAlt className="text-3xl text-cyan-400 relative top-3 text-center" /> Contact Us</h2>
          <p className="text-gray-400 mt-4 max-w-xl mx-auto">
            Whether you’re a learner, educator, or curious innovator — we’d love to connect.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16">
          {/* Contact Info Cards */}
          <div className="space-y-8">
            {contactMethods.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.2 }}
                className="flex items-start gap-4 p-6 rounded-xl bg-white/5 border border-cyan-500/10 backdrop-blur-lg hover:scale-[1.02] transition-transform"
              >
                {item.icon}
                <div>
                  <h4 className="text-xl font-semibold text-cyan-300">{item.title}</h4>
                  <p className="text-gray-300 text-sm">{item.info}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Form Section */}
          <motion.form
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="p-8 bg-white/5 backdrop-blur-md border border-cyan-500/10 rounded-2xl shadow-md space-y-6"
          >
            <h3 className="text-2xl font-bold text-cyan-300">Send a Message</h3>
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-3 text-white bg-transparent border border-cyan-500/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 placeholder:text-gray-400"
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-3 text-white bg-transparent border border-cyan-500/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 placeholder:text-gray-400"
              required
            />
            <textarea
              rows="5"
              placeholder="Your Message"
              className="w-full px-4 py-3 text-white bg-transparent border border-cyan-500/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 placeholder:text-gray-400 resize-none"
              required
            />
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 cursor-pointer text-white font-semibold rounded-lg transition-all duration-200"
            >
              Submit
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
