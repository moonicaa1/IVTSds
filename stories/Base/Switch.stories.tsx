import type { Meta, StoryObj } from "@storybook/react";
import Switch from "@/components/ui/Switch";
import React, { useState } from "react";
import { within, userEvent, expect } from "@storybook/test";
import { DoDontLayout, DoCard, DontCard } from "../DocComponents";

const meta: Meta<typeof Switch> = {
    title: "Base Components/Switch",
    component: Switch,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
    argTypes: {
        label: {
            control: "text",
        },
        checked: {
            control: "boolean",
        },
        disabled: {
            control: "boolean",
        },
    },
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {
    render: (args) => {
        const [checked, setChecked] = useState(false);
        return <div className="p-8 bg-backgroundPrimary rounded-lg border border-borderSecondary">
            <Switch {...args} checked={checked} onChange={setChecked} />
        </div>;
    },
    args: {
        label: "Enable Analytics",
    },
    play: async ({ canvasElement, args }) => {
        const canvas = within(canvasElement);
        const toggle = canvas.getByRole('switch');
        await userEvent.click(toggle);
        await expect(args.onChange).toHaveBeenCalled();
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
                    title="즉각적인 설정 변경에 사용"
                    example={
                        <Switch label="Dark Mode" checked={true} />
                    }
                >
                    시스템 설정이나 기능의 활성/비활성처럼 즉각적으로 효과가 나타나는 동작에 스위치를 사용하세요.
                </DoCard>

                <DontCard
                    title="데이터 제출 폼에서 지양"
                    example={
                        <div className="flex flex-col gap-4">
                            <Switch label="I agree to terms" />
                            <button className="bg-blue-500 text-white p-2">Submit Form</button>
                        </div>
                    }
                >
                    "약관 동의"처럼 폼을 제출해야 결과가 반영되는 경우에는 스위치 대신 체크박스를 사용하는 것이 관례입니다.
                </DontCard>

                <DoCard
                    title="명확한 상태 레이블 제공"
                    example={
                        <Switch label="Push Notifications" checked={false} />
                    }
                >
                    스위치가 제어하는 기능이 무엇인지 명확하게 설명하는 레이블을 함께 제공하세요.
                </DoCard>

                <DontCard
                    title="상태 텍스트 중복 방지"
                    example={
                        <div className="flex items-center gap-2">
                            <Switch checked={true} />
                            <span>On / Off</span>
                        </div>
                    }
                >
                    스위치 자체가 시각적으로 On/Off 상태를 나타내므로, 명시적인 "On/Off" 텍스트를 옆에 중복해서 적을 필요는 없습니다.
                </DontCard>
            </DoDontLayout>
        </div>
    ),
};

