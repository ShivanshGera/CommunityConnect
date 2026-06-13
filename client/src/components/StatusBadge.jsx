function StatusBadge({ status }) {
  let bgColor = "bg-yellow-500";

  if (status === "In Progress") {
    bgColor = "bg-blue-500";
  }

  if (status === "Resolved") {
    bgColor = "bg-green-500";
  }

  return (
    <span
      className={`${bgColor} text-white px-3 py-1 rounded`}
    >
      {status}
    </span>
  );
}

export default StatusBadge;