import { useEffect, useState } from "react";
import { getReports } from "../../services/reportService";
import { formatDateTime } from "../../utils/formatDate";

export default function ReportList(){
  const [data, setData] = useState([]);
  const [err, setErr] = useState("");

  useEffect(()=> {
    (async ()=>{
      try { 
        const res = await getReports();
        setData(res.data.data || []);
      } catch { setErr("Gagal memuat report"); }
    })();
  }, []);

  return (
    <div>
      <h2>Report (All sesuai role)</h2>
      {err && <p style={{color:"red"}}>{err}</p>}
      <table border="1" cellPadding="6">
        <thead><tr><th>ID</th><th>Jenis</th><th>Amount</th><th>User</th><th>To</th><th>Waktu</th></tr></thead>
        <tbody>
          {data.map(t=>(
            <tr key={t.id}>
              <td>{t.id}</td>
              <td>{t.type}</td>
              <td>{t.amount}</td>
              <td>{t.user?.name}</td>
              <td>{t.to_user?.name || "-"}</td>
              <td>{formatDateTime(t.created_at)}</td>
            </tr>
          ))}
          {data.length===0 && <tr><td colSpan="6">Kosong</td></tr>}
        </tbody>
      </table>
    </div>
  );
}

