"use client";

import DashboardHeader from "./components/DashboardHeader";
import Providers from "../providers";
import React, { Children, cloneElement, ReactElement, useEffect } from "react";
import { fetchUser } from "../store/userSlice";
import { RootState, useAppDispatch, useAppSelector } from "../store";


export interface UserType {
  id: string;
  username: string;
  email: string;
}
export const dynamic = "force-dynamic";
export default function DashboardLayout({ children }: { children: React.ReactNode }){
    const dispatch = useAppDispatch();
    const { data: user, loading, error } = useAppSelector((state: RootState) => state.user);

    useEffect(() => {
        dispatch(fetchUser());
    }, [dispatch]);

    if (loading || !user) {
        return <div className="flex items-center justify-center h-screen">
                <p>Loading your dashboard...</p>
            </div>;
    }

    if(error) throw new Error;


    return (
        <Providers>
                <DashboardHeader/>
                <main className="flex-grow container mx-auto px-4 py-8">
                    {Children.map(children, child => {
                        if (React.isValidElement(child)) {
                            return cloneElement(child as ReactElement<{ user: UserType }>, { user });
                        }
                        return child;
                    })}
                </main>
        </Providers>
    );
}