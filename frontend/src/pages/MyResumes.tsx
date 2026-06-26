import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import BackButton from "../components/BackButton";


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
  <div className="container">
    <div className="card">

      <BackButton />

      <h1>My Resumes</h1>

      {resumes.map((resume: any) => (
        <div
          key={resume.id}
          className="resume-card"
        >
          <h3>{resume.filename}</h3>

          <p>
            ATS Score: <strong>{resume.ats_score}</strong>
          </p>

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
        </div>
      ))}
      }

    </div>
  </div>
);