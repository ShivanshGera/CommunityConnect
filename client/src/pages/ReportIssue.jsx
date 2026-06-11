import { useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

function ReportIssue() {
  const { token } = useAuth();

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

      alert(response.data.message);

      setFormData({
        title: "",
        description: "",
        category: "",
        location: "",
      });

      setImage(null);

    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Failed to create issue"
      );
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-6">
        Report Issue
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <input
          type="text"
          name="title"
          placeholder="Issue Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        >
          <option value="">Select Category</option>
          <option value="Road Damage">Road Damage</option>
          <option value="Garbage">Garbage</option>
          <option value="Street Light">Street Light</option>
          <option value="Water Leakage">Water Leakage</option>
          <option value="Traffic Issue">Traffic Issue</option>
          <option value="Other">Other</option>
        </select>

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          type="file"
          onChange={(e) =>
            setImage(e.target.files[0])
          }
          className="w-full"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded"
        >
          Submit Issue
        </button>
      </form>
    </div>
  );
}

export default ReportIssue;