import DashboardHeader from "@/components/dashboard/DashboardHeader";


export default function DashboardLayout({ children }: { children: React.ReactNode }){

    return (
        <>
            <DashboardHeader/>
            <main className="flex-grow container mx-auto px-4 py-8">{children}</main>
        </>
    );
}