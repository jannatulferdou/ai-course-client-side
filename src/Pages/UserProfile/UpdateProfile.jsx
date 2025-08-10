import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../Shared/Provider/AuthProvider";

const UpdateProfile = () => {
  const { updateUser, user } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [photoURL, setPhotoURL] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setName(user.displayName || "");
      setPhotoURL(user.photoURL || "");
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = {
      displayName: name || user?.displayName || "",
      photoURL: photoURL || user?.photoURL || "",
    };

    const result = await updateUser(updatedData);

    if (result.success) {
      toast.success(result.message);
      navigate("/userProfile");
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4 py-20 pt-35">
      <div className="w-full max-w-md bg-white/10 border border-cyan-700/40 rounded-2xl shadow-2xl backdrop-blur-sm p-8 text-white">
        <h2 className="text-3xl font-bold text-center text-cyan-400 mb-6">
          ✏️ Update Profile
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold mb-1">Full Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 rounded-md border border-cyan-500 bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Photo URL</label>
            <input
              type="text"
              placeholder="Enter photo URL"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
              className="w-full px-4 py-2 rounded-md border border-cyan-500 bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-lg transition duration-300 shadow-md"
          >
            Save The Change
          </button>
        </form>

        <div className="text-center mt-6">
          <img
            src={photoURL || user?.photoURL}
            alt="Profile Preview"
            className="w-20 h-20 mx-auto rounded-full border-4 border-cyan-500 shadow-lg object-cover"
          />
          <p className="text-sm mt-2 text-gray-300">Preview of your profile image</p>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
