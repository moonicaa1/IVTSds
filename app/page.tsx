"use client";

import MainContent from "../pages/dealer/MainContent";
import { SidebarProvider } from "@/lib/contexts/SidebarContext";
import { ThemeProvider } from "@/lib/contexts/ThemeContext";

export default function HomePage() {
  return (
    <ThemeProvider>
      <SidebarProvider>
        <MainContent />
      </SidebarProvider>
    </ThemeProvider>
  );
}