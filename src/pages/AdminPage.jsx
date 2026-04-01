import { useEffect, useState } from 'react';
import Navbar from '../components/layout/NavBar';
import { getUsers } from '../features/users/users.api';
import './AdminPage.css';

const SECTIONS = [
  { id: 'users',  label: 'Utilisateurs', icon: '👥', desc: 'Gestion des comptes' },
  { id: 'events', label: 'Événements',   icon: '📅', desc: 'À venir' },
];

export default function AdminPage() {
  const [users, setUsers]                 = useState([]);
  const [loading, setLoading]             = useState(true);
  const [error, setError]                 = useState(null);
  const [search, setSearch]               = useState('');
  const [activeSection, setActiveSection] = useState('users');

  useEffect(() => {
    getUsers()
      .then(setUsers)
      .catch(() => setError('Impossible de charger les utilisateurs.'))
      .finally(() => setLoading(false));
  }, []);

  const fmt = (d) =>
    d ? new Date(d).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' }) : '—';

  const filtered = users.filter(
    (u) =>
      u.nom?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase()),
  );

  const current = SECTIONS.find((s) => s.id === activeSection);

  return (
    <div className="ap-root">
      <Navbar />

      <div className="ap-body">
        {/* ══ SIDEBAR ══ */}
        <aside className="ap-sidebar">
          <div className="ap-sb-brand">
            <p className="ap-sb-eyebrow">Administration</p>
            <p className="ap-sb-title">Panneau admin</p>
          </div>

          <nav className="ap-sb-nav">
            {SECTIONS.map((s) => (
              <button
                key={s.id}
                className={`ap-sb-btn${activeSection === s.id ? ' active' : ''}`}
                onClick={() => setActiveSection(s.id)}
              >
                <span className="ap-sb-ico">{s.icon}</span>
                <span className="ap-sb-txt">
                  <span className="ap-sb-main">{s.label}</span>
                  <span className="ap-sb-sub">{s.desc}</span>
                </span>
                {s.id === 'users' && !loading && (
                  <span className="ap-sb-badge">{users.length}</span>
                )}
              </button>
            ))}
          </nav>

          <div className="ap-sb-footer">Connecté en tant qu'admin</div>
        </aside>

        {/* ══ MAIN ══ */}
        <div className="ap-main">
          {/* Header */}
          <div className="ap-header">
            <div className="ap-header-row">
              <div>
                <h1 className="ap-page-title">{current?.icon} {current?.label}</h1>
                <p className="ap-page-sub">
                  {activeSection === 'users'  && 'Liste complète de tous les comptes inscrits'}
                  {activeSection === 'events' && 'Gestion des événements de la plateforme'}
                </p>
              </div>
              {activeSection === 'users' && !loading && (
                <span className="ap-page-badge">
                  {users.length} compte{users.length !== 1 ? 's' : ''}
                </span>
              )}
            </div>
            <div className="ap-divider" />
          </div>

          {/* Scrollable body */}
          <div className="ap-body-scroll">

            {/* ── Utilisateurs ── */}
            {activeSection === 'users' && (
              <div className="ap-fade">
                <div className="ap-search-wrap">
                  <div className="ap-search-inner">
                    <input
                      type="text"
                      className="ap-search"
                      placeholder="Rechercher par nom ou email…"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                </div>

                {error && <div className="ap-err">{error}</div>}

                <div className="ap-table-wrap">
                  {loading ? (
                    <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {[1,2,3,4,5].map((i) => <div key={i} className="ap-skel" style={{ height: 38 }} />)}
                    </div>
                  ) : filtered.length === 0 ? (
                    <div className="ap-empty">
                      <div className="ap-empty-ico">🔍</div>
                      <p className="ap-empty-text">Aucun utilisateur trouvé</p>
                    </div>
                  ) : (
                    <table className="ap-table">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Nom</th>
                          <th>Email</th>
                          <th>Inscrit le</th>
                          <th>Statut</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filtered.map((user) => {
                          const on = user.status === 'actif' || user.actif === true;
                          return (
                            <tr key={user.id}>
                              <td className="td-id">#{user.id}</td>
                              <td className="td-name">{user.nom}</td>
                              <td className="td-email">{user.email}</td>
                              <td className="td-date">{fmt(user.date_inscription)}</td>
                              <td>
                                <span className={`ap-status ${on ? 'on' : 'off'}`}>
                                  <span className="ap-status-dot" />
                                  {on ? 'Actif' : 'Inactif'}
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            )}

            {/* ── Événements ── */}
            {activeSection === 'events' && (
              <div className="ap-fade ap-ev-wrap">
                <p className="ap-ev-title">Aucun événement pour l'instant</p>
                <p className="ap-ev-sub">
                  La création d'événements n'est pas encore disponible et sera ajoutée prochainement.
                </p>
                <span className="ap-ev-pill">Disponible prochainement</span>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}