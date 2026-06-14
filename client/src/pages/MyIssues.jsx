import { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import IssueCard from "../components/IssueCard";

function MyIssues() {
  const { token } = useAuth();

  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchIssues();
  }, []);

  const fetchIssues = async () => {
    try {
      setLoading(true);

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

    } finally {

      setLoading(false);

    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">

        <div className="text-center">

          <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto"></div>

          <p className="mt-4 text-slate-400 text-lg">
            Loading Issues...
          </p>

        </div>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      <div className="max-w-7xl mx-auto px-6 py-10">

        <h1 className="text-4xl font-bold mb-2">
          My Issues
        </h1>

        <p className="text-slate-400 mb-8">
          View and manage all issues reported by you.
        </p>

        {issues.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-10 text-center">

            <h2 className="text-2xl font-semibold">
              No Issues Found
            </h2>

            <p className="text-slate-400 mt-3">
              Start by reporting your first issue.
            </p>

          </div>
        ) : (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

            {issues.map((issue) => (
              <IssueCard
                key={issue._id}
                issue={issue}
              />
            ))}

          </div>
        )}

      </div>

    </div>
  );
}

export default MyIssues;