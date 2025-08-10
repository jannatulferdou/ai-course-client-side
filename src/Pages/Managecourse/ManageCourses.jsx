import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FiEdit3, FiTrash2 } from "react-icons/fi";
import { MdOutlineAccessTime } from "react-icons/md";
import { RiGraduationCapLine } from "react-icons/ri";
import { AiOutlineEye } from "react-icons/ai";
import { AuthContext } from "../../Shared/Provider/AuthProvider"; 

const ManageCourses = () => {
  const [courses, setCourses] = useState([]);
  const { user } = useContext(AuthContext); 
  const userEmail = user?.email;
  const navigate = useNavigate();

  useEffect(() => {
    if (!userEmail) return;

    axios.get(`https://ai-course-server.vercel.app/my-courses?email=${userEmail}`, {
  withCredentials: true,
})
  .then(res => {
    setCourses(res.data);
  })
  .catch(error => {
    console.error("Failed to fetch user courses:", error);
  });
  }, [userEmail]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Delete this course?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e11d48",
      cancelButtonColor: "#334155",
      confirmButtonText: "Yes, delete it!",
    }).then(result => {
      if (result.isConfirmed) {
        axios.delete(`https://ai-course-server.vercel.app/courses/${id}`)
          .then(() => {
            setCourses(prev => prev.filter(c => c._id !== id));
            Swal.fire("Deleted!", "Course removed successfully.", "success");
          });
      }
    });
  };

  return (
    <div className="min-h-screen pt-35 px-4 py-10 bg-gradient-to-tr from-[#0f172a] via-[#1e293b] to-[#020617] text-white">
      <h1 className="text-4xl font-bold mb-8 text-cyan-400">📚 Manage My Courses</h1>

      <div className="overflow-x-auto rounded-xl bg-white/5 backdrop-blur border border-white/10 shadow-xl">
        <table className="table table-zebra w-full text-sm">
          <thead className="text-cyan-300 bg-gray-800 border-b border-gray-700">
            <tr>
              <th>#</th>
              <th>Course</th>
              <th className="w-1/2">Description</th>
              <th>Info</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.length > 0 ? (
              courses.map((course, i) => (
                <tr key={course._id} className="hover:bg-gray-700/50 transition-all">
                  <td className="text-gray-400">{i + 1}</td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar tooltip" data-tip={course.instructor.name}>
                        <div className="w-10 mask mask-squircle">
                          <img src={course.instructor.image} alt="Instructor" />
                        </div>
                      </div>
                      <div>
                        <div className="font-semibold text-white">{course.title}</div>
                        <div className="text-xs text-gray-400 capitalize">{course.category.replace(/-/g, " ")}</div>
                      </div>
                    </div>
                  </td>
                  <td className="text-gray-300">
                    {course.description.length > 80
                      ? `${course.description.slice(0, 80)}...`
                      : course.description}
                  </td>
                  <td className="text-xs text-gray-300 space-y-1">
                    <div className="flex items-center gap-1">
                      <MdOutlineAccessTime className="text-cyan-400" /> {course.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <RiGraduationCapLine className="text-pink-400" /> {course.level}
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => navigate(`/courseDetails/${course._id}`)}
                        className="btn btn-sm btn-outline btn-info tooltip"
                        data-tip="View"
                      >
                        <AiOutlineEye />
                      </button>
                      <button
                        onClick={() => navigate(`/editCourseForm/${course._id}`)}
                        className="btn btn-sm btn-outline btn-accent tooltip"
                        data-tip="Edit"
                      >
                        <FiEdit3 />
                      </button>
                      <button
                        onClick={() => handleDelete(course._id)}
                        className="btn btn-sm btn-error tooltip"
                        data-tip="Delete"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-400">
                  No courses found for your account.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageCourses;
