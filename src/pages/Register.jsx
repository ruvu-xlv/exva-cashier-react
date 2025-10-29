import { useState } from "react";
import axios from "axios";
import { User, Mail, Lock, Eye, EyeOff, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useTitle from "../hooks/useTitle";

export default function Register() {

    useTitle("Register");

    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState(null);
    const navigate = useNavigate();

    const showAlert = (type, message) => {
        setAlert({ type, message });
        setTimeout(() => setAlert(null), 3000);
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        setAlert(null);

        if (password !== confirmPassword) {
            showAlert("error", "Password and confirmation do not match!");
            setLoading(false);
            return;
        }

        try {
            await axios.post("http://localhost:2008/api/auth/register", {
                name,
                username,
                email,
                password,
            });

            showAlert("success", "Registration successful! Please login");
            setTimeout(() => navigate("/login"), 1500);
        } catch (err) {
            showAlert("error", err.response?.data?.message || "Registration failed!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-green-200 to-green-400 overflow-hidden">
            {/* ✅ Floating Alert */}
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

            {/* ✅ Register Card */}
            <div className="bg-white/70 backdrop-blur-md p-10 rounded-3xl shadow-2xl border border-green-200 w-full max-w-md transition">
                <h2 className="text-3xl font-bold text-center text-green-700 mb-8">
                    Create your Exva Account
                </h2>

                <form onSubmit={handleRegister} className="space-y-4">
                    {/* Name */}
                    <div className="relative">
                        <User className="absolute left-3 top-3.5 text-green-500" size={20} />
                        <input
                            type="text"
                            placeholder="Full Name"
                            className="w-full p-3 pl-10 rounded-lg border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    {/* Username */}
                    <div className="relative">
                        <User className="absolute left-3 top-3.5 text-green-500" size={20} />
                        <input
                            type="text"
                            placeholder="Username"
                            className="w-full p-3 pl-10 rounded-lg border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>

                    {/* Email */}
                    <div className="relative">
                        <Mail className="absolute left-3 top-3.5 text-green-500" size={20} />
                        <input
                            type="email"
                            placeholder="Email Address"
                            className="w-full p-3 pl-10 rounded-lg border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
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
                            className="w-full pl-10 pr-10 p-3 rounded-lg border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 flex items-center justify-center text-green-500 hover:text-green-700"
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>

                    {/* Confirm Password */}
                    <div className="relative flex items-center">
                        <Lock className="absolute left-3 text-green-500" size={20} />
                        <input
                            type={showConfirm ? "text" : "password"}
                            placeholder="Confirm Password"
                            className="w-full pl-10 pr-10 p-3 rounded-lg border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirm(!showConfirm)}
                            className="absolute right-3 flex items-center justify-center text-green-500 hover:text-green-700"
                        >
                            {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>

                    {/* Register button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-lg transition disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            "Loading..."
                        ) : (
                            <>
                                <UserPlus size={18} /> Register
                            </>
                        )}
                    </button>

                    {/* Link ke Login */}
                    <p className="text-center text-sm text-green-700 mt-4">
                        Already have an account?{" "}
                        <a
                            href="/login"
                            className="font-semibold text-green-800 hover:underline"
                        >
                            Click here to login
                        </a>
                    </p>
                </form>
            </div>
        </div>
    );
}
