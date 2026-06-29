import { useState } from "react";
import api from "../api";
import BackButton from "../components/BackButton";
import { toast } from "react-toastify";
function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      await api.post("/register", {
        name,
        email,
        password,
      });

      toast.success("User created!");
    } catch (error) {
      console.error(error);
      toast.error("Registration failed");
    }
  };

 return (
  <div className="container">
    <div className="card">

      <BackButton />

      <h1>Register</h1>

      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br /><br />

      <input
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

      <button onClick={handleRegister}>
        Register
      </button>

    </div>
  </div>
);

}

export default Register;