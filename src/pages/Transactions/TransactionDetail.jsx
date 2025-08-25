// src/pages/Transaksi/TransaksiDetail.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { formatDateTime } from "../../utils/formatDate";
import { getTransaction } from "../../services/transactionService";
import Navbar from "../../components/Navbar";
import BackButton from "../../components/BackBbutton";

export default function TransaksiDetail() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await getTransaction(id);
        setData(res.data.data);
      } catch {
        setErr("Tidak bisa akses transaksi ini");
      }
    })();
  }, [id]);

  if (err) return <p style={{ color: "red" }}>{err}</p>;
  if (!data) return <p>Loading...</p>;

  return (
    <div>
      <Navbar />
      <BackButton />
      <h2>Detail Transaksi #{data.id}</h2>
      <p>Jenis: {data.type}</p>
      <p>Total: {data.amount}</p>
      <p>Pembeli: {data.user?.name}</p>
      <p>Penjual: {data.to_user?.name || "-"}</p>
      <p>Waktu: {formatDateTime(data.created_at)}</p>
      <h3>Items:</h3>
      <ul>
        {(data.details || []).map((d) => (
          <li key={d.id}>
            {d.product?.name} x {d.qty} @ {d.price} = {d.subtotal}
          </li>
        ))}
        {(!data.details || data.details.length === 0) && <li>-</li>}
      </ul>
    </div>
  );
}
