/**
 * @file Select.tsx
 * @description Custom dropdown select component matching Figma design.
 * Features label, description, and custom dropdown menu.
 */

"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronUpDownIcon, CheckIcon } from "@heroicons/react/20/solid";

/**
 * @interface SelectOption
 * @property {string} value - Option value
 * @property {string} label - Display label
 */
export interface SelectOption {
    value: string;
    label: string;
}

/**
 * @interface SelectProps
 * @property {SelectOption[]} options - Available options
 * @property {string} [value] - Selected value
 * @property {(value: string) => void} [onChange] - Change handler
 * @property {string} [label] - Label text
 * @property {string} [description] - Description text
 * @property {string} [placeholder] - Placeholder text
 * @property {boolean} [disabled] - Disabled state
 * @property {string} [className] - Additional CSS classes
 */
export interface SelectProps {
    options: SelectOption[];
    value?: string;
    onChange?: (value: string) => void;
    label?: string;
    description?: string;
    placeholder?: string;
    disabled?: boolean;
    className?: string;
}

/**
 * @component Select
 * @description
 * Custom dropdown select with label, description, and menu.
 * Matches Figma design specifications.
 * 
 * @example
 * ```tsx
 * <Select
 *   label="Country"
 *   description="This will be visible to clients on the project."
 *   options={[
 *     { value: "us", label: "United States" },
 *     { value: "uk", label: "United Kingdom" }
 *   ]}
 *   value={country}
 *   onChange={setCountry}
 * />
 * ```
 */
const Select = React.forwardRef<HTMLDivElement, SelectProps>(
    (
        {
            options,
            value,
            onChange,
            label,
            description,
            placeholder = "Select",
            disabled = false,
            className = "",
        },
        ref
    ) => {
        const [isOpen, setIsOpen] = useState(false);
        const selectRef = useRef<HTMLDivElement>(null);

        const selectedOption = options.find((opt) => opt.value === value);

        // Close dropdown when clicking outside
        useEffect(() => {
            const handleClickOutside = (event: MouseEvent) => {
                if (
                    selectRef.current &&
                    !selectRef.current.contains(event.target as Node)
                ) {
                    setIsOpen(false);
                }
            };

            document.addEventListener("mousedown", handleClickOutside);
            return () => document.removeEventListener("mousedown", handleClickOutside);
        }, []);

        const handleSelect = (optionValue: string) => {
            if (!disabled && onChange) {
                onChange(optionValue);
                setIsOpen(false);
            }
        };

        return (
            <div className={`w-full ${className}`} ref={selectRef}>
                {/* Label and Description */}
                {(label || description) && (
                    <div className="mb-2 space-y-1">
                        {label && (
                            <label className="block text-sm font-semibold text-contentPrimary">
                                {label}
                            </label>
                        )}
                        {description && (
                            <p className="text-sm font-medium text-contentSecondary">
                                {description}
                            </p>
                        )}
                    </div>
                )}

                {/* Select Trigger */}
                <div className="relative">
                    <button
                        type="button"
                        onClick={() => !disabled && setIsOpen(!isOpen)}
                        disabled={disabled}
                        className={`
              w-full flex items-center justify-between gap-3
              px-3 py-2 rounded-lg border text-sm font-medium text-left
              transition-all duration-200
              ${disabled
                                ? "bg-backgroundTertiary border-borderSecondary text-contentTertiary cursor-not-allowed"
                                : "bg-backgroundPrimary border-borderPrimary text-contentPrimary hover:border-tealPrimary focus:outline-none focus:ring-2 focus:ring-tealPrimary focus:border-tealPrimary"
                            }
            `}
                    >
                        <span className="flex-1">
                            {selectedOption ? selectedOption.label : placeholder}
                        </span>
                        <ChevronUpDownIcon className="w-5 h-5 text-contentSecondary flex-shrink-0" />
                    </button>

                    {/* Dropdown Menu */}
                    {isOpen && !disabled && (
                        <div className="absolute z-10 w-full mt-1 bg-backgroundPrimary border border-borderSecondary rounded-lg shadow-lg max-h-60 overflow-auto">
                            {options.map((option) => (
                                <button
                                    key={option.value}
                                    type="button"
                                    onClick={() => handleSelect(option.value)}
                                    className={`
                    w-full flex items-center justify-between gap-2
                    px-3 py-2 text-sm text-left
                    transition-colors duration-150
                    ${option.value === value
                                            ? "bg-backgroundTertiary text-tealPrimary font-medium"
                                            : "text-contentPrimary hover:bg-backgroundSecondary"
                                        }
                  `}
                                >
                                    <span>{option.label}</span>
                                    {option.value === value && (
                                        <CheckIcon className="w-5 h-5 text-tealPrimary" />
                                    )}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        );
    }
);

Select.displayName = "Select";

export default Select;
