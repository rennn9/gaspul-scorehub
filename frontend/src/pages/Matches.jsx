import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { matchesAPI } from '../api/matches';
import { sportsTypesAPI } from '../api/sportsTypes';

export default function Matches() {
  const [searchParams] = useSearchParams();
  const [matches, setMatches] = useState([]);
  const [sportsTypes, setSportsTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({
    status: searchParams.get('status') || '',
    event_id: searchParams.get('event_id') || '',
    sports_type_id: '',
  });

  useEffect(() => {
    fetchMatches();
    fetchSportsTypes();
  }, [filter]);

  const fetchMatches = async () => {
    try {
      const params = {};
      if (filter.status) params.status = filter.status;
      if (filter.event_id) params.event_id = filter.event_id;

      const response = await matchesAPI.getAll(params);

      // Sort matches: ongoing/earliest first, then scheduled, then finished
      const sortedMatches = response.data.sort((a, b) => {
        // Priority order: ongoing > scheduled > finished
        const statusPriority = {
          'ongoing': 1,
          'scheduled': 2,
          'finished': 3
        };

        const priorityA = statusPriority[a.status] || 4;
        const priorityB = statusPriority[b.status] || 4;

        // If same status, sort by match date (earliest first)
        if (priorityA === priorityB) {
          return new Date(a.match_date) - new Date(b.match_date);
        }

        return priorityA - priorityB;
      });

      // Filter by sports type if selected
      const filteredMatches = filter.sports_type_id
        ? sortedMatches.filter(m => m.sports_type_id === parseInt(filter.sports_type_id))
        : sortedMatches;

      setMatches(filteredMatches);
    } catch (error) {
      console.error('Error fetching matches:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSportsTypes = async () => {
    try {
      const response = await sportsTypesAPI.getAll();
      setSportsTypes(response.data);
    } catch (error) {
      console.error('Error fetching sports types:', error);
    }
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

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Pertandingan</h1>

      {/* Filters */}
      <div className="bg-white p-4 md:p-6 rounded-lg shadow-md mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <select
              className="w-full px-4 py-3 border rounded min-h-11 text-sm md:text-base"
              value={filter.status}
              onChange={(e) => setFilter({ ...filter, status: e.target.value })}
            >
              <option value="">Semua Status</option>
              <option value="scheduled">Terjadwal</option>
              <option value="ongoing">Berlangsung</option>
              <option value="finished">Selesai</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Jenis Olahraga</label>
            <select
              className="w-full px-4 py-3 border rounded min-h-11 text-sm md:text-base"
              value={filter.sports_type_id}
              onChange={(e) => setFilter({ ...filter, sports_type_id: e.target.value })}
            >
              <option value="">Semua Olahraga</option>
              {sportsTypes.map((sport) => (
                <option key={sport.id} value={sport.id}>
                  {sport.icon} {sport.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Matches List */}
      {loading ? (
        <p>Memuat...</p>
      ) : (
        <div className="space-y-4">
          {matches.map((match) => (
            <div
              key={match.id}
              className="bg-white rounded-lg shadow-md p-4 md:p-6 hover:shadow-lg transition"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start gap-3 mb-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-base md:text-lg">{match.event?.name}</h3>
                  <p className="text-sm text-gray-600">
                    {match.sports_type?.icon} {match.sports_type?.name}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded text-xs whitespace-nowrap ${getStatusColor(
                    match.status
                  )}`}
                >
                  {getStatusText(match.status)}
                </span>
              </div>

              <div className="flex justify-between items-center mb-4 gap-2">
                <div className="flex-1 text-center">
                  <p className="font-semibold text-sm md:text-base mb-1">{match.team_a?.name}</p>
                  {match.team_a_score !== null && (
                    <p className="text-2xl md:text-3xl font-bold text-blue-600">
                      {match.team_a_score}
                    </p>
                  )}
                </div>

                <div className="px-2 md:px-4 text-xl md:text-2xl font-bold text-gray-400">VS</div>

                <div className="flex-1 text-center">
                  <p className="font-semibold text-sm md:text-base mb-1">{match.team_b?.name}</p>
                  {match.team_b_score !== null && (
                    <p className="text-2xl md:text-3xl font-bold text-blue-600">
                      {match.team_b_score}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-between text-xs md:text-sm text-gray-600 border-t pt-3 gap-2">
                <span className="flex items-center gap-1">
                  📅 {new Date(match.match_date).toLocaleString('id-ID')}
                </span>
                {match.location && <span className="flex items-center gap-1">📍 {match.location}</span>}
              </div>

              {match.notes && (
                <p className="mt-3 text-xs md:text-sm text-gray-600 italic bg-gray-50 p-2 rounded">
                  {match.notes}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {!loading && matches.length === 0 && (
        <p className="text-center text-gray-500">Tidak ada pertandingan ditemukan</p>
      )}
    </div>
  );
}
