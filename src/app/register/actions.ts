// import { BASE_URL } from "@/components/constants/constants";
// import { redirect } from "next/navigation";
// import { z, ZodError } from "zod";

// const registerSchema = z.object({
//   username: z.string().min(3, "Username must be at least 3 characters"),
//   email: z.string().email("Invalid email"),
//   password: z.string().min(6, "Password must be at least 6 characters"),
// });

// interface FieldError {
//   field?: string | number;
//   message: string;
// }

// interface RegisterState {
//   errors?: FieldError[];
// }

// export async function register(
//   prevState: RegisterState | undefined,
//   formData: FormData
// ): Promise<RegisterState | void> {
//   try {
//     const username = formData.get("username") as string;
//     const email = formData.get("email") as string;
//     const password = formData.get("password") as string;

//     const parsed = registerSchema.parse({ username, email, password });

//     const res = await fetch(`${BASE_URL}/api/auth/register`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(parsed),
//     });

//     const result = await res.json();

//     if (!res.ok) {
//       return { errors: [{ message: result.message || "Registration failed" }] };
//     }

//     redirect("/login"); // Success
//   } catch (err: unknown) {
//       if (err instanceof ZodError) {
//         return {
//           errors: err.issues.map(e => ({
//             field: e.path[0] as string | number | undefined, // ← type assertion
//             message: e.message,
//           })),
//         };
//       }

//       const message = err instanceof Error ? err.message : "Unknown error";
//       return { errors: [{ message }] };
//   }
// }
