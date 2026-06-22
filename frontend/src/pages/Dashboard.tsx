import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div>
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
          navigate("/");
        }}
      >
        Logout
      </button>
     
    </div>
  );
}

export default Dashboard;