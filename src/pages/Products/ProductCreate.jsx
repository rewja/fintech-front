// src/pages/Produk/ProdukCreate.jsx
import { useState } from "react";
import { createProduct } from "../../services/productService";
import Navbar from "../../components/Navbar";
import BackButton from "../../components/BackBbutton";

export default function ProdukCreate() {
  const [form, setForm] = useState({ name: "", price: "", stock: "" });
  const [err, setErr] = useState("");
  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      await createProduct({
        ...form,
        price: Number(form.price),
        stock: Number(form.stock),
      });
      location.href = "/products";
    } catch (e) {
      setErr("Gagal buat produk (cek role)");
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F0E9] text-[#112250]">
      <Navbar />
      <div className="max-w-xl mx-auto mt-10 p-8 bg-white rounded-2xl shadow-sm border border-[#D9CBC2]">
        <BackButton />
        <h2 className="text-2xl font-semibold tracking-tight mb-6">
          Tambah Produk
        </h2>

        <div className="h-[2px] w-16 bg-[#E0C58F] rounded mb-8" />

        <form onSubmit={onSubmit} className="space-y-5">
          <input
            name="name"
            placeholder="Nama Produk"
            onChange={onChange}
            className="w-full px-4 py-2 rounded-lg border border-[#D9CBC2] bg-white placeholder:text-[#3C507D]/60 focus:outline-none focus:ring-2 focus:ring-[#3C507D] focus:border-[#3C507D] transition"
          />

          <input
            name="price"
            type="number"
            placeholder="Harga"
            onChange={onChange}
            className="w-full px-4 py-2 rounded-lg border border-[#D9CBC2] bg-white placeholder:text-[#3C507D]/60 focus:outline-none focus:ring-2 focus:ring-[#3C507D] focus:border-[#3C507D] transition"
          />

          <input
            name="stock"
            type="number"
            placeholder="Stok"
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
            Simpan
          </button>
        </form>
      </div>
    </div>
  );
}
