# Instant — Frontend React

Application web de gestion de comptes et d'événements, construite avec React et connectée à une API Symfony.

---

## Stack technique

| Outil | Rôle |
|---|---|
| React 19 | Framework UI |
| Vite | Bundler / serveur de développement |
| React Router v6 | Routage côté client |
| Axios | Client HTTP |
| React Hook Form + Zod | Formulaires et validation |
| JWT Decode | Décodage du token côté client |
| Tailwind CSS v4 | Styles utilitaires |
| CSS modules | Styles par page |

---

## Prérequis

- Node.js >= 18
- L'API Symfony doit tourner sur `http://127.0.0.1:8000`

---

## Installation

```bash
npm install
npm run dev
```

L'application est accessible sur `http://localhost:5173`.

---

## Scripts disponibles

```bash
npm run dev       # Démarre le serveur de développement
npm run build     # Compile pour la production
npm run preview   # Prévisualise le build de production
npm run lint      # Analyse du code avec ESLint
```

---

## Structure du projet

```
src/
├── api/
│   ├── client.js          # Instance Axios + intercepteurs (auth, refresh)
│   └── auth.api.js        # Endpoints login, getMe, refreshToken
├── components/
│   └── layout/
│       └── NavBar.jsx     # Barre de navigation responsive
├── features/
│   └── users/
│       └── users.api.js   # Endpoints utilisateurs
├── pages/
│   ├── LoginPage.jsx      # Connexion
│   ├── RegisterPage.jsx   # Inscription
│   ├── DashboardPage.jsx  # Espace personnel (profil + événements)
│   └── AdminPage.jsx      # Panneau admin (gestion utilisateurs)
├── router/
│   ├── index.jsx          # Définition des routes
│   └── ProtectedRoute.jsx # Garde de route (auth + rôle)
└── store/
    └── auth.store.js      # Gestion du token JWT (lecture, rôles, expiration)
```

---

## Sécurité

### Authentification JWT
Le backend émet un `access_token` et un `refresh_token` à la connexion. Le token est stocké dans le `localStorage` et automatiquement attaché à chaque requête via un intercepteur Axios.

### Refresh silencieux
Lorsque l'`access_token` expire (réponse `401`), le client tente automatiquement de le renouveler avec le `refresh_token`. Les requêtes en cours sont mises en attente puis relancées une fois le nouveau token obtenu. En cas d'échec, l'utilisateur est redirigé vers `/login`.

### Protection des routes
Le composant `ProtectedRoute` bloque l'accès avant tout rendu :
- Pages privées → vérification de l'authentification
- Page admin (`/admin`) → vérification du rôle `ROLE_ADMIN`

---

## Pages

| Route | Accès | Description |
|---|---|---|
| `/login` | Public | Connexion |
| `/register` | Public | Inscription |
| `/` | Authentifié | Dashboard (profil + événements) |
| `/admin` | ROLE_ADMIN | Gestion des utilisateurs |

---

## Backend

Ce frontend consomme une API REST Symfony disponible sur `http://127.0.0.1:8000/api`.

Endpoints utilisés :

| Méthode | Endpoint | Description |
|---|---|---|
| POST | `/login` | Connexion |
| POST | `/register` | Inscription |
| GET | `/me` | Profil de l'utilisateur connecté |
| GET | `/users` | Liste des utilisateurs (admin) |
| POST | `/auth/refresh` | Renouvellement du token |