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
    <div className="max-w-2xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-6">
        Edit Issue
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border p-3 rounded"
          rows="5"
        />

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full border p-3 rounded"
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

        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded"
        >
          Update Issue
        </button>

      </form>

    </div>
  );
}

export default EditIssue;