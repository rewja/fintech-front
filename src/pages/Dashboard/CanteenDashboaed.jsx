// src/pages/Dashboard/CanteenDashboard.jsx

import Navbar from "../../components/Navbar";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { ShoppingBag, Receipt, BarChart3 } from "lucide-react"; // icons

export default function CanteenDashboard() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-[#F5F0E9] text-[#112250]">
      <Navbar />

      <div className="max-w-6xl mx-auto mt-10 p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-semibold tracking-tight text-[#112250]">
              Canteen / BC Dashboard
            </h2>
          </div>
          <p className="text-[#3C507D]">
            Halo, <span className="font-medium">{user?.name}</span>{" "}
            <span className="text-sm text-[#D9CBC2]">(role: {user?.role})</span>
          </p>
        </div>

        {/* Cards ala Majoo */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Produk */}
          <Link
            to="/products"
            className="p-6 bg-white border border-[#D9CBC2] rounded-2xl shadow-sm hover:shadow-md transition group"
          >
            <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-[#112250] text-[#F5F0E9] group-hover:bg-[#3C507D] mb-4">
              <ShoppingBag size={28} />
            </div>
            <h3 className="text-lg font-semibold text-[#112250] mb-1">
              Produk
            </h3>
            <p className="text-sm text-[#3C507D]">
              Kelola daftar produk kantin dengan mudah.
            </p>
          </Link>

          {/* Transaksi */}
          <Link
            to="/transactions"
            className="p-6 bg-white border border-[#D9CBC2] rounded-2xl shadow-sm hover:shadow-md transition group"
          >
            <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-[#112250] text-[#F5F0E9] group-hover:bg-[#3C507D] mb-4">
              <Receipt size={28} />
            </div>
            <h3 className="text-lg font-semibold text-[#112250] mb-1">
              Transaksi
            </h3>
            <p className="text-sm text-[#3C507D]">
              Catat dan pantau transaksi harian.
            </p>
          </Link>

          {/* Report Harian */}
          <Link
            to="/reports/daily"
            className="p-6 bg-white border border-[#D9CBC2] rounded-2xl shadow-sm hover:shadow-md transition group"
          >
            <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-[#112250] text-[#F5F0E9] group-hover:bg-[#3C507D] mb-4">
              <BarChart3 size={28} />
            </div>
            <h3 className="text-lg font-semibold text-[#112250] mb-1">
              Report Harian
            </h3>
            <p className="text-sm text-[#3C507D]">
              Lihat laporan pemasukan harian secara cepat.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
