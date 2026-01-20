/**
 * @file Input.tsx
 * @description 텍스트 입력, 검색, 이메일 등 사용자 입력을 받기 위한 표준 입력 컴포넌트입니다.
 * 라벨, 에러 메시지, 도움말 텍스트 및 필수 항목(*) 표시 기능을 지원합니다.
 */

"use client";

import React from "react";

/**
 * @interface InputProps
 * @description Input 컴포넌트의 기능을 확장하기 위한 Props 정의입니다.
 * 기존 HTML Input 엘리먼트의 모든 속성을 상속받습니다.
 * 
 * @property {string} [label] - 입력 필드 상단에 표시될 라벨 텍스트
 * @property {string} [error] - 필드 하단에 표시될 에러 메시지 (값이 있으면 필드가 강조됨)
 * @property {string} [helperText] - 에러가 없을 때 필드 하단에 표시될 보조 텍스트
 */
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    helperText?: string;
}

/**
 * @component Input
 * @description 깔끔하고 일관된 스타일의 텍스트 입력 컴포넌트입니다.
 * 포커스 상태, 비활성화 상태, 에러 상태에 따른 시각적 피드백을 제공합니다.
 * 
 * @example
 * <Input label="이메일" placeholder="example@domain.com" required />
 * <Input label="비밀번호" type="password" error="비밀번호를 입력해주세요." />
 */
const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, helperText, className = "", id, ...props }, ref) => {
        const inputId = id || (label ? `input-${label.replace(/\s+/g, '-').toLowerCase()}` : undefined);

        return (
            <div className="flex w-full flex-col gap-1.5">
                {label && (
                    <label
                        htmlFor={inputId}
                        className="text-sm font-semibold leading-5 text-contentPrimary"
                    >
                        {label}
                        {props.required && <span className="ml-0.5 text-[var(--content-red)]">*</span>}
                    </label>
                )}
                <div className="relative">
                    <input
                        ref={ref}
                        id={inputId}
                        className={`
                        flex h-10 w-full rounded-lg border border-borderSecondary bg-backgroundPrimary px-3 py-2 text-sm text-contentPrimary 
                        placeholder:text-contentTertiary 
                        focus:border-tealPrimary focus:outline-none focus:ring-1 focus:ring-tealPrimary
                        disabled:cursor-not-allowed disabled:bg-backgroundSecondary disabled:text-contentTertiary
                        ${error ? "border-[var(--content-red)] focus:border-[var(--content-red)] focus:ring-[var(--content-red)]" : ""}
                        ${className}
                    `}
                        {...props}
                    />
                </div>
                {error && <p className="text-xs text-[var(--content-red)]">{error}</p>}
                {helperText && !error && <p className="text-xs text-contentTertiary">{helperText}</p>}
            </div>
        );
    }
);

Input.displayName = "Input";

export default Input;
