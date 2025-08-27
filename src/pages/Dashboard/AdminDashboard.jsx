// src/pages/Dashboard/AdminDashboard.jsx
import BackButton from "../../components/BackBbutton";
import Navbar from "../../components/Navbar";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Tombol kembali */}
        <BackButton />

        {/* Judul */}
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Admin Dashboard
        </h2>
        <p className="text-gray-600 mb-6">
          Halo, <span className="font-semibold">{user?.name}</span>{" "}
          (role: <span className="italic">{user?.role}</span>)
        </p>

        {/* Menu navigasi */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Link
            to="/reports"
            className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg hover:bg-indigo-50 transition"
          >
            <h3 className="text-lg font-semibold text-indigo-700 mb-2">📑 Reports</h3>
            <p className="text-sm text-gray-600">Lihat semua laporan sistem.</p>
          </Link>

          <Link
            to="/transactions"
            className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg hover:bg-blue-50 transition"
          >
            <h3 className="text-lg font-semibold text-blue-700 mb-2">💸 Transaksi</h3>
            <p className="text-sm text-gray-600">Kelola transaksi pengguna.</p>
          </Link>

          <Link
            to="/products"
            className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg hover:bg-green-50 transition"
          >
            <h3 className="text-lg font-semibold text-green-700 mb-2">🛒 Produk</h3>
            <p className="text-sm text-gray-600">Atur data produk kantin.</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
