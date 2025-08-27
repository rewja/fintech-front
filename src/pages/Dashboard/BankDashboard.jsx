// src/pages/Dashboard/BankDashboard.jsx

// import BackButton from "../../components/BackBbutton";
import Navbar from "../../components/Navbar";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

export default function BankDashboard() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-sapphire via-royalblue to-quicksand">
      <Navbar />

      <div className="max-w-4xl mx-auto py-12 px-6">
        {/* Welcome Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-3xl font-bold text-sapphire mb-2">
            Selamat Datang, {user?.name}!
          </h2>
          <p className="text-gray-600 mb-4">Role: <span className="font-medium">{user?.role}</span></p>
          <p className="text-gray-500">
            Dari dashboard bank, kamu bisa mengelola saldo, melihat laporan harian, dan memantau aktivitas transaksi dengan mudah.
          </p>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            to="/balance/manage"
            className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition cursor-pointer"
          >
            <span className="text-xl font-semibold text-gray-700 mb-2">Kelola Saldo</span>
            <p className="text-gray-400 text-sm text-center">Tambahkan, tarik, atau kelola saldo pengguna dengan aman.</p>
          </Link>

          <Link
            to="/reports/daily"
            className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition cursor-pointer"
          >
            <span className="text-xl font-semibold text-gray-700 mb-2">Report Harian</span>
            <p className="text-gray-400 text-sm text-center">Lihat ringkasan transaksi dan laporan harian dengan cepat.</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
