// src/components/Navbar.jsx
import { Link, useNavigate } from "react-router-dom";
import { removeToken } from "../utils/auth";
import { useEffect, useState } from "react";
import { getMe } from "../services/authService";

export default function Navbar() {
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const res = await getMe();
        setRole(res.data.role);
      } catch {
        setRole("");
      }
    })();
  }, []);

  const handleLogout = () => {
    removeToken();
    navigate("/login");
  };

  return (
    <nav style={{ background: "#eee", padding: "10px", marginBottom: "20px" }}>
      {/* Dashboard sesuai role */}
      {role === "admin" && <Link to="/admin/dashboard">Dashboard</Link>}
      {role === "bank" && <Link to="/bank/dashboard">Dashboard</Link>}
      {(role === "canteen" || role === "bc") && (
        <Link to="/canteen/dashboard">Dashboard</Link>
      )}
      {role === "student" && <Link to="/student/dashboard">Dashboard</Link>}

      {/* Common links */}
      {" | "}
      <Link to="/transactions">Transaksi</Link>{" | "}
      <Link to="/reports">Report</Link>{" | "}
      <Link to="/balance">Saldo</Link>

      {/* khusus canteen/bc/admin */}
      {(role === "canteen" || role === "bc" || role === "admin") && (
        <>
          {" | "}
          <Link to="/products">Produk</Link>
        </>
      )}

      <button onClick={handleLogout} style={{ marginLeft: "20px" }}>
        Logout
      </button>
    </nav>
  );
}
