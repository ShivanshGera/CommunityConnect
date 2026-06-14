import { useEffect, useState } from "react";
import {
  useParams,
  useNavigate,
  Link,
} from "react-router-dom";

import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import StatusBadge from "../components/StatusBadge";
import toast from "react-hot-toast";

function IssueDetails() {
  const { id } = useParams();

  const navigate = useNavigate();

  const { token } = useAuth();

  const [issue, setIssue] = useState(null);
  const [deleteLoading, setDeleteLoading] =
    useState(false);

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

      setIssue(response.data.issue);

    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this issue?"
    );

    if (!confirmDelete) return;

    try {
      setDeleteLoading(true);

      const response = await api.delete(
        `/issues/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(response.data.message);

      navigate("/my-issues");

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Failed to delete issue"
      );

    } finally {

      setDeleteLoading(false);

    }
  };

  if (!issue) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      <div className="max-w-5xl mx-auto px-6 py-10">

        <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden">

          {issue.image && (
            <img
              src={issue.image}
              alt={issue.title}
              className="w-full h-[400px] object-cover"
            />
          )}

          <div className="p-8">

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

              <h1 className="text-4xl font-bold">
                {issue.title}
              </h1>

              <StatusBadge
                status={issue.status}
              />

            </div>

            <p className="mt-8 text-slate-300 leading-8 text-lg">
              {issue.description}
            </p>

            <div className="grid md:grid-cols-3 gap-6 mt-10">

              <div className="bg-slate-950 border border-slate-800 rounded-xl p-5">

                <p className="text-slate-500 text-sm">
                  Category
                </p>

                <p className="mt-2 font-semibold">
                  {issue.category}
                </p>

              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-xl p-5">

                <p className="text-slate-500 text-sm">
                  Location
                </p>

                <p className="mt-2 font-semibold">
                  {issue.location}
                </p>

              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-xl p-5">

                <p className="text-slate-500 text-sm">
                  Reported On
                </p>

                <p className="mt-2 font-semibold">
                  {new Date(
                    issue.createdAt
                  ).toLocaleDateString()}
                </p>

              </div>

            </div>

            {issue.status === "Pending" && (
              <div className="mt-10 flex flex-wrap gap-4">

                <Link
                  to={`/edit-issue/${issue._id}`}
                  className="
                  bg-indigo-600
                  hover:bg-indigo-700
                  px-6
                  py-3
                  rounded-xl
                  font-medium
                  transition
                "
                >
                  Edit Issue
                </Link>

                <button
                  onClick={handleDelete}
                  disabled={deleteLoading}
                  className="
                  bg-red-600
                  hover:bg-red-700
                  disabled:opacity-50
                  disabled:cursor-not-allowed
                  px-6
                  py-3
                  rounded-xl
                  font-medium
                  transition
                "
                >
                  {deleteLoading
                    ? "Deleting..."
                    : "Delete Issue"}
                </button>

              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}

export default IssueDetails;