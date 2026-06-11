import { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

function MyIssues() {
  const { token } = useAuth();

  const [issues, setIssues] = useState([]);

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

  return (
    <div className="max-w-6xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-6">
        My Issues
      </h1>

      <div className="grid gap-4">

        {issues.map((issue) => (
          <div
            key={issue._id}
            className="border p-4 rounded shadow"
          >
            <h2 className="text-xl font-bold">
              {issue.title}
            </h2>

            <p>{issue.description}</p>

            <p>
              Category: {issue.category}
            </p>

            <p>
              Status: {issue.status}
            </p>

            <p>
              Location: {issue.location}
            </p>

            {issue.image && (
              <img
                src={issue.image}
                alt={issue.title}
                className="w-40 mt-3 rounded"
              />
            )}
          </div>
        ))}

      </div>
    </div>
  );
}

export default MyIssues;