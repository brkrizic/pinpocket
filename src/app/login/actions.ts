"use server";

import { redirect } from "next/navigation";
import { createSession } from "@/lib/session";
import { BASE_URL } from "@/components/constants/constants";

type LoginProps = {
  email: string;
  password: string;
};

export async function login({ email, password }: LoginProps) {
  // Call the API route
  const res = await fetch(`${BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
    credentials: "include",
  });

  // Log for debugging
  console.log("Login API response:", res);

  const result = await res.json();
  
  if(!res.ok || !result.success) throw new Error(result.message || "Login failed");


  await createSession(result.userId);

  //redirect("/dashboard");
  console.log("Logged In");
}

export async function logout() {
  // Call logout API route
  await fetch(`${BASE_URL}/api/auth/logout`, {
    method: "POST"
  });

  // Redirect to login page
  redirect("/login");
}
