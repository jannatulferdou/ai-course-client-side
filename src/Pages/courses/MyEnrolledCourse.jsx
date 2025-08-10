import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Shared/Provider/AuthProvider';
import Loading from '../../Shared/Loading/Loading';
import axios from 'axios';
import Swal from 'sweetalert2';
import { FiExternalLink, FiTrash2 } from 'react-icons/fi';

const MyEnrolledCourse = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      if (!user || !user.email) return;

      try {
        const response = await axios.get(`https://ai-course-server.vercel.app/enrolled-courses?email=${user.email}`, {
          withCredentials: true,
        });
        setEnrolledCourses(response.data);
      } catch (error) {
        console.error("Error fetching enrolled courses:", error);
        Swal.fire({
          icon: "error",
          title: "Failed to load enrollments",
          text: "Could not load your enrolled courses. Please try again later.",
          confirmButtonColor: "#0ea5e9",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchEnrolledCourses();
  }, [user]);

  const handleRemoveEnrollment = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This will remove your enrollment only, not the course itself.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, remove it!",
    });

    if (confirm.isConfirmed) {
      try {
        await axios.delete(`https://ai-course-server.vercel.app/enrolled-courses/${id}`, {
          withCredentials: true,
        });
        setEnrolledCourses(prev => prev.filter(course => course._id !== id));
        Swal.fire({
          icon: "success",
          title: "Enrollment Removed",
          confirmButtonColor: "#0ea5e9",
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Failed to remove",
          text: "Try again later.",
          confirmButtonColor: "#0ea5e9",
        });
      }
    }
  };

  if (loading) return <Loading />;

  if (enrolledCourses.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f172a] text-center px-4">
        <div className="bg-[#1e293b] p-8 rounded-2xl shadow-xl border border-cyan-800/40 max-w-md">
          <h2 className="text-2xl font-bold text-cyan-400 mb-3">No Enrollments Found</h2>
          <p className="text-gray-300 mb-6">You haven't enrolled in any course yet.</p>
          <Link
            to="/courses"
            className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white px-6 py-3 rounded-lg font-medium transition duration-300"
          >
            Browse Courses
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f172a] pt-32 px-4 sm:px-8 pb-16">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-cyan-400 mb-8 text-center">My Enrolled Courses</h1>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm bg-[#1e293b] rounded-xl overflow-hidden">
            <thead className="bg-cyan-800/30 text-cyan-300 text-left">
              <tr>
                <th className="p-4">Course Title</th>
                <th className="p-4">Payment Method</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Enrollment Date</th>
                <th className="p-4">Status</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody className="text-white divide-y divide-cyan-800/30">
              {enrolledCourses.map(course => (
                <tr key={course._id} className="hover:bg-cyan-700/10 transition duration-200">
                  <td className="p-4 font-medium">{course.courseTitle}</td>
                  <td className="p-4">{course.paymentMethod || 'N/A'}</td>
                  <td className="p-4">{course.paymentAmount} ৳</td>
                  <td className="p-4">{new Date(course.enrollmentDate).toLocaleDateString()}</td>
                  <td className="p-4">
                    {course.paid ? (
                      <span className="text-green-400 font-semibold">Paid</span>
                    ) : (
                      <span className="text-yellow-400 font-semibold">Pending</span>
                    )}
                  </td>
                  <td className="p-4 space-x-2">
                    <Link
                      to={`/courseDetails/${course.courseId}`}
                      className="inline-flex items-center gap-1 px-3 py-1 text-xs text-white bg-cyan-600 hover:bg-cyan-500 rounded transition"
                    >
                      <FiExternalLink /> View
                    </Link>
                    <button
                      onClick={() => handleRemoveEnrollment(course._id)}
                      className="inline-flex items-center gap-1 px-3 py-1 text-xs text-white bg-red-600 hover:bg-red-500 rounded transition"
                    >
                      <FiTrash2 /> Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/"
            className="text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-1 transition"
          >
            Explore More Courses &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MyEnrolledCourse;
