import { useEffect, useState } from "react";

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
      <div className="p-10 text-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">

      <h1 className="text-4xl font-bold mb-8">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <div className="bg-slate-100 p-6 rounded shadow">
          <h2 className="text-lg font-semibold">
            Total Issues
          </h2>

          <p className="text-4xl font-bold mt-2">
            {stats.totalIssues}
          </p>
        </div>

        <div className="bg-yellow-100 p-6 rounded shadow">
          <h2 className="text-lg font-semibold">
            Pending
          </h2>

          <p className="text-4xl font-bold mt-2">
            {stats.pendingIssues}
          </p>
        </div>

        <div className="bg-blue-100 p-6 rounded shadow">
          <h2 className="text-lg font-semibold">
            In Progress
          </h2>

          <p className="text-4xl font-bold mt-2">
            {stats.inProgressIssues}
          </p>
        </div>

        <div className="bg-green-100 p-6 rounded shadow">
          <h2 className="text-lg font-semibold">
            Resolved
          </h2>

          <p className="text-4xl font-bold mt-2">
            {stats.resolvedIssues}
          </p>
        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;