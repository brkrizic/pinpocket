"use client";

import Link from "next/link";
import { useFormStatus } from "react-dom";
import { register } from "./actions";
import { useActionState, useEffect } from "react";

export default function RegisterForm() {
  const [state, registerAction] = useActionState(register, undefined);

  useEffect(() => {
    console.log(state);
  }, [state]);

  const getFieldError = (field: string) => state?.errors?.find((e: any) => e.field === field)?.message;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
          Create Account
        </h2>
        <form action={registerAction} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-600"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              name="username"
              className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
              
            />
            {getFieldError("username") && (
              <p className="text-red-500">{getFieldError("username")}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
              placeholder="you@example.com"
              
            />
            {getFieldError("email") && (
              <p className="text-red-500">{getFieldError("email")}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
              placeholder="••••••••"
              
            />
            {getFieldError("password") && (
              <p className="text-red-500">{getFieldError("password")}</p>
            )}
          </div>
          
          
          <SubmitButton/>
        </form>
        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-sm font-medium text-blue-600 hover:underline"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-lg bg-green-600 px-4 py-2 font-medium text-white transition hover:bg-green-700"
    >
      {pending ? "Creating Account..." : "Sign Up"}
    </button>
  );
}