import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";

function ResumeDetails() {
  const { id } = useParams();
  const [resume, setResume] = useState<any>(null);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const token = localStorage.getItem("token");

const response = await api.get(
  `/resume/${id}`,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
 );

        setResume(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchResume();
  }, [id]);

  if (!resume) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container">
     <div className="card">
      <h1>Resume Details</h1>

      <p>ID: {resume.id}</p>
      <p>Filename: {resume.filename}</p>
      <p>ATS Score: {resume.ats_score}</p>
     </div>
    </div>
  );
}

export default ResumeDetails;