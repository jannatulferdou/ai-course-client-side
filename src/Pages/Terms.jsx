import React from 'react';
import { motion } from 'framer-motion';
import { FaGavel, FaRegFileAlt } from 'react-icons/fa';

const Terms = () => {
  return (
    <section className="bg-[#0f172a] text-white py-24 px-6 md:px-16 lg:px-32 relative overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-[-80px] left-[-100px] w-[300px] h-[300px] bg-cyan-500/20 rounded-full blur-[160px] z-0" />
      <div className="absolute bottom-[-100px] right-[-100px] w-[300px] h-[300px] bg-purple-600/20 rounded-full blur-[160px] z-0" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 max-w-4xl mx-auto"
      >
        <div className="text-center mb-12">
          <FaGavel className="mx-auto text-5xl text-cyan-400 mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold text-cyan-400 drop-shadow-lg">
            Terms & Conditions
          </h1>
          <p className="text-gray-400 mt-4 text-base max-w-2xl mx-auto leading-relaxed">
            Please read our terms and conditions carefully before using NeuronNest.
            These terms govern your access and use of our platform.
          </p>
        </div>

        <div className="space-y-10 text-gray-300 text-sm md:text-base leading-relaxed">
          <div>
            <h2 className="text-cyan-300 font-semibold text-lg mb-2 flex items-center gap-2">
              <FaRegFileAlt /> 1. Acceptance of Terms
            </h2>
            <p>
              By using our services, you agree to be bound by these terms. If you do not accept them, you should not access or use our platform.
            </p>
          </div>

          <div>
            <h2 className="text-cyan-300 font-semibold text-lg mb-2">2. User Responsibilities</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>Provide accurate information during sign-up</li>
              <li>Use the platform for educational purposes only</li>
              <li>Respect the rights of others and avoid abusive behavior</li>
            </ul>
          </div>

          <div>
            <h2 className="text-cyan-300 font-semibold text-lg mb-2">3. Intellectual Property</h2>
            <p>
              All content (videos, courses, text, and branding) is the intellectual property of NeuronNest. Reproduction or redistribution is prohibited.
            </p>
          </div>

          <div>
            <h2 className="text-cyan-300 font-semibold text-lg mb-2">4. Termination</h2>
            <p>
              We reserve the right to terminate or suspend access to any user who violates our policies or causes harm to the platform or its users.
            </p>
          </div>

          <div>
            <h2 className="text-cyan-300 font-semibold text-lg mb-2">5. Limitation of Liability</h2>
            <p>
              NeuronNest is not responsible for any damages arising from the use of our services. We provide the content “as-is” without warranties.
            </p>
          </div>

          <div>
            <h2 className="text-cyan-300 font-semibold text-lg mb-2">6. Updates to Terms</h2>
            <p>
              We may update these terms from time to time. Continued use of the platform implies acceptance of the revised terms.
            </p>
          </div>

          <div>
            <h2 className="text-cyan-300 font-semibold text-lg mb-2">7. Contact</h2>
            <p>
              For any questions about these Terms & Conditions, please contact us at{' '}
              <a
                href="mailto:legal@neuronest.com"
                className="text-cyan-400 underline hover:text-cyan-300"
              >
                legal@neuronest.com
              </a>.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Terms;
