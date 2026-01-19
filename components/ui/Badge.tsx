/**
 * @file Badge.tsx
 * @description 다양한 테마와 스타일을 지원하는 공통 뱃지(태그) 컴포넌트입니다.
 * 상태 표시, 카테고리 태그, 선택된 필터 옵션 등 시각적 강조가 필요한 곳에 사용됩니다.
 */

import React from "react";
import { XMarkIcon } from "@heroicons/react/20/solid";

/**
 * @type BadgeColor
 * @description 뱃지에 적용할 수 있는 컬러 팔레트 타입 정의입니다.
 * Tailwind CSS 테두리 및 배경색 확장 옵션과 매핑됩니다.
 */
export type BadgeColor =
    | "Zinc" | "Red" | "Orange" | "Amber" | "Yellow"
    | "Lime" | "Green" | "Emerald" | "Teal" | "Cyan"
    | "Sky" | "Blue" | "Indigo" | "Violet" | "Purple"
    | "Fuchsia" | "Pink" | "Rose" | "Black";

/**
 * @interface BadgeProps
 * @property {React.ReactNode} children - 뱃지 내부에 표시될 텍스트 또는 노드
 * @property {BadgeColor} [color] - 뱃지의 배경 및 텍스트 색상 테마 (기본값: "Zinc")
 * @property {boolean} [showXButton] - 제거 버튼(X)의 노출 여부
 * @property {(e: React.MouseEvent) => void} [onRemove] - 제거 버튼 클릭 시 호출되는 핸들러
 * @property {string} [className] - 추가적인 스타일링을 위한 CSS 클래스
 */
interface BadgeProps {
    children: React.ReactNode;
    color?: BadgeColor;
    showXButton?: boolean;
    onRemove?: (e: React.MouseEvent) => void;
    className?: string;
}

const colorStyles: Record<BadgeColor, string> = {
    Zinc: "bg-[#F4F4F5] text-[#18181B]",       // zinc-100, zinc-900
    Red: "bg-[#FEE2E2] text-[#991B1B]",        // red-100, red-800
    Orange: "bg-[#FFEDD5] text-[#9A3412]",     // orange-100, orange-800
    Amber: "bg-[#FEF3C7] text-[#92400E]",      // amber-100, amber-800
    Yellow: "bg-[#FEF9C3] text-[#854D0E]",     // yellow-100, yellow-800
    Lime: "bg-[#ECFCCB] text-[#3F6212]",       // lime-100, lime-800
    Green: "bg-[#DCFCE7] text-[#166534]",      // green-100, green-800
    Emerald: "bg-[#D1FAE5] text-[#065F46]",    // emerald-100, emerald-800
    Teal: "bg-[#CCFBF1] text-[#115E59]",       // teal-100, teal-800
    Cyan: "bg-[#CFFAFE] text-[#155E75]",       // cyan-100, cyan-800
    Sky: "bg-[#E0F2FE] text-[#075985]",        // sky-100, sky-800
    Blue: "bg-[#DBEAFE] text-[#1E40AF]",       // blue-100, blue-800
    Indigo: "bg-[#E0E7FF] text-[#3730A3]",     // indigo-100, indigo-800
    Violet: "bg-[#EDE9FE] text-[#5B21B6]",     // violet-100, violet-800
    Purple: "bg-[#F3E8FF] text-[#6B21A8]",     // purple-100, purple-800
    Fuchsia: "bg-[#FAE8FF] text-[#86198F]",    // fuchsia-100, fuchsia-800
    Pink: "bg-[#FCE7F3] text-[#9D174D]",       // pink-100, pink-800
    Rose: "bg-[#FFE4E6] text-[#9F1239]",       // rose-100, rose-800
    Black: "bg-[#18181B] text-[#FAFAFA]",      // zinc-900, zinc-50 (For selected states)
};

/**
 * @component Badge
 * @description 텍스트 정보를 시각적으로 그룹화하거나 강조할 때 사용하는 컴포넌트입니다.
 * X 버튼을 포함하여 필터 제거 등의 기능을 지원할 수 있습니다.
 * 
 * @example
 * <Badge color="Green">활성</Badge>
 * <Badge showXButton onRemove={handleRemove}>필터명</Badge>
 */
export default function Badge({
    children,
    color = "Zinc",
    showXButton = false,
    onRemove,
    className = "",
}: BadgeProps) {
    return (
        <span
            className={`
                inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium 
                ${colorStyles[color]}
                ${className}
            `}
        >
            {children}
            {showXButton && (
                <button
                    type="button"
                    onClick={onRemove}
                    className="group rounded-full p-0.5 hover:bg-black/10 focus:outline-none -mr-1"
                    aria-label="Remove"
                >
                    <XMarkIcon className="h-3 w-3 opacity-60 transition-opacity group-hover:opacity-100" strokeWidth={2.5} />
                </button>
            )}
        </span>
    );
}
