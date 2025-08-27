import { useEffect, useState } from "react";
import { getProducts } from "../../services/productService";
import { createTransaction } from "../../services/transactionService";
import Navbar from "../../components/Navbar";
import { CreditCard, ShoppingBag } from "lucide-react";

export default function TransaksiCreate() {
  const [type, setType] = useState("topup"); // default topup
  const [amount, setAmount] = useState("");
  const [products, setProducts] = useState([]);
  const [items, setItems] = useState([{ product_id: "", qty: 1 }]);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  // load product list kalau type = purchase
  useEffect(() => {
    if (type === "purchase") {
      (async () => {
        try {
          const res = await getProducts();
          setProducts(res.data.data || []);
        } catch (err) {
          setMsg("❌ Gagal load produk. Pastikan student punya akses GET /products");
        }
      })();
    }
  }, [type]);

  // handle change tiap item
  const handleChange = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = value;
    setItems(updated);
  };

  // tambah baris item
  const addItem = () => {
    setItems([...items, { product_id: "", qty: 1 }]);
  };

  // submit transaksi
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setLoading(true);
    try {
      let payload = { type };

      if (type === "topup") {
        if (!amount || parseInt(amount) <= 0) {
          setMsg("❌ Jumlah topup harus lebih dari 0");
          setLoading(false);
          return;
        }
        payload.amount = parseInt(amount);
      } else if (type === "purchase") {
        const validItems = items.filter((i) => i.product_id && i.qty > 0);
        if (validItems.length === 0) {
          setMsg("❌ Pilih minimal 1 produk dengan qty > 0");
          setLoading(false);
          return;
        }
        payload.items = validItems;
      }

      const res = await createTransaction(payload);
      setMsg("✅ Transaksi berhasil: " + res.data.message);

      // reset form setelah sukses
      setAmount("");
      setItems([{ product_id: "", qty: 1 }]);
    } catch (err) {
      setMsg(err.response?.data?.message || "❌ Transaksi gagal!");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sapphire via-royalblue to-quicksand">
      <Navbar />

      <div className="flex justify-center items-center py-10 px-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg">
          {/* Header */}
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-sapphire">Buat Transaksi</h2>
            <p className="text-gray-500 text-sm">Pilih jenis transaksi yang ingin dilakukan</p>
          </div>

          {/* Message */}
          {msg && (
            <div
              className={`mb-4 p-3 rounded-lg text-sm text-center ${
                msg.startsWith("✅")
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {msg}
            </div>
          )}

          {/* pilih jenis transaksi */}
          <div className="flex justify-center gap-4 mb-6">
            <button
              type="button"
              onClick={() => setType("topup")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${
                type === "topup"
                  ? "bg-sapphire text-white shadow-md"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <CreditCard size={18} />
              Top Up
            </button>
            <button
              type="button"
              onClick={() => setType("purchase")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${
                type === "purchase"
                  ? "bg-sapphire text-white shadow-md"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <ShoppingBag size={18} />
              Purchase
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Form Top Up */}
            {type === "topup" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Jumlah Top Up
                </label>
                <input
                  type="number"
                  min="1"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sapphire outline-none"
                  placeholder="Masukkan jumlah top up"
                />
              </div>
            )}

            {/* Form Purchase */}
            {type === "purchase" && (
  <div className="space-y-3">
    {items.map((item, idx) => (
      <div key={idx} className="flex gap-2 items-center">
        <select
          value={item.product_id}
          onChange={(e) =>
            handleChange(idx, "product_id", e.target.value)
          }
          className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sapphire outline-none"
        >
          <option value="">-- pilih produk --</option>
          {products.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name} - Rp {p.price.toLocaleString()}
            </option>
          ))}
        </select>

        <input
          type="number"
          min="1"
          value={item.qty}
          onChange={(e) => handleChange(idx, "qty", e.target.value)}
          className="w-20 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sapphire outline-none text-center"
        />

        {/* Tombol hapus row */}
        <button
          type="button"
          onClick={() =>
            setItems(items.filter((_, i) => i !== idx))
          }
          className="text-red-500 hover:text-red-700 px-2"
        >
          ❌
        </button>
      </div>
    ))}

    <button
      type="button"
      onClick={addItem}
      className="text-sapphire hover:underline text-sm font-medium"
    >
      + Tambah Item
    </button>
  </div>
)}


            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg font-semibold transition ${
                loading
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-sapphire hover:bg-royalblue text-white"
              }`}
            >
              {loading ? "Loading..." : "Submit Transaksi"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
