import { useEffect, useState } from "react";
import { getProducts } from "../../services/productService";
import { createTransaction } from "../../services/transactionService";
import Navbar from "../../components/Navbar";
import BackButton from "../../components/BackBbutton";

export default function TransaksiCreate() {
  const [type, setType] = useState("topup"); // default topup
  const [amount, setAmount] = useState("");
  const [products, setProducts] = useState([]);
  const [items, setItems] = useState([{ product_id: "", qty: 1 }]);
  const [msg, setMsg] = useState("");

  // load product list kalau type = purchase
  useEffect(() => {
    if (type === "purchase") {
      (async () => {
        try {
          const res = await getProducts();
          setProducts(res.data.data || []);
        } catch (err) {
          setMsg(
            "Gagal load produk, pastikan role student bisa akses GET /products"
          );
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
    try {
      let payload = { type };

      if (type === "topup") {
        payload.amount = parseInt(amount);
      } else if (type === "purchase") {
        payload.items = items.filter((i) => i.product_id && i.qty > 0);
      }

      const res = await createTransaction(payload);
      setMsg("Transaksi berhasil: " + res.data.message);
    } catch (err) {
      setMsg(err.response?.data?.message || "Transaksi gagal!");
    }
  };

  return (
    <div>
      <Navbar />
      <BackButton />
      <h2>Buat Transaksi</h2>
      {msg && <p>{msg}</p>}

      {/* pilih jenis transaksi */}
      <div style={{ marginBottom: "10px" }}>
        <label>
          <input
            type="radio"
            value="topup"
            checked={type === "topup"}
            onChange={(e) => setType(e.target.value)}
          />
          Top Up
        </label>
        <label style={{ marginLeft: "10px" }}>
          <input
            type="radio"
            value="purchase"
            checked={type === "purchase"}
            onChange={(e) => setType(e.target.value)}
          />
          Purchase
        </label>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Form Top Up */}
        {type === "topup" && (
          <div>
            <label>Jumlah Top Up:</label>
            <input
              type="number"
              min="1"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
        )}

        {/* Form Purchase */}
        {type === "purchase" && (
          <div>
            {items.map((item, idx) => (
              <div key={idx} style={{ marginBottom: "10px" }}>
                <select
                  value={item.product_id}
                  onChange={(e) =>
                    handleChange(idx, "product_id", e.target.value)
                  }
                >
                  <option value="">-- pilih produk --</option>
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} - Rp {p.price}
                    </option>
                  ))}
                </select>

                <input
                  type="number"
                  min="1"
                  value={item.qty}
                  style={{ width: "60px", marginLeft: "5px" }}
                  onChange={(e) => handleChange(idx, "qty", e.target.value)}
                />
              </div>
            ))}

            <button type="button" onClick={addItem}>
              + Tambah Item
            </button>
          </div>
        )}

        <br />
        <button type="submit" style={{ marginTop: "10px" }}>
          Submit Transaksi
        </button>
      </form>
    </div>
  );
}
