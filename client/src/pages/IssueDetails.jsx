import { useEffect, useState } from "react";
import {
  useParams,
  useNavigate,
  Link,
} from "react-router-dom";

import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import StatusBadge from "../components/StatusBadge";

function IssueDetails() {
  const { id } = useParams();

  const navigate = useNavigate();

  const { token } = useAuth();

  const [issue, setIssue] = useState(null);

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
      const response = await api.delete(
        `/issues/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(response.data.message);

      navigate("/my-issues");

    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Failed to delete issue"
      );
    }
  };

  if (!issue) {
    return (
      <div className="p-10 text-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">

      <h1 className="text-4xl font-bold">
        {issue.title}
      </h1>

      <div className="mt-4">
        <StatusBadge status={issue.status} />
      </div>

      <p className="mt-6 text-lg">
        {issue.description}
      </p>

      <div className="mt-6 space-y-2">

        <p>
          <strong>Category:</strong>{" "}
          {issue.category}
        </p>

        <p>
          <strong>Location:</strong>{" "}
          {issue.location}
        </p>

        <p>
          <strong>Reported On:</strong>{" "}
          {new Date(
            issue.createdAt
          ).toLocaleDateString()}
        </p>

      </div>

      {issue.image && (
        <img
          src={issue.image}
          alt={issue.title}
          className="w-full max-w-lg mt-6 rounded-lg shadow"
        />
      )}

      {issue.status === "Pending" && (
        <div className="mt-6 flex gap-4">

          <Link
            to={`/edit-issue/${issue._id}`}
            className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
          >
            Edit Issue
          </Link>

          <button
            onClick={handleDelete}
            className="bg-red-600 text-white px-5 py-2 rounded hover:bg-red-700"
          >
            Delete Issue
          </button>

        </div>
      )}

    </div>
  );
}

export default IssueDetails;