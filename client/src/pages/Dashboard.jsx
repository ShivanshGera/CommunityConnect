import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  FaClipboardList,
  FaClock,
  FaCheckCircle,
  FaUser,
  FaArrowRight,
} from "react-icons/fa";

import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

function Dashboard() {
  const { user, token } = useAuth();

  const [issues, setIssues] = useState([]);

  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Good Morning"
      : hour < 18
      ? "Good Afternoon"
      : "Good Evening";

  useEffect(() => {
    fetchIssues();
  }, []);

  const fetchIssues = async () => {
    try {
      const response = await api.get(
        "/issues/my",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setIssues(response.data.issues);

    } catch (error) {
      console.log(error);
    }
  };

  const totalIssues = issues.length;

  const pendingIssues = issues.filter(
    (issue) => issue.status === "Pending"
  ).length;

  const resolvedIssues = issues.filter(
    (issue) => issue.status === "Resolved"
  ).length;

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Hero */}

      <div className="border-b border-slate-800">

        <div className="max-w-7xl mx-auto px-6 py-12">

          <div className="flex items-center justify-between">

            <div>

              <h1 className="text-5xl font-bold tracking-tight">
                {greeting}, {user?.name} 👋
              </h1>

              <p className="mt-4 text-lg text-slate-400">
                Track your community reports and monitor
                their progress in one place.
              </p>

            </div>

            <div className="hidden md:flex w-20 h-20 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 items-center justify-center text-3xl font-bold shadow-lg">
              {user?.name?.charAt(0).toUpperCase()}
            </div>

          </div>

        </div>

      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Stats */}

        <div className="grid md:grid-cols-3 gap-6 mb-10">

          <div
            className="
            bg-slate-900
            border
            border-slate-800
            rounded-2xl
            p-6
            hover:-translate-y-1
            hover:shadow-xl
            hover:shadow-indigo-500/10
            transition-all
            duration-300
          "
          >

            <div className="flex justify-between items-center">

              <div>
                <p className="text-slate-400">
                  Total Issues
                </p>

                <h2 className="text-4xl font-bold mt-2">
                  {totalIssues}
                </h2>
              </div>

              <FaClipboardList
                className="text-indigo-500 text-4xl"
              />

            </div>

          </div>

          <div
            className="
            bg-slate-900
            border
            border-slate-800
            rounded-2xl
            p-6
            hover:-translate-y-1
            hover:shadow-xl
            hover:shadow-amber-500/10
            transition-all
            duration-300
          "
          >

            <div className="flex justify-between items-center">

              <div>
                <p className="text-slate-400">
                  Pending
                </p>

                <h2 className="text-4xl font-bold mt-2">
                  {pendingIssues}
                </h2>
              </div>

              <FaClock
                className="text-amber-500 text-4xl"
              />

            </div>

          </div>

          <div
            className="
            bg-slate-900
            border
            border-slate-800
            rounded-2xl
            p-6
            hover:-translate-y-1
            hover:shadow-xl
            hover:shadow-emerald-500/10
            transition-all
            duration-300
          "
          >

            <div className="flex justify-between items-center">

              <div>
                <p className="text-slate-400">
                  Resolved
                </p>

                <h2 className="text-4xl font-bold mt-2">
                  {resolvedIssues}
                </h2>
              </div>

              <FaCheckCircle
                className="text-emerald-500 text-4xl"
              />

            </div>

          </div>

        </div>

        {/* Quick Actions */}

        <h2 className="text-2xl font-bold mb-6">
          Quick Actions
        </h2>

        <div className="grid md:grid-cols-2 gap-6 mb-10">

          <Link
            to="/report-issue"
            className="
            bg-gradient-to-r
            from-indigo-600
            to-purple-600
            rounded-2xl
            p-8
            hover:scale-[1.02]
            hover:shadow-xl
            hover:shadow-indigo-500/20
            transition-all
            duration-300
          "
          >

            <h3 className="text-2xl font-bold mb-3">
              Report Issue
            </h3>

            <p className="text-indigo-100">
              Submit a new issue with images,
              category and location details.
            </p>

            <div className="mt-6 flex items-center gap-2">
              Open
              <FaArrowRight />
            </div>

          </Link>

          <Link
            to="/my-issues"
            className="
            bg-slate-900
            border
            border-slate-800
            rounded-2xl
            p-8
            hover:border-indigo-500
            hover:scale-[1.02]
            hover:shadow-xl
            hover:shadow-indigo-500/10
            transition-all
            duration-300
          "
          >

            <h3 className="text-2xl font-bold mb-3">
              My Issues
            </h3>

            <p className="text-slate-400">
              View and track all issues
              reported by you.
            </p>

            <div className="mt-6 flex items-center gap-2 text-indigo-400">
              Open
              <FaArrowRight />
            </div>

          </Link>

        </div>

        {/* Recent Issues */}

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 mb-10">

          <h2 className="text-2xl font-bold mb-6">
            Recent Issues
          </h2>

          {issues.length === 0 ? (
            <p className="text-slate-400">
              No issues reported yet.
            </p>
          ) : (
            <div className="divide-y divide-slate-800">

              {issues.slice(0, 5).map((issue) => (

                <div
                  key={issue._id}
                  className="py-5 flex items-center justify-between"
                >

                  <div>

                    <h3 className="font-semibold text-lg">
                      {issue.title}
                    </h3>

                    <p className="text-slate-400 text-sm mt-1">
                      {issue.category}
                    </p>

                  </div>

                  <span
                    className={`font-semibold ${
                      issue.status === "Resolved"
                        ? "text-emerald-400"
                        : issue.status === "Pending"
                        ? "text-amber-400"
                        : "text-indigo-400"
                    }`}
                  >
                    {issue.status}
                  </span>

                </div>

              ))}

            </div>
          )}

        </div>

        {/* Profile */}

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">

          <div className="flex items-center gap-3 mb-8">

            <FaUser className="text-indigo-500 text-2xl" />

            <h2 className="text-2xl font-bold">
              Profile Information
            </h2>

          </div>

          <div className="grid md:grid-cols-3 gap-8">

            <div>

              <p className="text-slate-400">
                Name
              </p>

              <p className="text-lg font-semibold mt-2">
                {user?.name}
              </p>

            </div>

            <div>

              <p className="text-slate-400">
                Email
              </p>

              <p className="text-lg font-semibold mt-2">
                {user?.email}
              </p>

            </div>

            <div>

              <p className="text-slate-400 mb-3">
                Role
              </p>

              <span
                className={`px-4 py-2 rounded-full text-sm font-semibold ${
                  user?.role === "admin"
                    ? "bg-indigo-500/20 text-indigo-400"
                    : "bg-emerald-500/20 text-emerald-400"
                }`}
              >
                {user?.role}
              </span>

              <p className="text-slate-500 text-sm mt-3">
                CommunityConnect Member
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;