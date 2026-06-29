
import { useState } from "react";
import api from "../api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const formData = new URLSearchParams();

      formData.append("username", email);
      formData.append("password", password);

      const response = await api.post(
        "/login",
        formData,
        {
          headers: {
            "Content-Type":
              "application/x-www-form-urlencoded",
          },
        }
      );

      if (response.data.access_token) {
        localStorage.setItem(
          "token",
          response.data.access_token
        );

        toast.success("Login successful!");

        navigate("/dashboard");
      } else {
        toast.error(
          response.data.message ||
          "Invalid email or password"
        );
      }

    } catch (error) {
      console.error(error);
      toast.error("Login failed");
    }
  };

  return (
    <div className="container">
      <div className="card">
      <h1>RESUME ANALYZER</h1>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
      />

      <br />
      <br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
      />

      <br />
      <br />

      <button onClick={handleLogin}>
        Login
      </button>

      <button
        onClick={() => navigate("/register")}
      >
        Sign Up
      </button>
     </div>
    </div>
  );
}

export default Login;
