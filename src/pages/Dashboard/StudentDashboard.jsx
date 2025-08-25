// src/pages/Dashboard/StudentDashboard.jsx
import BackButton from "../../components/BackBbutton";
import Navbar from "../../components/Navbar";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
export default function StudentDashboard() {
  const { user } = useAuth();
  return (
    <div>
      <Navbar />
      <BackButton />
      <h2>Student Dashboard</h2>
      <p>
        Halo, {user?.name} (role: {user?.role}) | Saldo: {user?.balance}
      </p>
      <nav>
        <Link to="/balance">Saldo Saya</Link> |{" "}
        <Link to="/transactions">Riwayat Transaksi</Link> |{" "}
        <Link to="/transactions/create">Buat Transaksi</Link>
      </nav>
    </div>
  );
}
