/**
 * Documents 페이지
 * Figma 프레임: 4857:88270
 * 
 * TECH_GUIDE.md 기준:
 * - AppShell이 layout.tsx에서 적용됨
 * - 메인 콘텐츠 영역은 DocumentsContent에서 관리
 */

"use client";

import DocumentsContent from "@/pages/documents/DocumentsContent";

export default function DocumentsPage() {
    return <DocumentsContent />;
}
