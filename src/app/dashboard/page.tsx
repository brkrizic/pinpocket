"use client";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { useCallback } from "react";

export default function DashboardPage() {

    const onLogout = useCallback(async () => {
        const response = await fetch('/api/auth/logout', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            console.log('Logout in successfully');
            window.location.href = "/landing";  // Optional redirect
        } else {
            console.error('Failed to log out');
        }
    }, []);

    return (
        <div>
            <DashboardHeader onLogout={onLogout}/>
            <h2>DashBoard</h2>
        </div>
    );
}