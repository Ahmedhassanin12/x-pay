import type { Metadata } from "next";
import "./globals.css";
import Image from "next/image";
import Logo from "@/public/logo.png"

export const metadata: Metadata = {
  title: "X-Pay Mini",
  description: "Created by Ahmed-Hassanin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <nav className="nav">
          <div className="nav-container">
            <a href="/" className="nav-brand">
              <Image src={Logo.src} alt="logo" width={Logo.width} height={20} />
            </a>
            <div className="nav-links">
              <a href="/" className="nav-link">Home</a>
              <a href="/new" className="nav-link">New Payment</a>
            </div>
          </div>
        </nav>
        <main className="main">
          {children}
        </main>
      </body>
    </html>
  );
}
