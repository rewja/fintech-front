// src/pages/Produk/ProdukList.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteProduct, getProducts } from "../../services/productService";
import Navbar from "../../components/Navbar";
import BackButton from "../../components/BackButton";

export default function ProdukList() {
  const [items, setItems] = useState([]);
  const [err, setErr] = useState("");

  const load = async () => {
    setErr("");
    try {
      const res = await getProducts();
      setItems(res.data.data || []);
    } catch (e) {
      setErr("Gagal memuat produk");
    }
  };

  useEffect(() => {
    load();
  }, []);

  const onDelete = async (id) => {
    if (!confirm("Hapus produk ini?")) return;
    try {
      await deleteProduct(id);
      load();
    } catch {
      alert("Gagal hapus (cek role/owner)");
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F0E9] text-[#112250]">
      <Navbar />
      <div className="max-w-3xl mx-auto mt-10">
        {/* BackButton */}
        <div className="mb-6">
          <BackButton />
        </div>

        {/* Card utama */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#D9CBC2] p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold tracking-tight">Produk</h2>
            <Link
              to="/products/create"
              className="px-4 py-2 rounded-lg font-medium bg-[#112250] hover:bg-[#3C507D] text-[#F5F0E9] transition"
            >
              + Tambah Produk
            </Link>
          </div>

          {err && <p className="text-red-600 mb-4">{err}</p>}

          <div className="overflow-x-auto rounded-lg border border-[#D9CBC2]">
            <table className="w-full">
              <thead className="bg-[#E0C58F] text-[#112250]">
                <tr>
                  <th className="px-4 py-2 text-left">ID</th>
                  <th className="px-4 py-2 text-left">Nama</th>
                  <th className="px-4 py-2 text-left">Harga</th>
                  <th className="px-4 py-2 text-left">Stok</th>
                  <th className="px-4 py-2 text-left">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {items.map((p) => (
                  <tr
                    key={p.id}
                    className="border-t border-[#D9CBC2] hover:bg-[#F5F0E9]/70"
                  >
                    <td className="px-4 py-2">{p.id}</td>
                    <td className="px-4 py-2">{p.name}</td>
                    <td className="px-4 py-2">
                      Rp{p.price.toLocaleString("id-ID")}
                    </td>
                    <td className="px-4 py-2">{p.stock}</td>
                    <td className="px-4 py-2 space-x-3">
                      <Link
                        to={`/products/edit/${p.id}`}
                        className="px-3 py-1 rounded-md text-sm font-medium bg-[#3C507D] text-white hover:bg-[#112250] transition"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => onDelete(p.id)}
                        className="px-3 py-1 rounded-md text-sm font-medium bg-red-500 text-white hover:bg-red-600 transition"
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}
                {items.length === 0 && (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-4 py-6 text-center text-[#3C507D]/70"
                    >
                      Belum ada produk
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
