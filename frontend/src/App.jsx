import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Matches from './pages/Matches';
import Login from './pages/Login';
import Register from './pages/Register';
import Admin from './pages/Admin';
import AdminMatches from './pages/admin/AdminMatches';
import AdminEvents from './pages/admin/AdminEvents';
import AdminTeams from './pages/admin/AdminTeams';
import AdminSportsTypes from './pages/admin/AdminSportsTypes';
import AdminUsers from './pages/admin/AdminUsers';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/matches" element={<Matches />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/admin"
            element={
              <ProtectedRoute requireAdmin>
                <Admin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/matches"
            element={
              <ProtectedRoute requireAdmin>
                <AdminMatches />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/events"
            element={
              <ProtectedRoute requireAdmin>
                <AdminEvents />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/teams"
            element={
              <ProtectedRoute requireAdmin>
                <AdminTeams />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/sports-types"
            element={
              <ProtectedRoute requireAdmin>
                <AdminSportsTypes />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute requireAdmin>
                <AdminUsers />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
