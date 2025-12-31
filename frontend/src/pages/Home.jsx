import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { eventsAPI } from '../api/events';

export default function Home() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await eventsAPI.getAll();
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Event</h1>

      {loading ? (
        <p>Memuat...</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
            >
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-semibold">{event.name}</h2>
                {event.is_active && (
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                    Aktif
                  </span>
                )}
              </div>

              <p className="text-gray-600 mb-4">{event.description}</p>

              <div className="text-sm text-gray-500 mb-4">
                {event.start_date && (
                  <p>
                    📅 {new Date(event.start_date).toLocaleDateString('id-ID')} -{' '}
                    {new Date(event.end_date).toLocaleDateString('id-ID')}
                  </p>
                )}
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-600">
                  {event.teams?.length || 0} Tim
                </span>
                <span className="text-gray-600">
                  {event.matches?.length || 0} Pertandingan
                </span>
              </div>

              <Link
                to={`/matches?event_id=${event.id}`}
                className="mt-4 block text-center bg-gradient-to-r from-orange-500 to-red-500 text-white py-2 rounded-lg hover:from-orange-600 hover:to-red-600 transition"
              >
                Lihat Pertandingan
              </Link>
            </div>
          ))}
        </div>
      )}

      {!loading && events.length === 0 && (
        <p className="text-center text-gray-500">Belum ada event tersedia</p>
      )}
    </div>
  );
}
