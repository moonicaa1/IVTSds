/**
 * @file DocumentsContent.tsx
 * @description 문서 관리 페이지의 메인 컨텐츠 컴포넌트입니다.
 * 문서 목록 테이블과 검색, 필터 기능을 포함합니다.
 */

"use client";

import { useState } from "react";
import Table from "@/components/ui/Table";
import Badge from "@/components/ui/Badge";
import { DOCUMENTS_DATA, type Document } from "@/lib/data/mockData";
import { BookmarkIcon as BookmarkIconOutline } from "@heroicons/react/24/outline";
import { BookmarkIcon as BookmarkIconSolid } from "@heroicons/react/24/solid";
import { useSidebar } from "@/lib/contexts/SidebarContext";
import Button from "@/components/ui/Button";

export default function DocumentsContent() {
    const { favorites, toggleFavorite } = useSidebar();

    // Data State
    const [documents, setDocuments] = useState<Document[]>(DOCUMENTS_DATA);

    // UI State
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState("");
    const [filters, setFilters] = useState<Record<string, Set<string>>>({});
    const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" } | null>(null);

    // Filter & Sort Logic
    const filteredData = documents.filter((item) => {
        if (searchTerm) {
            const lowerTerm = searchTerm.toLowerCase();
            if (
                !item.docId.toLowerCase().includes(lowerTerm) &&
                !item.name.toLowerCase().includes(lowerTerm)
            ) {
                return false;
            }
        }
        if (filters["Category"]?.size > 0 && !filters["Category"].has(item.category)) return false;
        if (filters["Owner"]?.size > 0 && !filters["Owner"].has(item.owner)) return false;

        return true;
    });

    const sortedData = [...filteredData].sort((a, b) => {
        if (!sortConfig) return 0;
        const { key, direction } = sortConfig;
        const aValue = (a as any)[key];
        const bValue = (b as any)[key];
        if (aValue < bValue) return direction === "asc" ? -1 : 1;
        if (aValue > bValue) return direction === "asc" ? 1 : -1;
        return 0;
    });

    const totalItems = sortedData.length;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
    const currentDocuments = sortedData.slice(startIndex, endIndex);

    // Handlers
    const handleSearch = (term: string) => {
        setSearchTerm(term);
        setCurrentPage(1);
    };

    const handleFilter = (newFilters: Record<string, Set<string>>) => {
        setFilters(newFilters);
        setCurrentPage(1);
    };

    const handleSort = (key: string, direction: "asc" | "desc") => {
        setSortConfig({ key, direction });
    };

    // Table Columns
    const columns = [
        {
            key: "id",
            header: "#",
            width: "68px",
            align: "center" as const,
            render: (item: Document) => <span className="text-contentSecondary font-medium">{item.id}</span>
        },
        {
            key: "docId",
            header: "Document ID",
            width: "205px",
            render: (item: Document) => <span className="font-bold text-contentPrimary">{item.docId}</span>
        },
        {
            key: "name",
            header: "Document Name",
            width: "758px",
            render: (item: Document) => <span className="font-bold text-contentPrimary">{item.name}</span>
        },
        {
            key: "category",
            header: "Category",
            width: "210px",
            render: (item: Document) => {
                const colors: Record<string, any> = {
                    Legal: "Blue",
                    Product: "Pink",
                    Technical: "Purple",
                    Internal: "Zinc"
                };
                return <Badge color={colors[item.category] || "Zinc"}>{item.category}</Badge>;
            }
        },
        {
            key: "owner",
            header: "Owner",
            width: "210px",
            render: (item: Document) => <span className="font-bold text-contentPrimary">{item.owner}</span>
        }
    ];

    return (
        <div className="p-8">
            {/* Page Header - Figma ID: 4857:88302 */}
            <div className="mb-6 flex items-start justify-between">
                <div className="flex flex-col gap-4">
                    {/* Breadcrumb */}
                    <div className="flex h-5 items-center gap-1.5">
                        <svg className="h-5 w-5 text-contentSecondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        <svg className="h-3 w-3 text-contentSecondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                        </svg>
                        <span className="text-sm font-semibold leading-4 text-contentPrimary">Documents</span>
                    </div>

                    {/* Title Row */}
                    <div className="flex items-center gap-2">
                        <h1 className="text-[30px] font-semibold leading-9 text-contentPrimary">Documents</h1>
                        <button
                            type="button"
                            onClick={() => toggleFavorite("Documents")}
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-borderPrimary bg-backgroundPrimary hover:bg-backgroundSecondary transition-colors shadow-sm"
                        >
                            {favorites.has("Documents") ? (
                                <BookmarkIconSolid className="h-4 w-4 text-[#0f766e]" />
                            ) : (
                                <BookmarkIconOutline className="h-4 w-4 text-contentTertiary" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Header Action Button - Figma ID: 4857:88313 */}
                <Button
                    variant="default"
                    size="sm"
                    className="h-9 px-4"
                    leftIcon={
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                    }
                >
                    Create document
                </Button>
            </div>

            {/* Table Section - Figma ID: 4857:88310 */}
            <div className="rounded-xl border border-borderPrimary bg-backgroundPrimary p-8 shadow-sm">
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-base font-semibold text-contentPrimary">Documents List</h2>
                </div>

                <Table
                    data={currentDocuments}
                    columns={columns}
                    totalItems={totalItems}
                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                    onPageChange={setCurrentPage}
                    onRowCountChange={setItemsPerPage}
                    onSearch={handleSearch}
                    onFilter={handleFilter}
                    onSort={handleSort}
                    filterOptions={{
                        "Category": ["Legal", "Product", "Technical", "Internal"],
                        "Owner": ["admin", "user", "developer"]
                    }}
                    searchPlaceholder="Search for document ID, name"
                />
            </div>
        </div>
    );
}
