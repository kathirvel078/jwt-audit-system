import { useState } from "react";
import axios from "axios";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const register = async () => {
    try {
      await axios.post("http://localhost:3000/api/auth/register", {
        name,
        email,
        password,
      });

      setMsg("Registered Successfully");
    } catch (err) {
      setMsg(err.response?.data?.msg || "Registration failed");
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>

      {msg && <p>{msg}</p>}

      <input
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={register}>Register</button>
    </div>
  );
}

export default Register;