import { useEffect, useState } from "react";

import {
  FaClipboardList,
  FaClock,
  FaSpinner,
  FaCheckCircle,
} from "react-icons/fa";

import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

function AdminDashboard() {
  const { token } = useAuth();

  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await api.get(
        "/admin/dashboard",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setStats(response.data.stats);

    } catch (error) {
      console.log(error);
    }
  };

  if (!stats) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Header */}

      <div className="border-b border-slate-800">

        <div className="max-w-7xl mx-auto px-6 py-12">

          <h1 className="text-5xl font-bold">
            Admin Dashboard
          </h1>

          <p className="text-slate-400 mt-4 text-lg">
            Monitor community issues and track resolution progress.
          </p>

        </div>

      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Stats */}

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

          {/* Total */}

          <div
            className="
            bg-slate-900
            border
            border-slate-800
            rounded-2xl
            p-6
            hover:border-indigo-500
            hover:-translate-y-1
            hover:shadow-xl
            hover:shadow-indigo-500/10
            transition-all
          "
          >

            <div className="flex justify-between items-center">

              <div>

                <p className="text-slate-400">
                  Total Issues
                </p>

                <h2 className="text-4xl font-bold mt-2">
                  {stats.totalIssues}
                </h2>

              </div>

              <FaClipboardList
                className="text-indigo-500 text-4xl"
              />

            </div>

          </div>

          {/* Pending */}

          <div
            className="
            bg-slate-900
            border
            border-slate-800
            rounded-2xl
            p-6
            hover:border-amber-500
            hover:-translate-y-1
            hover:shadow-xl
            hover:shadow-amber-500/10
            transition-all
          "
          >

            <div className="flex justify-between items-center">

              <div>

                <p className="text-slate-400">
                  Pending
                </p>

                <h2 className="text-4xl font-bold mt-2">
                  {stats.pendingIssues}
                </h2>

              </div>

              <FaClock
                className="text-amber-500 text-4xl"
              />

            </div>

          </div>

          {/* In Progress */}

          <div
            className="
            bg-slate-900
            border
            border-slate-800
            rounded-2xl
            p-6
            hover:border-blue-500
            hover:-translate-y-1
            hover:shadow-xl
            hover:shadow-blue-500/10
            transition-all
          "
          >

            <div className="flex justify-between items-center">

              <div>

                <p className="text-slate-400">
                  In Progress
                </p>

                <h2 className="text-4xl font-bold mt-2">
                  {stats.inProgressIssues}
                </h2>

              </div>

              <FaSpinner
                className="text-blue-500 text-4xl"
              />

            </div>

          </div>

          {/* Resolved */}

          <div
            className="
            bg-slate-900
            border
            border-slate-800
            rounded-2xl
            p-6
            hover:border-emerald-500
            hover:-translate-y-1
            hover:shadow-xl
            hover:shadow-emerald-500/10
            transition-all
          "
          >

            <div className="flex justify-between items-center">

              <div>

                <p className="text-slate-400">
                  Resolved
                </p>

                <h2 className="text-4xl font-bold mt-2">
                  {stats.resolvedIssues}
                </h2>

              </div>

              <FaCheckCircle
                className="text-emerald-500 text-4xl"
              />

            </div>

          </div>

        </div>

        {/* Admin Info Card */}

        <div className="mt-10 bg-slate-900 border border-slate-800 rounded-2xl p-8">

          <h2 className="text-2xl font-bold mb-4">
            Administration Overview
          </h2>

          <p className="text-slate-400 leading-8">
            Use the admin dashboard to monitor all reported
            issues, update their status, and ensure that
            community concerns are resolved efficiently.
            Keeping issue statuses updated helps citizens
            track progress and improves transparency.
          </p>

        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;