/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect } from "react";
import { fetchUser } from "../store/userSlice";
import { useAppDispatch, useAppSelector } from "../store";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
    const dispatch = useAppDispatch();
    const { data: user, loading, error } = useAppSelector((state: any) => state.user);

    useEffect(() => {
        dispatch(fetchUser());
    }, [dispatch]);

    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) router.push("/login");
    }, [loading, user, router]);

    if (loading || !user) {
        return <div className="flex items-center justify-center h-screen">
                <p>Loading your dashboard...</p>
            </div>;
    }

    return (
            <main>
                <h2 className="text-3xl font-bold mb-6 border-b pb-2">
                    Welcome to Your Dashboard, {user.username} 👋
                </h2>
            </main>
    );
}
