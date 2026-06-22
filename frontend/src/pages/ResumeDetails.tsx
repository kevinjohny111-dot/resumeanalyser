import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";

function ResumeDetails() {
  const { id } = useParams();
  const [resume, setResume] = useState<any>(null);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const response = await api.get(
          `/resume/${id}`
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
    <div>
      <h1>Resume Details</h1>

      <p>ID: {resume.id}</p>
      <p>Filename: {resume.filename}</p>
      <p>ATS Score: {resume.ats_score}</p>
    </div>
  );
}

export default ResumeDetails;