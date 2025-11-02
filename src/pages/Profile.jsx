import useTitle from "../hooks/useTitle";
import { useEffect, useState } from "react";
import api from "../services/api";
import { User, Mail, Phone, MapPin, Settings, Shield, Undo2 } from "lucide-react";

export default function Profile() {
  useTitle("Profile");

  const [user, setUser] = useState(null);

  useEffect(() => {
    api
      .get("/auth/user")
      .then((res) => setUser(res.data.user))
      .catch((err) => console.error("Failed to load user data...", err));
  }, []);

  if (!user) {
    return (
      <div className="pt-28 flex justify-center">
        <div className="loading loading-spinner text-green-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4">
      {/* Page Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/20 mb-4">
          <User className="w-10 h-10 text-green-600" />
        </div>
        <h1 className="text-4xl font-extrabold text-black">My Profile</h1>
        <p className="text-black/70 mt-2">
          Manage your personal information and account settings
        </p>
      </div>

      {/* Profile Card */}
      <div className="bg-base-200 rounded-box p-8 shadow-xl mb-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="avatar">
            <div className="w-32 rounded-full ring ring-green-400 ring-offset-base-100 ring-offset-2">
              <img
                src={user.avatar || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                alt="User Avatar"
              />
            </div>
          </div>

          <div className="flex-1">
            <h2 className="text-3xl font-bold text-white mb-1">
              {user.name}
            </h2>
            <p className="text-white/70 mb-4">
              Member since {new Date(user.createdAt).toLocaleDateString("id-ID", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </p>

            <div className="space-y-3 text-white/80">
              <p className="flex items-center gap-2">
                <User className="w-5 h-5 text-green-400" />
                <span className="font-semibold">Username:</span> {user.username || "-"}
              </p>

              <p className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-400" />
                <span className="font-semibold">Role:</span> {user.role || "User"}
              </p>

              <p className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-green-400" />
                <span className="font-semibold">Email:</span> {user.email}
              </p>

              <p className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-green-400" />
                <span className="font-semibold">Phone:</span> {user.phone || "-"}
              </p>

              <p className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-green-400" />
                <span className="font-semibold">Address:</span> {user.address || "Not provided"}
              </p>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <button className="btn btn-success btn-outline flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Edit Profile
              </button>

              <a href="/dashboard" className="btn btn-warning btn-outline flex items-center gap-2">
                <Undo2 className="w-5 h-5" />
                Go Back
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Extra Info */}
      <div className="bg-gradient-to-r from-green-400 via-green-200 to-green-400 text-black rounded-box gap-4 mb-20 p-6 shadow-lg">
        <h2 className="text-xl font-bold mb-2">Your Account is Secure 🔒</h2>
        <p className="text-black/80">
          Keep your personal information up to date to ensure smooth transactions and access to our latest features.
        </p>
      </div>
    </div>
  );
}