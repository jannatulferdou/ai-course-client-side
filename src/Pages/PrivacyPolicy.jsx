import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaLock, FaUserShield, FaServer, FaEnvelopeOpenText } from 'react-icons/fa';
import Loading from '../Shared/Loading/Loading';

const PrivacyPolicy = () => {
    const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loading />;
  }
  return (
    <section className="bg-gradient-to-b from-[#0f172a] to-[#0a0a0a] text-white py-24 px-6 md:px-16 lg:px-32 relative overflow-hidden">
      
      <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-cyan-500/30 rounded-full blur-[180px] z-0"></div>
      <div className="absolute bottom-[-120px] right-[-80px] w-[300px] h-[300px] bg-purple-500/20 rounded-full blur-[160px] z-0"></div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 max-w-4xl mx-auto"
      >
        <div className="text-center mb-12">
          <FaUserShield className="mx-auto text-5xl text-cyan-400 mb-4" />
          <h1 className="text-4xl md:text-5xl font-extrabold text-cyan-400 drop-shadow-lg">
            Privacy Policy
          </h1>
          <p className="text-gray-400 mt-4 text-base max-w-2xl mx-auto leading-relaxed">
            At <strong>NeuronNest</strong>, we prioritize your data privacy. This page outlines how we collect, use, and protect your information to ensure your trust is never compromised.
          </p>
        </div>

        <div className="space-y-10 text-gray-300 text-sm md:text-base leading-relaxed">
          <div>
            <h2 className="text-cyan-300 font-semibold text-lg mb-2 flex items-center gap-2">
              <FaUserShield /> 1. Information We Collect
            </h2>
            <ul className="list-disc list-inside space-y-1">
              <li>Personal Data (name, email, payment info)</li>
              <li>Course activity and progress</li>
              <li>Technical info like browser/device types</li>
            </ul>
          </div>

          <div>
            <h2 className="text-cyan-300 font-semibold text-lg mb-2 flex items-center gap-2">
              <FaLock /> 2. How We Use Your Data
            </h2>
            <ul className="list-disc list-inside space-y-1">
              <li>Customize your learning journey</li>
              <li>Enhance platform performance</li>
              <li>Send notifications and updates (opt-out anytime)</li>
            </ul>
          </div>

          <div>
            <h2 className="text-cyan-300 font-semibold text-lg mb-2 flex items-center gap-2">
              <FaServer /> 3. Data Protection
            </h2>
            <p>
              We use encryption, secure cloud infrastructure, and access control to ensure your data is safe. Payments are processed through certified third-party gateways.
            </p>
          </div>

          <div>
            <h2 className="text-cyan-300 font-semibold text-lg mb-2">4. Third-Party Tools</h2>
            <p>
              Services like analytics and payment processors may collect data under their own policies. We only work with vetted and secure partners.
            </p>
          </div>

          <div>
            <h2 className="text-cyan-300 font-semibold text-lg mb-2">5. Your Rights</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>Access or modify your data anytime</li>
              <li>Request deletion of your account</li>
              <li>Control marketing communication preferences</li>
            </ul>
          </div>

          <div>
            <h2 className="text-cyan-300 font-semibold text-lg mb-2">6. Policy Updates</h2>
            <p>
              This policy may change as we evolve. All updates will be posted here. Continued use means you accept the latest terms.
            </p>
          </div>

          <div>
            <h2 className="text-cyan-300 font-semibold text-lg mb-2 flex items-center gap-2">
              <FaEnvelopeOpenText /> 7. Contact Us
            </h2>
            <p>
              Have questions? Contact us at{' '}
              <a
                href="mailto:neuro@nest.com"
                className="text-cyan-400 underline hover:text-cyan-300"
              >
                neuro@nest.com
              </a>
              .
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default PrivacyPolicy;
