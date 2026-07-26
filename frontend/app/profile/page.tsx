"use client";

import { useEffect, useState } from "react";
import {
  User,
  Mail,
  Calendar,
  Home,
  Sparkles,
  Star,
  LogOut,
} from "lucide-react";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">

      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 text-white shadow-lg">

          <div className="flex items-center gap-6">

            <div className="w-24 h-24 rounded-full bg-white text-blue-600 flex items-center justify-center text-4xl font-bold">
              {user?.fullName?.charAt(0).toUpperCase() || "U"}
            </div>

            <div>
              <h1 className="text-4xl font-bold">
                {user?.fullName || "User"}
              </h1>

              <p className="mt-2 flex items-center gap-2">
                <Mail size={18} />
                {user?.email}
              </p>

              <p className="mt-2 flex items-center gap-2">
                <Calendar size={18} />
                Welcome to PropIntel AI
              </p>
            </div>

          </div>

        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">

          <div className="bg-white rounded-3xl p-6 shadow-sm border">
            <Home className="text-blue-600" size={32} />

            <p className="mt-4 text-gray-500">
              Properties
            </p>

            <h2 className="text-3xl font-bold">
              --
            </h2>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm border">
            <Sparkles className="text-indigo-600" size={32} />

            <p className="mt-4 text-gray-500">
              AI Reports
            </p>

            <h2 className="text-3xl font-bold">
              --
            </h2>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm border">
            <Star className="text-yellow-500" size={32} />

            <p className="mt-4 text-gray-500">
              Average Score
            </p>

            <h2 className="text-3xl font-bold">
              --
            </h2>
          </div>

        </div>

        {/* Account */}
        <div className="bg-white rounded-3xl shadow-sm border p-8 mt-8">

          <h2 className="text-2xl font-bold mb-6">
            Account Information
          </h2>

          <div className="space-y-5">

            <div className="flex items-center gap-4">
              <User className="text-blue-600" />
              <div>
                <p className="text-gray-500">
                  Full Name
                </p>

                <h3 className="font-semibold">
                  {user?.fullName}
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Mail className="text-blue-600" />
              <div>
                <p className="text-gray-500">
                  Email
                </p>

                <h3 className="font-semibold">
                  {user?.email}
                </h3>
              </div>
            </div>

          </div>

          <button
            onClick={handleLogout}
            className="mt-8 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl flex items-center gap-2"
          >
            <LogOut size={18} />

            Logout
          </button>

        </div>

      </div>

    </div>
  );
}