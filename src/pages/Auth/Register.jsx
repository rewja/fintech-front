import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

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
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" onChange={handleChange} />
        {errors.name && <p>{errors.name[0]}</p>}
        <br />
        <input name="username" placeholder="Username" onChange={handleChange} />
        {errors.username && <p>{errors.username[0]}</p>}
        <br />
        <input name="email" placeholder="Email" onChange={handleChange} />
        {errors.email && <p>{errors.email[0]}</p>}
        <br />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />
        {errors.password && <p>{errors.password[0]}</p>}
        <br />
        <input
          type="password"
          name="password_confirmation"
          placeholder="Confirm Password"
          onChange={handleChange}
        />
        <br />
        <button type="submit">Register</button>
      </form>

      {/* 👇 Tambahan link ke login */}
      <p>
        Sudah punya akun? <Link to="/login">Login disini</Link>
      </p>
    </div>
  );
}
