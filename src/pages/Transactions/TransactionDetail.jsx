// src/pages/Transaksi/TransaksiDetail.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { formatDateTime } from "../../utils/formatDate";
import { getTransaction } from "../../services/transactionService";
import Navbar from "../../components/Navbar";
import BackButton from "../../components/BackBbutton";
import Loader from "../../components/Loader";

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

  if (err)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sapphire via-royalblue to-quicksand">
        <p className="text-red-600 font-medium bg-white px-6 py-3 rounded-lg shadow-md">
          {err}
        </p>
      </div>
    );

  if (!data)
    return (<Loader />
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-sapphire via-royalblue to-quicksand">
      <Navbar />

      <div className="flex justify-center py-10 px-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-2xl">
          {/* Header */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-sapphire">
              Detail Transaksi #{data.id}
            </h2>
            <p className="text-gray-500 text-sm">
              {formatDateTime(data.created_at)}
            </p>
          </div>

          {/* Info utama */}
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-700 mb-6">
            <p>
              <span className="font-medium">Jenis:</span> {data.type}
            </p>
            <p>
              <span className="font-medium">Total:</span> Rp{" "}
              {parseInt(data.amount).toLocaleString()}
            </p>
            <p>
              <span className="font-medium">Pembeli:</span>{" "}
              {data.user?.name || "-"}
            </p>
            <p>
              <span className="font-medium">Penjual:</span>{" "}
              {data.to_user?.name || "-"}
            </p>
          </div>

          {/* Detail Item */}
          <h3 className="text-lg font-semibold text-sapphire mb-2">Items</h3>
          <div className="border rounded-lg overflow-hidden">
            <table className="w-full text-sm border-collapse">
              <thead className="bg-sapphire text-white">
                <tr>
                  <th className="px-4 py-2 text-left">Produk</th>
                  <th className="px-4 py-2 text-center">Qty</th>
                  <th className="px-4 py-2 text-right">Harga</th>
                  <th className="px-4 py-2 text-right">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {(data.details || []).length > 0 ? (
                  data.details.map((d) => (
                    <tr key={d.id} className="border-t">
                      <td className="px-4 py-2">{d.product?.name}</td>
                      <td className="px-4 py-2 text-center">{d.qty}</td>
                      <td className="px-4 py-2 text-right">
                        Rp {parseInt(d.price).toLocaleString()}
                      </td>
                      <td className="px-4 py-2 text-right">
                        Rp {parseInt(d.subtotal).toLocaleString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      className="px-4 py-2 text-center text-gray-500"
                    >
                      Tidak ada item
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
