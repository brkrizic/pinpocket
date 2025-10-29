"use client";


import { ApolloProvider } from "@apollo/client/react";
import client from "@/lib/apolloClient";
import DashboardHeader from "./DashboardHeader";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { useRouter } from "next/navigation";
import { fetchUser } from "@/app/store/userSlice";


export default function UserLayout({ children }: { children: React.ReactNode }){

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

    if(error) throw new Error;

    return (
        <>
            <DashboardHeader />
            <main className="flex-grow container mx-auto px-4 py-8">{children}</main>
        </>
    );
}