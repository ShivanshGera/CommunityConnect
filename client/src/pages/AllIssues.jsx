import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import StatusBadge from "../components/StatusBadge";

function AllIssues() {
  const { token } = useAuth();

  const [issues, setIssues] = useState([]);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [category, setCategory] = useState("");

  const [loading, setLoading] = useState(false);
  const [statusLoading, setStatusLoading] =
    useState(null);
  const [deleteLoading, setDeleteLoading] =
    useState(null);

  useEffect(() => {
    fetchIssues();
  }, []);

  const fetchIssues = async () => {
    try {
      setLoading(true);

      const response = await api.get(
        "/admin/issues",
        {
          params: {
            search,
            status,
            category,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setIssues(response.data.issues);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }
  };

  const updateStatus = async (
    issueId,
    newStatus
  ) => {
    try {
      setStatusLoading(issueId);

      const response = await api.patch(
        `/admin/issues/${issueId}/status`,
        {
          status: newStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(response.data.message);

      fetchIssues();

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Failed to update status"
      );

    } finally {

      setStatusLoading(null);

    }
  };

  const handleDelete = async (
    issueId
  ) => {
    const confirmDelete =
      window.confirm(
        "Delete this issue?"
      );

    if (!confirmDelete) return;

    try {
      setDeleteLoading(issueId);

      const response = await api.delete(
        `/admin/issues/${issueId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(response.data.message);

      fetchIssues();

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Failed to delete issue"
      );

    } finally {

      setDeleteLoading(null);

    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      <div className="max-w-7xl mx-auto px-6 py-10">

        <h1 className="text-4xl font-bold">
          All Issues
        </h1>

        <p className="text-slate-400 mt-3 mb-8">
          Manage, monitor and update all
          reported community issues.
        </p>

        {/* Filters */}

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-8">

          <div className="grid md:grid-cols-3 gap-4">

            <input
              type="text"
              placeholder="Search issue title..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="
              bg-slate-950
              border
              border-slate-800
              rounded-xl
              p-3
              focus:outline-none
              focus:border-indigo-500
            "
            />

            <select
              value={status}
              onChange={(e) =>
                setStatus(e.target.value)
              }
              className="
              bg-slate-950
              border
              border-slate-800
              rounded-xl
              p-3
              focus:outline-none
              focus:border-indigo-500
            "
            >
              <option value="">
                All Status
              </option>

              <option value="Pending">
                Pending
              </option>

              <option value="In Progress">
                In Progress
              </option>

              <option value="Resolved">
                Resolved
              </option>

            </select>

            <select
              value={category}
              onChange={(e) =>
                setCategory(e.target.value)
              }
              className="
              bg-slate-950
              border
              border-slate-800
              rounded-xl
              p-3
              focus:outline-none
              focus:border-indigo-500
            "
            >
              <option value="">
                All Categories
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

          <button
            onClick={fetchIssues}
            disabled={loading}
            className="
            mt-5
            bg-indigo-600
            hover:bg-indigo-700
            disabled:opacity-50
            disabled:cursor-not-allowed
            px-6
            py-3
            rounded-xl
            font-medium
            transition
          "
          >
            {loading
              ? "Loading..."
              : "Apply Filters"}
          </button>

        </div>

        {/* Issues Grid */}

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

          {issues.map((issue) => (

            <div
              key={issue._id}
              className="
              bg-slate-900
              border
              border-slate-800
              rounded-2xl
              overflow-hidden
              hover:border-indigo-500
              hover:-translate-y-1
              hover:shadow-xl
              hover:shadow-indigo-500/10
              transition-all
            "
            >

              {issue.image && (
                <img
                  src={issue.image}
                  alt={issue.title}
                  className="w-full h-52 object-cover"
                />
              )}

              <div className="p-6">

                <div className="flex justify-between items-start mb-4">

                  <h2 className="text-xl font-bold">
                    {issue.title}
                  </h2>

                  <StatusBadge
                    status={issue.status}
                  />

                </div>

                <p className="text-slate-400 text-sm">
                  {issue.description}
                </p>

                <div className="mt-5 space-y-2">

                  <p className="text-sm">
                    <span className="text-slate-500">
                      Category:
                    </span>{" "}
                    {issue.category}
                  </p>

                  <p className="text-sm">
                    <span className="text-slate-500">
                      Location:
                    </span>{" "}
                    {issue.location}
                  </p>

                  <p className="text-sm">
                    <span className="text-slate-500">
                      Reported By:
                    </span>{" "}
                    {issue.reportedBy?.name}
                  </p>

                  <p className="text-sm">
                    <span className="text-slate-500">
                      Email:
                    </span>{" "}
                    {issue.reportedBy?.email}
                  </p>

                </div>

                <div className="mt-6">

                  <select
                    value={issue.status}
                    disabled={
                      statusLoading === issue._id
                    }
                    onChange={(e) =>
                      updateStatus(
                        issue._id,
                        e.target.value
                      )
                    }
                    className="
                    w-full
                    bg-slate-950
                    border
                    border-slate-800
                    rounded-xl
                    p-3
                    focus:outline-none
                    focus:border-indigo-500
                    disabled:opacity-50
                  "
                  >
                    <option value="Pending">
                      Pending
                    </option>

                    <option value="In Progress">
                      In Progress
                    </option>

                    <option value="Resolved">
                      Resolved
                    </option>

                  </select>

                </div>

                <button
                  onClick={() =>
                    handleDelete(issue._id)
                  }
                  disabled={
                    deleteLoading === issue._id
                  }
                  className="
                  mt-4
                  w-full
                  bg-red-600
                  hover:bg-red-700
                  disabled:opacity-50
                  disabled:cursor-not-allowed
                  py-3
                  rounded-xl
                  transition
                "
                >
                  {deleteLoading === issue._id
                    ? "Deleting..."
                    : "Delete Issue"}
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default AllIssues;