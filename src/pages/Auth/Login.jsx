import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { LogIn, User } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await login(form);
      if (user.role === "student") navigate("/student/dashboard");
      else if (user.role === "canteen" || user.role === "bc")
        navigate("/canteen/dashboard");
      else if (user.role === "bank") navigate("/bank/dashboard");
      else if (user.role === "admin") navigate("/admin/dashboard");
      else navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login gagal");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sapphire via-royalblue to-quicksand">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md">
        {/* Header */}
        <div className="flex flex-col items-center mb-6">
          <div className="bg-sapphire text-white p-3 rounded-full shadow-md">
            <User size={28} />
          </div>
          <h2 className="text-3xl font-bold text-sapphire mt-3">Login</h2>
          <p className="text-gray-500 text-sm">Masuk untuk melanjutkan</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="username"
            placeholder="Username"
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sapphire outline-none"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sapphire outline-none"
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-sapphire hover:bg-royalblue text-white py-3 rounded-lg font-semibold transition"
          >
            <LogIn size={20} /> Login
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-300" />
          <span className="px-3 text-gray-400 text-sm">atau</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Login alternatif */}
        <button className="w-full border border-gray-300 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition">
          <img
            src="https://www.svgrepo.com/show/355037/google.svg"
            alt="Google"
            className="w-5 h-5"
          />
          <span className="text-sm font-medium text-gray-600">Login dengan Google</span>
        </button>

        {/* Footer link */}
        <p className="text-center text-gray-600 mt-6 text-sm">
          Belum punya akun?{" "}
          <Link to="/register" className="text-sapphire font-semibold hover:underline">
            Daftar disini
          </Link>
        </p>
      </div>
    </div>
  );
}
