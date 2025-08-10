import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown, FaCertificate, FaQuestionCircle, FaUserGraduate, FaHandsHelping, FaRobot, FaUsers, FaEnvelopeOpenText } from 'react-icons/fa';

const faqData = [
  {
    icon: <FaQuestionCircle className="text-cyan-400 text-xl" />,
    question: 'Are the courses beginner-friendly?',
    answer:
      'Absolutely! We offer beginner to advanced level courses. Each course includes guided instructions, interactive lessons, and real-world projects to help you grow step by step.',
  },
  {
    icon: <FaRobot className="text-cyan-400 text-xl" />,
    question: 'What is this platform about?',
    answer:
      'This platform offers AI-powered learning experiences through real-world projects, expert mentorship, and advanced technologies.',
  },
  {
    icon: <FaUsers className="text-cyan-400 text-xl" />,
    question: 'Who are the instructors?',
    answer:
      'Our instructors are industry professionals, AI researchers, and educators affiliated with top institutions and companies.',
  },
  {
    icon: <FaUserGraduate className="text-cyan-400 text-xl" />,
    question: 'Are there any prerequisites?',
    answer:
      'Some advanced courses require prior programming or ML knowledge, but we also offer beginner-friendly options.',
  },
  {
    icon: <FaCertificate className="text-cyan-400 text-xl" />,
    question: 'Can I get a certificate?',
    answer:
      'Yes, upon course completion, you will receive a verifiable digital certificate.',
  },
  {
    icon: <FaHandsHelping className="text-cyan-400 text-xl" />,
    question: 'Is there any community support?',
    answer:
      'Yes! You’ll have access to a vibrant community of peers, mentors, and AI enthusiasts.',
  },
  {
    icon: <FaEnvelopeOpenText className="text-cyan-400 text-xl" />,
    question: 'How can I contact support?',
    answer:
      'You can reach our support team anytime through the Contact page or directly at support@ailearnhub.com.',
  },
];

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  return (
    <section className="bg-[#0f172a] text-white py-20 pt-30 px-4 md:px-10 lg:px-24 ">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-cyan-400 mb-10 drop-shadow-lg">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {faqData.map((item, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-lg border border-cyan-500/10 rounded-xl p-5 transition hover:shadow-md"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="flex items-center justify-between w-full text-left text-lg font-semibold text-cyan-300"
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  {item.question}
                </div>
                <FaChevronDown
                  className={`transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 text-gray-300 text-sm leading-relaxed"
                  >
                    {item.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;
