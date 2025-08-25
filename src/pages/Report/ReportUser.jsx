// src/pages/Report/ReportUser.jsx
import { useState } from "react";
import { getReportsUser } from "../../services/reportService";
import Navbar from "../../components/Navbar";
import BackButton from "../../components/BackBbutton";

export default function ReportUser() {
  const [uid, setUid] = useState("");
  const [res, setRes] = useState(null);
  const [err, setErr] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setRes(null);
    try {
      const r = await getReportsUser(uid);
      setRes(r.data);
    } catch {
      setErr("Forbidden / Gagal memuat (hanya admin)");
    }
  };

  return (
    <div>
      <Navbar />
      <BackButton />
      <h2>Report per User (Admin)</h2>
      <form onSubmit={onSubmit}>
        <input
          placeholder="User ID"
          value={uid}
          onChange={(e) => setUid(e.target.value)}
        />
        <button type="submit">Lihat</button>
      </form>
      {err && <p style={{ color: "red" }}>{err}</p>}
      {res && (
        <pre style={{ whiteSpace: "pre-wrap" }}>
          {JSON.stringify(res, null, 2)}
        </pre>
      )}
    </div>
  );
}
