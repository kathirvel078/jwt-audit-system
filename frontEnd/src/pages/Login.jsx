import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";  //redirect to another page

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await axios.post("http://localhost:3000/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);  //Saves JWT token in browser

      alert("Login Success");
      navigate("/dashboard");  

    } catch (err) {
      console.error(err.response?.data);
      setError(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={login}>Login</button>
    </div>
  );
}

export default Login;