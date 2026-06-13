import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import ReportIssue from "./pages/ReportIssue";
import MyIssues from "./pages/MyIssues";
import IssueDetails from "./pages/IssueDetails";


function App() {
  return (
    <>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route path="*" element={<NotFound />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/report-issue"
        element={
          <ProtectedRoute>
            <ReportIssue/>
          </ProtectedRoute>
        }
      />
      <Route
        path="/my-issues"
        element={
          <ProtectedRoute>
            <MyIssues/>
          </ProtectedRoute>
        }
      />
      <Route
        path="/issues/:id"
        element={
          <ProtectedRoute>
            <IssueDetails/>
          </ProtectedRoute>
        }
      />
    </Routes>
    </>
  );
}

export default App;