// src/pages/Dashboard/BankDashboard.jsx
import BackButton from "../../components/BackBbutton";
import Navbar from "../../components/Navbar";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
export default function BankDashboard() {
  const { user } = useAuth();
  return (
    <div>
      <Navbar />
      <BackButton />
      <h2>Bank Dashboard</h2>
      <p>
        Halo, {user?.name} (role: {user?.role})
      </p>
      <nav>
        <Link to="/balance/manage">Kelola Saldo</Link> |{" "}
        <Link to="/reports/daily">Report Harian</Link>
      </nav>
    </div>
  );
}
