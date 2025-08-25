// src/pages/Produk/ProdukEdit.jsx
import { useEffect, useState } from "react";
import { getProduct, updateProduct } from "../../services/productService";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import BackButton from "../../components/BackBbutton";

export default function ProdukEdit(){
  const { id } = useParams();
  const [form, setForm] = useState({ name:"", price:"", stock:"" });
  const [err, setErr] = useState("");

  const load = async () => {
    try {
      const res = await getProduct(id);
      const p = res.data.data;
      setForm({ name: p.name, price: p.price, stock: p.stock });
    } catch { setErr("Gagal memuat data"); }
  };

  useEffect(()=>{ load(); }, [id]);

  const onChange = (e)=> setForm({...form, [e.target.name]: e.target.value});

  const onSubmit = async (e) => {
    e.preventDefault(); setErr("");
    try {
      await updateProduct(id, { 
        name: form.name, 
        price: Number(form.price), 
        stock: Number(form.stock) 
      });
      location.href = "/products";
    } catch { setErr("Gagal update (cek role/owner)"); }
  };

  return (
    <div>
              <Navbar />
              <BackButton />
      <h2>Edit Produk</h2>
      <form onSubmit={onSubmit}>
        <input name="name" placeholder="Nama" value={form.name} onChange={onChange} /><br/>
        <input name="price" type="number" placeholder="Harga" value={form.price} onChange={onChange} /><br/>
        <input name="stock" type="number" placeholder="Stok" value={form.stock} onChange={onChange} /><br/>
        {err && <small style={{color:"red"}}>{err}</small>}<br/>
        <button type="submit">Update</button>
      </form>
    </div>
  );
}
