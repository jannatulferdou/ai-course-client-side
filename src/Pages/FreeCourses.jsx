import React, { useState } from 'react';
import { FaRobot, FaBrain, FaMagic, FaTimes } from 'react-icons/fa';
import Swal from 'sweetalert2';

const courses = [
  {
    id: 1,
    title: "AI for Everyone",
    description:
      "Dive into the transformative world of Artificial Intelligence. This course simplifies AI into easy-to-understand concepts, empowering you to grasp how it shapes careers, industries, and the future.",
    price: "Free",
    duration: "4 weeks",
    icon: <FaRobot size={26} />,
    image: "https://i.ibb.co/jZTZ0KxQ/aii.jpg"
  },
  {
    id: 2,
    title: "Prompt Engineering for Creators",
    description:
      "Unleash your creativity with advanced prompt strategies. Learn how to guide AI models to generate compelling content, visuals, and solutions through precise and imaginative prompting.",
    price: "Free",
    duration: "3 weeks",
    icon: <FaMagic size={26} />,
    image: "https://i.ibb.co/nsWw3Sbc/prompt.jpg"
  },
  {
    id: 3,
    title: "Fundamentals of Neural Networks",
    description:
      "Explore the powerful mechanics of deep learning. Understand how neural networks mimic the brain, learn through data, and drive innovations in image recognition, NLP, and more.",
    price: "Free",
    duration: "5 weeks",
    icon: <FaBrain size={26} />,
    image: "https://i.ibb.co/m5rRR2Hf/neuro.jpg"
  }
];

const FreeCourses = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    courseId: ''
  });

  const freeCourses = courses.filter(course => course.price === "Free");

  const handleEnrollClick = (course) => {
    setSelectedCourse(course);
    setFormData(prev => ({
      ...prev,
      courseId: course.id
    }));
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Show SweetAlert confirmation
    Swal.fire({
      title: 'Enrollment Successful!',
      html: `
        <div class="text-left">
          <p class="mb-2">Thank you, <strong>${formData.name}</strong>!</p>
          <p class="mb-2">You've successfully enrolled in <strong>${selectedCourse.title}</strong>.</p>
          <p class="mb-2">Confirmation has been sent to <strong>${formData.email}</strong>.</p>
          <p class="text-sm text-gray-400 mt-3">Course materials will be available in your dashboard within 24 hours.</p>
        </div>
      `,
      icon: 'success',
      confirmButtonColor: '#3b82f6',
      background: '#1e293b',
      color: '#ffffff',
      iconColor: '#10b981',
      confirmButtonText: 'Go to Dashboard',
      customClass: {
        popup: 'border border-cyan-500/30 rounded-2xl',
        title: 'text-cyan-300',
      },
      showCloseButton: true,
      focusConfirm: false,
    }).then(() => {
      // Reset form and close modal
      setIsModalOpen(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        courseId: ''
      });
    });
  };

  return (
    <section className="relative min-h-screen text-white py-20 px-6 lg:px-15 md:px-12 overflow-hidden">
      <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-14 bg-gradient-to-r from-cyan-300 via-blue-500 to-blue-700 text-transparent bg-clip-text">
        💡 Explore Our Free AI Courses
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 z-10 relative">
        {freeCourses.map(course => (
          <div
            key={course.id}
            className="bg-white/5 backdrop-blur-md border border-slate-800 rounded-3xl shadow-lg hover:shadow-cyan-500/40 hover:border-cyan-400 transition-all duration-300 overflow-hidden"
          >
            <img
              src={course.image}
              alt={course.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <div className="text-cyan-400">{course.icon}</div>
                <span className="text-xs font-semibold bg-green-500/20 text-green-300 px-3 py-1 rounded-full">
                  FREE
                </span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {course.title}
              </h3>
              <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                {course.description}
              </p>
              <div className="text-sm text-blue-400 font-medium mb-4">
                ⏱ Duration: {course.duration}
              </div>
              <button 
                onClick={() => handleEnrollClick(course)}
                className="mt-auto bg-gradient-to-r from-blue-700 to-cyan-600 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold py-2 px-4 rounded-xl text-sm shadow hover:shadow-lg transition"
              >
                Enroll Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Enrollment Form */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-[#0f172a] to-[#1e293b] border border-slate-700 rounded-2xl shadow-2xl max-w-md w-full p-6 relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <FaTimes size={24} />
            </button>
            
            <h3 className="text-2xl font-bold text-white mb-2">Enroll in {selectedCourse?.title}</h3>
            <p className="text-gray-300 mb-6">Complete the form to register for this free course</p>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  required
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  required
                />
              </div>
              
              <input type="hidden" name="courseId" value={formData.courseId} />
              
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-cyan-500 hover:to-blue-600 text-white font-semibold py-3 px-4 rounded-xl shadow hover:shadow-lg transition"
              >
                Complete Enrollment
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default FreeCourses;
