/**
 * @file Table.tsx
 * @description 고성능 데이터 그리드 컴포넌트입니다.
 * 정렬, 필터, 다중 선택, 행 확장(Sub-rows), 페이지네이션 및 엑셀 다운로드 등 엔터프라이즈급 기능을 제공합니다.
 */

"use client";

import React from "react";
import Button from "@/components/ui/Button";
import {
    MagnifyingGlassIcon,
    AdjustmentsHorizontalIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    ChevronDownIcon,
    ArrowDownTrayIcon
} from "@heroicons/react/24/outline";
import Checkbox from "@/components/ui/Checkbox";
import MultiSelectDropdown from "@/components/ui/MultiSelectDropdown";
import Badge from "@/components/ui/Badge";

// --- Component Props ---
/**
 * @interface Column
 * @description 테이블의 개별 컬럼 설정을 정의합니다.
 */
interface Column<T> {
    /** 데이터 객체에서 매핑할 키(property name)입니다. */
    key: string;
    /** 테이블 헤더 영역에 표시될 텍스트입니다. */
    header: string;
    /** 데이터 값을 커스텀하게 렌더링하고 싶을 때 사용하는 함수입니다. (예: 배지, 아이콘 등) */
    render?: (item: T) => React.ReactNode;
    /** 텍스트 정렬 방향을 설정합니다. (기본값: left) */
    align?: "left" | "center" | "right";
    /** 컬럼의 너비를 설정합니다. (예: '120px', '20%') */
    width?: string;
    /** 해당 컬럼의 정렬 기능을 활성화할지 여부입니다. (기본값: true) */
    sortable?: boolean;
}

/**
 * @interface TableProps
 * @description Table 컴포넌트의 입력 파라미터 정의입니다.
 */
interface TableProps<T> {
    /** 테이블에 표시할 데이터 배열입니다. */
    data: T[];
    /** 테이블의 컬럼 구성 및 렌더링 방식에 대한 설정 배열입니다. */
    columns: Column<T>[];
    /** 전체 데이터 아이템의 총 개수입니다. (서버 사이드 페이지네이션에 활용) */
    totalItems: number;
    /** 현재 표시되고 있는 페이지 번호(1-indexed)입니다. */
    currentPage: number;
    /** 한 페이지에 노출할 최대 행 수입니다. */
    itemsPerPage: number;
    /** 페이지 번호를 변경했을 때 호출되는 콜백 함수입니다. */
    onPageChange: (page: number) => void;
    /** 검색 창의 플레이스홀더 텍스트입니다. */
    searchPlaceholder?: string;
    /** 한 페이지 노출 행 수를 변경했을 때 호출되는 콜백 함수입니다. */
    onRowCountChange?: (count: number) => void;
    /** 검색어가 입력되었을 때 호출되는 콜백 함수입니다. */
    onSearch?: (term: string) => void;
    /** 필터 조건이 변경되었을 때 호출되는 콜백 함수입니다. */
    onFilter?: (filters: Record<string, Set<string>>) => void;
    /** 필터 배지의 색상을 동적으로 결정하는 함수입니다. */
    getFilterBadgeColor?: (column: string, value: string) => string;
    /** 정렬 조건이 변경되었을 때 호출되는 콜백 함수입니다. */
    onSort?: (key: string, direction: "asc" | "desc") => void;
    /** 필터 드롭다운에 노출할 옵션 목록입니다. */
    filterOptions?: Record<string, string[]>;
}

// --- Table Component ---
/**
 * @component Table
 * @description
 * 재사용 가능한 데이터 테이블 컴포넌트입니다.
 * 검색, 필터, 정렬, 페이지네이션 및 액션 버튼(Excel 등)을 포함합니다.
 * 
 * @props {T[]} data - 테이블에 표시할 데이터 배열
 * @props {Column<T>[]} columns - 컬럼 정의 배열
 * @props {number} totalItems - 전체 아이템 수 (페이지네이션용)
 * @props {number} currentPage - 현재 페이지 번호
 * @props {number} itemsPerPage - 페이지당 아이템 수
 * @props {function} onPageChange - 페이지 변경 핸들러
 */
export default function Table<T extends { id: string | number }>({
    data,
    columns,
    totalItems,
    currentPage,
    itemsPerPage,
    onPageChange,
    onRowCountChange,
    onSearch,
    onFilter,
    getFilterBadgeColor,
    onSort,
    filterOptions: passedFilterOptions,
    searchPlaceholder = "Search for dealer code, dealer name",
}: TableProps<T>) {
    // State
    const [selectedRows, setSelectedRows] = React.useState<Set<string | number>>(new Set());
    const [visibleColumns, setVisibleColumns] = React.useState<Set<string>>(new Set(columns.map(c => c.key)));
    const [openDropdown, setOpenDropdown] = React.useState<string | null>(null);
    const [sortConfig, setSortConfig] = React.useState<{ key: string; direction: "asc" | "desc" } | null>(null);
    const [filters, setFilters] = React.useState<Record<string, Set<string>>>({});
    const [expandedRows, setExpandedRows] = React.useState<Set<string | number>>(new Set());

    // Toggle Row Selection (Cascading)
    const toggleRow = (id: string | number, subRows?: any[]) => {
        const newSelected = new Set(selectedRows);
        const isSelected = newSelected.has(id);

        if (isSelected) {
            newSelected.delete(id);
            // Deselect children
            if (subRows) {
                subRows.forEach(child => newSelected.delete(child.id));
            }
        } else {
            newSelected.add(id);
            // Select children
            if (subRows) {
                subRows.forEach(child => newSelected.add(child.id));
            }
        }
        setSelectedRows(newSelected);
    };

    // Toggle Row Expansion
    const toggleExpand = (id: string | number) => {
        const newExpanded = new Set(expandedRows);
        if (newExpanded.has(id)) newExpanded.delete(id);
        else newExpanded.add(id);
        setExpandedRows(newExpanded);
    };

    // Calculate total selectable items (parents + children)
    const getAllSelectableIds = React.useCallback(() => {
        const allIds = new Set<string | number>();
        data.forEach(item => {
            allIds.add(item.id);
            if ((item as any).subRows) {
                (item as any).subRows.forEach((sub: any) => allIds.add(sub.id));
            }
        });
        return allIds;
    }, [data]);

    // Toggle All Rows
    const toggleAll = () => {
        const allIds = getAllSelectableIds();
        if (selectedRows.size === allIds.size) setSelectedRows(new Set()); // Deselect All
        else setSelectedRows(allIds); // Select All
    };

    // Toggle Column Visibility
    const toggleColumn = (key: string) => {
        const newVisible = new Set(visibleColumns);
        if (newVisible.has(key)) newVisible.delete(key);
        else newVisible.add(key);
        setVisibleColumns(newVisible);
    };

    // Handle Sort
    const handleSort = (key: string) => {
        let direction: "asc" | "desc" = "asc";
        if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
            direction = "desc";
        }
        setSortConfig({ key, direction });
        if (onSort) onSort(key, direction);
    };

    const totalPages = Math.ceil(totalItems / itemsPerPage);
    // Correct check for "All Selected" state including sub-rows
    const allSelectableCount = React.useMemo(() => {
        let count = 0;
        data.forEach(item => {
            count++;
            if ((item as any).subRows) count += (item as any).subRows.length;
        });
        return count;
    }, [data]);

    const isAllSelected = data.length > 0 && selectedRows.size === allSelectableCount;

    // Filter Options
    const finalFilterOptions = passedFilterOptions || {
        "Dealer Type": ["Standard", "Premium", "Enterprise", "Basic"],
        "Side Menu Set": ["SSC", "Genesis"],
        "Status": ["Active", "Inactive"]
    };

    return (
        <div className="rounded-xl border border-borderPrimary bg-backgroundPrimary p-5 shadow-[0px_1px_2px_rgba(0,0,0,0.05)] relative">
            {/* Section Title */}
            <div className="mb-4 text-base font-semibold leading-6 text-contentPrimary">List</div>

            {/* Filter Toolbar */}
            <div className="mb-6 flex flex-col gap-4">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    {/* Left: Search & Filters */}
                    <div className="flex flex-1 items-center gap-4">
                        {/* Search Box */}
                        <div className="relative w-[320px]">
                            <input
                                type="text"
                                placeholder={searchPlaceholder}
                                onChange={(e) => onSearch && onSearch(e.target.value)}
                                className="h-10 w-full rounded-lg border border-borderSecondary bg-backgroundPrimary px-3 pl-10 text-sm text-contentPrimary placeholder:text-contentSecondary focus:border-backgroundInversePrimary focus:outline-none transition-colors"
                            />
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-contentSecondary">
                                <MagnifyingGlassIcon className="w-5 h-5" />
                            </div>
                        </div>

                        {/* Filters */}
                        <div className="flex items-center gap-6">
                            {Object.entries(finalFilterOptions).map(([label, options]) => (
                                <MultiSelectDropdown
                                    key={label}
                                    label={label}
                                    options={options}
                                    selectedValues={filters[label] || new Set()}
                                    getBadgeColor={getFilterBadgeColor ? (val) => getFilterBadgeColor(label, val) : undefined}
                                    onChange={(newSelected) => {
                                        const newFilters = { ...filters };
                                        if (newSelected.size === 0) {
                                            delete newFilters[label];
                                        } else {
                                            newFilters[label] = newSelected;
                                        }
                                        setFilters(newFilters);
                                        if (onFilter) onFilter(newFilters);
                                    }}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex items-center gap-2">
                        {/* Edit Columns */}
                        <div className="relative">
                            <Button
                                variant="outline"
                                size="sm"
                                leftIcon={<AdjustmentsHorizontalIcon className="w-4 h-4" />}
                                className="shadow-sm"
                                onClick={() => setOpenDropdown(openDropdown === "columns" ? null : "columns")}
                            >
                                Edit columns
                            </Button>
                            {openDropdown === "columns" && (
                                <>
                                    <div className="fixed inset-0 z-40" onClick={() => setOpenDropdown(null)} />
                                    <div className="absolute right-0 top-full z-50 mt-1 w-56 rounded-lg border border-borderSecondary bg-backgroundPrimary p-2 shadow-lg">
                                        <div className="mb-2 px-2 text-xs font-semibold text-contentSecondary">Visible Columns</div>
                                        {columns.map(col => (
                                            <label key={col.key} className="flex items-center gap-2 rounded px-2 py-1.5 hover:bg-backgroundSecondary">
                                                <Checkbox
                                                    checked={visibleColumns.has(col.key)}
                                                    onCheckedChange={() => toggleColumn(col.key)}
                                                />
                                                <span className="text-sm text-contentPrimary">{col.header}</span>
                                            </label>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                        <Button
                            variant="outline"
                            size="sm"
                            leftIcon={<ArrowDownTrayIcon className="w-4 h-4" />}
                            className="shadow-sm"
                        >
                            Excel
                        </Button>
                    </div>
                </div>

                {/* Bulk Action Bar - Show when rows selected */}
                {selectedRows.size > 0 && (
                    <div className="flex items-center gap-4 rounded-lg bg-backgroundSecondary px-4 py-2">
                        <span className="text-sm font-bold text-contentPrimary">{selectedRows.size} Selected</span>
                        <div className="h-4 w-px bg-borderSecondary" />
                        <button className="flex items-center gap-1 text-sm font-medium text-green-600 hover:text-green-700">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                            Confirm selected
                        </button>
                        <button className="flex items-center gap-1 text-sm font-medium text-red-600 hover:text-red-700">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2(severity: error)0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                            Delete selected
                        </button>
                    </div>
                )}
            </div>

            {/* Table Area */}
            <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left">
                    <thead>
                        <tr className="border-b border-borderSecondary">
                            {/* Explicit Chevron Column for Alignment */}
                            <th className="w-10 py-3 text-center"></th>
                            {/* Checkbox Header */}
                            <th className="w-10 py-3 pl-4">
                                <Checkbox
                                    checked={
                                        isAllSelected
                                            ? true
                                            : selectedRows.size > 0
                                                ? "indeterminate"
                                                : false
                                    }
                                    onCheckedChange={toggleAll}
                                />
                            </th>
                            {columns.filter(col => visibleColumns.has(col.key)).map((col) => (
                                <th
                                    key={col.key}
                                    className={`py-3 px-4 text-xs font-semibold text-contentSecondary cursor-pointer hover:text-contentPrimary select-none whitespace-nowrap ${col.align === "right" ? "text-right" : col.align === "center" ? "text-center" : "text-left"}`}
                                    style={{ width: col.width }}
                                    onClick={() => col.sortable !== false && handleSort(col.key)}
                                >
                                    <div className={`flex items-center gap-1 ${col.align === "right" ? "justify-end" : col.align === "center" ? "justify-center" : "justify-start"}`}>
                                        {col.header}
                                        {col.sortable !== false && (
                                            <div className="flex flex-col gap-[2px]">
                                                {/* Active Sort Indicator */}
                                                <svg width="6" height="4" viewBox="0 0 6 4" fill="none" className={sortConfig?.key === col.key && sortConfig.direction === "asc" ? "text-black" : "text-contentTertiary"}><path d="M3 0L5.59808 3.75L0.401924 3.75L3 0Z" fill="currentColor" /></svg>
                                                <svg width="6" height="4" viewBox="0 0 6 4" fill="none" className={sortConfig?.key === col.key && sortConfig.direction === "desc" ? "text-black rotate-180" : "text-contentTertiary rotate-180"}><path d="M3 0L5.59808 3.75L0.401924 3.75L3 0Z" fill="currentColor" /></svg>
                                            </div>
                                        )}
                                    </div>
                                </th>
                            ))}
                            {/* Menu Header */}
                            <th className="w-10 py-3"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => {
                            const isExpanded = expandedRows.has(item.id);
                            const hasSubRows = (item as any).subRows && (item as any).subRows.length > 0;

                            return (
                                <React.Fragment key={item.id}>
                                    {/* Parent Row */}
                                    <tr
                                        key={item.id}
                                        onClick={() => hasSubRows && toggleExpand(item.id)}
                                        className={`
                                            group border-b last:border-0 transition-colors
                                            ${isExpanded
                                                ? "bg-tealPrimary/5 border-tealPrimary/20"
                                                : "bg-backgroundPrimary border-borderSecondary hover:bg-backgroundSecondary cursor-pointer"
                                            }
                                        `}
                                    >
                                        <td className={`w-10 py-3 text-center ${isExpanded ? "border-l-[4px] border-l-tealPrimary" : "pl-[4px]"}`}>
                                            {/* Expand/Collapse Chevron */}
                                            {hasSubRows && (
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        toggleExpand(item.id);
                                                    }}
                                                    className={`rounded p-1 text-contentSecondary transition-transform hover:bg-backgroundTertiary hover:text-contentPrimary ${isExpanded ? "rotate-90" : ""}`}
                                                >
                                                    <ChevronRightIcon className="h-4 w-4" strokeWidth={2} />
                                                </button>
                                            )}
                                        </td>
                                        {/* Checkbox Cell */}
                                        <td className="w-10 py-3 pl-4" onClick={(e) => e.stopPropagation()}>
                                            <Checkbox
                                                checked={selectedRows.has(item.id)}
                                                onCheckedChange={() => toggleRow(item.id, (item as any).subRows)}
                                            />
                                        </td>
                                        {columns.filter(col => visibleColumns.has(col.key)).map((col, colIndex) => (
                                            <td
                                                key={`${item.id}-${col.key}`}
                                                className={`px-4 py-3 text-[13px] text-contentPrimary ${col.align === "right" ? "text-right" : col.align === "center" ? "text-center" : "text-left"}`}
                                            >
                                                <div className={`flex items-center gap-2 ${col.align === "right" ? "justify-end" : col.align === "center" ? "justify-center" : "justify-start"}`}>
                                                    {col.render ? col.render(item) : (item as any)[col.key]}
                                                </div>
                                            </td>
                                        ))}
                                        {/* Menu Action Cell */}
                                        <td className="py-3 pr-4 text-right" onClick={(e) => e.stopPropagation()}>
                                            <button className="text-contentSecondary hover:text-contentPrimary">
                                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>

                                    {/* Expanded Row (Nested Table w/ Seamless Look & Teal Border) */}
                                    {isExpanded && hasSubRows && (
                                        <tr className="bg-tealPrimary/5 border-b border-borderSecondary">
                                            {/* Spacer for Indentation with Teal Border */}
                                            <td className="w-10 py-3 text-center border-r border-tealPrimary/20 border-l-[4px] border-l-tealPrimary"></td>

                                            {/* Nested Table Container - No Padding/Card Style */}
                                            <td colSpan={columns.length + 2} className="p-0">
                                                <div className="w-full pl-[52px]"> {/* Indentation for nested content */}
                                                    <table className="w-full text-left">
                                                        <thead className="border-b border-borderSecondary text-contentSecondary">
                                                            <tr>
                                                                <th className="w-10 py-2 pl-4">
                                                                    {/* Inner Checkbox Spacer */}
                                                                    <div className="h-4 w-4" />
                                                                </th>
                                                                <th className="py-2 px-4 text-xs font-semibold flex items-center gap-1">
                                                                    Vehicle
                                                                    <div className="flex flex-col gap-[2px]">
                                                                        <svg width="6" height="4" viewBox="0 0 6 4" fill="none" className="text-contentTertiary"><path d="M3 0L5.59808 3.75L0.401924 3.75L3 0Z" fill="currentColor" /></svg>
                                                                        <svg width="6" height="4" viewBox="0 0 6 4" fill="none" className="text-contentTertiary rotate-180"><path d="M3 0L5.59808 3.75L0.401924 3.75L3 0Z" fill="currentColor" /></svg>
                                                                    </div>
                                                                </th>
                                                                <th className="py-2 px-4 text-xs font-semibold">
                                                                    <div className="flex items-center gap-1">
                                                                        Email
                                                                        <div className="flex flex-col gap-[2px]">
                                                                            <svg width="6" height="4" viewBox="0 0 6 4" fill="none" className="text-contentTertiary"><path d="M3 0L5.59808 3.75L0.401924 3.75L3 0Z" fill="currentColor" /></svg>
                                                                            <svg width="6" height="4" viewBox="0 0 6 4" fill="none" className="text-contentTertiary rotate-180"><path d="M3 0L5.59808 3.75L0.401924 3.75L3 0Z" fill="currentColor" /></svg>
                                                                        </div>
                                                                    </div>
                                                                </th>
                                                                <th className="py-2 px-4 text-xs font-semibold text-right">IsActive</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {(item as any).subRows.map((subItem: any) => (
                                                                <tr key={subItem.id} className="border-b border-tealPrimary/10 last:border-0 hover:bg-tealPrimary/5">
                                                                    <td className="py-3 pl-4">
                                                                        <Checkbox
                                                                            checked={selectedRows.has(subItem.id)}
                                                                            onCheckedChange={() => toggleRow(subItem.id)}
                                                                        />
                                                                    </td>
                                                                    <td className="px-4 py-3 text-sm text-contentPrimary font-medium">{subItem.code}</td>
                                                                    <td className="px-4 py-3 text-sm text-contentPrimary">{subItem.name}</td>
                                                                    <td className="px-4 py-3 text-right">
                                                                        <Badge color={subItem.status === 'Active' ? 'Green' : 'Zinc'}>
                                                                            {subItem.status}
                                                                        </Badge>
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Footer / Pagination */}
            <div className="mt-4 flex items-center justify-between">
                {/* Row Count Dropdown */}
                <div className="flex items-center gap-2 text-sm text-contentPrimary">
                    <span className="font-medium">Row count :</span>
                    <div className="relative">
                        <button
                            onClick={() => setOpenDropdown(openDropdown === "rowCount" ? null : "rowCount")}
                            className="flex h-8 items-center gap-2 rounded-lg border border-borderSecondary bg-backgroundPrimary px-2.5 text-sm font-medium hover:bg-backgroundSecondary"
                        >
                            {itemsPerPage}
                            <ChevronDownIcon className="w-3 h-3" />
                        </button>
                        {openDropdown === "rowCount" && (
                            <>
                                <div className="fixed inset-0 z-40" onClick={() => setOpenDropdown(null)} />
                                <div className="absolute bottom-full left-0 z-50 mb-1 w-20 rounded-lg border border-borderSecondary bg-backgroundPrimary p-1 shadow-lg">
                                    {[10, 20, 30, 50].map(count => (
                                        <button
                                            key={count}
                                            onClick={() => {
                                                if (onRowCountChange) onRowCountChange(count);
                                                setOpenDropdown(null);
                                            }}
                                            className={`w-full rounded px-2 py-1.5 text-left text-sm hover:bg-backgroundSecondary ${itemsPerPage === count ? "font-bold text-black" : "text-contentPrimary"}`}
                                        >
                                            {count}
                                        </button>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* Page Navigation */}
                <div className="flex items-center gap-1">
                    {/* Previous Arrow */}
                    <button
                        type="button"
                        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        className={`flex h-8 w-8 items-center justify-center rounded-lg text-contentSecondary hover:bg-borderTertiary disabled:opacity-50`}
                    >
                        <ChevronLeftIcon className="w-4 h-4" />
                    </button>

                    {/* Numbers */}
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                            key={page}
                            onClick={() => onPageChange(page)}
                            className={`h-8 w-8 rounded-lg text-sm font-medium transition-colors ${currentPage === page
                                ? "bg-borderTertiary text-backgroundInversePrimary" // Active state in Figma: Light gray bg, dark text
                                : "text-contentSecondary hover:bg-borderTertiary"
                                }`}
                        >
                            {page}
                        </button>
                    ))}

                    {/* Next Arrow */}
                    <button
                        type="button"
                        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                        className={`flex h-8 w-8 items-center justify-center rounded-lg text-contentSecondary hover:bg-borderTertiary disabled:opacity-50`}
                    >
                        <ChevronRightIcon className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}
