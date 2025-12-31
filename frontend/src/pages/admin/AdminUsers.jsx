import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { usersAPI } from '../../api/users';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await usersAPI.getAll();
      setUsers(response.data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingUser) {
        const updateData = {
          username: formData.username,
        };
        if (formData.password) {
          updateData.password = formData.password;
        }
        await usersAPI.update(editingUser.id, updateData);
        alert('Akun admin berhasil diperbarui!');
      } else {
        await usersAPI.create(formData);
        alert('Akun admin berhasil dibuat!');
      }
      resetForm();
      fetchUsers();
    } catch (error) {
      alert('Gagal menyimpan akun admin');
      console.error(error);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({
      username: user.username,
      password: '',
    });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!confirm('Apakah Anda yakin ingin menghapus akun admin ini?')) return;

    try {
      await usersAPI.delete(id);
      alert('Akun admin berhasil dihapus!');
      fetchUsers();
    } catch (error) {
      if (error.response?.status === 403) {
        alert('Tidak dapat menghapus akun sendiri');
      } else {
        alert('Gagal menghapus akun admin');
      }
      console.error(error);
    }
  };

  const resetForm = () => {
    setFormData({
      username: '',
      password: '',
    });
    setEditingUser(null);
    setShowForm(false);
  };

  if (loading) return <div className="p-8">Memuat...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        to="/admin"
        className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4 text-sm md:text-base min-h-11 px-2"
      >
        ← Kembali ke Dashboard
      </Link>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">Kelola Akun Admin</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-4 py-3 rounded hover:bg-blue-700 w-full sm:w-auto min-h-11 text-sm md:text-base"
        >
          {showForm ? 'Batal' : 'Tambah Admin Baru'}
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">
            {editingUser ? 'Edit Akun Admin' : 'Buat Akun Admin Baru'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Username *
              </label>
              <input
                type="text"
                required
                className="w-full px-4 py-2 border rounded"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                placeholder="Contoh: admin_teknik"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Password {editingUser ? '(Kosongkan jika tidak diubah)' : '*'}
              </label>
              <input
                type="password"
                required={!editingUser}
                minLength="8"
                className="w-full px-4 py-2 border rounded"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                placeholder="Minimal 8 karakter"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <button
                type="submit"
                className="flex-1 bg-green-600 text-white py-3 rounded hover:bg-green-700 min-h-11"
              >
                {editingUser ? 'Perbarui' : 'Buat'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="flex-1 bg-gray-600 text-white py-3 rounded hover:bg-gray-700 min-h-11"
              >
                Batal
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Username
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="px-4 md:px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{user.username}</div>
                  </td>
                  <td className="px-4 md:px-6 py-4">
                    <div className="flex flex-col sm:flex-row gap-2">
                      <button
                        onClick={() => handleEdit(user)}
                        className="bg-yellow-600 text-white px-3 py-2 rounded hover:bg-yellow-700 text-sm min-h-9"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700 text-sm min-h-9"
                      >
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {!loading && users.length === 0 && (
        <p className="text-center text-gray-500 py-8">
          Tidak ada akun admin. Buat akun admin pertama Anda!
        </p>
      )}
    </div>
  );
}
