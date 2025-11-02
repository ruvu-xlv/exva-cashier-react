import { useState } from "react";
import { LogIn, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useTitle from "../hooks/useTitle";
import api from "../services/api";

export default function Login() {
    useTitle("Login");

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState(null);
    const navigate = useNavigate();

    const showAlert = (type, message) => {
        setAlert({ type, message });
        setTimeout(() => setAlert(null), 3000);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setAlert(null);

        try {
            const res = await api.post("/auth/login", { email, password });
            const token = res.data?.token;
            if (token) localStorage.setItem("token", token);

            showAlert("success", "Login successful! Welcome 👋");
            setTimeout(() => navigate("/dashboard"), 1500);
        } catch (err) {
            showAlert("error", err.response?.data?.message || "Wrong email or password!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-100 via-green-200 to-green-400 relative overflow-hidden px-4">

            {/* 🌿 ALERT */}
            {alert && (
                <div
                    className={`fixed top-6 left-1/2 -translate-x-1/2 
                    w-[90%] sm:w-96 text-center backdrop-blur-md shadow-xl z-50 rounded-xl p-3 
                    ${alert.type === "success"
                            ? "bg-green-600 text-white"
                            : alert.type === "error"
                                ? "bg-red-600 text-white"
                                : "bg-blue-600 text-white"
                        }`}
                >
                    <span className="text-base">{alert.message}</span>
                </div>
            )}

            {/* 🌱 LOGIN CARD */}
            <div className="bg-white/70 backdrop-blur-md p-6 sm:p-10 rounded-3xl shadow-2xl border border-green-200 w-[90%] sm:w-full max-w-md transition hover:scale-[1.02]">
                <h2 className="text-3xl font-bold text-center text-green-700 mb-8">
                    Login to Exva
                </h2>

                <form onSubmit={handleLogin} className="space-y-4">
                    <div className="relative">
                        <Mail className="absolute left-3 top-3.5 text-green-500" size={20} />
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full text-black p-3 pl-10 rounded-lg border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="relative flex items-center">
                        <Lock className="absolute left-3 text-green-500" size={20} />
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            className="w-full text-black pl-10 pr-10 p-3 rounded-lg border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 text-green-500"
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-lg transition disabled:opacity-60"
                    >
                        {loading ? "Loading..." : <><LogIn size={18} /> Login</>}
                    </button>

                    <p className="text-center text-sm text-green-700 mt-4">
                        Don’t have an account yet?{" "}
                        <a href="/register" className="font-semibold text-green-800 hover:underline">
                            Register here
                        </a>
                    </p>
                </form>
            </div>
        </div>
    );
}