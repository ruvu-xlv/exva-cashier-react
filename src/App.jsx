import { ShoppingBag, Info } from "lucide-react";
import "./App.css";
import useTitle from "./hooks/useTitle";

function App() {
  useTitle("Home");
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-100 via-green-200 to-green-400 relative overflow-hidden select-none">

      {/* 🌿 efek background gelembung cahaya */}
      <div className="absolute w-72 h-72 bg-green-300 rounded-full blur-3xl opacity-30 top-10 left-10 animate-pulse"></div>
      <div className="absolute w-96 h-96 bg-green-400 rounded-full blur-3xl opacity-30 bottom-10 right-10 animate-pulse"></div>

      {/* 🌱 efek partikel kecil lembut */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-green-500/40 rounded-full animate-float"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${6 + Math.random() * 5}s`,
            }}
          ></div>
        ))}
      </div>

      {/* 🌤️ isi utama */}
      <div className="text-center p-10 bg-white/70 rounded-3xl shadow-2xl backdrop-blur-md border border-green-200 animate-fadeIn z-10">
        <h1 className="text-7xl font-extrabold text-green-700 tracking-wider drop-shadow-[0_0_20px_rgba(34,197,94,0.3)] animate-glow">
          exva
        </h1>
        <p className="mt-3 text-lg text-green-800">
          <span className="block">Welcome to our shop</span>
          <span className="block">please log in before ordering</span>
        </p>

        {/* 💫 tombol */}
        <div className="mt-8 flex justify-center gap-6">
          <a href="/login" className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-7 rounded-full shadow-md hover:shadow-lg transition-all transform hover:scale-105 active:scale-95">
            <ShoppingBag size={20} />
            Login
          </a>
          <button className="flex items-center gap-2 border-2 border-green-700 text-green-700 hover:bg-green-600 hover:text-white font-semibold py-3 px-7 rounded-full transition-all transform hover:scale-105 active:scale-95">
            <Info size={20} />
            About
          </button>
        </div>
      </div>

      {/* 🌾 footer */}
      <footer className="mt-12 text-green-900 text-sm opacity-80 animate-fadeIn z-10">
        © {new Date().getFullYear()} <span className="font-semibold">exva cashier</span> — crafted with 💚 by your friendly dev
      </footer>
    </div>
  );
}

export default App;
