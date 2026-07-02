import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";
import BackButton from "../components/BackButton";


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
      <BackButton />
      <h1>Resume Details</h1>

      <p>ID: {resume.id}</p>
      <p>Filename: {resume.filename}</p>
      <p>ATS Score: {resume.ats_score}</p>
      <h3>Skills Found</h3>
    <ul>
   {resume.skills_found.map((skill: string) => (
    <li key={skill}>✅ {skill}</li>
   ))}
    </ul>

  <h3>Missing Skills</h3>
  <ul>
  {resume.missing_skills.map((skill: string) => (
    <li key={skill}>❌ {skill}</li>
  ))}
  </ul>
     </div>
    </div>
  );
}

export default ResumeDetails;