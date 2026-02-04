import type { Meta, StoryObj } from "@storybook/react";
import Select from "@/components/ui/Select";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import React, { useState } from "react";
import { within, userEvent, expect } from "@storybook/test";
import { DoDontLayout, DoCard, DontCard } from "../DocComponents";

const meta: Meta<typeof Select> = {
    title: "Base Components/Select",
    component: Select,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
    argTypes: {
        options: {
            control: "object",
            description: "Available options",
        },
        value: {
            control: "text",
            description: "Selected value",
        },
        label: {
            control: "text",
            description: "Label text",
        },
        description: {
            control: "text",
            description: "Description text",
        },
        placeholder: {
            control: "text",
            description: "Placeholder text",
        },
        disabled: {
            control: "boolean",
            description: "Disabled state",
        },
    },
};

export default meta;
type Story = StoryObj<typeof Select>;

const sampleOptions = [
    { value: "us", label: "United States" },
    { value: "uk", label: "United Kingdom" },
    { value: "ca", label: "Canada" },
    { value: "au", label: "Australia" },
    { value: "de", label: "Germany" },
];

export const Default: Story = {
    args: {
        options: sampleOptions,
        placeholder: "Select a country",
    },
};

export const WithLabel: Story = {
    args: {
        label: "Country",
        options: sampleOptions,
        placeholder: "Select",
    },
};

export const WithDescription: Story = {
    args: {
        label: "Project Visibility",
        description: "This will be visible to clients on the project.",
        options: [
            { value: "public", label: "Public" },
            { value: "private", label: "Private" },
            { value: "team", label: "Team Only" },
        ],
        placeholder: "Select",
    },
};

export const WithValue: Story = {
    args: {
        label: "Country",
        options: sampleOptions,
        value: "uk",
    },
};

export const Disabled: Story = {
    args: {
        label: "Country",
        description: "This field is currently disabled.",
        options: sampleOptions,
        value: "us",
        disabled: true,
    },
};

export const Interactive: Story = {
    render: () => {
        const [selected, setSelected] = useState<string>("");

        return (
            <div className="w-80">
                <Select
                    label="Choose your country"
                    description="This selection will affect your regional settings."
                    options={sampleOptions}
                    value={selected}
                    onChange={setSelected}
                    placeholder="Select a country"
                />
                {selected && (
                    <p className="mt-4 text-sm text-contentSecondary">
                        Selected: <span className="font-semibold text-tealPrimary">{selected}</span>
                    </p>
                )}
            </div>
        );
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const select = canvas.getByRole('button');
        await userEvent.click(select);

        const option = await canvas.findByText('United States');
        await userEvent.click(option);

        await expect(canvas.getByText('United States')).toBeInTheDocument();
        await expect(canvas.getByText(/Selected: us/i)).toBeInTheDocument();
    },
};

export const AllStates: Story = {
    render: () => (
        <div className="flex flex-col gap-6 w-80">
            <Select label="Default" options={sampleOptions} placeholder="Select an option" />
            <Select label="With Value" options={sampleOptions} value="us" />
            <Select label="Disabled" options={sampleOptions} disabled placeholder="Cannot select" />
        </div>
    ),
};

/**
 * 컴포넌트 조합 예시 (Recipe)
 */
export const ShippingAddressForm: Story = {
    name: "Recipe: Shipping Info",
    render: () => {
        const [country, setCountry] = React.useState("us");
        return (
            <div className="w-96 space-y-6 rounded-2xl border border-borderSecondary p-6 shadow-lg bg-backgroundPrimary">
                <h4 className="text-lg font-bold text-contentPrimary">배송 정보 입력</h4>
                <div className="grid grid-cols-2 gap-4">
                    <Input label="이름" placeholder="홍길동" className="col-span-2" />
                    <Select label="국가" options={sampleOptions} value={country} onChange={setCountry} className="col-span-1" />
                    <Input label="우편번호" placeholder="12345" className="col-span-1" />
                </div>
                <Button className="w-full">배송지 저장</Button>
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
                    title="옵션이 많을 때 사용"
                    example={
                        <Select
                            label="Country"
                            options={[
                                { value: "us", label: "United States" },
                                { value: "kr", label: "South Korea" },
                                { value: "jp", label: "Japan" },
                                { value: "de", label: "Germany" },
                                { value: "fr", label: "France" }
                            ]}
                            placeholder="Select a country"
                        />
                    }
                >
                    선택지가 5개 이상으로 많거나 화면 공간이 부족한 경우 라디오 버튼 대신 셀렉트 드롭다운을 사용하세요.
                </DoCard>

                <DontCard
                    title="옵션이 너무 적으면 사용 지양"
                    example={
                        <Select
                            label="Gender"
                            options={[
                                { value: "m", label: "Male" },
                                { value: "f", label: "Female" }
                            ]}
                            placeholder="Select"
                        />
                    }
                >
                    옵션이 2~3개인 경우에는 사용자가 모든 옵션을 한번에 볼 수 있도록 라디오 버튼을 사용하는 것이 더 좋습니다.
                </DontCard>

                <DoCard
                    title="명확한 기본 문구 제공"
                    example={
                        <Select options={sampleOptions} placeholder="Choose a department..." />
                    }
                >
                    사용자가 무엇을 해야 하는지 알려주는 명확한 플레이스홀더 문구(예: "부서를 선택하세요")를 제공하세요.
                </DoCard>

                <DontCard
                    title="복잡한 레이아웃 내 중첩 지양"
                    example={
                        <div className="flex gap-1">
                            <Select options={sampleOptions} className="w-20" />
                            <Select options={sampleOptions} className="w-20" />
                            <Select options={sampleOptions} className="w-20" />
                        </div>
                    }
                >
                    너무 좁은 공간에 여러 개의 셀렉트를 다닥다닥 배치하면 모바일에서 조작하기 매우 어려워집니다.
                </DontCard>
            </DoDontLayout>
        </div>
    ),
};
