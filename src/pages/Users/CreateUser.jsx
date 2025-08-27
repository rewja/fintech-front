import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../services/userService";
import Navbar from "../../components/Navbar";

export default function CreateUser() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "student",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // hapus error untuk field yang diubah
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createUser(form);
      navigate("/users");
    } catch (err) {
      // backend bisa mengirim { field: message } atau message umum
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors);
      } else {
        setErrors({ general: err.response?.data?.message || "Gagal menambahkan user" });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sapphire via-royalblue to-quicksand">
      <Navbar />
      <div className="max-w-md mx-auto p-8 bg-white rounded-2xl shadow-xl mt-12">
        <h2 className="text-2xl font-bold text-sapphire mb-4">Tambah User</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sapphire outline-none"
          />
          {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}

          <input
            name="name"
            placeholder="Nama Lengkap"
            value={form.name}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sapphire outline-none"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

          <input
            name="email"
            placeholder="Email"
            type="email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sapphire outline-none"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sapphire outline-none"
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

          <input
            type="password"
            name="confirmPassword"
            placeholder="Konfirmasi Password"
            value={form.confirmPassword}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sapphire outline-none"
          />
          {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}

          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sapphire outline-none"
          >
            <option value="student">Student</option>
            <option value="canteen">Canteen</option>
            <option value="bc">BC</option>
            <option value="bank">Bank</option>
            <option value="admin">Admin</option>
          </select>
          {errors.role && <p className="text-red-500 text-sm">{errors.role}</p>}

          {errors.general && <p className="text-red-500 text-sm">{errors.general}</p>}

          <button className="w-full bg-sapphire hover:bg-royalblue text-white py-3 rounded-lg font-semibold transition">
            Tambah User
          </button>
        </form>
      </div>
    </div>
  );
}
