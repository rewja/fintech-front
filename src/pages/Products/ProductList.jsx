// src/pages/Produk/ProdukList.jsx
import { useEffect, useState } from "react";
import { deleteProduct, getProducts } from "../../services/productService";
import Navbar from "../../components/Navbar";
import BackButton from "../../components/BackBbutton";

export default function ProdukList(){
  const [items, setItems] = useState([]);
  const [err, setErr] = useState("");

  const load = async () => {
    setErr("");
    try {
      const res = await getProducts();
      setItems(res.data.data || []);
    } catch (e) { setErr("Gagal memuat produk"); }
  };

  useEffect(() => { load(); }, []);

  const onDelete = async (id) => {
    if (!confirm("Hapus produk ini?")) return;
    try { await deleteProduct(id); load(); } 
    catch { alert("Gagal hapus (cek role/owner)"); }
  };

  return (
    <div>
              <Navbar />
              <BackButton />
      <h2>Produk</h2>
      <a href="/products/create">+ Tambah Produk</a>
      {err && <p style={{color:"red"}}>{err}</p>}
      <table border="1" cellPadding="6">
        <thead><tr><th>ID</th><th>Nama</th><th>Harga</th><th>Stok</th><th>Aksi</th></tr></thead>
        <tbody>
          {items.map(p=>(
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>{p.price}</td>
              <td>{p.stock}</td>
              <td>
                <a href={`/products/edit/${p.id}`}>Edit</a>{" "} |{" "}
                <button onClick={()=>onDelete(p.id)}>Hapus</button>
              </td>
            </tr>
          ))}
          {items.length===0 && <tr><td colSpan="5">Belum ada produk</td></tr>}
        </tbody>
      </table>
    </div>
  );
}
