import { useEffect, useState } from "react";
import axios from "axios";

function AuditLogs() {
  const [logs, setLogs] = useState([]);   //stores audit logs from backend
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const token = localStorage.getItem("token");   //This token was stored during login

        if (!token) {
          setError("Please login first");
          return;
        }

        const res = await axios.get("http://localhost:4000/logs", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setLogs(res.data);

      } catch (err) {
        console.error(err.response?.data);
        setError(err.response?.data?.msg || "Error fetching logs"); //Show message on UI
      }
    };

    fetchLogs(); //Executes API call when page loads
  }, []);

  return (
    <div className="container">
      <h2>Audit Logs</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {logs.map((log) => (
        <div key={log._id}>
          {log.action} - {log.userId}
        </div>
      ))}
    </div>
  );
}

export default AuditLogs;