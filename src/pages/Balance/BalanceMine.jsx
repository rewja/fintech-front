// src/pages/Balance/BalanceMine.jsx
import { useEffect, useState } from "react";
import { getMyBalance } from "../../services/balanceService";
import Navbar from "../../components/Navbar";
import BackButton from "../../components/BackBbutton";

export default function BalanceMine() {
  const [data, setData] = useState(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await getMyBalance();
        setData(res.data);
      } catch {
        setErr("Gagal memuat saldo");
      }
    })();
  }, []);

  if (err) return <p style={{ color: "red" }}>{err}</p>;
  if (!data) return <p>Loading...</p>;
  return (
    <div>
      <Navbar />
      <BackButton />
      <h2>Saldo Saya</h2>
      <p>Nama: {data.user?.name}</p>
      <p>Role: {data.user?.role}</p>
      <p>Saldo: {data.user?.balance}</p>
      <p>Update Terakhir: {data.last_update}</p>
    </div>
  );
}
