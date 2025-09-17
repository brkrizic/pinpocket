import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold text-red-500">404 | Page Not Found</h2>
      <Link href="/" className="text-blue-500 underline mt-4">
        Go back home
      </Link>
    </div>
  );
}