"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BASE_URL } from "@/components/constants/constants";
import { useLoginApi } from "@/hook/useLoginApi";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, loading, error, success } = useLoginApi();

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login({email, password});
  };

  useEffect(() => {
    if(success){
      router.push("/dashboard");
    }
  }, [success]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">Login</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
          
          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">Login successful!</p>}
        </form>
        <div className="m-1">
          <button
            onClick={() => signIn("google", { prompt: "login" })}
            className="flex items-center justify-center gap-2 px-5 py-3 border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 bg-white text-gray-700 font-medium border-gray-300"
          >
            <FcGoogle className="w-6 h-6" />
          </button>
        </div>
        <div className="mt-6 text-center">
          <Link href="/" className="text-sm font-medium text-blue-600 hover:underline">← Back to Home</Link>
        </div>
      </div>
    </div>
  );
}
