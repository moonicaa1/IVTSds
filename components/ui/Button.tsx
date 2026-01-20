/**
 * @file Button.tsx
 * @description 프로젝트 전반에서 사용되는 핵심 버튼 컴포넌트입니다.
 * 다양한 크기(xs~xl), 변형(default, outline, plain) 및 아이콘 배치를 지원합니다.
 */

import React from "react";

/**
 * @interface ButtonProps
 * @description Button 컴포넌트의 기능을 확장하기 위한 Props 정의입니다.
 * 기존 HTML Button 엘리먼트의 모든 속성을 상속받습니다.
 * 
 * @property {"default" | "outline" | "plain"} [variant] - 버튼 스타일 종류
 * @property {"xs" | "sm" | "base" | "l" | "xl"} [size] - 버튼 크기 옵션
 * @property {React.ReactNode} [leftIcon] - 버튼 텍스트 왼쪽에 배치될 아이콘
 * @property {React.ReactNode} [rightIcon] - 버튼 텍스트 오른쪽에 배치될 아이콘
 * @property {boolean} [iconOnly] - 텍스트 없이 아이콘만 있는 원형/정사각형 버튼 여부
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "default" | "outline" | "plain";
    size?: "xs" | "sm" | "base" | "l" | "xl";
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    iconOnly?: boolean;
}

/**
 * @component Button
 * @description 디자인 시스템 가이드라인을 준수하는 범용 버튼 컴포넌트입니다.
 * `forwardRef`를 통해 부모 컴포넌트에서의 접근을 지원합니다.
 * 
 * @example
 * <Button variant="default" size="sm">저장하기</Button>
 * <Button variant="outline" leftIcon={<RefreshIcon />}>새로고침</Button>
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className = "", variant = "default", size = "base", leftIcon, rightIcon, iconOnly, children, disabled, ...props }, ref) => {

        // Base styles
        const baseStyles = "inline-flex items-center justify-center rounded-lg font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

        // Size styles
        const sizeStyles = {
            xs: "h-7 px-2 text-xs", // 28px
            sm: "h-9 px-4 text-sm", // 36px
            base: "h-10 px-4 text-sm", // 40px
            l: "h-11 px-5 text-base", // 44px
            xl: "h-12 px-6 text-base", // 48px
        };

        // Icon Only Size Styles (Square)
        const iconOnlyStyles = {
            xs: "h-7 w-7 p-0",
            sm: "h-9 w-9 p-0",
            base: "h-10 w-10 p-0",
            l: "h-11 w-11 p-0",
            xl: "h-12 w-12 p-0",
        };

        // Variant styles
        const variantStyles = {
            // Default (Primary Action): using backgroundInversePrimary (Black) text-contentInversePrimary (White)
            default: "bg-backgroundInversePrimary text-contentInversePrimary hover:bg-backgroundInverseSecondary active:bg-backgroundInverseTertiary border border-transparent",

            // Outline (Secondary Action): bg-backgroundPrimary (White), border-borderPrimary ?? (Need to check border tokens, usually borderPrimary is light gray)
            // Using border-[#E4E4E7] (Zinc-200) which matches backgroundQuaternary or borderPrimary? 
            // Let's stick to safe semantic mapping or keep hex if token is unclear.
            // Verified backgroundPrimary = #FFFFFF. borderPrimary is usually #E4E4E7 or #D4D4D8.
            outline: "bg-backgroundPrimary text-contentPrimary border border-borderSecondary hover:bg-backgroundSecondary active:bg-backgroundTertiary",

            // Plain (Ghost/Tertiary): bg-transparent, text-contentPrimary
            plain: "bg-transparent text-contentPrimary hover:bg-backgroundSecondary active:bg-backgroundTertiary",
        };

        const finalSizeClass = iconOnly ? iconOnlyStyles[size] : sizeStyles[size];

        return (
            <button
                ref={ref}
                className={`${baseStyles} ${variantStyles[variant]} ${finalSizeClass} ${className}`}
                disabled={disabled}
                {...props}
            >
                {leftIcon && <span className={`flex-shrink-0 ${children ? "mr-1.5" : ""}`}>{leftIcon}</span>}
                {children}
                {rightIcon && <span className={`flex-shrink-0 ${children ? "ml-1.5" : ""}`}>{rightIcon}</span>}
            </button>
        );
    }
);

Button.displayName = "Button";

export default Button;
