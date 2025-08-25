import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

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
        navigate("/canteen/dashboard")      
    else if (user.role === "bank") navigate("/bank/dashboard");
      else if (user.role === "admin") navigate("/admin/dashboard");
      else navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login gagal");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input name="username" placeholder="Username" onChange={handleChange} />
        <br />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <br />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Login</button>
      </form>

      {/* 👇 Tambahan link ke register */}
      <p>
        Belum punya akun? <Link to="/register">Daftar disini</Link>
      </p>
    </div>
  );
}
