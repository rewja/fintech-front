// src/pages/Dashboard/CanteenDashboard.jsx

import Navbar from "../../components/Navbar";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { ShoppingBag, Receipt, BarChart3 } from "lucide-react";

export default function CanteenDashboard() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-sapphire via-royalblue to-quicksand">
      <Navbar />

      <div className="max-w-6xl mx-auto p-6">
        <h2 className="text-3xl font-bold text-white mb-6">
          Canteen / BC Dashboard
        </h2>

        {/* Card Info User */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 flex flex-col sm:flex-row sm:items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-sapphire mb-2">
              Halo, {user?.name}
            </h3>
            <p className="text-gray-600">
              Role: <span className="font-medium">{user?.role}</span>
            </p>
          </div>
          <div className="mt-4 sm:mt-0 text-right text-gray-500 text-sm">
            Selamat datang di panel manajemen kantin ✨
          </div>
        </div>

        {/* Cards Menu */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Produk */}
          <Link
            to="/products"
            className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-start hover:shadow-xl transition"
          >
            <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-sapphire text-white mb-4">
              <ShoppingBag size={28} />
            </div>
            <h3 className="text-lg font-semibold text-sapphire mb-1">
              Produk
            </h3>
            <p className="text-gray-600">
              Kelola daftar produk kantin dengan mudah.
            </p>
          </Link>

          {/* Transaksi */}
          <Link
            to="/transactions"
            className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-start hover:shadow-xl transition"
          >
            <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-sapphire text-white mb-4">
              <Receipt size={28} />
            </div>
            <h3 className="text-lg font-semibold text-sapphire mb-1">
              Transaksi
            </h3>
            <p className="text-gray-600">
              Catat dan pantau transaksi harian.
            </p>
          </Link>

          {/* Report Harian */}
          <Link
            to="/reports/daily"
            className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-start hover:shadow-xl transition"
          >
            <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-sapphire text-white mb-4">
              <BarChart3 size={28} />
            </div>
            <h3 className="text-lg font-semibold text-sapphire mb-1">
              Report Harian
            </h3>
            <p className="text-gray-600">
              Lihat laporan pemasukan harian secara cepat.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
