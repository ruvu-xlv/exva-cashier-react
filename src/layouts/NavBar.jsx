import { useEffect, useState } from "react";
import { User, Settings, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function NavBar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/auth/user")
      .then((res) => setUser(res.data.user))
      .catch((err) => console.error("Gagal memuat user", err));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <div className="navbar bg-green-600 text-white fixed top-0 left-0 w-full shadow-md z-50 rounded-b-3xl">
      <div className="flex-1 px-4 sm:px-6 lg:px-8">
        <a href="/dashboard" className="text-2xl font-bold text-black tracking-wide">
          EXVA
        </a>
      </div>

      <div className="flex-none px-4 sm:px-6 lg:px-8">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="flex items-center gap-2 rounded-full cursor-pointer select-none">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white">
              <img
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                alt="avatar"
                className="object-cover w-full h-full"
              />
            </div>
            <span className="text-black font-medium truncate max-w-[70px] sm:max-w-[120px]">
              {user ? user.username : "Loading..."}
            </span>
          </label>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-green-100 text-green-900 rounded-box z-50 mt-2 max-w-[90vw] p-2 shadow-md border border-green-400"
          >
            <li>
              <a href="/profile" className="flex items-center gap-2"><User className="w-4 h-4" /> Profile</a>
            </li>
            <li>
              <a className="flex items-center gap-2"><Settings className="w-4 h-4" /> Settings</a>
            </li>
            <li>
              <button onClick={handleLogout} className="flex items-center gap-2 w-full text-left">
                <LogOut className="w-4 h-4" /> Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}