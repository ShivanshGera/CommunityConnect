import { Link } from "react-router-dom";
import StatusBadge from "./StatusBadge";

function IssueCard({ issue }) {
  return (
    <Link to={`/issues/${issue._id}`}>
      <div className="border p-4 rounded shadow hover:shadow-lg transition cursor-pointer">

        <h2 className="text-xl font-bold">
          {issue.title}
        </h2>

        <p className="mt-2">
          {issue.description}
        </p>

        <p className="mt-2">
          Category: {issue.category}
        </p>

        <p className="mt-2">
          Location: {issue.location}
        </p>

        <div className="mt-2">
          <StatusBadge
            status={issue.status}
          />
        </div>

        {issue.image && (
          <img
            src={issue.image}
            alt={issue.title}
            className="w-48 rounded mt-4"
          />
        )}

      </div>
    </Link>
  );
}

export default IssueCard;