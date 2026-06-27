import { useState } from "react";
import api from "../api";
import BackButton from "../components/BackButton";

function UploadResume() {
  const [file, setFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();

    formData.append("file", file);
    formData.append(
      "job_description",
      jobDescription
    );

    const token = localStorage.getItem("token");

    try {
      const response = await api.post(
        "/upload-resume",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);
      alert("Resume uploaded!");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <BackButton />
      <h1>Upload Resume</h1>

      <input
        type="file"
        accept=".pdf"
        onChange={(e) => {
          if (e.target.files) {
            setFile(e.target.files[0]);
          }
        }}
      />

      <br /><br />

      <textarea
        placeholder="Paste Job Description Here"
        rows={10}
        cols={50}
        value={jobDescription}
        onChange={(e) =>
          setJobDescription(e.target.value)
        }
      />

      <br /><br />

      <button onClick={handleUpload}>
        Upload
      </button>
    </div>
  );
}

export default UploadResume;
