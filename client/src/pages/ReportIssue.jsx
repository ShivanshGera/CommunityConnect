import { useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

function ReportIssue() {
  const { token } = useAuth();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
  });

  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = new FormData();

      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("category", formData.category);
      data.append("location", formData.location);

      if (image) {
        data.append("image", image);
      }

      const response = await api.post(
        "/issues/create",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(response.data.message);

      setFormData({
        title: "",
        description: "",
        category: "",
        location: "",
      });

      setImage(null);

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Failed to create issue"
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      <div className="max-w-4xl mx-auto px-6 py-10">

        {/* Header */}

        <div className="mb-10">

          <h1 className="text-4xl font-bold">
            Report Community Issue
          </h1>

          <p className="text-slate-400 mt-3">
            Help improve your community by reporting
            problems that need attention.
          </p>

        </div>

        {/* Form Card */}

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            {/* Title */}

            <div>

              <label className="block text-sm text-slate-400 mb-2">
                Issue Title
              </label>

              <input
                type="text"
                name="title"
                placeholder="Enter issue title"
                value={formData.title}
                onChange={handleChange}
                className="
                w-full
                bg-slate-950
                border
                border-slate-800
                rounded-xl
                p-4
                focus:outline-none
                focus:border-indigo-500
              "
              />

            </div>

            {/* Description */}

            <div>

              <label className="block text-sm text-slate-400 mb-2">
                Description
              </label>

              <textarea
                name="description"
                placeholder="Describe the issue..."
                value={formData.description}
                onChange={handleChange}
                rows="5"
                className="
                w-full
                bg-slate-950
                border
                border-slate-800
                rounded-xl
                p-4
                focus:outline-none
                focus:border-indigo-500
              "
              />

            </div>

            {/* Category */}

            <div>

              <label className="block text-sm text-slate-400 mb-2">
                Category
              </label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="
                w-full
                bg-slate-950
                border
                border-slate-800
                rounded-xl
                p-4
                focus:outline-none
                focus:border-indigo-500
              "
              >
                <option value="">
                  Select Category
                </option>

                <option value="Road Damage">
                  Road Damage
                </option>

                <option value="Garbage">
                  Garbage
                </option>

                <option value="Street Light">
                  Street Light
                </option>

                <option value="Water Leakage">
                  Water Leakage
                </option>

                <option value="Traffic Issue">
                  Traffic Issue
                </option>

                <option value="Other">
                  Other
                </option>

              </select>

            </div>

            {/* Location */}

            <div>

              <label className="block text-sm text-slate-400 mb-2">
                Location
              </label>

              <input
                type="text"
                name="location"
                placeholder="Enter location"
                value={formData.location}
                onChange={handleChange}
                className="
                w-full
                bg-slate-950
                border
                border-slate-800
                rounded-xl
                p-4
                focus:outline-none
                focus:border-indigo-500
              "
              />

            </div>

            {/* Image Upload */}

            <div>

              <label className="block text-sm text-slate-400 mb-2">
                Upload Image
              </label>

              <div
                className="
                bg-slate-950
                border
                border-dashed
                border-slate-700
                rounded-xl
                p-6
              "
              >

                <input
                  type="file"
                  onChange={(e) =>
                    setImage(e.target.files[0])
                  }
                  className="w-full text-slate-400"
                />

                {image && (
                  <p className="mt-3 text-emerald-400">
                    Selected: {image.name}
                  </p>
                )}

              </div>

            </div>

            {/* Submit */}

            <button
              type="submit"
              disabled={loading}
              className="
              w-full
              bg-gradient-to-r
              from-indigo-600
              to-purple-600
              hover:from-indigo-700
              hover:to-purple-700
              disabled:opacity-50
              disabled:cursor-not-allowed
              rounded-xl
              py-4
              font-semibold
              transition
            "
            >
              {loading
                ? "Uploading & Submitting..."
                : "Submit Issue"}
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}

export default ReportIssue;