import { useEffect, useState } from 'react';
import { sportsTypesAPI } from '../../api/sportsTypes';

export default function AdminSportsTypes() {
  const [sportsTypes, setSportsTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingSportsType, setEditingSportsType] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    icon: '',
    description: '',
  });

  useEffect(() => {
    fetchSportsTypes();
  }, []);

  const fetchSportsTypes = async () => {
    try {
      const response = await sportsTypesAPI.getAll();
      setSportsTypes(response.data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingSportsType) {
        await sportsTypesAPI.update(editingSportsType.id, formData);
        alert('Jenis olahraga berhasil diperbarui!');
      } else {
        await sportsTypesAPI.create(formData);
        alert('Jenis olahraga berhasil dibuat!');
      }
      resetForm();
      fetchSportsTypes();
    } catch (error) {
      alert('Error saving sports type');
      console.error(error);
    }
  };

  const handleEdit = (sportsType) => {
    setEditingSportsType(sportsType);
    setFormData({
      name: sportsType.name,
      icon: sportsType.icon || '',
      description: sportsType.description || '',
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Apakah Anda yakin ingin menghapus jenis olahraga ini?')) return;

    try {
      await sportsTypesAPI.delete(id);
      alert('Jenis olahraga berhasil dihapus!');
      fetchSportsTypes();
    } catch (error) {
      alert('Error deleting sports type');
      console.error(error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      icon: '',
      description: '',
    });
    setEditingSportsType(null);
    setShowForm(false);
  };

  if (loading) return <div className="p-8">Memuat...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Sports Types</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {showForm ? 'Batal' : 'Tambah Jenis Olahraga Baru'}
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">
            {editingSportsType ? 'Edit Jenis Olahraga' : 'Buat Jenis Olahraga Baru'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Sports Name *
              </label>
              <input
                type="text"
                required
                className="w-full px-4 py-2 border rounded"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="e.g., Football, Basketball, Volleyball"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Icon (Emoji or Text)
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded"
                value={formData.icon}
                onChange={(e) =>
                  setFormData({ ...formData, icon: e.target.value })
                }
                placeholder="e.g., ⚽ 🏀 🏐 or FB BB VB"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Description
              </label>
              <textarea
                className="w-full px-4 py-2 border rounded"
                rows="3"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700"
              >
                {editingSportsType ? 'Perbarui' : 'Buat'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="flex-1 bg-gray-600 text-white py-2 rounded hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sportsTypes.map((sport) => (
          <div key={sport.id} className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-2">
                {sport.icon && (
                  <span className="text-2xl">{sport.icon}</span>
                )}
                <h3 className="text-xl font-semibold">{sport.name}</h3>
              </div>
            </div>

            {sport.description && (
              <p className="text-gray-600 mb-4">{sport.description}</p>
            )}

            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(sport)}
                className="flex-1 bg-yellow-600 text-white px-3 py-2 rounded hover:bg-yellow-700 text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(sport.id)}
                className="flex-1 bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700 text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {sportsTypes.length === 0 && (
        <p className="text-center text-gray-500 py-8">
          No sports types found. Create your first sports type!
        </p>
      )}
    </div>
  );
}
