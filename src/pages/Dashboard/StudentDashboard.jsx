// src/pages/Dashboard/StudentDashboard.jsx
import BackButton from "../../components/BackBbutton";
import Navbar from "../../components/Navbar";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

export default function StudentDashboard() {
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
          Student Dashboard
        </h2>
        <p className="text-gray-600 mb-6">
          Halo, <span className="font-semibold">{user?.name}</span>{" "}
          (role: <span className="italic">{user?.role}</span>) |{" "}
          Saldo:{" "}
          <span className="font-bold text-green-600">
            Rp {user?.balance?.toLocaleString("id-ID") ?? 0}
          </span>
        </p>

        {/* Menu navigasi */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Link
            to="/balance"
            className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg hover:bg-yellow-50 transition"
          >
            <h3 className="text-lg font-semibold text-yellow-700 mb-2">💰 Saldo Saya</h3>
            <p className="text-sm text-gray-600">Lihat detail saldo kamu.</p>
          </Link>

          <Link
            to="/transactions"
            className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg hover:bg-purple-50 transition"
          >
            <h3 className="text-lg font-semibold text-purple-700 mb-2">📜 Riwayat Transaksi</h3>
            <p className="text-sm text-gray-600">Cek semua aktivitas transaksi.</p>
          </Link>

          <Link
            to="/transactions/create"
            className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg hover:bg-blue-50 transition"
          >
            <h3 className="text-lg font-semibold text-blue-700 mb-2">➕ Buat Transaksi</h3>
            <p className="text-sm text-gray-600">Lakukan transaksi baru.</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
