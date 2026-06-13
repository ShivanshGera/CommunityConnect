import { useEffect, useState } from "react";

import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import StatusBadge from "../components/StatusBadge";

function AllIssues() {
  const { token } = useAuth();

  const [issues, setIssues] = useState([]);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    fetchIssues();
  }, []);

  const fetchIssues = async () => {
    try {
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
    }
  };

  const updateStatus = async (
    issueId,
    newStatus
  ) => {
    try {
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

      alert(response.data.message);

      fetchIssues();

    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Failed to update status"
      );
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
      const response = await api.delete(
        `/admin/issues/${issueId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(response.data.message);

      fetchIssues();

    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Failed to delete issue"
      );
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">

      <h1 className="text-4xl font-bold mb-6">
        All Issues
      </h1>

      <div className="grid md:grid-cols-3 gap-4 mb-6">

        <input
          type="text"
          placeholder="Search Title"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="border p-3 rounded"
        />

        <select
          value={status}
          onChange={(e) =>
            setStatus(e.target.value)
          }
          className="border p-3 rounded"
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
          className="border p-3 rounded"
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
        className="bg-blue-600 text-white px-6 py-2 rounded mb-6"
      >
        Apply Filters
      </button>

      <div className="grid gap-4">

        {issues.map((issue) => (
          <div
            key={issue._id}
            className="border p-4 rounded shadow"
          >
            <h2 className="text-xl font-bold">
              {issue.title}
            </h2>

            <p className="mt-2">
              {issue.description}
            </p>

            <p className="mt-2">
              <strong>Category:</strong>{" "}
              {issue.category}
            </p>

            <p>
              <strong>Location:</strong>{" "}
              {issue.location}
            </p>

            <p>
              <strong>Reported By:</strong>{" "}
              {issue.reportedBy?.name}
            </p>

            <p>
              <strong>Email:</strong>{" "}
              {issue.reportedBy?.email}
            </p>

            <div className="mt-2">
              <StatusBadge
                status={issue.status}
              />
            </div>

            <div className="mt-4 flex gap-3 items-center">

              <select
                defaultValue={issue.status}
                onChange={(e) =>
                  updateStatus(
                    issue._id,
                    e.target.value
                  )
                }
                className="border p-2 rounded"
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

              <button
                onClick={() =>
                  handleDelete(issue._id)
                }
                className="bg-red-600 text-white px-4 py-2 rounded"
              >
                Delete
              </button>

            </div>

            {issue.image && (
              <img
                src={issue.image}
                alt={issue.title}
                className="w-48 rounded mt-4"
              />
            )}

          </div>
        ))}

      </div>

    </div>
  );
}

export default AllIssues;