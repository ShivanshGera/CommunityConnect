import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

function EditIssue() {
  const { id } = useParams();

  const navigate = useNavigate();

  const { token } = useAuth();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
  });

  useEffect(() => {
    fetchIssue();
  }, []);

  const fetchIssue = async () => {
    try {
      const response = await api.get(
        `/issues/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const issue = response.data.issue;

      setFormData({
        title: issue.title,
        description: issue.description,
        category: issue.category,
        location: issue.location,
      });

    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.put(
        `/issues/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(response.data.message);

      navigate(`/issues/${id}`);

    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Failed to update issue"
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      <div className="max-w-4xl mx-auto px-6 py-10">

        {/* Header */}

        <div className="mb-10">

          <h1 className="text-4xl font-bold">
            Edit Issue
          </h1>

          <p className="text-slate-400 mt-3">
            Update the issue details before it is processed.
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

            {/* Submit */}

            <button
              type="submit"
              className="
              w-full
              bg-gradient-to-r
              from-indigo-600
              to-purple-600
              hover:from-indigo-700
              hover:to-purple-700
              rounded-xl
              py-4
              font-semibold
              transition
            "
            >
              Update Issue
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}

export default EditIssue;