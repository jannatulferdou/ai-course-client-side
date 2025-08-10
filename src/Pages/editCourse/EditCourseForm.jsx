import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { 
  FaUserGraduate, 
  FaChalkboardTeacher, 
  FaPhoneAlt, 
  FaEnvelope, 
  FaLink, 
  FaCalendarAlt, 
  FaTags, 
  FaImage,
  FaStar,
  FaCertificate,
  FaSave
} from "react-icons/fa";
import { FiClock, FiDollarSign } from "react-icons/fi";
import { GiGraduateCap } from "react-icons/gi";
import Loading from "../../Shared/Loading/Loading";

const EditCourseForm = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    axios.get(`https://ai-course-server.vercel.app/courses/${id}`)
      .then((res) => setFormData(res.data))
      .catch(() => Swal.fire("Error", "Failed to load course data", "error"));
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (name.includes("instructor.contact.")) {
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
        [name]: type === "number" ? +value : value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedData = {
      ...formData,
      tags: typeof formData.tags === "string"
        ? formData.tags.split(",").map((tag) => tag.trim())
        : formData.tags,
    };

    try {
      await axios.put(`https://ai-course-server.vercel.app/courses/${id}`, updatedData);
      Swal.fire("Success", "Course updated successfully!", "success");
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to update course", "error");
    }
  };

  if (!formData)
    return <Loading></Loading>;

  const Input = ({ label, icon, ...props }) => (
    <div>
      <label className="text-sm font-medium text-cyan-200 block mb-1 flex items-center gap-2">
        {icon} {label}
      </label>
      <input {...props} className="w-full bg-gray-800 text-white p-2 rounded-md border border-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-400" />
    </div>
  );

  const TextArea = ({ label, icon, ...props }) => (
    <div>
      <label className="text-sm font-medium text-cyan-200 block mb-1 flex items-center gap-2">
        {icon} {label}
      </label>
      <textarea {...props} className="w-full bg-gray-800 text-white p-2 rounded-md border border-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-400" rows={3} />
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#0f172a] to-[#1e293b] text-white pt-32 pb-20">
      <div className="px-6 max-w-5xl mx-auto">
        <div className="bg-gradient-to-tr from-[#0f172a] to-[#1e293b] rounded-3xl shadow-2xl p-10 border border-cyan-900">
          <h2 className="text-4xl font-extrabold text-cyan-400 mb-10 text-center flex justify-center items-center gap-3">
            <GiGraduateCap className="text-cyan-400" /> Edit Course
          </h2>

          <form onSubmit={handleSubmit} className="space-y-10">

            {/* Course Info */}
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-cyan-300 flex items-center gap-2">
                <FaCertificate /> Course Information
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <Input label="Title" icon={<FaCertificate className="text-cyan-300" />} name="title" value={formData.title} onChange={handleChange} />
                <Input label="Category" icon={<FaTags className="text-cyan-300" />} name="category" value={formData.category} onChange={handleChange} />
                <Input label="Level" icon={<FaUserGraduate className="text-cyan-300" />} name="level" value={formData.level} onChange={handleChange} />
                <Input label="Duration" icon={<FiClock className="text-cyan-300" />} name="duration" value={formData.duration} onChange={handleChange} />
                <Input label="Price" icon={<FiDollarSign className="text-cyan-300" />} name="price" type="number" value={formData.price} onChange={handleChange} />
                <Input label="Rating" icon={<FaStar className="text-cyan-300" />} name="rating" type="number" step="0.1" min="0" max="5" value={formData.rating} onChange={handleChange} />
                <Input label="Start Date" icon={<FaCalendarAlt className="text-cyan-300" />} name="start_time" type="date" value={formData.start_time?.substring(0, 10)} onChange={handleChange} />
                <Input label="Deadline" icon={<FaCalendarAlt className="text-cyan-300" />} name="deadline" type="date" value={formData.deadline?.substring(0, 10)} onChange={handleChange} />
              </div>
              <TextArea label="Description" icon={<FaCertificate className="text-cyan-300" />} name="description" value={formData.description} onChange={handleChange} />
              <Input label="Tags (comma-separated)" icon={<FaTags className="text-cyan-300" />} name="tags" value={Array.isArray(formData.tags) ? formData.tags.join(", ") : formData.tags} onChange={handleChange} />
              <Input label="Image URL" icon={<FaImage className="text-cyan-300" />} name="image" value={formData.image} onChange={handleChange} />

              <div className="flex gap-8 mt-4">
                <label className="flex items-center gap-2">
                  <input type="checkbox" name="isPopular" checked={formData.isPopular} onChange={handleChange} />
                  <span className="flex items-center gap-1"><FaStar /> Popular</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" name="is_new" checked={formData.is_new} onChange={handleChange} />
                  <span className="flex items-center gap-1"><FaCertificate /> New</span>
                </label>
              </div>
            </div>

            {/* Instructor Info */}
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-cyan-300 flex items-center gap-2">
                <FaChalkboardTeacher /> Instructor Info
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <Input label="Name" icon={<FaChalkboardTeacher className="text-cyan-300" />} name="instructor.name" value={formData.instructor.name} onChange={handleChange} />
                <Input label="Experience" icon={<FaCertificate className="text-cyan-300" />} name="instructor.experience" value={formData.instructor.experience} onChange={handleChange} />
                <Input label="LinkedIn" icon={<FaLink className="text-cyan-300" />} name="instructor.linkedin" value={formData.instructor.linkedin} onChange={handleChange} />
                <Input label="Image URL" icon={<FaImage className="text-cyan-300" />} name="instructor.image" value={formData.instructor.image} onChange={handleChange} />
                <Input label="Email" icon={<FaEnvelope className="text-cyan-300" />} name="instructor.contact.email" type="email" value={formData.instructor.contact.email} onChange={handleChange} />
                <Input label="Phone" icon={<FaPhoneAlt className="text-cyan-300" />} name="instructor.contact.phone" value={formData.instructor.contact.phone} onChange={handleChange} />
              </div>
              <TextArea label="Bio" icon={<FaChalkboardTeacher className="text-cyan-300" />} name="instructor.bio" value={formData.instructor.bio} onChange={handleChange} />
            </div>

            {/* Official Contact */}
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-cyan-300 flex items-center gap-2">
                <FaPhoneAlt /> Official Contact
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <Input label="Email" icon={<FaEnvelope className="text-cyan-300" />} name="official_contact.email" type="email" value={formData.official_contact.email} onChange={handleChange} />
                <Input label="Phone" icon={<FaPhoneAlt className="text-cyan-300" />} name="official_contact.phone" value={formData.official_contact.phone} onChange={handleChange} />
              </div>
            </div>

            <div className="text-center">
              <button type="submit" className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold text-lg px-10 py-3 rounded-full transition-all duration-300 shadow-lg flex items-center justify-center gap-2 mx-auto">
                <FaSave /> Update Course
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditCourseForm;