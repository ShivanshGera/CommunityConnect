import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-slate-900 text-white px-6 py-4">
      <div className="flex justify-between items-center">

        <Link
          to="/"
          className="text-2xl font-bold"
        >
          CommunityConnect
        </Link>

        <div className="flex gap-4 items-center">

          {!user ? (
            <>
              <Link to="/login">
                Login
              </Link>

              <Link to="/signup">
                Signup
              </Link>
            </>
          ) : (
            <>
              <Link to="/dashboard">
                Dashboard
              </Link>

              {user?.role === "citizen" && (
                <>
                  <Link to="/report-issue">
                    Report Issue
                  </Link>

                  <Link to="/my-issues">
                    My Issues
                  </Link>
                </>
              )}

              {user?.role === "admin" && (
                <>
                  <Link to="/admin-dashboard">
                    Admin Dashboard
                  </Link>

                  <Link to="/all-issues">
                    All Issues
                  </Link>
                </>
              )}

              <button
                onClick={handleLogout}
                className="bg-red-500 px-3 py-1 rounded"
              >
                Logout
              </button>
            </>
          )}

        </div>
      </div>
    </nav>
  );
}

export default Navbar;