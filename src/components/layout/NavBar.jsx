import { useNavigate, Link } from 'react-router-dom';
import { authStore } from '../../store/auth.store';

const Navbar = () => {
  const navigate = useNavigate();
  const user = authStore.getUser();
  const isAdmin = authStore.hasRole('ROLE_ADMIN');

  const handleLogout = () => {
    authStore.clear();
    navigate('/login');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 px-6 py-3 flex justify-between items-center shadow-sm">
      <div className="flex items-center gap-6">
        <Link to="/" className="text-xl font-bold text-gray-900 tracking-tight">
          Mon App
        </Link>
        <div className="flex gap-4 text-sm font-medium">
          <Link
            to="/"
            className="text-gray-600 hover:text-blue-600 transition-colors"
          >
            Dashboard
          </Link>
          {isAdmin && (
            <Link
              to="/admin"
              className="text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-1"
            >
              <span>🔒</span> Admin
            </Link>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4">
        {user && (
          <span className="text-sm text-gray-500">
            Bonjour, <span className="font-semibold text-gray-800">{user.username || user.email}</span>
          </span>
        )}
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition"
        >
          Se déconnecter
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
