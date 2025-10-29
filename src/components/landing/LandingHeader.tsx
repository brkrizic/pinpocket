
import Link from "next/link";

export default function LandingHeader() {
    return (
        <header className="flex justify-between items-center p-4 border-b bg-white shadow">
            <h1 className="text-xl font-bold text-black">PinPocket</h1>
            <nav className="space-x-4">
                <Link href="/login">Login</Link>
                <Link href="/register">Register</Link>
            </nav>
        </header>
    );
};

export const dynamic = "force-static";