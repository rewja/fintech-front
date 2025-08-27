// src/pages/Dashboard/BankDashboard.jsx
// import BackButton from "../../components/BackBbutton";
import Navbar from "../../components/Navbar";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

export default function BankDashboard() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Tombol kembali */}
        {/* Judul */}
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Bank Dashboard</h2>
        <p className="text-gray-600 mb-6">
          Halo, <span className="font-semibold">{user?.name}</span> 
          {" "} (role: <span className="italic">{user?.role}</span>)
        </p>

        {/* Menu navigasi */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Link
            to="/balance/manage"
            className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg hover:bg-blue-50 transition"
          >
            <h3 className="text-lg font-semibold text-blue-700 mb-2">
              💳 Kelola Saldo
            </h3>
            <p className="text-sm text-gray-600">
              Atur saldo siswa dan transaksi bank.
            </p>
          </Link>

          <Link
            to="/reports/daily"
            className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg hover:bg-green-50 transition"
          >
            <h3 className="text-lg font-semibold text-green-700 mb-2">
              📊 Report Harian
            </h3>
            <p className="text-sm text-gray-600">
              Lihat ringkasan laporan transaksi harian.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
