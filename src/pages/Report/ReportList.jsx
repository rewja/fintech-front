import { useEffect, useState } from "react";
import { getProducts, deleteProduct } from "../../services/productService";
import Navbar from "../../components/Navbar";
import BackButton from "../../components/BackBbutton";

export default function ProdukList() {
  const [produk, setProduk] = useState([]);
  const [err, setErr] = useState("");

  const loadData = async () => {
    try {
      const res = await getProducts();
      setProduk(res.data.data || []);
    } catch {
      setErr("Gagal memuat produk");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin hapus produk ini?")) return;
    try {
      await deleteProduct(id);
      loadData();
    } catch {
      alert("Gagal menghapus produk");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <Navbar />
      <BackButton />
      <h2>Produk Saya</h2>
      <a href="/produk/create">+ Tambah Produk</a>
      {err && <p style={{ color: "red" }}>{err}</p>}
      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>Nama</th>
            <th>Harga</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {produk.map((p) => (
            <tr key={p.id}>
              <td>{p.nama}</td>
              <td>{p.harga}</td>
              <td>
                <a href={`/produk/edit/${p.id}`}>Edit</a> |{" "}
                <button onClick={() => handleDelete(p.id)}>Hapus</button>
              </td>
            </tr>
          ))}
          {produk.length === 0 && (
            <tr>
              <td colSpan="3">Belum ada produk</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
