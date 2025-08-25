// src/pages/Dashboard/CanteenDashboard.jsx
import BackButton from "../../components/BackBbutton";
import Navbar from "../../components/Navbar";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
export default function CanteenDashboard() {
  const { user } = useAuth();
  return (
    <div>
      <Navbar />
      <BackButton />
      <h2>Canteen/BC Dashboard</h2>
      <p>
        Halo, {user?.name} (role: {user?.role})
      </p>
      <nav>
        <Link to="/products">Produk</Link> |{" "}
        <Link to="/transactions">Transaksi</Link> |{" "}
        <Link to="/reports/daily">Report Harian</Link>
      </nav>
    </div>
  );
}
