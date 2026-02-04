import type { Meta, StoryObj } from "@storybook/react";
import Checkbox from "@/components/ui/Checkbox";
import { within, userEvent, expect } from "@storybook/test";
import React, { useState } from "react";
import { DoDontLayout, DoCard, DontCard } from "../DocComponents";

const meta: Meta<typeof Checkbox> = {
    title: "Base Components/Checkbox",
    component: Checkbox,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
    argTypes: {
        checked: {
            control: "select",
            options: [true, false, "indeterminate"],
        },
        disabled: {
            control: "boolean",
        },
    },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
    args: {
        checked: false,
    },
    play: async ({ canvasElement, args }) => {
        const canvas = within(canvasElement);
        const checkbox = canvas.getByRole('checkbox');
        await userEvent.click(checkbox);
        await expect(args.onCheckedChange).toHaveBeenCalled();
    },
};

export const Checked: Story = {
    args: {
        checked: true,
    },
};

export const Indeterminate: Story = {
    args: {
        checked: "indeterminate",
    },
};

/**
 * 컴포넌트 조합 예시 (Recipe)
 */
export const TermsAndConditions: Story = {
    name: "Recipe: Terms & Conditions",
    render: () => {
        const [agreeAll, setAgreeAll] = React.useState(false);
        const [agree1, setAgree1] = React.useState(false);
        const [agree2, setAgree2] = React.useState(false);

        const handleAgreeAll = (val: boolean) => {
            setAgreeAll(val);
            setAgree1(val);
            setAgree2(val);
        };

        const isIndeterminate = (agree1 || agree2) && !(agree1 && agree2);
        const isAllChecked = agree1 && agree2;

        return (
            <div className="w-80 space-y-4 rounded-xl border border-borderSecondary p-4">
                <div className="flex items-center gap-2 border-b border-borderSecondary pb-3">
                    <Checkbox
                        checked={isAllChecked ? true : (isIndeterminate ? "indeterminate" : false)}
                        onCheckedChange={handleAgreeAll}
                    />
                    <span className="text-sm font-bold text-contentPrimary">약관 전체 동의하기</span>
                </div>
                <div className="space-y-3 pl-2">
                    <div className="flex items-center gap-2">
                        <Checkbox checked={agree1} onCheckedChange={setAgree1} />
                        <span className="text-sm text-contentSecondary">서비스 이용약관 동의 (필수)</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Checkbox checked={agree2} onCheckedChange={setAgree2} />
                        <span className="text-sm text-contentSecondary">개인정보 수집 및 이용 동의 (필수)</span>
                    </div>
                </div>
            </div>
        );
    }
};

export const Interactive: Story = {
    render: () => {
        const [checked, setChecked] = useState<boolean | "indeterminate">(false);
        return (
            <div className="flex items-center gap-2 p-4 bg-backgroundPrimary rounded-lg border border-borderSecondary">
                <Checkbox checked={checked} onCheckedChange={(val) => setChecked(val)} />
                <span className="text-sm text-contentPrimary">
                    {checked === "indeterminate" ? "Partially Selected" : checked ? "Selected" : "Not Selected"}
                </span>
            </div>
        );
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
                    title="명확한 레이블 사용"
                    example={
                        <div className="flex items-center gap-2">
                            <Checkbox checked={true} />
                            <span className="text-sm">Receive email notifications</span>
                        </div>
                    }
                >
                    체크박스 옆에는 사용자가 선택했을 때 어떤 일이 일어나는지 명확하게 설명하는 레이블을 제공하세요.
                </DoCard>

                <DontCard
                    title="부정적인 질문 지양"
                    example={
                        <div className="flex items-center gap-2">
                            <Checkbox checked={false} />
                            <span className="text-sm">Don't unsubscribe from newsletter</span>
                        </div>
                    }
                >
                    "구독 해제하지 않음"과 같이 부정적인 질문은 사용자를 혼란스럽게 합니다. 긍정문으로 작성하세요.
                </DontCard>

                <DoCard
                    title="상태 변화의 즉각성"
                    example={
                        <div className="flex flex-col gap-2">
                            <Checkbox checked={true} />
                            <span className="text-xs text-contentTertiary">Saved automatically</span>
                        </div>
                    }
                >
                    체크박스를 선택했을 때의 변화가 즉각적으로 반영되거나, 저장 여부를 사용자에게 알려주는 것이 좋습니다.
                </DoCard>

                <DontCard
                    title="단일 선택(Radio)과 혼동 주의"
                    example={
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2">
                                <Checkbox checked={true} /> <span className="text-sm">Option A</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Checkbox checked={false} /> <span className="text-sm">Option B</span>
                            </div>
                        </div>
                    }
                >
                    여러 옵션 중 하나만 선택해야 하는 경우에는 체크박스 대신 라디오 버튼을 사용하세요.
                </DontCard>
            </DoDontLayout>
        </div>
    ),
};

