// src/pages/Produk/ProdukEdit.jsx
import { useEffect, useState } from "react";
import { getProduct, updateProduct } from "../../services/productService";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import BackButton from "../../components/BackBbutton";

export default function ProdukEdit() {
  const { id } = useParams();
  const [form, setForm] = useState({ name: "", price: "", stock: "" });
  const [err, setErr] = useState("");

  const load = async () => {
    try {
      const res = await getProduct(id);
      const p = res.data.data;
      setForm({ name: p.name, price: p.price, stock: p.stock });
    } catch {
      setErr("Gagal memuat data");
    }
  };

  useEffect(() => {
    load();
  }, [id]);

  const onChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      await updateProduct(id, {
        name: form.name,
        price: Number(form.price),
        stock: Number(form.stock),
      });
      location.href = "/products";
    } catch {
      setErr("Gagal update (cek role/owner)");
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F0E9] text-[#112250]">
      <Navbar />
      <div className="max-w-xl mx-auto mt-12 p-8 bg-white rounded-2xl shadow-sm border border-[#D9CBC2]">
        <BackButton />
        <h2 className="text-2xl font-semibold tracking-tight mb-6">
          Edit Produk
        </h2>
        <div className="h-[2px] w-16 bg-[#E0C58F] rounded mb-8" />

        <form onSubmit={onSubmit} className="space-y-5">
          <input
            name="name"
            placeholder="Nama Produk"
            value={form.name}
            onChange={onChange}
            className="w-full px-4 py-2 rounded-lg border border-[#D9CBC2] bg-white placeholder:text-[#3C507D]/60 focus:outline-none focus:ring-2 focus:ring-[#3C507D] focus:border-[#3C507D] transition"
          />
          <input
            name="price"
            type="number"
            placeholder="Harga"
            value={form.price}
            onChange={onChange}
            className="w-full px-4 py-2 rounded-lg border border-[#D9CBC2] bg-white placeholder:text-[#3C507D]/60 focus:outline-none focus:ring-2 focus:ring-[#3C507D] focus:border-[#3C507D] transition"
          />
          <input
            name="stock"
            type="number"
            placeholder="Stok"
            value={form.stock}
            onChange={onChange}
            className="w-full px-4 py-2 rounded-lg border border-[#D9CBC2] bg-white placeholder:text-[#3C507D]/60 focus:outline-none focus:ring-2 focus:ring-[#3C507D] focus:border-[#3C507D] transition"
          />

          {err && (
            <small className="block text-red-600 font-medium">{err}</small>
          )}

          <button
            type="submit"
            className="w-full py-2.5 px-4 rounded-lg font-medium shadow-sm bg-[#112250] hover:bg-[#3C507D] text-[#F5F0E9] transition"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
}
