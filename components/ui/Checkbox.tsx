/**
 * @file Checkbox.tsx
 * @description 테이블 리스트의 개별/전체 선택 또는 폼 입력에서 사용되는 커스텀 체크박스 컴포넌트입니다.
 * 선택됨(true), 선택 안됨(false), 그리고 중간 상태(indeterminate)를 지원합니다.
 */

import React from "react";

/**
 * @interface CheckboxProps
 * @property {boolean | "indeterminate"} [checked] - 체크박스의 상태 (true, false, "indeterminate")
 * @property {(checked: boolean) => void} [onCheckedChange] - 상태 변경 시 호출되는 콜백 함수
 * @property {boolean} [disabled] - 비활성화 여부
 * @property {string} [className] - 추가 스타일 클래스
 */
interface CheckboxProps {
    checked?: boolean | "indeterminate";
    onCheckedChange?: (checked: boolean) => void;
    disabled?: boolean;
    className?: string;
}

/**
 * @component Checkbox
 * @description 시각적으로 세련된 토글 경험을 제공하는 체크박스 컴포넌트입니다.
 * WCAG 접근성을 고려하여 `role="checkbox"`와 적절한 상태 속성을 포함합니다.
 * 
 * @example
 * <Checkbox checked={selected} onCheckedChange={setSelected} />
 */
export default function Checkbox({
    checked = false,
    onCheckedChange,
    disabled = false,
    className = "",
}: CheckboxProps) {
    const handleChange = () => {
        if (disabled || !onCheckedChange) return;
        onCheckedChange(!checked);
    };

    return (
        <button
            type="button"
            role="checkbox"
            aria-checked={checked === "indeterminate" ? "mixed" : checked}
            disabled={disabled}
            onClick={handleChange}
            className={`
                group flex h-4 w-4 items-center justify-center rounded border transition-shadow focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[var(--teal-secondary)]/20
                ${disabled ? "cursor-not-allowed opacity-50 bg-backgroundSecondary border-borderPrimary" : "cursor-pointer"}
                ${checked === true || checked === "indeterminate"
                    ? "bg-[var(--teal-secondary)] border-[var(--teal-secondary)] text-[var(--content-inverse-primary)]"
                    : "bg-backgroundPrimary border-borderPrimary hover:border-contentSecondary"
                }
                ${className}
            `}
        >
            {checked === true && (
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none" className="block text-[var(--content-inverse-primary)]">
                    <path d="M9 1L3.5 6.5L1 4" stroke="currentColor" strokeWidth="1.6666" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            )}
            {checked === "indeterminate" && (
                <div className="h-0.5 w-2 bg-backgroundPrimary rounded-full" />
            )}
        </button>
    );
}
