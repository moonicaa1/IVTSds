import type { Meta, StoryObj } from "@storybook/react";
import Badge from "@/components/ui/Badge";
import React from "react";
import { DoDontLayout, DoCard, DontCard } from "../DocComponents";

const meta: Meta<typeof Badge> = {
    title: "Base Components/Badge",
    component: Badge,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
    argTypes: {
        color: {
            control: "select",
            description: "뱃지의 컬러 테마를 설정합니다.",
            table: {
                type: { summary: "BadgeColor" },
                defaultValue: { summary: "Zinc" },
            },
            options: [
                "Zinc", "Red", "Orange", "Amber", "Yellow",
                "Lime", "Green", "Emerald", "Teal", "Cyan",
                "Sky", "Blue", "Indigo", "Violet", "Purple",
                "Fuchsia", "Pink", "Rose", "Black"
            ],
        },
        showXButton: {
            control: "boolean",
            description: "삭제 버튼 노출 여부를 제어합니다.",
            table: {
                defaultValue: { summary: "false" },
            },
        },
        onRemove: {
            action: "removed",
            description: "삭제 버튼 클릭 시 실행되는 콜백 함수입니다.",
        },
        children: {
            control: "text",
            description: "표시할 텍스트 내용을 입력합니다.",
        },
    },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
    args: {
        children: "Badge Label",
        color: "Zinc",
        showXButton: false,
    },
};

export const Colors: Story = {
    render: () => (
        <div className="flex flex-wrap gap-2 p-4 bg-backgroundPrimary rounded-lg border border-borderSecondary">
            <Badge color="Zinc">Zinc</Badge>
            <Badge color="Red">Red</Badge>
            <Badge color="Orange">Orange</Badge>
            <Badge color="Amber">Amber</Badge>
            <Badge color="Yellow">Yellow</Badge>
            <Badge color="Lime">Lime</Badge>
            <Badge color="Green">Green</Badge>
            <Badge color="Emerald">Emerald</Badge>
            <Badge color="Teal">Teal</Badge>
            <Badge color="Cyan">Cyan</Badge>
            <Badge color="Sky">Sky</Badge>
            <Badge color="Blue">Blue</Badge>
            <Badge color="Indigo">Indigo</Badge>
            <Badge color="Violet">Violet</Badge>
            <Badge color="Purple">Purple</Badge>
            <Badge color="Fuchsia">Fuchsia</Badge>
            <Badge color="Pink">Pink</Badge>
            <Badge color="Rose">Rose</Badge>
            <Badge color="Black">Black</Badge>
        </div>
    ),
};

/**
 * 컴포넌트 조합 예시 (Recipe)
 */
export const StatusManagementRecipe: Story = {
    name: "Recipe: Status List",
    render: () => (
        <div className="w-80 space-y-4 rounded-xl border border-borderSecondary p-5 bg-backgroundPrimary shadow-sm">
            <h4 className="text-sm font-bold text-contentPrimary mb-3">Project Status</h4>
            <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                    <span className="text-sm text-contentSecondary">Website Redesign</span>
                    <Badge color="Green">Completed</Badge>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-sm text-contentSecondary">Mobile App QA</span>
                    <Badge color="Amber">In Progress</Badge>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-sm text-contentSecondary">Database Migration</span>
                    <Badge color="Zinc">Pending</Badge>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-sm text-contentSecondary">API Integration</span>
                    <Badge color="Red">Delayed</Badge>
                </div>
            </div>
        </div>
    ),
};

export const Removable: Story = {
    args: {
        children: "Removable Tag",
        color: "Blue",
        showXButton: true,
    },
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
                    title="의미 있는 색상 선택"
                    example={
                        <div className="flex gap-2">
                            <Badge color="Green">Active</Badge>
                            <Badge color="Red">Error</Badge>
                        </div>
                    }
                >
                    상태나 의미에 맞는 색상을 사용하세요. 성공이나 긍정적 상태는 녹색 계열, 경고나 부정적 상태는 빨간색 계열을 사용하는 것이 직관적입니다.
                </DoCard>

                <DontCard
                    title="너무 많은 색상을 섞어 쓰지 말 것"
                    example={
                        <div className="flex gap-2">
                            <Badge color="Blue">New</Badge>
                            <Badge color="Purple">Premium</Badge>
                            <Badge color="Cyan">Updated</Badge>
                        </div>
                    }
                >
                    화면에 너무 다양한 색상의 뱃지가 있으면 시각적으로 산만해지고 각 색상의 의미가 희석됩니다.
                </DontCard>

                <DoCard
                    title="간결한 텍스트 사용"
                    example={
                        <Badge color="Zinc">Pending</Badge>
                    }
                >
                    뱃지 내부 텍스트는 가능한 짧게 유지하세요. 보통 한 단어 또는 짧은 문구가 가장 적절합니다.
                </DoCard>

                <DontCard
                    title="상호작용 버튼으로 오해하게 하지 말 것"
                    example={
                        <Badge color="Blue">Click to update profile status now</Badge>
                    }
                >
                    뱃지는 정보를 표시하는 용도입니다. 복잡한 문장을 넣거나 실행 버튼처럼 보이게 정보를 나열하지 마세요.
                </DontCard>
            </DoDontLayout>
        </div>
    ),
};

