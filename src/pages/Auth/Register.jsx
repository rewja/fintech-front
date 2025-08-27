import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { UserPlus } from "lucide-react";

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await register(form);
      if (user.role === "student") navigate("/student/dashboard");
      else if (user.role === "canteen") navigate("/canteen/dashboard");
      else if (user.role === "bank") navigate("/bank/dashboard");
      else if (user.role === "admin") navigate("/admin/dashboard");
      else navigate("/dashboard");
    } catch (err) {
      if (err.response?.status === 422) setErrors(err.response.data.errors);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sapphire via-royalblue to-quicksand py-12 px-4 overflow-auto">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md">
        {/* Header */}
        <div className="flex flex-col items-center mb-6">
          <div className="bg-sapphire text-white p-3 rounded-full shadow-md">
            <UserPlus size={28} />
          </div>
          <h2 className="text-3xl font-bold text-sapphire mt-3">Register</h2>
          <p className="text-gray-500 text-sm">Buat akun baru</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sapphire outline-none"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name[0]}</p>
            )}
          </div>

          <div>
            <input
              name="username"
              placeholder="Username"
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sapphire outline-none"
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">{errors.username[0]}</p>
            )}
          </div>

          <div>
            <input
              name="email"
              type="email"
              placeholder="Email"
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sapphire outline-none"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email[0]}</p>
            )}
          </div>

          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sapphire outline-none"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password[0]}</p>
            )}
          </div>

          <div>
            <input
              type="password"
              name="password_confirmation"
              placeholder="Confirm Password"
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sapphire outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-sapphire hover:bg-royalblue text-white py-3 rounded-lg font-semibold transition"
          >
            Register
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-300" />
          <span className="px-3 text-gray-400 text-sm">atau</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Register alternatif */}
        <button className="w-full border border-gray-300 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition">
          <img
            src="https://www.svgrepo.com/show/355037/google.svg"
            alt="Google"
            className="w-5 h-5"
          />
          <span className="text-sm font-medium text-gray-600">
            Daftar dengan Google
          </span>
        </button>

        {/* Footer link */}
        <p className="text-center text-gray-600 mt-6 text-sm">
          Sudah punya akun?{" "}
          <Link to="/login" className="text-sapphire font-semibold hover:underline">
            Login disini
          </Link>
        </p>
      </div>
    </div>
  );
}
