// src/pages/Balance/BalanceMine.jsx
import { useEffect, useState } from "react";
import { getMyBalance } from "../../services/balanceService";
import Navbar from "../../components/Navbar";
import BackButton from "../../components/BackBbutton";
import { Wallet } from "lucide-react";
import Loader from "../../components/Loader";

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

  if (err)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sapphire via-royalblue to-quicksand">
        <p className="text-red-600 font-semibold">{err}</p>
      </div>
    );

  if (!data)
    return  <Loader />;

  return (
    <>
      <Navbar />
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sapphire via-royalblue to-quicksand">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md">
        {/* Header */}
        <div className="flex flex-col items-center mb-6">
          <div className="bg-sapphire text-white p-3 rounded-full shadow-md">
            <Wallet size={28} />
          </div>
          <h2 className="text-3xl font-bold text-sapphire mt-3">Saldo Saya</h2>
          <p className="text-gray-500 text-sm">Informasi akun & saldo</p>
        </div>

        {/* Info User */}
        <div className="space-y-3">
          <p>
            <span className="font-semibold text-gray-700">Nama:</span>{" "}
            {data.user?.name}
          </p>
          <p>
            <span className="font-semibold text-gray-700">Role:</span>{" "}
            {data.user?.role}
          </p>
          <p>
            <span className="font-semibold text-gray-700">Saldo:</span>{" "}
            <span className="text-green-600 font-bold">
              Rp {data.user?.balance?.toLocaleString("id-ID")}
            </span>
          </p>
          <p>
            <span className="font-semibold text-gray-700">Update Terakhir:</span>{" "}
            {data.last_update}
          </p>
        </div>
      </div>
    </div>
    </>
  );
}
