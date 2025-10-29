import { useState } from "react";
import axios from "axios";
import { LogIn, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useTitle from "../hooks/useTitle";

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

        // otomatis hilang setelah 3 detik
        setTimeout(() => {
            setAlert(null);
        }, 3000);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setAlert(null);

        try {
            const res = await axios.post("http://localhost:2008/api/auth/login", {
                email,
                password,
            });

            // Ambil token
            const token = res.data?.token;
            if (token) {
                localStorage.setItem("token", token);
            }

            showAlert("success", "Login successful! Welcome 👋");
            setTimeout(() => navigate("/dashboard"), 1500);
        } catch (err) {
            showAlert("error", err.response?.data?.message || "Wrong email or password!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-green-200 to-green-400 overflow-hidden">

            {/* ✅ floating alert di tengah atas */}
            {alert && (
                <div
                    className={`alert ${alert.type === "success"
                        ? "alert-success"
                        : alert.type === "error"
                            ? "alert-error"
                            : "alert-info"
                        } alert-soft shadow-xl fixed top-8 left-1/2 -translate-x-1/2 w-96 text-center 
       animate-fade-in-down transition-all duration-500 backdrop-blur-md z-[9999]`}
                >
                    <span className="text-base">{alert.message}</span>
                </div>
            )}

            {/* form login */}
            <div className="bg-white/70 backdrop-blur-md p-10 rounded-3xl shadow-2xl border border-green-200 w-full max-w-md transition">
                <h2 className="text-3xl font-bold text-center text-green-700 mb-8">
                    Login to Exva
                </h2>

                <form onSubmit={handleLogin} className="space-y-4">
                    {/* Email */}
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

                    {/* Password */}
                    <div className="relative flex items-center">
                        <Lock className="absolute left-3 text-green-500" size={20} />
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            className="w-full text-black pl-10 pr-10 p-3 rounded-lg border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 flex items-center justify-center text-green-500"
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>

                    {/* Tombol login */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-lg transition disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {loading ? "Loading..." : (
                            <>
                                <LogIn size={18} /> Login
                            </>
                        )}
                    </button>

                    {/* Link register */}
                    <p className="text-center text-sm text-green-700 mt-4">
                        Don’t have an account yet?{" "}
                        <a
                            href="/register"
                            className="font-semibold text-green-800 hover:underline"
                        >
                            Click here to register
                        </a>
                    </p>
                </form>
            </div>
        </div>
    );
}
