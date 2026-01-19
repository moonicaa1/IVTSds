/**
 * @file Select.tsx
 * @description 여러 옵션 중 하나를 선택할 때 사용하는 드롭다운 셀렉트 컴포넌트입니다.
 * 커스텀 아이콘과 디자인 시스템에 맞춘 스타일링이 적용되어 있습니다.
 */

"use client";

import React from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

/**
 * @interface SelectOption
 * @property {string} value - 옵션의 실제 값
 * @property {string} label - 화면에 표시될 텍스트
 */
export interface SelectOption {
    value: string;
    label: string;
}

/**
 * @interface SelectProps
 * @property {string} [label] - 셀렉트 상단에 표시될 라벨
 * @property {SelectOption[]} options - 선택 가능한 옵션 배열
 * @property {string} [error] - 에러 메시지
 */
export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    options: SelectOption[];
    error?: string;
}

/**
 * @component Select
 * @description 기본 HTML select 엘리먼트를 래핑하여 디자인 가이드를 적용한 컴포넌트입니다.
 * 라벨 및 필수 표시(*)를 지원하며, 스타일링된 화살표 아이콘을 포함합니다.
 * 
 * @example
 * <Select label="국가 선택" options={[{value: 'kr', label: '한국'}]} required />
 */
const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
    ({ label, options, error, className = "", id, ...props }, ref) => {
        const selectId = id || (label ? `select-${label.replace(/\s+/g, '-').toLowerCase()}` : undefined);

        return (
            <div className="flex w-full flex-col gap-1.5">
                {label && (
                    <label
                        htmlFor={selectId}
                        className="text-sm font-semibold leading-5 text-contentPrimary"
                    >
                        {label}
                        {props.required && <span className="ml-0.5 text-[#ef4444]">*</span>}
                    </label>
                )}
                <div className="relative">
                    <select
                        ref={ref}
                        id={selectId}
                        className={`
              flex h-10 w-full appearance-none rounded-lg border border-borderSecondary bg-white px-3 py-2 pr-10 text-sm text-contentPrimary
              focus:border-borderPrimary focus:outline-none focus:ring-1 focus:ring-borderPrimary
              disabled:cursor-not-allowed disabled:bg-backgroundSecondary disabled:text-contentTertiary
              ${error ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""}
              ${className}
            `}
                        {...props}
                    >
                        {options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                        <ChevronDownIcon className="h-4 w-4 text-contentTertiary" aria-hidden="true" />
                    </div>
                </div>
                {error && <p className="text-xs text-red-500">{error}</p>}
            </div>
        );
    }
);

Select.displayName = "Select";

export default Select;
