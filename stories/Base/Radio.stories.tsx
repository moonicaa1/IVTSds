import type { Meta, StoryObj } from "@storybook/react";
import Radio from "@/components/ui/Radio";
import React, { useState } from "react";
import { within, userEvent, expect } from "@storybook/test";
import { DoDontLayout, DoCard, DontCard } from "../DocComponents";

const meta: Meta<typeof Radio> = {
    title: "Base Components/Radio",
    component: Radio,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
    argTypes: {
        name: {
            control: "text",
            description: "Name attribute for radio group",
        },
        value: {
            control: "text",
            description: "Value of the radio option",
        },
        label: {
            control: "text",
            description: "Label text for the radio",
        },
        checked: {
            control: "boolean",
            description: "Whether the radio is checked",
        },
        disabled: {
            control: "boolean",
            description: "Whether the radio is disabled",
        },
    },
};

export default meta;
type Story = StoryObj<typeof Radio>;

export const Default: Story = {
    args: {
        name: "default",
        value: "option1",
        label: "Default Radio",
        checked: false,
        disabled: false,
    },
};

export const Checked: Story = {
    args: {
        name: "checked",
        value: "option1",
        label: "Checked Radio",
        checked: true,
        disabled: false,
    },
};

export const Disabled: Story = {
    args: {
        name: "disabled",
        value: "option1",
        label: "Disabled Radio",
        checked: false,
        disabled: true,
    },
};

export const DisabledChecked: Story = {
    args: {
        name: "disabled-checked",
        value: "option1",
        label: "Disabled Checked Radio",
        checked: true,
        disabled: true,
    },
};

export const WithoutLabel: Story = {
    args: {
        name: "no-label",
        value: "option1",
        checked: false,
        disabled: false,
    },
};

export const RadioGroup: Story = {
    render: () => {
        const [selected, setSelected] = useState("option2");

        return (
            <div className="space-y-3">
                <Radio
                    name="group"
                    value="option1"
                    label="Option 1"
                    checked={selected === "option1"}
                    onChange={setSelected}
                />
                <Radio
                    name="group"
                    value="option2"
                    label="Option 2"
                    checked={selected === "option2"}
                    onChange={setSelected}
                />
                <Radio
                    name="group"
                    value="option3"
                    label="Option 3"
                    checked={selected === "option3"}
                    onChange={setSelected}
                />
                <Radio
                    name="group"
                    value="option4"
                    label="Option 4 (Disabled)"
                    checked={selected === "option4"}
                    onChange={setSelected}
                    disabled
                />
            </div>
        );
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const option1 = canvas.getByLabelText('Option 1');
        const option3 = canvas.getByLabelText('Option 3');

        await userEvent.click(option1);
        await expect(option1).toBeChecked();

        await userEvent.click(option3);
        await expect(option3).toBeChecked();
        await expect(option1).not.toBeChecked();
    },
};

export const AllStates: Story = {
    render: () => (
        <div className="space-y-4 p-4 border border-borderSecondary rounded-lg bg-backgroundPrimary">
            <Radio name="state" value="1" label="Default" />
            <Radio name="state" value="2" label="Checked" checked />
            <Radio name="state" value="3" label="Disabled" disabled />
            <Radio name="state" value="4" label="Disabled Checked" disabled checked />
        </div>
    ),
};

/**
 * 컴포넌트 조합 예시 (Recipe)
 */
export const GenderSelection: Story = {
    name: "Recipe: Gender Selection",
    render: () => {
        const [gender, setGender] = React.useState("male");
        return (
            <div className="w-80 space-y-3 rounded-xl border border-borderSecondary p-5">
                <label className="text-sm font-bold text-contentPrimary">성별 선택</label>
                <div className="flex gap-6">
                    <Radio name="gender" value="male" label="남성" checked={gender === "male"} onChange={setGender} />
                    <Radio name="gender" value="female" label="여성" checked={gender === "female"} onChange={setGender} />
                    <Radio name="gender" value="other" label="기타" checked={gender === "other"} onChange={setGender} />
                </div>
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
                    title="상호 배타적 선택에 사용"
                    example={
                        <div className="flex gap-4">
                            <Radio name="plan" value="free" label="Free Plan" checked={true} />
                            <Radio name="plan" value="pro" label="Pro Plan" checked={false} />
                        </div>
                    }
                >
                    여러 옵션 중 반드시 하나만 선택해야 하는 경우에 라디오 버튼을 사용하세요.
                </DoCard>

                <DontCard
                    title="다중 선택에는 체크박스 사용"
                    example={
                        <div className="flex flex-col gap-2">
                            <Radio name="interest" value="tech" label="Technology" checked={true} />
                            <Radio name="interest" value="sports" label="Sports" checked={true} />
                        </div>
                    }
                >
                    동시에 여러 개를 선택할 수 있는 경우에는 라디오 버튼 대신 체크박스를 사용해야 합니다.
                </DontCard>

                <DoCard
                    title="항상 기본 옵션 선택"
                    example={
                        <div className="flex flex-col gap-2">
                            <Radio name="sort" value="recent" label="Most Recent" checked={true} />
                            <Radio name="sort" value="popular" label="Most Popular" checked={false} />
                        </div>
                    }
                >
                    라디오 버튼 그룹은 보통 하나의 옵션이 기본적으로 활성화되어 있어야 합니다.
                </DoCard>

                <DontCard
                    title="옵션 개수가 너무 많으면 Select 사용"
                    example={
                        <div className="flex flex-col gap-2">
                            <Radio name="country" label="South Korea" />
                            <Radio name="country" label="United States" />
                            <Radio name="country" label="Germany" />
                            <Radio name="country" label="Japan" />
                            <Radio name="country" label="Kingdom of Saudi Arabia" />
                        </div>
                    }
                >
                    옵션이 5개 이상으로 많아지거나 공간이 부족한 경우에는 라디오 버튼 대신 드롭다운(Select)을 고려하세요.
                </DontCard>
            </DoDontLayout>
        </div>
    ),
};
