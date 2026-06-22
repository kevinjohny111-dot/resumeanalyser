import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = async () => {
  console.log("Login button clicked");

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
    localStorage.setItem(
  "token",
  response.data.access_token
);

navigate("/dashboard");
    console.log(response.data);

    localStorage.setItem(
      "token",
      response.data.access_token
    );
    window.location.href = "/dashboard";

    console.log("Token saved");

    console.log(
      localStorage.getItem("token")
    );

  } catch (error) {
    console.error(error);
  }
};

  return (
    <div>
      <h1>Login</h1>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br /><br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

     <button
  onClick={() => {
    alert("Button clicked");
    handleLogin();
  }}
>
  Login
</button>

<button
  onClick={() => navigate("/register")}
>
  Sign Up
</button>
    </div>
  );
}

export default Login;