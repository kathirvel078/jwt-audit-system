import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token"); //Reads login token from browser

        if (!token) {
          setError("Please login first");
          return;
        }

        const res = await axios.get(
          "http://localhost:3000/api/auth/users",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setUsers(res.data); //upadate on UI

      } catch (err) {
        console.error(err.response?.data);
        setError(err.response?.data?.msg || "Error fetching users");
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="container">
      <h2>Users</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {users.map((u) => (
        <div key={u._id}>
          {u.name} - {u.email} - {u.role}
        </div>
      ))}
    </div>
  );
}

export default Dashboard;