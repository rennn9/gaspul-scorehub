import { useEffect, useState } from 'react';
import { matchesAPI } from '../../api/matches';
import { eventsAPI } from '../../api/events';
import { teamsAPI } from '../../api/teams';
import { sportsTypesAPI } from '../../api/sportsTypes';

export default function AdminMatches() {
  const [matches, setMatches] = useState([]);
  const [events, setEvents] = useState([]);
  const [teams, setTeams] = useState([]);
  const [sportsTypes, setSportsTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingMatch, setEditingMatch] = useState(null);
  const [formData, setFormData] = useState({
    event_id: '',
    sports_type_id: '',
    team_a_id: '',
    team_b_id: '',
    team_a_score: '',
    team_b_score: '',
    match_date: '',
    location: '',
    status: 'scheduled',
    notes: '',
  });

  useEffect(() => {
    fetchMatches();
    fetchEvents();
    fetchTeams();
    fetchSportsTypes();
  }, []);

  const fetchMatches = async () => {
    try {
      const response = await matchesAPI.getAll();
      setMatches(response.data);
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

  const fetchTeams = async () => {
    try {
      const response = await teamsAPI.getAll();
      setTeams(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchSportsTypes = async () => {
    try {
      const response = await sportsTypesAPI.getAll();
      setSportsTypes(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const submitData = {
        ...formData,
        team_a_score: formData.team_a_score === '' ? null : parseInt(formData.team_a_score),
        team_b_score: formData.team_b_score === '' ? null : parseInt(formData.team_b_score),
      };

      if (editingMatch) {
        await matchesAPI.update(editingMatch.id, submitData);
        alert('Pertandingan berhasil diperbarui!');
      } else {
        await matchesAPI.create(submitData);
        alert('Pertandingan berhasil dibuat!');
      }
      resetForm();
      fetchMatches();
    } catch (error) {
      alert('Gagal menyimpan pertandingan');
      console.error(error);
    }
  };

  const handleEdit = (match) => {
    setEditingMatch(match);
    setFormData({
      event_id: match.event_id,
      sports_type_id: match.sports_type_id || '',
      team_a_id: match.team_a_id,
      team_b_id: match.team_b_id,
      team_a_score: match.team_a_score ?? '',
      team_b_score: match.team_b_score ?? '',
      match_date: match.match_date ? new Date(match.match_date).toISOString().slice(0, 16) : '',
      location: match.location || '',
      status: match.status,
      notes: match.notes || '',
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Apakah Anda yakin ingin menghapus pertandingan ini?')) return;

    try {
      await matchesAPI.delete(id);
      alert('Pertandingan berhasil dihapus!');
      fetchMatches();
    } catch (error) {
      alert('Gagal menghapus pertandingan');
      console.error(error);
    }
  };

  const resetForm = () => {
    setFormData({
      event_id: '',
      sports_type_id: '',
      team_a_id: '',
      team_b_id: '',
      team_a_score: '',
      team_b_score: '',
      match_date: '',
      location: '',
      status: 'scheduled',
      notes: '',
    });
    setEditingMatch(null);
    setShowForm(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'finished':
        return 'bg-gray-100 text-gray-800';
      case 'ongoing':
        return 'bg-green-100 text-green-800';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'finished':
        return 'Selesai';
      case 'ongoing':
        return 'Berlangsung';
      case 'scheduled':
        return 'Terjadwal';
      default:
        return status;
    }
  };

  // Filter teams by selected event
  const filteredTeams = formData.event_id
    ? teams.filter(team => team.event_id === parseInt(formData.event_id))
    : teams;

  if (loading) return <div className="p-8">Memuat...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Kelola Pertandingan</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {showForm ? 'Batal' : 'Tambah Pertandingan Baru'}
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">
            {editingMatch ? 'Edit Pertandingan' : 'Buat Pertandingan Baru'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Event *
                </label>
                <select
                  required
                  className="w-full px-4 py-2 border rounded"
                  value={formData.event_id}
                  onChange={(e) =>
                    setFormData({ ...formData, event_id: e.target.value, team_a_id: '', team_b_id: '' })
                  }
                >
                  <option value="">Pilih Event</option>
                  {events.map((event) => (
                    <option key={event.id} value={event.id}>
                      {event.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Jenis Olahraga
                </label>
                <select
                  className="w-full px-4 py-2 border rounded"
                  value={formData.sports_type_id}
                  onChange={(e) =>
                    setFormData({ ...formData, sports_type_id: e.target.value })
                  }
                >
                  <option value="">Pilih Jenis Olahraga</option>
                  {sportsTypes.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.icon} {type.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Tim A *
                </label>
                <select
                  required
                  className="w-full px-4 py-2 border rounded"
                  value={formData.team_a_id}
                  onChange={(e) =>
                    setFormData({ ...formData, team_a_id: e.target.value })
                  }
                >
                  <option value="">Pilih Tim A</option>
                  {filteredTeams.map((team) => (
                    <option key={team.id} value={team.id}>
                      {team.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Tim B *
                </label>
                <select
                  required
                  className="w-full px-4 py-2 border rounded"
                  value={formData.team_b_id}
                  onChange={(e) =>
                    setFormData({ ...formData, team_b_id: e.target.value })
                  }
                >
                  <option value="">Pilih Tim B</option>
                  {filteredTeams.map((team) => (
                    <option key={team.id} value={team.id}>
                      {team.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Skor Tim A
                </label>
                <input
                  type="number"
                  min="0"
                  className="w-full px-4 py-2 border rounded"
                  value={formData.team_a_score}
                  onChange={(e) =>
                    setFormData({ ...formData, team_a_score: e.target.value })
                  }
                  placeholder="Kosongkan jika belum ada"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Skor Tim B
                </label>
                <input
                  type="number"
                  min="0"
                  className="w-full px-4 py-2 border rounded"
                  value={formData.team_b_score}
                  onChange={(e) =>
                    setFormData({ ...formData, team_b_score: e.target.value })
                  }
                  placeholder="Kosongkan jika belum ada"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Tanggal & Waktu Pertandingan *
                </label>
                <input
                  type="datetime-local"
                  required
                  className="w-full px-4 py-2 border rounded"
                  value={formData.match_date}
                  onChange={(e) =>
                    setFormData({ ...formData, match_date: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Status
                </label>
                <select
                  className="w-full px-4 py-2 border rounded"
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value })
                  }
                >
                  <option value="scheduled">Terjadwal</option>
                  <option value="ongoing">Berlangsung</option>
                  <option value="finished">Selesai</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Lokasi
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                placeholder="Contoh: Lapangan Utama"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Catatan
              </label>
              <textarea
                className="w-full px-4 py-2 border rounded"
                rows="3"
                value={formData.notes}
                onChange={(e) =>
                  setFormData({ ...formData, notes: e.target.value })
                }
                placeholder="Catatan tambahan (opsional)"
              />
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700"
              >
                {editingMatch ? 'Perbarui' : 'Buat'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="flex-1 bg-gray-600 text-white py-2 rounded hover:bg-gray-700"
              >
                Batal
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-4">
        {matches.map((match) => (
          <div key={match.id} className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold text-lg">{match.event?.name}</h3>
                <p className="text-sm text-gray-600">
                  {match.sports_type?.icon} {match.sports_type?.name}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`px-3 py-1 rounded text-sm ${getStatusColor(
                    match.status
                  )}`}
                >
                  {getStatusText(match.status)}
                </span>
                <button
                  onClick={() => handleEdit(match)}
                  className="bg-yellow-600 text-white px-3 py-1 rounded hover:bg-yellow-700 text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(match.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm"
                >
                  Hapus
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center mb-4">
              <div className="flex-1 text-center">
                <p className="font-semibold text-lg">{match.team_a?.name}</p>
                {match.team_a_score !== null && (
                  <p className="text-3xl font-bold text-blue-600">
                    {match.team_a_score}
                  </p>
                )}
              </div>

              <div className="px-4 text-2xl font-bold text-gray-400">VS</div>

              <div className="flex-1 text-center">
                <p className="font-semibold text-lg">{match.team_b?.name}</p>
                {match.team_b_score !== null && (
                  <p className="text-3xl font-bold text-blue-600">
                    {match.team_b_score}
                  </p>
                )}
              </div>
            </div>

            <div className="flex justify-between text-sm text-gray-600 border-t pt-3">
              <span>
                📅 {new Date(match.match_date).toLocaleString('id-ID')}
              </span>
              {match.location && <span>📍 {match.location}</span>}
            </div>

            {match.notes && (
              <p className="mt-3 text-sm text-gray-600 italic bg-gray-50 p-2 rounded">
                {match.notes}
              </p>
            )}
          </div>
        ))}
      </div>

      {!loading && matches.length === 0 && (
        <p className="text-center text-gray-500 py-8">
          Tidak ada pertandingan. Buat pertandingan pertama Anda!
        </p>
      )}
    </div>
  );
}
