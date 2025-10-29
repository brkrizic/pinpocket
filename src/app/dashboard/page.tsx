/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useAppSelector } from "../store";

export const dynamic = "force-dynamic";

export default function DashboardPage() {
     const user = useAppSelector((state: any) => state.user.data);

    return (
            <main>
                <h2 className="text-3xl font-bold mb-6 border-b pb-2">
                    Welcome to Your Dashboard, {user.username} 👋
                </h2>
            </main>
    );
}