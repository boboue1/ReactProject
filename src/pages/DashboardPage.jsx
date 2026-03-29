import Navbar from "../components/layout/NavBar";

const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <Navbar />
      <div className="p-6 bg-white rounded-2xl shadow-md w-full max-w-4xl mt-10">
      <h1 className="text-3xl font-bold text-gray-800">
        Bienvenue sur le Dashboard 🎉
      </h1>
      </div>
    </div>
  );
};

export default DashboardPage;