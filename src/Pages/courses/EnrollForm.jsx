import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import Loading from "../../Shared/Loading/Loading";
import { AuthContext } from "../../Shared/Provider/AuthProvider";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const paymentMethods = [
  { value: "bkash", label: "bKash" },
  { value: "nagad", label: "Nagad" },
  { value: "rocket", label: "Rocket" },
  { value: "card", label: "Debit/Credit Card" },
];

const EnrollForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext); // ✅ get logged-in user
  const [course, setCourse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
    paymentMethod: "bkash",
    paymentNumber: "",
    agreeTerms: false,
  });

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`https://ai-course-server.vercel.app/courses/${id}`);
        setCourse(response.data);
      } catch (err) {
        console.error("Error loading course:", err);
        Swal.fire({
          icon: "error",
          title: "Course Not Found",
          text: "The course you're trying to enroll in could not be loaded.",
          confirmButtonColor: "#0ea5e9",
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  const validateForm = () => {
    const newErrors = {};
    const phoneRegex = /^01[3-9]\d{8}$/;

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!user?.email) newErrors.email = "Email is required";
    if (!phoneRegex.test(formData.phone)) newErrors.phone = "Please enter a valid Bangladeshi phone number";
    if (!formData.paymentNumber) newErrors.paymentNumber = "Payment number is required";
    if (!formData.agreeTerms) newErrors.agreeTerms = "You must agree to the terms";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);

    try {
      const enrollData = {
        courseId: id,
        courseTitle: course?.title,
        email: user?.email, // ✅ send email from AuthContext only
        ...formData,
        paymentAmount: course?.price,
      };

      await axios.post('https://ai-course-server.vercel.app/enroll-course', enrollData, {
        withCredentials: true,
      });

      const result = await Swal.fire({
        icon: "success",
        title: "Enrollment Submitted!",
        html: `
          <div class="text-left">
            <p>You've enrolled in <strong>${course?.title}</strong></p>
            <p class="mt-2"><strong>Payment Method:</strong> ${formData.paymentMethod}</p>
            <p class="mt-1"><strong>Amount:</strong> ${course?.price} Taka</p>
            <p class="mt-1"><strong>${formData.paymentMethod === 'card' ? 'Card' : paymentMethods.find(m => m.value === formData.paymentMethod)?.label} Number:</strong> ${formData.paymentNumber}</p>
            <div class="mt-4 p-2 bg-blue-50 rounded text-sm">
              <p class="font-medium">Next Steps:</p>
              <ol class="list-decimal pl-5 mt-1 space-y-1">
                <li>We will verify your payment within 24 hours</li>
                <li>You'll receive confirmation via email/SMS</li>
                <li>Course access details will be provided after verification</li>
              </ol>
            </div>
          </div>
        `,
        confirmButtonColor: "#0ea5e9",
        confirmButtonText: "View My Enrollments",
        showCancelButton: true,
        cancelButtonText: "Close",
        width: "32rem",
      });

      if (result.isConfirmed) {
        navigate('/myEnrolledCourse');
      }

      setFormData({
        name: "",
        phone: "",
        message: "",
        paymentMethod: "bkash",
        paymentNumber: "",
        agreeTerms: false,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Enrollment Failed",
        text: error.response?.data?.message || "There was an error processing your enrollment. Please try again.",
        confirmButtonColor: "#0ea5e9",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#0f172a] via-[#1e293b] to-[#0f172a] px-4 py-12 sm:py-20 flex justify-center items-start">
      <motion.div
        custom={1}
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        className="bg-[#222d3e] mt-10 sm:mt-20 text-white p-6 sm:p-8 rounded-2xl shadow-2xl border border-cyan-700/40 w-full max-w-3xl space-y-8"
      >
        {/* Course Info */}
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-cyan-400 mb-2">
            Enroll in: {course.title}
          </h1>
          <div className="flex justify-center items-center space-x-4">
            <p className="text-sm text-gray-300">
              Course Fee: <span className="text-white font-medium">{course.price} Taka</span>
            </p>
            {course.duration && (
              <p className="text-sm text-gray-300">
                Duration: <span className="text-white font-medium">{course.duration}</span>
              </p>
            )}
          </div>
        </div>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit} noValidate>
          {/* Name */}
          <div>
            <label htmlFor="name" className="block mb-1 text-sm font-medium">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-lg bg-[#1e293b] border ${errors.name ? "border-red-500" : "border-cyan-600"} focus:outline-none focus:ring-2 focus:ring-cyan-500`}
              placeholder="Your full name"
              required
            />
            {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name}</p>}
          </div>

          {/* Email (read-only) */}
          <div>
            <label htmlFor="email" className="block mb-1 text-sm font-medium">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={user?.email || ""}
              readOnly
              className="w-full px-4 py-2 rounded-lg bg-[#1e293b] border border-cyan-600 text-gray-300 cursor-not-allowed"
            />
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block mb-1 text-sm font-medium">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-lg bg-[#1e293b] border ${errors.phone ? "border-red-500" : "border-cyan-600"} focus:outline-none focus:ring-2 focus:ring-cyan-500`}
              placeholder="01XXXXXXXXX"
              required
            />
            {errors.phone && <p className="mt-1 text-sm text-red-400">{errors.phone}</p>}
          </div>

          {/* Payment Method */}
          <div>
            <label htmlFor="paymentMethod" className="block mb-1 text-sm font-medium">
              Payment Method <span className="text-red-500">*</span>
            </label>
            <select
              id="paymentMethod"
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-[#1e293b] border border-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              required
            >
              {paymentMethods.map((method) => (
                <option key={method.value} value={method.value}>
                  {method.label}
                </option>
              ))}
            </select>
          </div>

          {/* Payment Number */}
          <div>
            <label htmlFor="paymentNumber" className="block mb-1 text-sm font-medium">
              {formData.paymentMethod === 'card' ? 'Card Number' : `${paymentMethods.find(m => m.value === formData.paymentMethod)?.label} Number`} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="paymentNumber"
              name="paymentNumber"
              value={formData.paymentNumber}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-lg bg-[#1e293b] border ${
                errors.paymentNumber ? "border-red-500" : "border-cyan-600"
              } focus:outline-none focus:ring-2 focus:ring-cyan-500`}
              placeholder={formData.paymentMethod === 'card' ? 'Card number' : `${paymentMethods.find(m => m.value === formData.paymentMethod)?.label} number`}
              required
            />
            {errors.paymentNumber && <p className="mt-1 text-sm text-red-400">{errors.paymentNumber}</p>}
          </div>

          {/* Payment Instructions */}
          <div className="text-xs bg-[#1e293b] p-3 rounded-md border border-cyan-600">
            <p className="font-medium mb-1">
              Payment Instructions for {paymentMethods.find(m => m.value === formData.paymentMethod)?.label}:
            </p>
            {formData.paymentMethod === "bkash" && (
              <ol className="list-decimal pl-5 space-y-1">
                <li>Go to bKash Mobile Menu</li>
                <li>Choose "Payment" option</li>
                <li>Enter Merchant bKash Account: <span className="font-bold">017XXXXXXXX</span></li>
                <li>Enter Amount: <span className="font-bold">{course.price} Taka</span></li>
                <li>Enter reference: <span className="font-bold">{course.title.substring(0, 10)}</span></li>
                <li>Complete the payment and enter your bKash number above</li>
              </ol>
            )}
            {formData.paymentMethod === "nagad" && (
              <ol className="list-decimal pl-5 space-y-1">
                <li>Go to Nagad Mobile Menu</li>
                <li>Choose "Payment" option</li>
                <li>Enter Merchant Nagad Account: <span className="font-bold">017XXXXXXXX</span></li>
                <li>Enter Amount: <span className="font-bold">{course.price} Taka</span></li>
                <li>Complete the payment and enter your Nagad number above</li>
              </ol>
            )}
            {formData.paymentMethod === "card" && (
              <div>
                <p>You'll be redirected to our secure payment gateway after form submission</p>
                <p className="mt-1">Or send payment to:</p>
                <p className="font-bold">Bank: Example Bank</p>
                <p className="font-bold">Account: 123456789</p>
                <p className="font-bold">Amount: {course.price} Taka</p>
              </div>
            )}
          </div>

          {/* Optional Message */}
          <div>
            <label htmlFor="message" className="block mb-1 text-sm font-medium">
              Message (optional)
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-[#1e293b] border border-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              placeholder="Any questions or additional information..."
              rows={3}
            />
          </div>

          {/* Terms Agreement */}
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="agreeTerms"
                name="agreeTerms"
                type="checkbox"
                checked={formData.agreeTerms}
                onChange={handleChange}
                className="w-4 h-4 rounded bg-[#1e293b] border-cyan-600 focus:ring-cyan-500"
              />
            </div>
            <label htmlFor="agreeTerms" className="ml-2 text-sm">
              I agree to the{" "}
              <a href="/terms" className="text-cyan-400 hover:underline">
                Terms and Conditions
              </a>{" "}
              and{" "}
              <a href="/privacy" className="text-cyan-400 hover:underline">
                Privacy Policy
              </a>
              <span className="text-red-500">*</span>
            </label>
            {errors.agreeTerms && (
              <p className="mt-1 text-sm text-red-400">{errors.agreeTerms}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 px-4 mt-4 bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 rounded-lg text-white font-semibold transition duration-300 ease-in-out shadow-md hover:shadow-lg ${
              isSubmitting ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : (
              "Submit Enrollment"
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default EnrollForm;