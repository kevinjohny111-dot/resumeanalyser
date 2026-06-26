import { useNavigate } from "react-router-dom";

function BackButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      style={{
        padding: "8px 16px",
        marginBottom: "20px",
        cursor: "pointer",
      }}
    >
      ← Back
    </button>
  );
}

export default BackButton;