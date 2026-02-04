/**
 * @file Radio.tsx
 * @description Radio button component for selecting single options from a group.
 */

"use client";

import React from "react";

/**
 * @interface RadioProps
 * @description Props for the Radio component
 */
export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
    /** 라디오 버튼 옆에 표시될 라벨 텍스트입니다. */
    label?: string;
    /** 라디오 그룹 내에서 식별자로 사용될 이름입니다. */
    name: string;
    /** 해당 옵션의 고유 값입니다. */
    value: string;
    /** 체크 상태 여부입니다. */
    checked?: boolean;
    /** 상태 변경 시 호출되는 콜백 함수입니다. 선택된 값(string)을 반환합니다. */
    onChange?: (value: string) => void;
    /** 추가적인 스타일 클래스입니다. */
    className?: string;
}

/**
 * @component Radio
 * @description
 * Radio button for single selection within a group.
 * Supports checked, unchecked, and disabled states.
 * 
 * @example
 * ```tsx
 * <Radio
 *   name="option"
 *   value="1"
 *   label="Option 1"
 *   checked={selected === "1"}
 *   onChange={setSelected}
 * />
 * ```
 */
export default function Radio({
    label,
    name,
    value,
    checked,
    onChange,
    disabled = false,
    className = "",
    id,
    ...props
}: RadioProps) {
    const radioId = id || `radio-${name}-${value}`;

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!disabled && onChange) {
            onChange(event.target.value);
        }
    };

    return (
        <div className={`flex items-center gap-2 ${className}`}>
            <div className="relative flex items-center">
                <input
                    {...props}
                    type="radio"
                    id={radioId}
                    name={name}
                    value={value}
                    checked={checked}
                    disabled={disabled}
                    onChange={handleChange}
                    className="peer h-4 w-4 cursor-pointer appearance-none rounded-full border border-borderSecondary bg-backgroundPrimary transition-all checked:border-tealPrimary checked:bg-tealPrimary hover:border-tealPrimary disabled:cursor-not-allowed disabled:bg-backgroundSecondary disabled:border-borderSecondary"
                />
                <div className="pointer-events-none absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-backgroundPrimary opacity-0 peer-checked:opacity-100" />
            </div>
            {label && (
                <label
                    htmlFor={radioId}
                    className={`cursor-pointer text-sm font-medium ${disabled ? "cursor-not-allowed text-contentTertiary" : "text-contentPrimary"}`}
                >
                    {label}
                </label>
            )}
        </div>
    );
}
