import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/NavBar';
import { getMe } from '../api/auth.api';
import { authStore } from '../store/auth.store';

const DashboardPage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const isAdmin = authStore.hasRole('ROLE_ADMIN');

  useEffect(() => {
    getMe()
      .then(setProfile)
      .catch(() => setError('Impossible de charger votre profil.'))
      .finally(() => setLoading(false));
  }, []);

  const formatDate = (dateStr) => {
    if (!dateStr) return '—';
    return new Date(dateStr).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="pt-20 px-6 max-w-4xl mx-auto">
        {/* Header */}
        <div className="mt-8 mb-6">
          {loading ? (
            <div className="h-8 w-48 bg-gray-200 rounded animate-pulse" />
          ) : (
            <h1 className="text-3xl font-bold text-gray-900">
              Bonjour, {profile?.nom} 👋
            </h1>
          )}
          <p className="text-gray-500 mt-1">Voici votre espace personnel.</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl mb-6 text-sm">
            {error}
          </div>
        )}

        {/* Carte profil */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <span>👤</span> Mon profil
          </h2>

          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-5 bg-gray-100 rounded animate-pulse" />
              ))}
            </div>
          ) : profile ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InfoRow label="Nom" value={profile.nom} />
              <InfoRow label="Email" value={profile.email} />
              <InfoRow
                label="Rôle"
                value={
                  profile.roles?.includes('ROLE_ADMIN') ? (
                    <span className="inline-flex items-center gap-1 bg-purple-100 text-purple-700 text-xs font-semibold px-2 py-1 rounded-full">
                      🔒 Administrateur
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-1 rounded-full">
                      👤 Utilisateur
                    </span>
                  )
                }
              />
              <InfoRow label="Inscrit le" value={formatDate(profile.date_inscription)} />
            </div>
          ) : null}
        </div>

        {/* Accès rapides */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {isAdmin && (
            <button
              onClick={() => navigate('/admin')}
              className="bg-purple-600 hover:bg-purple-700 text-white rounded-2xl p-6 text-left transition shadow-sm"
            >
              <div className="text-2xl mb-2">🔒</div>
              <div className="font-semibold text-lg">Panneau Admin</div>
              <div className="text-purple-200 text-sm mt-1">Gérer les utilisateurs</div>
            </button>
          )}
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6">
            <div className="text-2xl mb-2">✅</div>
            <div className="font-semibold text-lg text-blue-800">Compte actif</div>
            <div className="text-blue-500 text-sm mt-1">Vous êtes bien connecté</div>
          </div>
        </div>
      </main>
    </div>
  );
};

const InfoRow = ({ label, value }) => (
  <div className="flex flex-col gap-1">
    <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">{label}</span>
    <span className="text-gray-800 font-medium">{value}</span>
  </div>
);

export default DashboardPage;
