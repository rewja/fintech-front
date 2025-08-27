// src/pages/Transaksi/TransaksiList.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTransactions } from "../../services/transactionService";
import { formatDateTime } from "../../utils/formatDate";
import Navbar from "../../components/Navbar";
import BackButton from "../../components/BackBbutton";
import { PlusCircle } from "lucide-react";

export default function TransaksiList() {
  const [items, setItems] = useState([]);
  const [err, setErr] = useState("");

  const load = async () => {
    setErr("");
    try {
      const res = await getTransactions();
      setItems(res.data.data || []);
    } catch {
      setErr("Gagal memuat transaksi");
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-sapphire via-royalblue to-quicksand">
      <Navbar />

      <div className="flex justify-center py-10 px-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-5xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-sapphire">Daftar Transaksi</h2>
              <p className="text-gray-500 text-sm">Semua transaksi yang tersedia</p>
            </div>
            <Link
              to="/transactions/create"
              className="flex items-center gap-2 bg-sapphire hover:bg-royalblue text-white px-4 py-2 rounded-lg shadow-md transition"
            >
              <PlusCircle size={18} />
              Buat Transaksi
            </Link>
          </div>

          {/* Error */}
          {err && (
            <div className="mb-4 p-3 rounded-lg bg-red-100 text-red-700 text-sm">
              {err}
            </div>
          )}

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-sapphire text-white">
                <tr>
                  <th className="px-4 py-2 text-left">ID</th>
                  <th className="px-4 py-2 text-left">Jenis</th>
                  <th className="px-4 py-2 text-right">Total</th>
                  <th className="px-4 py-2 text-left">Dari</th>
                  <th className="px-4 py-2 text-left">Ke</th>
                  <th className="px-4 py-2 text-left">Waktu</th>
                  <th className="px-4 py-2 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {items.length > 0 ? (
                  items.map((t) => (
                    <tr key={t.id} className="border-t hover:bg-gray-50">
                      <td className="px-4 py-2">{t.id}</td>
                      <td className="px-4 py-2 capitalize">{t.type}</td>
                      <td className="px-4 py-2 text-right">
                        Rp {parseInt(t.amount).toLocaleString()}
                      </td>
                      <td className="px-4 py-2">{t.user?.name}</td>
                      <td className="px-4 py-2">{t.to_user?.name || "-"}</td>
                      <td className="px-4 py-2">{formatDateTime(t.created_at)}</td>
                      <td className="px-4 py-2 text-center">
                        <Link
                          to={`/transactions/${t.id}`}
                          className="text-sapphire font-medium hover:underline"
                        >
                          Detail
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="7"
                      className="px-4 py-6 text-center text-gray-500"
                    >
                      Belum ada transaksi
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
