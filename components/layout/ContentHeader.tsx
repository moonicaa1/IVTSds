/**
 * @file ContentHeader.tsx
 * @description 각 페이지 상단에 위치하여 페이지 타이틀, 브레드크럼, 그리고 주요 액션 버튼을 노출하는 헤더 컴포넌트입니다.
 * 즐겨찾기(Favorites) 기능과 연동되어 있으며, 딜러 생성과 같은 핵심 모달 트리거를 포함합니다.
 */

"use client";

import React, { useState } from "react";
import Button from "@/components/ui/Button";
import { useSidebar } from "@/lib/contexts/SidebarContext";
import { BookmarkIcon as BookmarkIconOutline } from "@heroicons/react/24/outline";
import { BookmarkIcon as BookmarkIconSolid } from "@heroicons/react/24/solid";
import { ContentModal } from "@/components/layout/Modal";
import CreateDealerModal from "@/pages/dealer/CreateDealerModal";

/**
 * @interface ContentHeaderProps
 * @property {(dealerData: any) => void} [onAddDealer] - 새로운 딜러 데이터가 생성되었을 때 호출되는 콜백 함수
 */
interface ContentHeaderProps {
    onAddDealer?: (dealerData: any) => void;
}

/**
 * @component ContentHeader
 * @description
 * 페이지 상단의 헤더 영역 컴포넌트입니다.
 * Breadcrumb, 페이지 타이틀, 설명, 그리고 주요 액션(Create button)을 포함합니다.
 */
export default function ContentHeader({ onAddDealer }: ContentHeaderProps) {
    const { favorites, toggleFavorite } = useSidebar();
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    return (
        <div className="mb-6 flex items-start justify-between">
            <div className="flex flex-col gap-4">
                {/* Breadcrumb - Figma: Basic component, 96px × 20px */}
                <div className="flex h-5 items-center gap-1.5">
                    {/* Home 아이콘 - Figma: heroicons-outline/home, 20×20, Color: #71717A */}
                    <svg
                        className="h-5 w-5 text-contentSecondary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                        />
                    </svg>
                    {/* Chevron Right - Figma: ic_arrow_forward_bold_12px, 12×12, Color: #71717A */}
                    <svg
                        className="h-3 w-3 text-contentSecondary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2.5}
                            d="M8.25 4.5l7.5 7.5-7.5 7.5"
                        />
                    </svg>
                    {/* Current Page - Figma: "Dealers", 14px Semi Bold, Color: #09090B */}
                    <span className="text-sm font-semibold leading-4 text-contentPrimary">Dealers</span>
                </div>

                {/* Pages Title Row */}
                <div className="flex items-center gap-2">
                    {/* Title - Figma: Page Title, 30px SemiBold */}
                    <div className="text-[30px] font-semibold leading-9 text-contentPrimary">Dealers</div>
                    {/* Bookmark Button - Integrated with Favorites state */}
                    <button
                        type="button"
                        onClick={() => toggleFavorite("Dealers")}
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-borderPrimary bg-backgroundPrimary hover:bg-backgroundSecondary transition-colors shadow-sm"
                    >
                        {favorites.has("Dealers") ? (
                            <BookmarkIconSolid className="h-4 w-4 text-tealPrimary" />
                        ) : (
                            <BookmarkIconOutline className="h-4 w-4 text-contentTertiary" />
                        )}
                    </button>
                </div>
                {/* Subtitle removed as hidden in Figma */}
            </div>

            {/* Create Button - Figma: Primary Button */}
            <Button
                variant="default"
                size="sm"
                onClick={() => setIsCreateModalOpen(true)}
                leftIcon={
                    <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 4v16m8-8H4"
                        />
                    </svg>
                }
            >
                Create dealer
            </Button>

            {/* Content Modal for Dealer Creation */}
            <CreateDealerModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onConfirm={(dealerData) => {
                    onAddDealer?.(dealerData);
                }}
            />
        </div>
    );
}

