import type { Metadata } from "next";
import "./globals.css";
import { Footer } from "@/components/base/Footer";
import Providers from "./providers";


export const metadata: Metadata = {
  title: "PinPocket",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-800">


        {/* Main content */}
        <Providers>
            <main className="min-h-screen">
              {children}
            </main>
        </Providers>
          {/* Global footer */}
        <Footer/>
        
          {/* React Portals */}
          <div id="modal-root"></div>
      </body>
    </html>
  );
}
