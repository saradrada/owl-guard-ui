"use client";
import NavBar from "./components/NavBar/NavBar";
import "./global.css";
import Footer from "./components/Footer/Footer";
import { AIContextProvider } from "./context/ai-context";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`antialiased text-slate-400 bg-slate-900 flex flex-col justify-between min-h-screen`}
      >
        <AIContextProvider>
          <NavBar />
          {children}
          <Footer />
        </AIContextProvider>
      </body>
    </html>
  );
}
