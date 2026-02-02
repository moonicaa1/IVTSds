/**
 * @file Switch.tsx
 * @description On/Off 상태를 토글하는 스위치(토글) 컴포넌트입니다.
 * 주로 설정 활성화/비활성화 옵션에 사용됩니다.
 */

"use client";

import React from "react";

/**
 * @interface SwitchProps
 * @property {string} [label] - 스위치 옆에 표시될 라벨 텍스트
 * @property {boolean} checked - 현재 On/Off 상태
 * @property {(checked: boolean) => void} onChange - 상태 변경 시 호출되는 콜백
 * @property {boolean} [disabled] - 비활성화 여부
 */
export interface SwitchProps {
    label?: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
    disabled?: boolean;
    className?: string;
}

/**
 * @component Switch
 * @description 부드러운 애니메이션이 적용된 토글 스위치 컴포넌트입니다.
 * 클릭 시 상태가 전환되며 디자인 시스템의 강조색(Teal)을 사용합니다.
 * 
 * @example
 * <Switch label="알림 설정" checked={isActive} onChange={setIsActive} />
 */
export default function Switch({
    label,
    checked,
    onChange,
    disabled = false,
    className = "",
}: SwitchProps) {
    return (
        <div className={`flex items-center gap-3 ${className}`}>
            <button
                type="button"
                role="switch"
                aria-checked={checked}
                disabled={disabled}
                onClick={() => onChange(!checked)}
                className={`
          relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-borderPrimary focus:ring-offset-2
          ${checked ? "bg-[var(--teal-primary)]" : "bg-backgroundTertiary"}
          ${disabled ? "cursor-not-allowed opacity-50" : ""}
        `}
            >
                <span
                    className={`
            inline-block h-4 w-4 transform rounded-full bg-backgroundPrimary transition-transform
            ${checked ? "translate-x-4.5" : "translate-x-0.5"}
          `}
                />
            </button>
            {label && (
                <label className="text-sm font-medium text-contentPrimary cursor-pointer select-none" onClick={() => !disabled && onChange(!checked)}>
                    {label}
                </label>
            )}
        </div>
    );
}
