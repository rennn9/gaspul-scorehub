import { Link } from 'react-router-dom';

export default function Admin() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard Admin</h1>

      <div className="grid grid-cols-2 gap-4 max-w-3xl">
        <Link
          to="/admin/events"
          className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition"
        >
          <div className="text-3xl mb-2">🎪</div>
          <h2 className="text-lg font-semibold mb-1">Event</h2>
          <p className="text-sm text-gray-600">Kelola event dan turnamen</p>
        </Link>

        <Link
          to="/admin/teams"
          className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition"
        >
          <div className="text-3xl mb-2">👥</div>
          <h2 className="text-lg font-semibold mb-1">Tim</h2>
          <p className="text-sm text-gray-600">Kelola tim</p>
        </Link>

        <Link
          to="/admin/matches"
          className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition"
        >
          <div className="text-3xl mb-2">⚽</div>
          <h2 className="text-lg font-semibold mb-1">Pertandingan</h2>
          <p className="text-sm text-gray-600">Kelola pertandingan dan skor</p>
        </Link>

        <Link
          to="/admin/sports-types"
          className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition"
        >
          <div className="text-3xl mb-2">🏆</div>
          <h2 className="text-lg font-semibold mb-1">Jenis Olahraga</h2>
          <p className="text-sm text-gray-600">Kelola kategori olahraga</p>
        </Link>

        <Link
          to="/admin/users"
          className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition"
        >
          <div className="text-3xl mb-2">👤</div>
          <h2 className="text-lg font-semibold mb-1">Akun Admin</h2>
          <p className="text-sm text-gray-600">Kelola akun admin</p>
        </Link>
      </div>
    </div>
  );
}
