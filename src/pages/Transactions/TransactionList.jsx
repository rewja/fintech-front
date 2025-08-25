// src/pages/Transaksi/TransaksiList.jsx
import { useEffect, useState } from "react";
import { getTransactions } from "../../services/transactionService";
import { formatDateTime } from "../../utils/formatDate";
import Navbar from "../../components/Navbar";
import BackButton from "../../components/BackBbutton";

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
    <div>
      <Navbar />
      <BackButton />
      <h2>Transaksi</h2>
      <a href="/transactions/create">+ Buat Transaksi</a>
      {err && <p style={{ color: "red" }}>{err}</p>}
      <table border="1" cellPadding="6">
        <thead>
          <tr>
            <th>ID</th>
            <th>Jenis</th>
            <th>Total</th>
            <th>Dari</th>
            <th>Ke</th>
            <th>Waktu</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {items.map((t) => (
            <tr key={t.id}>
              <td>{t.id}</td>
              <td>{t.type}</td>
              <td>{t.amount}</td>
              <td>{t.user?.name}</td>
              <td>{t.to_user?.name || "-"}</td>
              <td>{formatDateTime(t.created_at)}</td>
              <td>
                <a href={`/transactions/${t.id}`}>Detail</a>
              </td>
            </tr>
          ))}
          {items.length === 0 && (
            <tr>
              <td colSpan="7">Belum ada transaksi</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
