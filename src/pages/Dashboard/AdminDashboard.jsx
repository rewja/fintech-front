// src/pages/Dashboard/AdminDashboard.jsx
import Navbar from "../../components/Navbar";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-sapphire via-royalblue to-quicksand">
      <Navbar />

      <div className="max-w-5xl mx-auto py-12 px-6">
        {/* Welcome Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-3xl font-bold text-sapphire mb-2">
            Selamat Datang, {user?.name}!
          </h2>
          <p className="text-gray-600 mb-4">
            Role: <span className="font-medium">{user?.role}</span>
          </p>
          <p className="text-gray-500">
            Dari dashboard admin, kamu bisa mengelola laporan, transaksi, produk, dan pengguna sistem.
          </p>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link
            to="/users"
            className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition cursor-pointer"
          >
            <span className="text-xl font-semibold text-gray-700 mb-2">Manage Users</span>
            <p className="text-gray-400 text-sm text-center">
              Tambah, edit, atau hapus akun pengguna sistem.
            </p>
          </Link>

          <Link
            to="/reports"
            className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition cursor-pointer"
          >
            <span className="text-xl font-semibold text-gray-700 mb-2">Reports</span>
            <p className="text-gray-400 text-sm text-center">
              Lihat laporan transaksi dan aktivitas sistem secara keseluruhan.
            </p>
          </Link>

          <Link
            to="/transactions"
            className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition cursor-pointer"
          >
            <span className="text-xl font-semibold text-gray-700 mb-2">Transaksi</span>
            <p className="text-gray-400 text-sm text-center">
              Pantau dan kelola semua transaksi yang terjadi di sistem.
            </p>
 
          </Link>

          <Link
            to="/products"
            className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition cursor-pointer"
          >
            <span className="text-xl font-semibold text-gray-700 mb-2">Produk</span>
            <p className="text-gray-400 text-sm text-center">
              Kelola produk yang tersedia untuk semua user.
            </p>
          
          </Link>
        </div>
      </div>
    </div>
  );
}
