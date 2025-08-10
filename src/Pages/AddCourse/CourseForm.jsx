import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CourseForm = () => {

 


  const initialFormState = {
    title: "",
    description: "",
    category: "",
    level: "Beginner",
    duration: "",
    price: "",
    start_time: "",
    deadline: "",
    tags: "",
    image: "",
    isPopular: false,
    is_new: false,
    instructor: {
      name: "",
      bio: "",
      experience: "",
      linkedin: "",
      image: "",
      contact: {
        email: "",
        phone: ""
      }
    },
    official_contact: {
      email: "",
      phone: ""
    }
  };

 
  const [formData, setFormData] = useState(initialFormState);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.includes("instructor.contact.")) {
      const field = name.split(".")[2];
      setFormData((prev) => ({
        ...prev,
        instructor: {
          ...prev.instructor,
          contact: {
            ...prev.instructor.contact,
            [field]: value,
          },
        },
      }));
    } else if (name.includes("instructor.")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        instructor: {
          ...prev.instructor,
          [field]: value,
        },
      }));
    } else if (name.includes("official_contact.")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        official_contact: {
          ...prev.official_contact,
          [field]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const finalData = {
      ...formData,
      tags: formData.tags.split(",").map(tag => tag.trim())
    };

    try {
      const response = await axios.post("https://ai-course-server.vercel.app/courses", finalData);
      console.log("Successfully added:", response.data);
      toast.success("Course added successfully!");
      setFormData(initialFormState); // Reset form
       setTimeout(() => {
      navigate("/manageCourse"); 
    }, 1500);
    } catch (error) {
      console.error("Error adding course:", error);
      toast.error("Failed to add course. Please try again.");
    }
  };

  return (
    <div className="bg-gradient-to-tr from-[#0f172a] via-[#1e293b] to-[#0f172a] min-h-screen py-12">
      <ToastContainer 
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="max-w-4xl mx-auto px-6 py-12 bg-gray-900 rounded-xl shadow-lg mt-20">
        <h2 className="text-3xl font-bold text-cyan-400 mb-8 text-center">
          Create New Course
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6 text-white">
          {/* Basic Info */}
          <div>
            <label className="block mb-1 font-medium">Title</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} required className="w-full px-4 py-2 rounded bg-gray-800 border border-cyan-600" />
          </div>

          <div>
            <label className="block mb-1 font-medium">Description</label>
            <textarea name="description" rows={4} value={formData.description} onChange={handleChange} required className="w-full px-4 py-2 rounded bg-gray-800 border border-cyan-600" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block mb-1 font-medium">Category</label>
              <input type="text" name="category" value={formData.category} onChange={handleChange} required className="w-full px-4 py-2 rounded bg-gray-800 border border-cyan-600" />
            </div>

            <div>
              <label className="block mb-1 font-medium">Level</label>
              <select name="level" value={formData.level} onChange={handleChange} className="w-full px-4 py-2 rounded bg-gray-800 border border-cyan-600">
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 font-medium">Duration </label>
              <input type="text" name="duration" value={formData.duration} onChange={handleChange} required className="w-full px-4 py-2 rounded bg-gray-800 border border-cyan-600" />
            </div>

            <div>
              <label className="block mb-1 font-medium">Price (Taka)</label>
              <input type="number" name="price" value={formData.price} onChange={handleChange} required className="w-full px-4 py-2 rounded bg-gray-800 border border-cyan-600" />
            </div>

            <div>
              <label className="block mb-1 font-medium">Start Date</label>
              <input type="date" name="start_time" value={formData.start_time} onChange={handleChange} required className="w-full px-4 py-2 rounded bg-gray-800 border border-cyan-600" />
            </div>

            <div>
              <label className="block mb-1 font-medium">Deadline</label>
              <input type="date" name="deadline" value={formData.deadline} onChange={handleChange} required className="w-full px-4 py-2 rounded bg-gray-800 border border-cyan-600" />
            </div>
          </div>

          <div>
            <label className="block mb-1 font-medium">Tags (comma-separated)</label>
            <input type="text" name="tags" value={formData.tags} onChange={handleChange} className="w-full px-4 py-2 rounded bg-gray-800 border border-cyan-600" />
          </div>

          <div>
            <label className="block mb-1 font-medium">Image URL</label>
            <input type="text" name="image" value={formData.image} onChange={handleChange} required className="w-full px-4 py-2 rounded bg-gray-800 border border-cyan-600" />
          </div>

          {/* Instructor Info */}
          <h3 className="text-xl font-semibold text-cyan-300 mt-8 mb-4">Instructor Info</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <input type="text" name="instructor.name" placeholder="Instructor Name" value={formData.instructor.name} onChange={handleChange} className="w-full px-4 py-2 rounded bg-gray-800 border border-cyan-600" required />
            <textarea name="instructor.bio" placeholder="Instructor Bio" rows={3} value={formData.instructor.bio} onChange={handleChange} className="w-full px-4 py-2 rounded bg-gray-800 border border-cyan-600" required />
            <input type="text" name="instructor.experience" placeholder="Experience" value={formData.instructor.experience} onChange={handleChange} className="w-full px-4 py-2 rounded bg-gray-800 border border-cyan-600" required/>
            <input type="text" name="instructor.linkedin" placeholder="LinkedIn URL" value={formData.instructor.linkedin} onChange={handleChange} className="w-full px-4 py-2 rounded bg-gray-800 border border-cyan-600" required />
            <input type="text" name="instructor.image" placeholder="Image URL" value={formData.instructor.image} onChange={handleChange} className="w-full px-4 py-2 rounded bg-gray-800 border border-cyan-600" required />
            <input type="email" name="instructor.contact.email" placeholder="Instructor Email" value={formData.instructor.contact.email} onChange={handleChange} className="w-full px-4 py-2 rounded bg-gray-800 border border-cyan-600" required />
            <input type="number" name="instructor.contact.phone" placeholder="Instructor Phone" value={formData.instructor.contact.phone} onChange={handleChange} className="w-full px-4 py-2 rounded bg-gray-800 border border-cyan-600" required />
          </div>

          {/* Official Contact Info */}
          <h3 className="text-xl font-semibold text-cyan-300 mt-8 mb-4">Official Contact Info</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <input type="email" name="official_contact.email" placeholder="Official Email" value={formData.official_contact.email} onChange={handleChange} className="w-full px-4 py-2 rounded bg-gray-800 border border-cyan-600" required/>
            <input type="tel" name="official_contact.phone" placeholder="Official Phone" value={formData.official_contact.phone} onChange={handleChange} className="w-full px-4 py-2 rounded bg-gray-800 border border-cyan-600" required />
          </div>

          {/* Flags */}
          <h3 className="text-xl font-semibold text-cyan-300 mt-8 mb-4">Flags</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block mb-1 font-medium text-cyan-200">Is Popular?</label>
              <select name="isPopular" value={formData.isPopular.toString()} onChange={(e) => setFormData((prev) => ({ ...prev, isPopular: e.target.value === "true" }))} className="w-full px-4 py-2 rounded-lg bg-gray-900 text-white border border-cyan-500">
                <option value="false">False</option>
                <option value="true">True</option>
              </select>
            </div>
            <div>
              <label className="block mb-1 font-medium text-cyan-200">Is New?</label>
              <select name="is_new" value={formData.is_new.toString()} onChange={(e) => setFormData((prev) => ({ ...prev, is_new: e.target.value === "true" }))} className="w-full px-4 py-2 rounded-lg bg-gray-900 text-white border border-cyan-500">
                <option value="false">False</option>
                <option value="true">True</option>
              </select>
            </div>
          </div>

          <button type="submit" className="w-full mt-6 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-3 rounded-lg transition duration-300">
            Add Course
          </button>
        </form>
      </div>
    </div>
  );
};

export default CourseForm;