"use client";

import Link from "next/link";

interface headerProps {
    onLogout: () => void;
}

export default function DashboardHeader({onLogout}: headerProps){
    return(
        <header className="flex justify-between items-center p-4 border-b bg-white shadow">
            <h1 className="text-xl font-bold text-black">PinPocket</h1>
            <nav className="space-x-4">
                <Link href="/dashboard/projects">
                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded">
                            Projects
                    </button>
                </Link>
                <Link href="/dashboard/groups">
                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded">
                            Groups
                    </button>
                </Link>
                <button
                    onClick={onLogout}
                    className="px-4 py-2 bg-blue-500 text-white rounded">
                        Logout
                </button>
            </nav>
        </header>
    );
}