import { useState } from "react";
import api from "../api";
import BackButton from "../components/BackButton";
import { toast } from "react-toastify/unstyled";

function UploadResume() {
  const [file, setFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a resume.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("job_description", jobDescription);

    try {
      await api.post("/upload-resume", formData);

      toast.success("Resume uploaded successfully!");
    } catch (error) {
      toast.error("Resume upload failed!");
    }
  };

  // ...
}

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
