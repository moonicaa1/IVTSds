import type { Meta, StoryObj } from "@storybook/react";
import Navbar from "@/components/layout/Navbar";
import { ThemeProvider } from "@/lib/contexts/ThemeContext";
import { SidebarProvider } from "@/lib/contexts/SidebarContext";
import React from "react";

/**
 * 어플리케이션의 최상단 레이아웃을 담당하며, 글로벌 검색 및 시스템 설정을 관리하는 핵심 네비게이션바입니다.
 * 
 * ## Usage
 * - **글로벌 검색:** AI 지능형 엔진을 통해 메뉴, 데이터, 액션을 검색할 수 있습니다.
 * - **환경 설정:** 다국어(i18n) 설정 및 테마(Dark/Light) 전환을 수행합니다.
 * - **알림 센터:** 실시간 시스템 알림 및 공지사항을 확인합니다.
 * 
 * ## Best Practices
 * ### ✅ Do
 * - 모든 페이지 최상단에 고정하여 일관된 네비게이션 경험을 제공하세요.
 * - AI 검색 결과가 사용자 의도와 일치하는지 모니터링하세요.
 * 
 * ### ❌ Don't
 * - <span style="color: #ef4444; font-weight: bold;">[Bad]</span> 로컬 페이지 전용 검색바를 Navbar에 중첩해서 배치하지 마세요.
 * - <span style="color: #ef4444; font-weight: bold;">[Bad]</span> Navbar 하단에 너무 두꺼운 추가 헤더를 배치하여 콘텐츠 영역을 과하게 가리지 마세요.
 */
const meta: Meta<typeof Navbar> = {
    title: "Layout & Patterns/Navbar",
    component: Navbar,
    decorators: [
        (Story) => (
            <ThemeProvider>
                <SidebarProvider>
                    <div className="relative w-full h-[400px] bg-backgroundSecondary">
                        <Story />
                    </div>
                </SidebarProvider>
            </ThemeProvider>
        ),
    ],
    parameters: {
        layout: "fullscreen",
        docs: {
            description: {
                component: "AI 지능형 검색과 다국어 대응이 포함된 프리미엄 내비게이션바 컴포넌트입니다. 100% Synced with code.",
            },
        },
        design: {
            type: "figma",
            url: "https://www.figma.com/design/XXXXX/IVTS-DS-v0.2?node-id=Navbar",
        },
    },
};

export default meta;
type Story = StoryObj<typeof Navbar>;

export const Default: Story = {};

