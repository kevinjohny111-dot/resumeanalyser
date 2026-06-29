import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="container">
     <div className="card">
      <h1>Dashboard</h1>

      <button
        onClick={() => navigate("/upload")}
      >
        Upload Resume
      </button>

      <br /><br />

      <button
        onClick={() => navigate("/my-resumes")}
      >
        My Resumes
      </button>

      <br /><br />

     <button
     onClick={() => {
     localStorage.removeItem("token");
     toast.success("Logged out successfully!");

     setTimeout(() => {
      navigate("/");
     }, 1000); // Wait 1 second so the toast is visible
     }}
     >
     Logout
     </button>
     
     </div>
    </div>
  );
}

export default Dashboard;