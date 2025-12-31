import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../stores/useAuthStore';

export default function Register() {
  const navigate = useNavigate();
  const register = useAuthStore((state) => state.register);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.password_confirmation) {
      setError('Kata sandi tidak cocok');
      return;
    }

    setLoading(true);
    const result = await register(formData);

    if (result.success) {
      navigate('/');
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Daftar</h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nama</label>
            <input
              type="text"
              required
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              required
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Kata Sandi</label>
            <input
              type="password"
              required
              minLength="8"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Konfirmasi Kata Sandi
            </label>
            <input
              type="password"
              required
              minLength="8"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={formData.password_confirmation}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  password_confirmation: e.target.value,
                })
              }
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-2 rounded-lg hover:from-orange-600 hover:to-red-600 disabled:bg-gray-400"
          >
            {loading ? 'Memuat...' : 'Daftar'}
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Sudah punya akun?{' '}
            <Link to="/login" className="text-orange-600 hover:underline font-semibold">
              Masuk di sini
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
