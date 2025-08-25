// src/routes/AppRouter.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";

// Auth
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";

// Dashboards
import AdminDashboard from "../pages/Dashboard/AdminDashboard";
import BankDashboard from "../pages/Dashboard/BankDashboard";
import CanteenDashboard from "../pages/Dashboard/CanteenDashboaed";
import StudentDashboard from "../pages/Dashboard/StudentDashboard";


// Produk
import ProdukList from "../pages/Products/ProductList";
import ProdukCreate from "../pages/Products/ProductCreate";
import ProdukEdit from "../pages/Products/ProductEdit";

// Transaksi
import TransaksiList from "../pages/Transactions/TransactionList";
import TransaksiCreate from "../pages/Transactions/TransactionCreate";
import TransaksiDetail from "../pages/Transactions/TransactionDetail";

// Report
import ReportList from "../pages/Report/ReportList";
import ReportDaily from "../pages/Report/ReportDaily";
import ReportUser from "../pages/Report/ReportUser";

// Balance
import BalanceMine from "../pages/Balance/BalanceMine";
import BalanceManage from "../pages/Balance/BalanceManage";


export default function AppRouter(){
  return (
    <Routes>
      {/* Auth */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />

      {/* Dashboard by role */}
      <Route path="/admin/dashboard" element={
        <ProtectedRoute roles={["admin"]}><AdminDashboard/></ProtectedRoute>
      }/>
      <Route path="/bank/dashboard" element={
        <ProtectedRoute roles={["bank"]}><BankDashboard/></ProtectedRoute>
      }/>
      <Route path="/canteen/dashboard" element={
        <ProtectedRoute roles={["canteen","bc"]}><CanteenDashboard/></ProtectedRoute>
      }/>
      <Route path="/student/dashboard" element={
        <ProtectedRoute roles={["student"]}><StudentDashboard/></ProtectedRoute>
      }/>

      {/* Produk (canteen/bc) */}
      <Route path="/products" element={
        <ProtectedRoute roles={["canteen","bc","admin"]}><ProdukList/></ProtectedRoute>
      }/>
      <Route path="/products/create" element={
        <ProtectedRoute roles={["canteen","bc"]}><ProdukCreate/></ProtectedRoute>
      }/>
      <Route path="/products/edit/:id" element={
        <ProtectedRoute roles={["canteen","bc"]}><ProdukEdit/></ProtectedRoute>
      }/>

      {/* Transaksi (all roles; backend tetap filter) */}
      <Route path="/transactions" element={
        <ProtectedRoute roles={["admin","bank","canteen","bc","student"]}><TransaksiList/></ProtectedRoute>
      }/>
      <Route path="/transactions/create" element={
        <ProtectedRoute roles={["admin","bank","canteen","bc","student"]}><TransaksiCreate/></ProtectedRoute>
      }/>
      <Route path="/transactions/:id" element={
        <ProtectedRoute roles={["admin","bank","canteen","bc","student"]}><TransaksiDetail/></ProtectedRoute>
      }/>

      {/* Reports */}
      <Route path="/reports" element={
        <ProtectedRoute roles={["admin","bank","canteen","bc","student"]}><ReportList/></ProtectedRoute>
      }/>
      <Route path="/reports/daily" element={
        <ProtectedRoute roles={["admin","bank","canteen","bc","student"]}><ReportDaily/></ProtectedRoute>
      }/>
      <Route path="/reports/user" element={
        <ProtectedRoute roles={["admin"]}><ReportUser/></ProtectedRoute>
      }/>

      {/* Balance */}
      <Route path="/balance" element={
        <ProtectedRoute roles={["admin","bank","canteen","bc","student"]}><BalanceMine/></ProtectedRoute>
      }/>
      <Route path="/balance/manage" element={
        <ProtectedRoute roles={["bank"]}><BalanceManage/></ProtectedRoute>
      }/>
    </Routes>
  );
}
