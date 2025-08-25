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
    <div>
      <Navbar />
      <BackButton />
      <h2>Tambah Produk</h2>
      <form onSubmit={onSubmit}>
        <input name="name" placeholder="Nama" onChange={onChange} />
        <br />
        <input
          name="price"
          type="number"
          placeholder="Harga"
          onChange={onChange}
        />
        <br />
        <input
          name="stock"
          type="number"
          placeholder="Stok"
          onChange={onChange}
        />
        <br />
        {err && <small style={{ color: "red" }}>{err}</small>}
        <br />
        <button type="submit">Simpan</button>
      </form>
    </div>
  );
}
