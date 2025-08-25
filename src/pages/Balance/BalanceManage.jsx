// src/pages/Balance/BalanceManage.jsx
import { useState } from "react";
import { putTopup, putWithdraw } from "../../services/balanceService";
import Navbar from "../../components/Navbar";
import BackButton from "../../components/BackBbutton";

export default function BalanceManage() {
  const [target_user_id, setTarget] = useState("");
  const [amount, setAmount] = useState("");
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  const act = async (fn) => {
    setMsg("");
    setErr("");
    try {
      const res = await fn({
        target_user_id: Number(target_user_id),
        amount: Number(amount),
      });
      setMsg(res.data.message || "Sukses");
    } catch (e) {
      setErr(e?.response?.data?.message || "Gagal");
    }
  };

  return (
    <div>
      <Navbar />
      <BackButton />
      <h2>Kelola Saldo (Role: bank)</h2>
      <input
        placeholder="Target User ID"
        value={target_user_id}
        onChange={(e) => setTarget(e.target.value)}
      />
      <br />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <br />
      <button onClick={() => act(putTopup)}>Topup</button>{" "}
      <button onClick={() => act(putWithdraw)}>Withdraw</button>
      <br />
      {msg && <small style={{ color: "green" }}>{msg}</small>}
      {err && <small style={{ color: "red" }}>{err}</small>}
    </div>
  );
}
