import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import {
  FaHome,
  FaClipboardList,
  FaExclamationCircle,
  FaChartBar,
  FaSignOutAlt,
} from "react-icons/fa";

function Navbar() {
  const { user, logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-slate-950 border-b border-slate-800 backdrop-blur-sm">

      <div className="max-w-7xl mx-auto px-6">

        <div className="flex justify-between items-center h-16">

          {/* Logo */}

          <Link
            to="/"
            className="text-2xl font-bold text-white tracking-tight"
          >
            Community
            <span className="text-indigo-500">
              Connect
            </span>
          </Link>

          {/* Navigation */}

          <div className="flex items-center gap-3">

            {!user ? (
              <>
                <Link
                  to="/login"
                  className="text-slate-300 hover:text-white transition px-3 py-2"
                >
                  Login
                </Link>

                <Link
                  to="/signup"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/dashboard"
                  className="flex items-center gap-2 text-slate-300 hover:text-white hover:bg-slate-800 px-3 py-2 rounded-lg transition"
                >
                  <FaHome />
                  Dashboard
                </Link>

                {user?.role === "citizen" && (
                  <>
                    <Link
                      to="/report-issue"
                      className="flex items-center gap-2 text-slate-300 hover:text-white hover:bg-slate-800 px-3 py-2 rounded-lg transition"
                    >
                      <FaExclamationCircle />
                      Report Issue
                    </Link>

                    <Link
                      to="/my-issues"
                      className="flex items-center gap-2 text-slate-300 hover:text-white hover:bg-slate-800 px-3 py-2 rounded-lg transition"
                    >
                      <FaClipboardList />
                      My Issues
                    </Link>
                  </>
                )}

                {user?.role === "admin" && (
                  <>
                    <Link
                      to="/admin-dashboard"
                      className="flex items-center gap-2 text-slate-300 hover:text-white hover:bg-slate-800 px-3 py-2 rounded-lg transition"
                    >
                      <FaChartBar />
                      Admin Dashboard
                    </Link>

                    <Link
                      to="/all-issues"
                      className="flex items-center gap-2 text-slate-300 hover:text-white hover:bg-slate-800 px-3 py-2 rounded-lg transition"
                    >
                      <FaClipboardList />
                      All Issues
                    </Link>
                  </>
                )}

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
                >
                  <FaSignOutAlt />
                  Logout
                </button>
              </>
            )}

          </div>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;