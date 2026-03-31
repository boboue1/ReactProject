import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/NavBar';
import { getUsers } from '../features/users/users.api';
import { authStore } from '../store/auth.store';

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  // Sécurité côté client : rediriger si pas admin
  useEffect(() => {
    if (!authStore.hasRole('ROLE_ADMIN')) {
      navigate('/');
    }
  }, [navigate]);

  useEffect(() => {
    getUsers()
      .then(setUsers)
      .catch(() => setError('Impossible de charger les utilisateurs.'))
      .finally(() => setLoading(false));
  }, []);

  const formatDate = (dateStr) => {
    if (!dateStr) return '—';
    return new Date(dateStr).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const filtered = users.filter(
    (u) =>
      u.nom?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="pt-20 px-6 max-w-5xl mx-auto">
        {/* Header */}
        <div className="mt-8 mb-6 flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
              🔒 Panneau Administrateur
            </h1>
            <p className="text-gray-500 mt-1">Liste de tous les utilisateurs inscrits.</p>
          </div>
          <div className="bg-purple-100 text-purple-700 text-sm font-semibold px-4 py-2 rounded-full">
            {users.length} utilisateur{users.length !== 1 ? 's' : ''}
          </div>
        </div>

        {/* Barre de recherche */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Rechercher par nom ou email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-sm px-4 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>

        {/* Erreur */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl mb-6 text-sm">
            {error}
          </div>
        )}

        {/* Tableau */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {loading ? (
            <div className="p-8 space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-10 bg-gray-100 rounded-lg animate-pulse" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="p-12 text-center text-gray-400">
              <div className="text-4xl mb-3">🔍</div>
              <p className="font-medium">Aucun utilisateur trouvé</p>
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100 text-left">
                  <th className="px-6 py-3 font-semibold text-gray-500 uppercase text-xs tracking-wide">ID</th>
                  <th className="px-6 py-3 font-semibold text-gray-500 uppercase text-xs tracking-wide">Nom</th>
                  <th className="px-6 py-3 font-semibold text-gray-500 uppercase text-xs tracking-wide">Email</th>
                  <th className="px-6 py-3 font-semibold text-gray-500 uppercase text-xs tracking-wide">Rôle</th>
                  <th className="px-6 py-3 font-semibold text-gray-500 uppercase text-xs tracking-wide">Inscrit le</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-gray-400 font-mono">#{user.id}</td>
                    <td className="px-6 py-4 font-medium text-gray-900">{user.nom}</td>
                    <td className="px-6 py-4 text-gray-600">{user.email}</td>
                    <td className="px-6 py-4">
                      {user.roles?.includes('ROLE_ADMIN') ? (
                        <span className="inline-flex items-center gap-1 bg-purple-100 text-purple-700 text-xs font-semibold px-2 py-1 rounded-full">
                          🔒 Admin
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-1 rounded-full">
                          👤 Utilisateur
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-gray-500">{formatDate(user.date_inscription)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminPage;
