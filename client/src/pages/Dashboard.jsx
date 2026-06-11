import { useAuth } from "../context/AuthContext";

function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold">
        Dashboard
      </h1>

      <p className="mt-4">
        Welcome, {user?.name}
      </p>

      <p>Email: {user?.email}</p>

      <p>Role: {user?.role}</p>
    </div>
  );
}

export default Dashboard;