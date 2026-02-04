import type { Meta, StoryObj } from "@storybook/react";
import MultiSelectDropdown from "@/components/ui/MultiSelectDropdown";
import Button from "@/components/ui/Button";
import React, { useState } from "react";
import { within, userEvent, expect } from "@storybook/test";
import { DoDontLayout, DoCard, DontCard } from "../DocComponents";

const meta: Meta<typeof MultiSelectDropdown> = {
    title: "Base Components/MultiSelectDropdown",
    component: MultiSelectDropdown,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
    argTypes: {
        label: {
            control: "text",
        },
        placeholder: {
            control: "text",
        },
    },
    decorators: [
        (Story) => (
            <div style={{ width: '400px' }}>
                <Story />
            </div>
        ),
    ],
};

export default meta;
type Story = StoryObj<typeof MultiSelectDropdown>;

const STATUS_OPTIONS = ["Active", "Inactive", "Pending", "Archived"];

export const Default: Story = {
    render: (args) => {
        const [selected, setSelected] = useState<Set<string>>(new Set(["Active"]));
        return (
            <div className="h-64">
                <MultiSelectDropdown
                    {...args}
                    label="Status"
                    options={STATUS_OPTIONS}
                    selectedValues={selected}
                    onChange={setSelected}
                    getBadgeColor={(val) => {
                        if (val === "Active") return "Green";
                        if (val === "Inactive") return "Zinc";
                        if (val === "Pending") return "Amber";
                        return "Red";
                    }}
                />
            </div>
        );
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const trigger = canvas.getByRole('button');
        await userEvent.click(trigger);

        const inactiveOption = await canvas.findByText('Inactive');
        await userEvent.click(inactiveOption);

        // Check if both Active and Inactive are selected
        await expect(canvas.getAllByText(/Active|Inactive/)).toHaveLength(3); // Trigger has both, plus the options in list
    },
};

/**
 * 컴포넌트 조합 예시 (Recipe)
 */
export const AdvancedFilterBar: Story = {
    name: "Recipe: Filter Bar",
    render: () => {
        const [type, setType] = React.useState(new Set(["Individual"]));
        const [status, setStatus] = React.useState(new Set(["Active"]));

        return (
            <div className="flex w-full items-center gap-3 rounded-xl border border-borderSecondary bg-backgroundSecondary p-3">
                <span className="text-xs font-bold text-contentTertiary uppercase px-2">Filters</span>
                <MultiSelectDropdown
                    label="Type"
                    options={["Individual", "Business", "Government"]}
                    selectedValues={type}
                    onChange={setType}
                />
                <div className="h-6 w-px bg-borderPrimary" />
                <MultiSelectDropdown
                    label="Status"
                    options={STATUS_OPTIONS}
                    selectedValues={status}
                    onChange={setStatus}
                />
                <Button variant="plain" size="sm" className="ml-auto text-contentTertiary" onClick={() => { setType(new Set()); setStatus(new Set()); }}>Reset All</Button>
            </div>
        );
    }
};

export const Guidelines: Story = {
    tags: ['!dev'],
    parameters: {
        controls: { disable: true },
        actions: { disable: true },
    },
    render: () => (
        <div className="sb-unstyled max-w-6xl">
            <h2 className="text-2xl font-bold mb-6">Guidelines (Do's & Don'ts)</h2>

            <DoDontLayout>
                <DoCard
                    title="다중 선택 필터링에 최적"
                    example={
                        <MultiSelectDropdown
                            label="Filter by Tags"
                            options={["Marketing", "Sales", "Development", "Design"]}
                            selectedValues={new Set(["Marketing", "Sales"])}
                        />
                    }
                >
                    여러 범주를 동시에 선택해야 하는 복잡한 필터링 시스템에서 효율적으로 공간을 활용할 수 있습니다.
                </DoCard>

                <DontCard
                    title="단일 선택에는 사용 금지"
                    example={
                        <MultiSelectDropdown
                            label="Sort Order"
                            options={["Newest", "Oldest", "Price: Low to High"]}
                            selectedValues={new Set(["Newest"])}
                        />
                    }
                >
                    정렬 순서처럼 하나만 선택해야 하는 경우에는 일반 Select 컴포넌트를 사용하여 사용자 혼란을 방지하세요.
                </DontCard>

                <DoCard
                    title="선택된 항목의 가독성 확보"
                    example={
                        <MultiSelectDropdown
                            label="Selected Users"
                            options={["Alice", "Bob", "Charlie"]}
                            selectedValues={new Set(["Alice", "Bob"])}
                        />
                    }
                >
                    배지 형식을 사용하여 어떤 항목들이 선택되었는지 사용자가 쉽게 인지할 수 있도록 하세요.
                </DoCard>

                <DontCard
                    title="너무 긴 리스트는 검색 기능 고려"
                    example={
                        <MultiSelectDropdown
                            label="Skills"
                            options={Array.from({ length: 20 }, (_, i) => `Skill ${i + 1}`)}
                            selectedValues={new Set()}
                        />
                    }
                >
                    선택지가 너무 많으면 스크롤 부담이 커집니다. 항목이 15개 이상인 경우 검색 기능이 포함된 대안을 고려하세요.
                </DontCard>
            </DoDontLayout>
        </div>
    ),
};
