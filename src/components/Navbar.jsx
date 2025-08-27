// src/components/Navbar.jsx
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { dashboardByRole } from "../utils/auth";
import { LogOut } from "lucide-react";

export default function Navbar() {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) return null;

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const role = user?.role;
  const homeLink = dashboardByRole(role);

  return (
    <nav className="bg-white shadow-lg px-8 py-4 flex items-center justify-between sticky top-0 z-50 border-b border-gray-200">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <span className="text-2xl font-extrabold text-gray-800 tracking-tight">
          Fintech
        </span>
        <span className="text-gray-400 text-sm">v1.0</span>
      </div>

      {/* Menu */}
      <div className="flex items-center gap-8 text-gray-600 font-medium">
        {role && (
          <Link
            to={homeLink}
            className="px-3 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition duration-200"
          >
            Home
          </Link>
        )}

        <Link
          to="/transactions"
          className="px-3 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition duration-200"
        >
          Transaksi
        </Link>

        <Link
          to="/reports"
          className="px-3 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition duration-200"
        >
          Report
        </Link>

        <Link
          to="/balance"
          className="px-3 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition duration-200"
        >
          Saldo
        </Link>

        {(role === "canteen" || role === "bc" || role === "admin") && (
          <Link
            to="/products"
            className="px-3 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition duration-200"
          >
            Produk
          </Link>
        )}

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-1 px-3 py-2 rounded-lg text-red-500 border border-red-200 hover:bg-red-50 hover:border-red-300 hover:text-red-600 transition duration-200 font-semibold"
        >
          <LogOut size={18} /> Logout
        </button>
      </div>
    </nav>
  );
}
