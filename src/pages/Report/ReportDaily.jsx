// src/pages/Report/ReportDaily.jsx
import { useEffect, useState } from "react";
import { getReportsDaily } from "../../services/reportService";
import Navbar from "../../components/Navbar";
import BackButton from "../../components/BackBbutton";

export default function ReportDaily() {
  const [data, setData] = useState(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await getReportsDaily();
        setData(res.data);
      } catch {
        setErr("Gagal memuat report harian");
      }
    })();
  }, []);

  if (err) return <p style={{ color: "red" }}>{err}</p>;
  if (!data) return <p>Loading...</p>;

  return (
    <div>
      <Navbar />
      <BackButton />
      <h2>Report Harian: {data.date}</h2>
      <p>Total Transaksi: {data.total_transaction}</p>
      <p>Total Amount: {data.total_amount}</p>
    </div>
  );
}
