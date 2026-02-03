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
export interface RadioProps {
    /** Unique identifier for the radio input */
    id?: string;
    /** Name attribute for radio group */
    name: string;
    /** Value of the radio option */
    value: string;
    /** Label text for the radio */
    label?: string;
    /** Whether the radio is checked */
    checked?: boolean;
    /** Whether the radio is disabled */
    disabled?: boolean;
    /** Change handler */
    onChange?: (value: string) => void;
    /** Additional CSS classes */
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
    id,
    name,
    value,
    label,
    checked = false,
    disabled = false,
    onChange,
    className = "",
}: RadioProps) {
    const radioId = id || `radio-${name}-${value}`;

    const handleChange = () => {
        if (!disabled && onChange) {
            onChange(value);
        }
    };

    return (
        <div className={`flex items-center gap-2 ${className}`}>
            <div className="relative flex items-center">
                <input
                    type="radio"
                    id={radioId}
                    name={name}
                    value={value}
                    checked={checked}
                    disabled={disabled}
                    onChange={handleChange}
                    className="peer sr-only"
                />
                <label
                    htmlFor={radioId}
                    className={`
            flex items-center justify-center
            w-5 h-5 rounded-full border-2 
            transition-all duration-200
            cursor-pointer
            ${disabled
                            ? "border-borderSecondary bg-backgroundTertiary cursor-not-allowed"
                            : checked
                                ? "border-tealPrimary bg-white"
                                : "border-borderPrimary bg-white hover:border-tealPrimary"
                        }
          `}
                >
                    {checked && (
                        <div
                            className={`
                w-2.5 h-2.5 rounded-full
                ${disabled ? "bg-contentTertiary" : "bg-tealPrimary"}
              `}
                        />
                    )}
                </label>
            </div>
            {label && (
                <label
                    htmlFor={radioId}
                    className={`
            text-sm select-none
            ${disabled
                            ? "text-contentTertiary cursor-not-allowed"
                            : "text-contentPrimary cursor-pointer"
                        }
          `}
                >
                    {label}
                </label>
            )}
        </div>
    );
}
