// src/pages/Dashboard/StudentDashboard.jsx
import Navbar from "../../components/Navbar";
import { useAuth } from "../../context/AuthContext";
import { useState, useEffect } from "react";
import { getProducts } from "../../services/productService";
import { createTransaction } from "../../services/transactionService";

export default function StudentDashboard() {
  const { user, setUser } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState({});
  const [msg, setMsg] = useState("");
  const [confirmProduct, setConfirmProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getProducts();
        // pastikan products ada array
        setProducts(Array.isArray(res.data.data) ? res.data.data : []);
      } catch (err) {
        console.error("Gagal memuat produk", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleQtyChange = (productId, delta) => {
    setCart((prev) => {
      const product = products.find((p) => p.id === productId);
      const current = prev[productId] || 0;
      const updated = Math.max(0, Math.min(current + delta, product?.stock || 0));
      return { ...prev, [productId]: updated };
    });
  };

  const openConfirm = (product) => {
    if ((cart[product.id] || 0) <= 0) {
      setMsg(`❌ Silakan pilih qty untuk ${product.name}`);
      return;
    }
    setConfirmProduct(product);
    setMsg("");
  };

  const handleConfirmPurchase = async () => {
    if (!confirmProduct) return;
    const qty = cart[confirmProduct.id] || 0;
    const totalPrice = qty * confirmProduct.price;

    if (qty > confirmProduct.stock) {
      setMsg(`❌ Stok tidak cukup untuk ${confirmProduct.name}`);
      setConfirmProduct(null);
      return;
    }

    if (totalPrice > user.balance) {
      setMsg("❌ Saldo tidak cukup untuk membeli produk ini");
      setConfirmProduct(null);
      return;
    }

    try {
      const payload = {
        type: "purchase",
        items: [{ product_id: confirmProduct.id, qty }],
      };
      await createTransaction(payload);

      // update saldo
      setUser((prev) => ({ ...prev, balance: prev.balance - totalPrice }));

      // update stok di frontend
      setProducts((prev) =>
        prev.map((p) =>
          p.id === confirmProduct.id ? { ...p, stock: p.stock - qty } : p
        )
      );

      setMsg(`✅ Berhasil membeli ${qty}x ${confirmProduct.name}`);
      setCart((prev) => ({ ...prev, [confirmProduct.id]: 0 }));
    } catch (err) {
      setMsg(
        err.response?.data?.message || `❌ Gagal membeli ${confirmProduct.name}`
      );
    } finally {
      setConfirmProduct(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sapphire via-royalblue to-quicksand">
      <Navbar />

      <div className="max-w-6xl mx-auto p-6">
        <h2 className="text-3xl font-bold text-white mb-6">Student Dashboard</h2>

        {/* Card Saldo */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 flex flex-col sm:flex-row sm:items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-sapphire mb-2">
              Halo, {user?.name}
            </h3>
            <p className="text-gray-600">
              Role: <span className="font-medium">{user?.role}</span>
            </p>
          </div>
          <div className="mt-4 sm:mt-0 text-right">
            <p className="text-gray-500">Saldo Saat Ini</p>
            <p className="text-2xl font-bold text-sapphire">
              {user?.balance?.toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
              })}
            </p>
          </div>
        </div>

        {/* Pesan */}
        {msg && (
          <div
            className={`mb-4 p-3 rounded-lg text-sm text-center ${
              msg.startsWith("✅") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
            }`}
          >
            {msg}
          </div>
        )}

        {loading ? (
          <p className="text-white">Loading produk...</p>
        ) : Array.isArray(products) && products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl shadow-lg p-4 flex flex-col justify-between"
              >
                <img
                  src={product.image || "/placeholder.png"}
                  alt={product.name}
                  className="h-40 w-full object-cover rounded-xl mb-4"
                />
                <h3 className="text-lg font-semibold text-sapphire">{product.name}</h3>
                <p className="text-gray-600 mb-1">
                  Harga:{" "}
                  {product.price.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })}
                </p>
                <p className="text-gray-500 mb-2">Stok: {product.stock}</p>

                {/* Qty selector */}
                <div className="flex items-center justify-between mb-2 mt-auto">
                  <button
                    type="button"
                    onClick={() => handleQtyChange(product.id, -1)}
                    className="bg-gray-200 hover:bg-gray-300 rounded-lg px-3 py-1 font-bold"
                  >
                    -
                  </button>
                  <span className="text-lg font-semibold">{cart[product.id] || 0}</span>
                  <button
                    type="button"
                    onClick={() => handleQtyChange(product.id, 1)}
                    className="bg-gray-200 hover:bg-gray-300 rounded-lg px-3 py-1 font-bold"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => openConfirm(product)}
                  className="mt-2 bg-sapphire hover:bg-royalblue text-white py-2 rounded-lg font-semibold transition"
                >
                  Beli
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-white">Tidak ada produk</p>
        )}
      </div>

      {/* Modal Konfirmasi */}
      {confirmProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-xl w-80 text-center">
            <h3 className="text-xl font-bold text-sapphire mb-4">Konfirmasi Pembelian</h3>
            <p className="mb-2">
              Produk: <span className="font-semibold">{confirmProduct.name}</span>
            </p>
            <p className="mb-4">
              Qty: <span className="font-semibold">{cart[confirmProduct.id]}</span> <br />
              Total:{" "}
              <span className="font-semibold">
                {(cart[confirmProduct.id] * confirmProduct.price).toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                })}
              </span>
            </p>

            <div className="flex justify-between gap-4">
              <button
                onClick={() => setConfirmProduct(null)}
                className="flex-1 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 font-semibold"
              >
                Batal
              </button>
              <button
                onClick={handleConfirmPurchase}
                className="flex-1 py-2 rounded-lg bg-sapphire hover:bg-royalblue text-white font-semibold"
              >
                Konfirmasi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
