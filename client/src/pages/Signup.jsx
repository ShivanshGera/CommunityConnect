import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

import api from "../api/axios";

function Signup() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

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

      const response = await api.post(
        "/auth/signup",
        formData
      );

      toast.success(response.data.message);

      navigate("/login");

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Signup failed"
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-cyan-700 flex items-center justify-center px-6">

      <div className="max-w-6xl w-full grid md:grid-cols-2 bg-white rounded-3xl overflow-hidden shadow-2xl">

        {/* Left Side */}
        <div className="hidden md:flex flex-col justify-center bg-slate-900 text-white p-12">

          <h1 className="text-5xl font-bold mb-6">
            Join CommunityConnect
          </h1>

          <p className="text-lg text-gray-300 leading-8">
            Become part of a platform that helps citizens
            report issues, track progress, and contribute
            towards building better communities.
          </p>

          <div className="mt-10">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
              alt="Community"
              className="rounded-2xl shadow-lg"
            />
          </div>

        </div>

        {/* Right Side */}
        <div className="p-10 md:p-14">

          <h2 className="text-4xl font-bold mb-2">
            Create Account
          </h2>

          <p className="text-gray-500 mb-8">
            Start reporting and tracking community issues
          </p>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            <div>
              <label className="block mb-2 font-medium">
                Full Name
              </label>

              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Email Address
              </label>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Password
              </label>

              <input
                type="password"
                name="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white p-3 rounded-lg font-semibold transition"
            >
              {loading
                ? "Creating Account..."
                : "Create Account"}
            </button>

          </form>

          <p className="text-center mt-6 text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 font-semibold"
            >
              Login
            </Link>
          </p>

        </div>

      </div>

    </div>
  );
}

export default Signup;