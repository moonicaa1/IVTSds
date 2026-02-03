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
    /** Type of alert determining the color scheme and icon */
    type: "info" | "success" | "warning" | "error";
    /** Optional title for the alert */
    title?: string;
    /** Main message content */
    description: string;
    /** Optional callback when close button is clicked */
    onClose?: () => void;
    /** Optional custom icon (overrides default type icon) */
    icon?: React.ReactNode;
    /** Additional CSS classes */
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

    // Color scheme mapping
    const colorClasses = {
        info: {
            container: "bg-blue-50 border-blue-200",
            icon: "text-blue-600",
            title: "text-blue-900",
            description: "text-blue-700",
        },
        success: {
            container: "bg-emerald-50 border-emerald-200",
            icon: "text-emerald-600",
            title: "text-emerald-900",
            description: "text-emerald-700",
        },
        warning: {
            container: "bg-amber-50 border-amber-200",
            icon: "text-amber-600",
            title: "text-amber-900",
            description: "text-amber-700",
        },
        error: {
            container: "bg-red-50 border-red-200",
            icon: "text-red-600",
            title: "text-red-900",
            description: "text-red-700",
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
