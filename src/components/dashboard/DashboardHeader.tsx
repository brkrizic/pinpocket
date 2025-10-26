"use client";

import { useState } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";

export default function DashboardHeader() {
  const [loading, setLoading] = useState(false);

  const onLogout = async () => {
    try {
      setLoading(true);

      // 1️⃣ Call backend logout first
      const response = await fetch("/api/auth/logout", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        console.error("Failed to log out");
        setLoading(false);
        return;
      }

      console.log("Logged out successfully");

      // 2️⃣ Then call NextAuth signOut for OAuth
      signOut({ redirect: true, callbackUrl: "/" });

    } catch (error) {
      console.error("Logout error:", error);
      setLoading(false);
    }
  };

  return (
    <header className="flex justify-between items-center p-4 border-b bg-white shadow">
      <h1 className="text-xl font-bold text-black">PinPocket</h1>
      <nav className="space-x-4 flex items-center">
        <Link href="/dashboard/projects">
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
            Projects
          </button>
        </Link>
        <Link href="/dashboard/groups">
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
            Groups
          </button>
        </Link>
        <button
          onClick={onLogout}
          disabled={loading}
          className={`px-4 py-2 rounded text-white transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <svg
                className="animate-spin h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
              Logging out...
            </span>
          ) : (
            "Logout"
          )}
        </button>
      </nav>
    </header>
  );
}
