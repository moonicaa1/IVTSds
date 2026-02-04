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
 * @property {React.ReactNode} children - 뱃지 내부에 표시될 텍스트 또는 요소입니다. 내용이 너무 길어지지 않도록 주의하십시오.
 * @property {BadgeColor} [color] - 뱃지의 시각적 테마를 결정합니다. 상태나 카테고리의 성격에 맞는 컬러를 선택하십시오. (기본값: "Zinc")
 * @property {boolean} [showXButton] - 제거 또는 해제 기능이 필요한 경우 'true'로 설정하여 X 버튼을 표시합니다.
 * @property {(e: React.MouseEvent) => void} [onRemove] - X 버튼 클릭 시 호출되는 함수입니다. 주로 필터 해제나 상태 삭제 로직을 연결합니다.
 * @property {string} [className] - 컴포넌트 외부에서 레이아웃이나 간격을 조절하기 위한 추가 CSS 클래스입니다.
 */
interface BadgeProps {
    /** 뱃지 내부에 표시될 텍스트 또는 요소입니다. */
    children: React.ReactNode;
    /** 뱃지의 시각적 테마 색상을 결정합니다. */
    color?: BadgeColor;
    /** 제거(X) 버튼 노출 여부입니다. */
    showXButton?: boolean;
    /** 제거 버튼 클릭 시 호출되는 콜백 함수입니다. */
    onRemove?: (e: React.MouseEvent) => void;
    /** 추가적인 스타일 클래스입니다. */
    className?: string;
}

const colorStyles: Record<BadgeColor, string> = {
    Zinc: "bg-[var(--background-zinc)] text-[var(--content-zinc)]",
    Red: "bg-[var(--background-red)] text-[var(--content-red)]",
    Orange: "bg-[var(--background-orange)] text-[var(--content-orange)]",
    Amber: "bg-[var(--background-amber)] text-[var(--content-amber)]",
    Yellow: "bg-[var(--background-yellow)] text-[var(--content-yellow)]",
    Lime: "bg-[var(--background-lime)] text-[var(--content-lime)]",
    Green: "bg-[var(--background-green)] text-[var(--content-green)]",
    Emerald: "bg-[var(--background-emerald)] text-[var(--content-emerald)]",
    Teal: "bg-[var(--background-teal)] text-[var(--content-teal)]",
    Cyan: "bg-[var(--background-cyan)] text-[var(--content-cyan)]",
    Sky: "bg-[var(--background-sky)] text-[var(--content-sky)]",
    Blue: "bg-[var(--background-blue)] text-[var(--content-blue)]",
    Indigo: "bg-[var(--background-indigo)] text-[var(--content-indigo)]",
    Violet: "bg-[var(--background-violet)] text-[var(--content-violet)]",
    Purple: "bg-[var(--background-purple)] text-[var(--content-purple)]",
    Fuchsia: "bg-[var(--background-fuchsia)] text-[var(--content-fuchsia)]",
    Pink: "bg-[var(--background-pink)] text-[var(--content-pink)]",
    Rose: "bg-[var(--background-rose)] text-[var(--content-rose)]",
    Black: "bg-[var(--background-inverse-primary)] text-[var(--content-inverse-primary)]",
};

/**
 * @description 텍스트 정보를 시각적으로 그룹화하거나 강조할 때 사용하는 컴포넌트입니다.
 * X 버튼을 포함하여 필터 제거 등의 기능을 지원할 수 있습니다.
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
