"use client";

import { BASE_URL } from "@/components/constants/constants";
import { useState } from "react";

type LoginProps = {
  email: string;
  password: string;
};

export function useLoginApi() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const login = async ({ email, password }: LoginProps) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
        if (!email || !password) {
            setError("Please fill in all fields");
            return;
        }  
      const res = await fetch(`${BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Login failed");
      }

      setSuccess(true);
      return data; // contains { success, userId }
    } catch (err: unknown) {
        let message = "Unknown error";
        if (err instanceof Error) {
          message = err.message;
        }
        setError(message || "Something went wrong");
        return null;
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error, success };
}
