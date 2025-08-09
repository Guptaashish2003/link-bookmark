"use client";
import { useLenis } from "@/lib/utils";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Dashboard from "@/components/DashBoard/Dashboard";
import Sidebar from "@/components/SideBar/SideBar";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [isLargeScreen, setIsLargeScreen] = useState<boolean>(false);

  useEffect(() => {
    const checkScreenSize = (): void => {
      const isLarge = window.innerWidth >= 1024;
      setIsLargeScreen(isLarge);
      if (isLarge) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const toggleSidebar = (): void => setSidebarOpen(!sidebarOpen);

  const handleOverlayClick = (): void => {
    if (!isLargeScreen) {
      setSidebarOpen(false);
    }
  };
  // useLenis();
  return (
    <SessionProvider>
      <div className="flex h-screen bg-gray-50">
        {/* Sidebar */}
        {(isLargeScreen || sidebarOpen) && (
          <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />
        )}

        {/* Overlay for mobile */}
        {sidebarOpen && !isLargeScreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
            onClick={handleOverlayClick}
          />
        )}

        {/* Main Content */}
        <Dashboard onToggleSidebar={toggleSidebar} />
      </div>
       <Toaster />
    </SessionProvider>
  );
}
