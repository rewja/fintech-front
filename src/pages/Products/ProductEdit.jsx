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
    <div className="min-h-screen bg-gradient-to-br from-sapphire via-royalblue to-quicksand">
      <Navbar />

      <div className="max-w-lg mx-auto mt-12 p-8 bg-white rounded-2xl shadow-xl">
        <BackButton />
        <h2 className="text-2xl font-bold text-sapphire mb-3">
          Edit Produk
        </h2>
        <div className="h-[3px] w-20 bg-gradient-to-r from-sapphire to-royalblue rounded mb-8" />

        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Nama Produk
            </label>
            <input
              name="name"
              value={form.name}
              onChange={onChange}
              placeholder="Masukkan nama produk"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sapphire focus:border-sapphire transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Harga
            </label>
            <input
              name="price"
              type="number"
              value={form.price}
              onChange={onChange}
              placeholder="Masukkan harga"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sapphire focus:border-sapphire transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Stok
            </label>
            <input
              name="stock"
              type="number"
              value={form.stock}
              onChange={onChange}
              placeholder="Masukkan jumlah stok"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sapphire focus:border-sapphire transition"
            />
          </div>

          {err && (
            <div className="p-3 rounded-lg bg-red-100 text-red-700 text-sm font-medium">
              {err}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-lg font-semibold shadow-md bg-gradient-to-r from-sapphire to-royalblue hover:opacity-90 text-white transition"
          >
            Update Produk
          </button>
        </form>
      </div>
    </div>
  );
}