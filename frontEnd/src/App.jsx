import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AuditLogs from "./pages/AuditLogs";
import "./styles/style.css";

function App() {
  return (
    <BrowserRouter>
      <div className="nav">
        <Link to="/">Login</Link>
        <Link to="/register">Register</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/logs">Audit Logs</Link>
      </div>

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/logs" element={<AuditLogs />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;