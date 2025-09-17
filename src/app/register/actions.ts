import { BASE_URL } from "@/components/constants/constants";
import { redirect } from "next/navigation";
import { z } from 'zod';


const registerSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export async function register(prevState: any, formData: FormData) {
  try {
    const username = formData.get("username") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    // Validate with Zod
    const parsed = registerSchema.parse({ username, email, password });

    // Call your backend API
    const res = await fetch(`${BASE_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsed),
    });

    const result = await res.json();
    console.log("Register API result:", result);

    if (!res.ok) {
      return { errors: [{ message: result.message || "Registration failed" }] };
    }

    // Success → redirect
    redirect("/login");

  } catch (err: any) {
    if (err.name === "ZodError") {
      return { errors: err.issues.map((e: any) => ({ field: e.path[0], message: e.message })) };
    }
    return { errors: [{ message: err.message || "Unknown error" }] };
  }
}
