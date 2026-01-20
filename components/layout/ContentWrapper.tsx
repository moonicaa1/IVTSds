"use client";

import { useSidebar } from "@/lib/contexts/SidebarContext";

/**
 * @component ContentWrapper
 * @description
 * 메인 콘텐츠의 레이아웃 래퍼입니다.
 * 사이드바의 열림/닫힘 상태(`isOpen`)에 따라 margin-left를 동적으로 조정합니다.
 */
export default function ContentWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isOpen } = useSidebar();

  return (
    <main
      className={`flex-1 overflow-y-auto bg-backgroundSecondary transition-all duration-300 ${isOpen ? "ml-[292px]" : "ml-[72px]"
        }`}
    >
      {children}
    </main>
  );
}
