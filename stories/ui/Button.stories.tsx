import type { Meta, StoryObj } from '@storybook/react';
import Button from '../../components/ui/Button';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
    title: 'UI/Button', // Group under "UI"
    component: Button,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/api/argtypes
    argTypes: {
        variant: {
            control: 'select',
            options: ['default', 'outline', 'plain'],
            description: '버튼 스타일 변형'
        },
        size: {
            control: 'select',
            options: ['xs', 'sm', 'base', 'l', 'xl'],
            description: '버튼 크기'
        },
        disabled: { control: 'boolean' },
        children: { control: 'text', description: '버튼 텍스트' },
    },
    args: {
        children: 'Button',
    },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
    args: {
        variant: 'default',
    },
};

export const Outline: Story = {
    args: {
        variant: 'outline',
        children: 'Outline Button',
    },
};

export const Plain: Story = {
    args: {
        variant: 'plain',
        children: 'Plain Button',
    },
};

export const Large: Story = {
    args: {
        size: 'l',
        children: 'Large Button',
    },
};

export const Small: Story = {
    args: {
        size: 'sm',
        children: 'Small Button',
    },
};

export const Disabled: Story = {
    args: {
        disabled: true,
        children: 'Disabled Button',
    },
};
