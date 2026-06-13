import { Link } from "react-router-dom";
import StatusBadge from "./StatusBadge";

function IssueCard({ issue }) {
  return (
    <Link to={`/issues/${issue._id}`}>

      <div
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
        duration-300
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

          <div className="flex justify-between items-start mb-4 gap-4">

            <h2 className="text-xl font-bold text-white">
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

            <p className="text-slate-300 text-sm">
              <span className="text-slate-500">
                Category:
              </span>{" "}
              {issue.category}
            </p>

            <p className="text-slate-300 text-sm">
              <span className="text-slate-500">
                Location:
              </span>{" "}
              {issue.location}
            </p>

          </div>

          <div className="mt-6 pt-4 border-t border-slate-800">

            <span className="text-indigo-400 font-medium">
              View Details →
            </span>

          </div>

        </div>

      </div>

    </Link>
  );
}

export default IssueCard;