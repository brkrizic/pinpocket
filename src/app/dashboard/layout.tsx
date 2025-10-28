"use client";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { ApolloProvider } from "@apollo/client/react";
import client from "@/lib/apolloClient";


export default function DashboardLayout({ children }: { children: React.ReactNode }){

    return (
        <ApolloProvider client={client}>
            <DashboardHeader/>
            <main className="flex-grow container mx-auto px-4 py-8">{children}</main>
        </ApolloProvider>
    );
}