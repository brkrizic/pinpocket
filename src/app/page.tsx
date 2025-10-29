import LandingHeader from "@/components/landing/LandingHeader";


export default function LandingPage() {
    
    return (
        <div>
            <LandingHeader/>
            <main className="max-w-4xl mx-auto px-4 py-8 text-center">
                <h1 className="text-4xl font-bold mb-4">Your Bookmark Manager</h1>
                <p className="text-lg text-gray-600">
                    Save and organize your bookmarks effortlessly.
                </p>
            </main>
        </div>
    );
}

export const dynamic = "force-static";