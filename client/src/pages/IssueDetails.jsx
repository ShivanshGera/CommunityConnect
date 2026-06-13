import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import StatusBadge from "../components/StatusBadge";

function IssueDetails() {
  const { id } = useParams();

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

    </div>
  );
}

export default IssueDetails;