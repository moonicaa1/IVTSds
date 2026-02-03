import type { Meta, StoryObj } from "@storybook/react";
import Table from "@/components/ui/Table";
import Badge from "@/components/ui/Badge";
import React, { useState } from "react";

/**
 * # Table
 * 100% Synced with components/ui/Table.tsx
 */
const meta: Meta<typeof Table> = {
    title: "Base Components/Table",
    component: Table,
    argTypes: {
        searchPlaceholder: {
            control: "text",
        },
        itemsPerPage: {
            control: "number",
        },
    },
    decorators: [
        (Story) => (
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <Story />
            </div>
        ),
    ],
};

export default meta;
type Story = StoryObj<typeof Table>;

const MOCK_DATA = [
    { id: 1, name: "Seoul Plaza Hotel", code: "D-001", status: "Active", region: "Asia", creators: "Admin" },
    { id: 2, name: "Berlin Central Suites", code: "D-002", status: "Inactive", region: "Europe", creators: "User01" },
    { id: 3, name: "New York Times Square Lofts", code: "D-003", status: "Active", region: "North America", creators: "Admin" },
    { id: 4, name: "Tokyo Bay Tower", code: "D-004", status: "Active", region: "Asia", creators: "Dev05" },
    { id: 5, name: "Paris Eiffel View", code: "D-005", status: "Pending", region: "Europe", creators: "Admin" },
];

const COLUMNS = [
    { key: "code", header: "Code", width: "100px" },
    { key: "name", header: "Dealer Name" },
    {
        key: "status",
        header: "Status",
        width: "120px",
        render: (item: any) => {
            const colors: Record<string, any> = { Active: "Green", Inactive: "Zinc", Pending: "Amber" };
            return <Badge color={colors[item.status] || "Zinc"}>{item.status}</Badge>;
        }
    },
    { key: "region", header: "Region", width: "150px" },
    { key: "creators", header: "Created By", width: "120px" },
];

export const Default: Story = {
    render: () => {
        const [page, setPage] = useState(1);
        const [rowCount, setRowCount] = useState(10);
        return (
            <Table
                data={MOCK_DATA}
                columns={COLUMNS}
                totalItems={MOCK_DATA.length}
                currentPage={page}
                itemsPerPage={rowCount}
                onPageChange={setPage}
                onRowCountChange={setRowCount}
                searchPlaceholder="Search dealers..."
                filterOptions={{
                    "Status": ["Active", "Inactive", "Pending"],
                    "Region": ["Asia", "Europe", "North America"]
                }}
            />
        );
    }
};

export const Expandable: Story = {
    render: () => {
        const dataWithSubRows = [
            {
                id: "p1", name: "Hyundai Motors HQ", code: "H-001", status: "Active",
                subRows: [
                    { id: "c1", name: "Gangnam Branch", code: "H-001-B1", status: "Active" },
                    { id: "c2", name: "Seocho Branch", code: "H-001-B2", status: "Active" },
                ]
            },
            {
                id: "p2", name: "Kia Global Center", code: "K-500", status: "Active",
                subRows: [
                    { id: "c3", name: "Mapo Center", code: "K-500-C1", status: "Inactive" },
                ]
            }
        ];

        const columns = [
            { key: "code", header: "ID/Code", width: "150px" },
            { key: "name", header: "Organization Name" },
            {
                key: "status", header: "Status", width: "100px",
                render: (item: any) => <Badge color={item.status === "Active" ? "Green" : "Zinc"}>{item.status}</Badge>
            }
        ];

        return (
            <Table
                data={dataWithSubRows as any}
                columns={columns as any}
                totalItems={2}
                currentPage={1}
                itemsPerPage={10}
                onPageChange={() => { }}
            />
        );
    }
};

