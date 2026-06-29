import { Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Dashboard from "./pages/Dashboard";
import UploadResume from "./pages/UploadResume";
import MyResumes from "./pages/MyResumes";
import ProtectedRoute from "./components/ProtectedRoute";
import ResumeDetails from "./pages/ResumeDetails";
import Register from "./pages/Register";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/upload"
        element={
          <ProtectedRoute>
            <UploadResume />
          </ProtectedRoute>
        }
      />
      <Route
        path="/my-resumes"
        element={
          <ProtectedRoute>
            <MyResumes />
          </ProtectedRoute>
        }
      />
      <Route
        path="/resume/:id"
        element={
          <ProtectedRoute>
            <ResumeDetails />
          </ProtectedRoute>
        }
      />
      <Route
       path="/register"
        element={<Register />}
        />
      
    </Routes>
    </>
  );
}


export default App;