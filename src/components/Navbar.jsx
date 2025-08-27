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
    <nav className="bg-gray-900 text-white shadow-md px-6 py-3 flex items-center justify-between">
      {/* Left: Logo */}
      <div className="text-lg font-bold tracking-wide">Fintech App</div>

      {/* Center: Links */}
      <div className="space-x-6">
        {/* Dashboard sesuai role */}
        {role === "admin" && <Link to="/admin/dashboard" className="hover:text-yellow-400">Dashboard</Link>}
        {role === "bank" && <Link to="/bank/dashboard" className="hover:text-yellow-400">Dashboard</Link>}
        {(role === "canteen" || role === "bc") && (
          <Link to="/canteen/dashboard" className="hover:text-yellow-400">Dashboard</Link>
        )}
        {role === "student" && <Link to="/student/dashboard" className="hover:text-yellow-400">Dashboard</Link>}

        {/* Common links */}
        <Link to="/transactions" className="hover:text-yellow-400">Transaksi</Link>
        <Link to="/reports" className="hover:text-yellow-400">Report</Link>
        <Link to="/balance" className="hover:text-yellow-400">Saldo</Link>

        {/* khusus canteen/bc/admin */}
        {(role === "canteen" || role === "bc" || role === "admin") && (
          <Link to="/products" className="hover:text-yellow-400">Produk</Link>
        )}
      </div>

      {/* Right: Logout */}
      <button
        onClick={handleLogout}
        className="bg-red-600 hover:bg-red-700 px-4 py-1 rounded-md font-medium transition"
      >
        Logout
      </button>
    </nav>
  );
}
