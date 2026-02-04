/**
 * @file Alert.tsx
 * @description Alert component for displaying notifications and messages with different severity levels.
 */

"use client";

import React from "react";
import {
    InformationCircleIcon,
    CheckCircleIcon,
    ExclamationTriangleIcon,
    XCircleIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline";

/**
 * @interface AlertProps
 * @description Props for the Alert component
 */
export interface AlertProps {
    /** 알림의 성격(정보, 성공, 경고, 위험)을 결정하며 색상과 아이콘이 변경됩니다. */
    type: "info" | "success" | "warning" | "error";
    /** 알림 상단에 표시될 제목입니다. */
    title?: string;
    /** 사용자에게 전달할 핵심 메시지 내용입니다. */
    description: string;
    /** 닫기 버튼 클릭 시 호출되는 콜백 함수입니다. */
    onClose?: () => void;
    /** 기본 아이콘 대신 사용할 커스텀 아이콘 요소입니다. */
    icon?: React.ReactNode;
    /** 추가적인 스타일 클래스입니다. */
    className?: string;
}

/**
 * @component Alert
 * @description
 * Displays contextual feedback messages for user actions.
 * Supports 4 severity levels with appropriate colors and icons.
 * 
 * @example
 * ```tsx
 * <Alert 
 *   type="success" 
 *   title="Success!"
 *   description="Your changes have been saved."
 *   onClose={() => console.log('closed')}
 * />
 * ```
 */
export default function Alert({
    type,
    title,
    description,
    onClose,
    icon,
    className = "",
}: AlertProps) {
    // Icon mapping based on type
    const getDefaultIcon = () => {
        switch (type) {
            case "info":
                return InformationCircleIcon;
            case "success":
                return CheckCircleIcon;
            case "warning":
                return ExclamationTriangleIcon;
            case "error":
                return XCircleIcon;
        }
    };

    const DefaultIcon = getDefaultIcon();

    // Color scheme mapping using design tokens
    const colorClasses = {
        info: {
            container: "bg-sky border-borderSecondary",
            icon: "text-sky",
            title: "text-contentPrimary",
            description: "text-contentSecondary",
        },
        success: {
            container: "bg-emerald border-borderSecondary",
            icon: "text-emerald",
            title: "text-contentPrimary",
            description: "text-contentSecondary",
        },
        warning: {
            container: "bg-amber border-borderSecondary",
            icon: "text-amber",
            title: "text-contentPrimary",
            description: "text-contentSecondary",
        },
        error: {
            container: "bg-red border-borderSecondary",
            icon: "text-red",
            title: "text-contentPrimary",
            description: "text-contentSecondary",
        },
    };

    const colors = colorClasses[type];

    return (
        <div
            className={`flex gap-3 p-4 rounded-lg border ${colors.container} ${className}`}
            role="alert"
        >
            {/* Icon */}
            <div className="flex-shrink-0">
                {icon ? (
                    <div className={colors.icon}>{icon}</div>
                ) : (
                    <DefaultIcon className={`w-5 h-5 ${colors.icon}`} />
                )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
                {title && (
                    <h3 className={`text-sm font-semibold mb-1 ${colors.title}`}>
                        {title}
                    </h3>
                )}
                <p className={`text-sm ${colors.description}`}>{description}</p>
            </div>

            {/* Close Button */}
            {onClose && (
                <button
                    type="button"
                    onClick={onClose}
                    className={`flex-shrink-0 inline-flex rounded-md p-1.5 ${colors.icon} hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent transition-colors`}
                    aria-label="Dismiss"
                >
                    <XMarkIcon className="w-5 h-5" />
                </button>
            )}
        </div>
    );
}
