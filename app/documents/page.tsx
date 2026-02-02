"use client";

import DocumentsContent from "@/pages/documents/DocumentsContent";
import { SidebarProvider } from "@/lib/contexts/SidebarContext";
import { ThemeProvider } from "@/lib/contexts/ThemeContext";

export default function DocumentsPage() {
    return (
        <ThemeProvider>
            <SidebarProvider>
                <DocumentsContent />
            </SidebarProvider>
        </ThemeProvider>
    );
}
