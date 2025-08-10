import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { AuthContext } from "../../Shared/Provider/AuthProvider";
import {
  TbCoinTakaFilled, TbTargetArrow
} from "react-icons/tb";
import {
  IoIosMail, IoMdCall, IoMdStopwatch
} from "react-icons/io";
import {
  FaChalkboardTeacher, FaHandsHelping, FaHourglassStart
} from "react-icons/fa";
import { CalendarFold } from "lucide-react";
import { MdLibraryBooks } from "react-icons/md";
import Loading from "../../Shared/Loading/Loading";
import Swal from "sweetalert2";

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

const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [isAlreadyEnrolled, setIsAlreadyEnrolled] = useState(false);
  const [hasReachedLimit, setHasReachedLimit] = useState(false);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get(`https://ai-course-server.vercel.app/courses/${id}`);
        setCourse(res.data);
      } catch (err) {
        console.error("Error fetching course details:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  useEffect(() => {
    const checkEnrollment = async () => {
      try {
        const res = await axios.get(`https://ai-course-server.vercel.app/enrolled-courses?email=${user?.email}`, {
          withCredentials: true,
        });
        const enrolledCourses = res.data;
        const alreadyEnrolled = enrolledCourses.some(item => item.courseId === id);
        setIsAlreadyEnrolled(alreadyEnrolled);
        if (enrolledCourses.length >= 3) {
          setHasReachedLimit(true);
        }
      } catch (error) {
        console.error("Failed to fetch enrollment status", error);
      }
    };

    if (user?.email) checkEnrollment();
  }, [user?.email, id]);

  const handleEnroll = () => {
    if (!user) {
      Swal.fire({
        icon: 'warning',
        title: 'Login Required',
        text: 'Please login to enroll in this course.',
        confirmButtonColor: '#0ea5e9'
      });
      return;
    }

    setEnrolling(true);
    setTimeout(() => {
      navigate(`/enrollForm/${course._id}`);
    }, 1300);
  };

  if (loading) return <Loading />;
  if (!course) return <p className="text-center text-red-400 py-20">Course not found.</p>;

  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#0f172a] via-[#1e293b] to-[#0f172a] pt-20 pb-20 px-4">
      <motion.div custom={1} variants={fadeInUp} initial="hidden" whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="p-6 sm:p-12 mt-20 max-w-4xl mx-auto text-white bg-[#222d3e] rounded-3xl shadow-2xl border border-cyan-700/50"
      >
        <motion.img custom={2} variants={fadeInUp} initial="hidden" whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          src={course.image} alt={course.title}
          className="w-full h-80 object-cover rounded-xl mb-8 shadow-lg border border-cyan-600/40"
        />

        <motion.h1 custom={3} variants={fadeInUp} initial="hidden" whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-4xl sm:text-5xl font-extrabold mb-6 text-cyan-400"
        >
          {course.title}
        </motion.h1>

        <motion.p custom={4} variants={fadeInUp} initial="hidden" whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-base sm:text-lg leading-relaxed text-gray-300 mb-6"
        >
          {course.description}
        </motion.p>

        <motion.div custom={5} variants={fadeInUp} initial="hidden" whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid sm:grid-cols-2 gap-x-6 gap-y-4 mb-8 text-sm text-cyan-200"
        >
          <p className="flex"><MdLibraryBooks className="relative top-1 right-1" /> Category: <span className="text-white font-medium">{course.category}</span></p>
          <p className="flex"><TbTargetArrow className="relative top-1 right-1" /> Level: <span className="text-white font-medium">{course.level}</span></p>
          <p className="flex"><IoMdStopwatch className="relative top-1 right-1" /> Duration: <span className="text-white font-medium">{course.duration}</span></p>
          <p className="flex"><TbCoinTakaFilled className="relative top-1 right-1" /> Price: <span className="text-white font-medium">{course.price} Taka</span></p>
          <p className="flex"><FaHourglassStart className="relative top-1 right-1" /> Start: <span className="text-white font-medium">{new Date(course.start_time).toLocaleDateString()}</span></p>
          <p className="flex"><CalendarFold className="relative top-1 right-1" /> Deadline: <span className="text-white font-medium">{new Date(course.deadline).toLocaleDateString()}</span></p>
        </motion.div>

        <motion.div custom={6} variants={fadeInUp} initial="hidden" whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-wrap gap-3 mb-10"
        >
          {course.tags.map((tag, idx) => (
            <span key={idx} className="bg-cyan-600/80 hover:bg-cyan-500 text-white text-xs px-3 py-1 rounded-full uppercase tracking-wide transition-all shadow-sm hover:shadow-md">
              #{tag}
            </span>
          ))}
        </motion.div>

        <motion.div custom={7} variants={fadeInUp} initial="hidden" whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mt-10 relative"
        >
          {isAlreadyEnrolled ? (
            <div className="space-y-4">
              <div className="bg-green-600/20 text-green-400 border border-green-600/40 py-3 px-6 rounded-full inline-block">
                You're already enrolled in this course
              </div>
              <div>
                <Link to="/myEnrolledCourse" className="text-cyan-400 hover:text-cyan-300 font-medium inline-block mt-4">
                  View My Enrollments →
                </Link>
              </div>
            </div>
          ) : hasReachedLimit ? (
            <button
              disabled
              className="bg-gray-600 cursor-not-allowed text-white font-semibold text-lg px-10 py-3 rounded-full shadow-xl"
            >
              Enrollment Limit Reached
            </button>
          ) : (
            <>
            <motion.button
  whileHover={!isAlreadyEnrolled && !hasReachedLimit && user ? { scale: 1.06 } : {}}
  whileTap={!isAlreadyEnrolled && !hasReachedLimit && user ? { scale: 0.95 } : {}}
  onClick={handleEnroll}
  disabled={!user || isAlreadyEnrolled || hasReachedLimit}
  className={`${
    !user || isAlreadyEnrolled || hasReachedLimit
      ? "bg-gray-600 cursor-not-allowed"
      : "bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-400 hover:to-blue-400"
  } text-white font-semibold text-lg px-10 py-3 rounded-full shadow-xl transition duration-300 ease-in-out`}
>
  {!user
    ? "Login to Enroll"
    : isAlreadyEnrolled
    ? "Enrolled"
    : hasReachedLimit
    ? "Enrollment Limit Reached"
    : "Enroll Now"}
</motion.button>


              <motion.span
                initial={{ y: 0, x: 0, scale: 1, opacity: 1 }}
                animate={enrolling ? { y: -400, scale: 20, opacity: 0, rotate: -10 } : {}}
                transition={{ duration: 2.8, ease: "easeInOut" }}
                className="absolute top-2 right-60 md:right-87 lg:right-106 -translate-x-1/2 text-2xl pointer-events-none"
              >
                🚀
              </motion.span>
            </>
          )}
        </motion.div>

        <motion.div custom={8} variants={fadeInUp} initial="hidden" whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-right mt-6"
        >
          <Link to={`/editCourseForm/${course._id}`}
            className="inline-block bg-cyan-600 hover:bg-cyan-400 text-black font-semibold px-5 py-2 rounded-lg transition duration-300"
          >
            ✏️ Edit Course
          </Link>
        </motion.div>
      </motion.div>

      {/* Instructor Card */}
      <motion.div custom={9} variants={fadeInUp} initial="hidden" whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="mt-20 max-w-4xl mx-auto bg-[#222d3e] border border-cyan-900/60 rounded-2xl p-10"
      >
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-cyan-400 flex">
          <FaChalkboardTeacher className="relative top-2 right-3" /> Instructor
        </h2>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8">
          <img src={course.instructor.image} alt={course.instructor.name}
            className="w-28 h-28 object-cover rounded-full border-4 border-cyan-600 shadow-lg"
          />
          <div className="text-gray-200 space-y-2">
            <Link to={`/instructor/${course._id}`}>
            <h3 className="text-xl font-semibold text-white">{course.instructor.name}</h3>
            </Link>
            <p className="leading-relaxed text-sm">{course.instructor.bio}</p>
            <p className="text-sm">Experience: <span className="text-white">{course.instructor.experience}</span></p>
          </div>
        </div>
      </motion.div>

      {/* Contact Section */}
      <motion.div custom={10} variants={fadeInUp} initial="hidden" whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="mt-16 max-w-4xl mx-auto bg-[#222d3e] border border-cyan-700/40 rounded-2xl p-8 sm:p-10"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-cyan-400 mb-4 flex">
          <FaHandsHelping className="relative top-1 right-1.5" /> Need Help?
        </h2>
        <p className="text-gray-300 mb-6 text-sm sm:text-base">
          If you have any questions about the course or enrollment process, feel free to contact our support team.
        </p>
        <div className="space-y-2 text-sm sm:text-base">
          <p className="flex"><IoIosMail className="text-white relative top-1.5 right-1" /> <span className="text-white font-medium">{course.official_contact.email}</span></p>
          <p className="flex"><IoMdCall className="text-white relative top-1 right-1" /> <span className="text-white font-medium">{course.official_contact.phone}</span></p>
        </div>
      </motion.div>
    </div>
  );
};

export default CourseDetails;
