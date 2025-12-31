import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { teamsAPI } from '../../api/teams';
import { eventsAPI } from '../../api/events';

export default function AdminTeams() {
  const [teams, setTeams] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingTeam, setEditingTeam] = useState(null);
  const [formData, setFormData] = useState({
    event_id: '',
    name: '',
    description: '',
  });

  useEffect(() => {
    fetchTeams();
    fetchEvents();
  }, []);

  const fetchTeams = async () => {
    try {
      const response = await teamsAPI.getAll();
      setTeams(response.data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchEvents = async () => {
    try {
      const response = await eventsAPI.getAll();
      setEvents(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingTeam) {
        await teamsAPI.update(editingTeam.id, formData);
        alert('Tim berhasil diperbarui!');
      } else {
        await teamsAPI.create(formData);
        alert('Tim berhasil dibuat!');
      }
      resetForm();
      fetchTeams();
    } catch (error) {
      alert('Error saving team');
      console.error(error);
    }
  };

  const handleEdit = (team) => {
    setEditingTeam(team);
    setFormData({
      event_id: team.event_id,
      name: team.name,
      description: team.description || '',
    });
    setShowForm(true);
    // Scroll to top to show form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!confirm('Apakah Anda yakin ingin menghapus tim ini?')) return;

    try {
      await teamsAPI.delete(id);
      alert('Tim berhasil dihapus!');
      fetchTeams();
    } catch (error) {
      alert('Error deleting team');
      console.error(error);
    }
  };

  const resetForm = () => {
    setFormData({
      event_id: '',
      name: '',
      description: '',
    });
    setEditingTeam(null);
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
        <h1 className="text-2xl md:text-3xl font-bold">Manage Teams</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-4 py-3 rounded hover:bg-blue-700 w-full sm:w-auto min-h-11 text-sm md:text-base"
        >
          {showForm ? 'Batal' : 'Tambah Tim Baru'}
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">
            {editingTeam ? 'Edit Tim' : 'Buat Tim Baru'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Event *
              </label>
              <select
                required
                className="w-full px-4 py-2 border rounded"
                value={formData.event_id}
                onChange={(e) =>
                  setFormData({ ...formData, event_id: e.target.value })
                }
              >
                <option value="">Select Event</option>
                {events.map((event) => (
                  <option key={event.id} value={event.id}>
                    {event.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Team Name *
              </label>
              <input
                type="text"
                required
                className="w-full px-4 py-2 border rounded"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
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

            <div className="flex flex-col sm:flex-row gap-2">
              <button
                type="submit"
                className="flex-1 bg-green-600 text-white py-3 rounded hover:bg-green-700 min-h-11"
              >
                {editingTeam ? 'Perbarui' : 'Buat'}
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

      <div className="space-y-4">
        {teams.map((team) => (
          <div key={team.id} className="bg-white p-4 md:p-6 rounded-lg shadow-md">
            <div className="flex flex-col sm:flex-row justify-between items-start">
              <div className="flex-1 mb-3 sm:mb-0">
                <h3 className="text-lg md:text-xl font-semibold mb-1">{team.name}</h3>
                <p className="text-sm text-blue-600 mb-2">
                  Event: {team.event?.name}
                </p>
                {team.description && (
                  <p className="text-gray-600 text-sm">{team.description}</p>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                <button
                  onClick={() => handleEdit(team)}
                  className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700 min-h-11 text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(team.id)}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 min-h-11 text-sm"
                >
                  Hapus
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {teams.length === 0 && (
        <p className="text-center text-gray-500 py-8">
          No teams found. Create your first team!
        </p>
      )}
    </div>
  );
}
