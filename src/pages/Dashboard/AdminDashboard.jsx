// src/pages/Dashboard/AdminDashboard.jsx
import BackButton from "../../components/BackBbutton";
import Navbar from "../../components/Navbar";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
export default function AdminDashboard(){
  const { user } = useAuth();
  return (
    <div>
      <Navbar />
      <BackButton />      
      <h2>Admin Dashboard</h2>
      <p>Halo, {user?.name} (role: {user?.role})</p>
      <nav>
        <Link to="/reports">Reports</Link> |{" "}
        <Link to="/transactions">Transaksi</Link> |{" "}
        <Link to="/products">Produk</Link>
      </nav>
    </div>
  );
}
