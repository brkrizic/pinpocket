"use client";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { useCallback } from "react";


export default function DashboardLayout({ children }: { children: React.ReactNode }){
    
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
        <>
            <DashboardHeader onLogout={onLogout}/>
            <main className="flex-grow container mx-auto px-4 py-8">{children}</main>
        </>
    );
}