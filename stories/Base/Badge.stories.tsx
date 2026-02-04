import type { Meta, StoryObj } from "@storybook/react";
import Badge from "@/components/ui/Badge";
import React from "react";

/**
 * # Badge (Docs 2.0)
 * 텍스트 정보를 시각적으로 그룹화하고 강조하는 컴포넌트입니다.
 * 
 * ## Usage
 * - 상태 표시 (예: Active, Pending, Error)
 * - 카테고리 태그 분류
 * - 선택된 필터 아이템 표시
 * 
 * ## Best Practices
 * ### ✅ Do
 * - 상태의 의미에 맞는 컬러를 사용하세요 (에러는 Red, 성공은 Green).
 * - 단어 위주의 짧은 텍스트를 사용하세요.
 * 
 * ### ❌ Don't
 * - <span style="color: #ef4444; font-weight: bold;">[Bad]</span> 문장 단위의 긴 텍스트를 넣지 마세요. 가독성이 떨어집니다.
 * - <span style="color: #ef4444; font-weight: bold;">[Bad]</span> 클릭 기능이 없는 뱃지에 X 버튼을 노출하지 마세요.
 */
const meta: Meta<typeof Badge> = {
    title: "Base Components/Badge",
    component: Badge,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
        docs: {
            description: {
                component: "인벤티스 디자인 시스템의 표준 뱃지 컴포넌트입니다.",
            },
        },
        design: {
            type: "figma",
            url: "https://www.figma.com/design/XXXXX/IVTS-DS-v0.2?node-id=Badge",
        },
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

export const Removable: Story = {
    args: {
        children: "Removable Tag",
        color: "Blue",
        showXButton: true,
    },
};

