import { useEffect, useState } from 'react';
import Navbar from '../components/layout/NavBar';
import { getMe } from '../api/auth.api';
import './DashboardPage.css';

const SECTIONS = [
  { id: 'profile',  label: 'Mon profil',   icon: '👤', desc: 'Mes informations' },
  { id: 'events',   label: 'Événements',   icon: '📅', desc: 'À venir' },
];

const DashboardPage = () => {
  const [profile, setProfile]           = useState(null);
  const [loading, setLoading]           = useState(true);
  const [error, setError]               = useState(null);
  const [activeSection, setActiveSection] = useState('profile');

  useEffect(() => {
    getMe()
      .then(setProfile)
      .catch(() => setError('Impossible de charger votre profil.'))
      .finally(() => setLoading(false));
  }, []);

  const formatDate = (d) =>
    d ? new Date(d).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }) : '—';

  const current = SECTIONS.find((s) => s.id === activeSection);

  return (
    <div className="dp-root">
      <Navbar />

      <div className="dp-body">

        {/* ══ SIDEBAR ══ */}
        <aside className="dp-sidebar">
          <div className="dp-sb-brand">
            <p className="dp-sb-eyebrow">Espace</p>
            <p className="dp-sb-title">Mon compte</p>
          </div>

          <nav className="dp-sb-nav">
            {SECTIONS.map((s) => (
              <button
                key={s.id}
                className={`dp-sb-btn${activeSection === s.id ? ' active' : ''}`}
                onClick={() => setActiveSection(s.id)}
              >
                <span className="dp-sb-ico">{s.icon}</span>
                <span className="dp-sb-txt">
                  <span className="dp-sb-main">{s.label}</span>
                  <span className="dp-sb-sub">{s.desc}</span>
                </span>
              </button>
            ))}
          </nav>

          {profile && (
            <div className="dp-sb-footer">
              {profile.nom || profile.email}
            </div>
          )}
        </aside>

        {/* ══ MAIN ══ */}
        <div className="dp-main">

          {/* Header */}
          <div className="dp-header">
            <div className="dp-header-row">
              <div>
                <h1 className="dp-page-title">{current?.icon} {current?.label}</h1>
                <p className="dp-page-sub">
                  {activeSection === 'profile'  && 'Vos informations personnelles'}
                  {activeSection === 'events'   && 'Événements de la plateforme'}
                </p>
              </div>
            </div>
            <div className="dp-divider" />
          </div>

          {/* Content */}
          <div className="dp-body-scroll">

            {/* ── Mon profil ── */}
            {activeSection === 'profile' && (
              <div className="dp-fade">
                {error && <div className="dp-error">{error}</div>}

                {loading ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {[1,2,3,4].map((i) => <div key={i} className="dp-skel" style={{ height: 36 }} />)}
                  </div>
                ) : profile && (
                  <div className="dp-card">
                    <div className="dp-grid">
                      <InfoRow label="Nom"        value={profile.nom} />
                      <InfoRow label="Email"      value={profile.email} />
                      <InfoRow label="Inscrit le" value={formatDate(profile.date_inscription)} />
                      <InfoRow
                        label="Rôle"
                        value={
                          <span className={`dp-badge ${profile.roles?.includes('ROLE_ADMIN') ? 'dp-badge-admin' : 'dp-badge-user'}`}>
                            {profile.roles?.includes('ROLE_ADMIN') ? 'Administrateur' : 'Utilisateur'}
                          </span>
                        }
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ── Événements ── */}
            {activeSection === 'events' && (
              <div className="dp-fade dp-ev-wrap">
                <div className="dp-ev-box">📅</div>
                <p className="dp-ev-title">Aucun événement pour l'instant</p>
                <p className="dp-ev-sub">
                  La création d'événements n'est pas encore disponible et sera ajoutée prochainement.
                </p>
                <span className="dp-ev-pill">🚧 Disponible prochainement</span>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

const InfoRow = ({ label, value }) => (
  <div>
    <p className="dp-info-label">{label}</p>
    <p className="dp-info-value">{value}</p>
  </div>
);

export default DashboardPage;