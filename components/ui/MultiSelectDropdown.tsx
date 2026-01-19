/**
 * @file MultiSelectDropdown.tsx
 * @description 테이블 필터 영역에서 태그 형식으로 다중 선택을 지원하는 드롭다운 컴포넌트입니다.
 * 선택된 항목을 뱃지로 노출하며, 개별 삭제 및 전체 삭제 기능을 제공합니다.
 */

import React, { useState, useRef, useEffect } from "react";
import Checkbox from "@/components/ui/Checkbox";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import Badge from "@/components/ui/Badge";

/**
 * @interface DropdownOption
 * @property {string} label - 화면에 표시될 텍스트
 * @property {string} value - 데이터로 취급할 실제 값
 */
export interface DropdownOption {
    label: string;
    value: string;
}

/**
 * @interface MultiSelectDropdownProps
 * @property {string} label - 필터 그룹의 라벨 (예: "Dealer Type")
 * @property {DropdownOption[] | string[]} options - 선택 가능한 옵션 목록
 * @property {Set<string>} selectedValues - 현재 선택된 값들의 Set 객체
 * @property {(newSelected: Set<string>) => void} onChange - 선택 변경 시 호출되는 콜백
 * @property {string} [placeholder] - 선택된 것이 없을 때 표시할 텍스트
 * @property {(value: string) => string} [getBadgeColor] - 값에 따른 뱃지 색상을 반환하는 함수
 */
interface MultiSelectDropdownProps {
    label: string;
    options: DropdownOption[] | string[];
    selectedValues: Set<string>;
    onChange: (newSelected: Set<string>) => void;
    placeholder?: string;
    className?: string;
    getBadgeColor?: (value: string) => string;
}

/**
 * @component MultiSelectDropdown
 * @description 복잡한 필터링 환경에서 여러 조건을 편리하게 선택할 수 있게 돕는 UI 요소입니다.
 * 외부 클릭 시 자동으로 닫히는 로직이 포함되어 있습니다.
 * 
 * @example
 * <MultiSelectDropdown 
 *   label="Status" 
 *   options={['Active', 'Inactive']} 
 *   selectedValues={statusSet} 
 *   onChange={setStatusSet} 
 * />
 */
export default function MultiSelectDropdown({
    label,
    options,
    selectedValues,
    onChange,
    placeholder = "Select options",
    className = "",
    getBadgeColor,
}: MultiSelectDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Normalize options to objects
    const normalizedOptions: DropdownOption[] = React.useMemo(() => {
        return options.map(opt =>
            typeof opt === 'string' ? { label: opt, value: opt } : opt
        );
    }, [options]);

    // Handle outside click to close
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const toggleOption = (value: string) => {
        const newSelected = new Set(selectedValues);
        if (newSelected.has(value)) {
            newSelected.delete(value);
        } else {
            newSelected.add(value);
        }
        onChange(newSelected);
    };

    const handleClearAll = () => {
        onChange(new Set());
    };

    const handleRemove = (e: React.MouseEvent, value: string) => {
        e.stopPropagation();
        const newSelected = new Set(selectedValues);
        newSelected.delete(value);
        onChange(newSelected);
    }

    return (
        <div className={`relative ${className}`} ref={dropdownRef}>
            {/* Trigger Button */}
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`
                    flex items-center gap-1.5 rounded-lg bg-white px-2 h-10 text-sm transition-colors hover:bg-backgroundSecondary
                    text-contentPrimary
                `}
            >
                <span className="font-semibold text-contentPrimary mr-1">{label}</span>

                {selectedValues.size > 0 ? (
                    <div className="flex flex-wrap gap-1">
                        {Array.from(selectedValues).map(val => (
                            <Badge
                                key={val}
                                color={(getBadgeColor ? getBadgeColor(val) : "Zinc") as any}
                                showXButton
                                onRemove={(e) => handleRemove(e, val)}
                            >
                                {val}
                            </Badge>
                        ))}
                    </div>
                ) : (
                    <span className="text-contentSecondary font-normal hidden">Select...</span>
                )}

                <ChevronDownIcon className={`w-4 h-4 text-contentSecondary ml-auto transition-transform ${isOpen ? "rotate-180" : ""}`} />
            </button>

            {/* Dropdown Content */}
            {isOpen && (
                <div className="absolute left-0 top-full z-50 mt-1 min-w-full w-max rounded-xl border border-borderSecondary bg-white p-2 shadow-[0px_4px_6px_-4px_rgba(0,0,0,0.1),0px_10px_15px_-3px_rgba(0,0,0,0.1)]">
                    <div className="flex flex-col gap-1">
                        {normalizedOptions.map((option) => (
                            <label
                                key={option.value}
                                className="flex cursor-pointer items-center gap-3 rounded p-2 hover:bg-backgroundSecondary transition-colors"
                            >
                                <Checkbox
                                    checked={selectedValues.has(option.value)}
                                    className="shrink-0"
                                    // Event is handled by the label click mostly, but we can also pass empty handler to avoid readonly warning if needed.
                                    // Checkbox component might need to handle 'readOnly' or 'pointer-events-none' if we rely on label click.
                                    // Since our Checkbox is a button, clicking it directly works.
                                    onCheckedChange={() => toggleOption(option.value)}
                                />
                                <span className="text-sm font-medium text-contentPrimary select-none">
                                    {option.label}
                                </span>
                            </label>
                        ))}
                    </div>

                    {/* Footer Actions */}
                    {selectedValues.size > 0 && (
                        <div className="mt-2 flex border-t border-borderSecondary pt-2 justify-start">
                            <button
                                onClick={handleClearAll}
                                className="rounded px-2 py-1 text-xs font-semibold text-red-500 hover:bg-red-50 transition-colors"
                            >
                                Clear All
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
