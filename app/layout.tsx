import type { Metadata } from "next";
import { inter, firaCode } from "./fonts"; // Import your local font loader
import "./globals.css";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "Accounts",
  description: "Professional ERP Dashboard built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${firaCode.variable} antialiased`}
        style={{
          margin: 0,
          padding: 0,
          backgroundColor: "#f8fafc",
          minHeight: "100vh",
        }}
      >
        <Sidebar />
        <div style={{ 
          marginLeft: "270px", 
          display: "flex", 
          flexDirection: "column",
          minHeight: "100vh",
          transition: "margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
        }}>
          <Navbar />
          <main
            style={{
              padding: "30px",
              minHeight: "calc(100vh - 140px)",
              paddingBottom: "40px",
              flex: 1,
              backgroundColor: "#f8fafc",
            }}
          >
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}