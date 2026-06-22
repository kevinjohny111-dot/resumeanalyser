import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

function MyResumes() {
  const navigate = useNavigate();
  const [resumes, setResumes] = useState([]);

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await api.get(
          "/my-resumes",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setResumes(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchResumes();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      const token = localStorage.getItem("token");

      await api.delete(`/resume/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setResumes(
        resumes.filter(
          (resume: any) => resume.id !== id
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>My Resumes</h1>

      {resumes.map((resume: any) => (
        <div key={resume.id}>
          <p>{resume.filename}</p>
          <p>ATS Score: {resume.ats_score}</p>

          <button
            onClick={() => handleDelete(resume.id)}
          >
            Delete
          </button>

         <button
          onClick={() => navigate(`/resume/${resume.id}`)}
            >
         View
        </button> 
          <hr />
        </div>
      ))}
    </div>
  );
}

export default MyResumes;