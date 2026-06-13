import { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import IssueCard from "../components/IssueCard";

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
          <IssueCard
            key={issue._id}
            issue={issue}
          />
        ))}
      </div>
    </div>
  );
}

export default MyIssues;