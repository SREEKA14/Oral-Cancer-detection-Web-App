import { logout } from "../utils/auth";

export default function Navbar() {
  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-sky-700">
            OralCare AI
          </h1>
          <p className="text-sm text-gray-500">
            AI Oral Cancer Screening
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-5 py-2 rounded-xl"
        >
          Logout
        </button>
      </div>
    </header>
  );
}