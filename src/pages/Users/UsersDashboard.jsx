import { useEffect, useState } from "react";
import { getUsers, deleteUser } from "../../services/userService";
import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";

export default function UsersDashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    try {
      const res = await getUsers();
      setUsers(res.data.data);
    } catch {
      setError("Gagal memuat data pengguna");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus user ini?")) return;
    try {
      await deleteUser(id);
      setUsers(users.filter(u => u.id !== id));
    } catch {
      alert("Gagal menghapus user");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sapphire via-royalblue to-quicksand">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sapphire via-royalblue to-quicksand">
        <p className="text-red-500 text-center">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sapphire via-royalblue to-quicksand">
      <Navbar />
      <div className="max-w-5xl mx-auto py-12 px-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-white">Manage Users</h2>
          <Link
            to="/users/create"
            className="bg-white text-sapphire px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            Tambah User
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-2 px-4">ID</th>
                <th className="py-2 px-4">Username</th>
                <th className="py-2 px-4">Nama</th>
                <th className="py-2 px-4">Role</th>
                <th className="py-2 px-4">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? users.map(u => (
                <tr key={u.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-2 px-4">{u.id}</td>
                  <td className="py-2 px-4">{u.username}</td>
                  <td className="py-2 px-4">{u.name}</td>
                  <td className="py-2 px-4">{u.role}</td>
                  <td className="py-2 px-4 flex gap-2">
                    <Link to={`/users/edit/${u.id}`} className="text-blue-600 hover:underline">Edit</Link>
                    <button onClick={() => handleDelete(u.id)} className="text-red-500 hover:underline">Hapus</button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="5" className="py-4 text-center text-gray-500">
                    Tidak ada pengguna
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
