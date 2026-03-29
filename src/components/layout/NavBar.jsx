import { useNavigate } from 'react-router-dom';
import { authStore } from '../../store/auth.store';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    authStore.clear();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-gray-800">Mon App</h1>
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition"
      >
        Se déconnecter
      </button>
    </nav>
  );
};

export default Navbar;