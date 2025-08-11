import React from "react";
import { motion } from "framer-motion";
import { Brain, Code, BarChart3, Sparkles, Users, Bot } from "lucide-react";

const services = [
  {
    icon: <Brain size={40} className="text-purple-400" />,
    title: "AI Fundamentals",
    description:
      "Master the core concepts of Artificial Intelligence, from neural networks to natural language processing.",
  },
  {
    icon: <Code size={40} className="text-blue-400" />,
    title: "Hands-On Coding",
    description:
      "Build AI models with Python, TensorFlow, and PyTorch through practical projects.",
  },
  {
    icon: <BarChart3 size={40} className="text-green-400" />,
    title: "Data Analysis",
    description:
      "Learn to process, clean, and visualize datasets to prepare them for AI applications.",
  },
  {
    icon: <Sparkles size={40} className="text-yellow-400" />,
    title: "Generative AI",
    description:
      "Create images, text, and music using cutting-edge generative AI models.",
  },
  {
    icon: <Users size={40} className="text-pink-400" />,
    title: "AI for Business",
    description:
      "Leverage AI to automate workflows and improve decision-making in real-world industries.",
  },
  {
    icon: <Bot size={40} className="text-cyan-400" />,
    title: "AI Chatbot Development",
    description:
      "Build intelligent chatbots that understand and respond naturally to users.",
  },
];

const ServiceSection = () => {
  return (
    <section className="py-16 bg-gradient-to-tr from-[#0f172a] via-[#1e293b] to-[#020617] text-white">
      <div className="max-w-7xl mx-auto px-15">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-center mb-4"
        >
          Our <span className="text-cyan-500">AI Course Services</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-gray-400 text-center max-w-2xl mx-auto mb-12"
        >
          Learn from experts and gain practical skills in AI through our
          comprehensive, hands-on programs.
        </motion.p>

        {/* Service Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="p-6 rounded-2xl bg-white/5 border-0 border-cyan-400 backdrop-blur-lg hover:shadow-lg transition-all duration-300"
            >
              <div className="mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-400 text-sm">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;
