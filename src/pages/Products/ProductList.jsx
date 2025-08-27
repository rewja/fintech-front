// src/pages/Produk/ProdukList.jsx
import { useEffect, useState } from "react";
import { deleteProduct, getProducts } from "../../services/productService";
import Navbar from "../../components/Navbar";
import BackButton from "../../components/BackBbutton";

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
      <div className="max-w-5xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-sm border border-[#D9CBC2]">
        
        {/* BackButton pindah ke atas */}
        <div className="mb-6">
          <BackButton />
        </div>

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold tracking-tight">Produk</h2>
          <a
            href="/products/create"
            className="px-4 py-2 rounded-lg font-medium bg-[#112250] hover:bg-[#3C507D] text-[#F5F0E9] transition"
          >
            + Tambah Produk
          </a>
        </div>

        {err && <p className="text-red-600 mb-4">{err}</p>}

        <div className="overflow-x-auto">
          <table className="w-full border border-[#D9CBC2] rounded-lg overflow-hidden">
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
                  <td className="px-4 py-2">{p.price}</td>
                  <td className="px-4 py-2">{p.stock}</td>
                  <td className="px-4 py-2 space-x-3">
                    <a
                      href={`/products/edit/${p.id}`}
                      className="text-[#3C507D] hover:underline"
                    >
                      Edit
                    </a>
                    <button
                      onClick={() => onDelete(p.id)}
                      className="text-red-600 hover:underline"
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
  );
}
