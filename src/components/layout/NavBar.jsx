import { useState, useEffect, useRef } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { authStore } from "../../store/auth.store";

const NAV_LINKS = [
  { to: "/", label: "Dashboard", adminOnly: false },
  { to: "/admin", label: "Admin", adminOnly: true },
];

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = authStore.getUser();
  const isAdmin = authStore.hasRole("ROLE_ADMIN");

  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    authStore.clear();
    navigate("/login");
  };

  const links = NAV_LINKS.filter((l) => !l.adminOnly || isAdmin);

  const linkClass = (to) =>
    location.pathname === to
      ? "text-[#3b82f6] font-semibold transition-colors duration-200"
      : "text-[#6b7280] hover:text-[#3b82f6] transition-colors duration-200";

  return (
    <>
      <nav
        ref={menuRef}
        style={{ fontFamily: "'Sora', system-ui, sans-serif" }}
        className="fixed top-0 left-0 right-0 z-50 bg-[#0b0c14]/90 backdrop-blur-md border-b border-[#1f2535] shadow-lg"
      >
        <div className="px-10 h-16 flex items-center justify-between relative">

          {/* Logo */}
          <Link
            to="/"
            className="text-xl font-extrabold tracking-tight text-[#f3f4f6] hover:text-[#3b82f6] transition-colors duration-200"
          >
            Instant
          </Link>

          {/* Desktop nav — centré */}
          <div className="hidden md:flex items-center gap-6 text-sm font-semibold absolute left-1/2 -translate-x-1/2">
            {links.map(({ to, label }) => (
              <Link key={to} to={to} className={linkClass(to)}>
                {label}
              </Link>
            ))}
          </div>

          {/* Utilisateur + Déconnexion */}
          <div className="hidden md:flex items-center gap-4 text-sm">
            {user && (
              <span className="text-[#6b7280]">
                Bonjour,{" "}
                <span className="font-semibold text-[#f3f4f6]">
                  {user.username || user.email}
                </span>
              </span>
            )}
            <button
              onClick={handleLogout}
              className="bg-[#3b82f6] hover:bg-[#1d4ed8] active:scale-95 text-white px-4 py-2 rounded-lg text-sm font-bold transition-all duration-200"
              style={{ boxShadow: "0 4px 18px rgba(59,130,246,.35)" }}
            >
              Déconnexion
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-[#6b7280] hover:text-[#f3f4f6] transition-colors duration-200 p-1"
            onClick={() => setOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            {open ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            open ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-[#111827] border-t border-[#1f2535] px-10 py-4 flex flex-col gap-4 text-sm">
            {links.map(({ to, label }) => (
              <Link key={to} to={to} className={linkClass(to)} onClick={() => setOpen(false)}>
                {label}
              </Link>
            ))}

            {user && (
              <span className="text-[#6b7280]">
                Bonjour,{" "}
                <span className="font-semibold text-[#f3f4f6]">
                  {user.username || user.email}
                </span>
              </span>
            )}

            <button
              onClick={handleLogout}
              className="bg-[#3b82f6] hover:bg-[#1d4ed8] active:scale-95 text-white px-4 py-2 rounded-lg text-sm font-bold transition-all duration-200 w-full"
              style={{ boxShadow: "0 4px 18px rgba(59,130,246,.35)" }}
            >
              Déconnexion
            </button>
          </div>
        </div>
      </nav>

      {/* Spacer */}
      <div className="h-16" />
    </>
  );
};

export default Navbar;
