import type { Meta, StoryObj } from "@storybook/react";
import ContentHeader from "@/components/layout/ContentHeader";
import { SidebarProvider } from "@/lib/contexts/SidebarContext";
import React from "react";
import { within, userEvent, expect } from "@storybook/test";

const meta: Meta<typeof ContentHeader> = {
    title: "Layout & Patterns/ContentHeader",
    component: ContentHeader,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: `
콘텐츠 영역의 상단 헤더로, 검색 및 액션 버튼을 포함합니다.

### ✅ Do's
- 페이지의 성격을 나타내는 명확한 타이틀을 설정하세요.
- 핵심 액션(생성, 삭제 등)은 우측 상단 버튼에 배치하세요.
- 브레드크럼을 활용하여 사용자의 현재 위치를 직관적으로 알려주세요.

### ❌ Don'ts
- 타이틀에 너무 긴 문장을 사용하지 마세요.
- 한 개 이상의 핵심 액션이 필요한 경우 버튼 그룹을 신중하게 배치하세요.
`,
            },
        },
    },
    decorators: [
        (Story) => (
            <SidebarProvider>
                <div className="p-8 bg-backgroundSecondary min-h-[400px]">
                    <Story />
                </div>
            </SidebarProvider>
        ),
    ],
};

export default meta;
type Story = StoryObj<typeof ContentHeader>;

export const Default: Story = {
    args: {
        onAddDealer: (data) => console.log("Adding dealer:", data),
    },
    play: async ({ canvasElement, args }) => {
        const canvas = within(canvasElement);

        const searchInput = canvas.getByPlaceholderText(/Search/i);
        await userEvent.type(searchInput, 'Test Query');
        await expect(searchInput).toHaveValue('Test Query');

        const addButton = canvas.getByText(/Add/i);
        await userEvent.click(addButton);
        // Add Dealer Modal should appear (portal based)
        const modal = await within(document.body).findByRole('dialog');
        await expect(modal).toBeInTheDocument();
    },
};

