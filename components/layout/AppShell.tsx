/**
 * @file AppShell.tsx
 * @description 애플리케이션의 공통 레이아웃을 정의하는 루트 쉘 컴포넌트입니다.
 * 사이드바 컨텍스트를 제공하며 네비게이션, 사이드바, 컨텐츠 영역의 배치를 관리합니다.
 */

"use client";

import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import ContentWrapper from "@/components/layout/ContentWrapper";
import { SidebarProvider } from "@/lib/contexts/SidebarContext";

/**
 * @component AppShell
 * @description
 * 애플리케이션의 최상위 레이아웃을 구성하는 쉘 컴포넌트입니다.
 * Context Provider(`SidebarProvider`)를 포함하며, Navbar, Sidebar, ContentWrapper를 배치합니다.
 * 
 * 구조:
 * - Navbar (Fixed Top)
 * - Sidebar (Fixed Left)
 * - ContentWrapper (Scrollable Area)
 */
export default function AppShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-screen flex-col bg-[#FAFAFA]">
        {/* Navbar (Header) - fixed 위치 - 공통 컴포넌트 */}
        <Navbar />

        {/* Contents Box */}
        <div className="flex h-screen pt-[60px]">
          {/* Left Navigation (Sidebar) - fixed 위치 - 공통 컴포넌트 */}
          <Sidebar />

          {/* Container (메인 콘텐츠) - overflow-y-auto - 사이드바 상태에 따라 동적 마진 */}
          <ContentWrapper>{children}</ContentWrapper>
        </div>
      </div>
    </SidebarProvider>
  );
}
