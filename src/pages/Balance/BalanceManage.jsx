// src/pages/Balance/BalanceManage.jsx
import { useState } from "react";
import { putTopup, putWithdraw } from "../../services/balanceService";
import { searchUsers } from "../../services/userService";
import { Banknote, Upload, Download } from "lucide-react";
import Navbar from "../../components/Navbar";
import BackButton from "../../components/BackBbutton";

export default function BalanceManage() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [target_user_id, setTargetUserId] = useState(null);
  const [amount, setAmount] = useState("");
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  const handleSearch = async (value) => {
    setQuery(value);
    if (!value) {
      setSuggestions([]);
      return;
    }
    try {
      const res = await searchUsers(value);
      setSuggestions(res.data.data || []);
    } catch {
      setSuggestions([]);
    }
  };

  const selectUser = (user) => {
    setTargetUserId(user.id);
    setQuery(`${user.name} (${user.username})`);
    setSuggestions([]);
  };

  const act = async (fn) => {
    setMsg("");
    setErr("");
    try {
      if (!target_user_id) {
        setErr("Pilih user terlebih dahulu");
        return;
      }
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
    <>
      <Navbar />
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sapphire via-royalblue to-quicksand">

      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-lg relative">
        {/* Header */}
        <div className="flex flex-col items-center mb-6">
          <div className="bg-sapphire text-white p-3 rounded-full shadow-md">
            <Banknote size={28} />
          </div>
          <h2 className="text-3xl font-bold text-sapphire mt-3">Kelola Saldo</h2>
          <p className="text-gray-500 text-sm">Role: Bank</p>
        </div>

        {/* Form */}
        <div className="space-y-4">
          {/* Cari User */}
          <div className="relative">
            <input
              type="text"
              placeholder="Cari user (nama/username)"
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sapphire outline-none"
            />
            {suggestions.length > 0 && (
              <ul className="absolute z-10 bg-white border w-full rounded mt-1 max-h-40 overflow-y-auto shadow">
                {suggestions.map((user) => (
                  <li
                    key={user.id}
                    onClick={() => selectUser(user)}
                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {user.name} ({user.username}) - {user.role}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Jumlah */}
          <input
            type="number"
            placeholder="Jumlah"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sapphire outline-none"
          />

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={() => act(putTopup)}
              className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition"
            >
              <Upload size={20} /> Topup
            </button>
            <button
              onClick={() => act(putWithdraw)}
              className="flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold transition"
            >
              <Download size={20} /> Withdraw
            </button>
          </div>

          {/* Pesan */}
          {msg && <p className="text-green-600 text-sm">{msg}</p>}
          {err && <p className="text-red-600 text-sm">{err}</p>}
        </div>
      </div>
    </div>
    </>
  );
}
