import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./Badge";

const meta: Meta<typeof Badge> = {
  title: "Example/Badge",
  component: Badge,
  tags: ["autodocs"],
  argTypes: {
    backgroundColor: { control: "color" },
    color: { control: "color" },
  },
};
export default meta;

type Story = StoryObj<typeof Badge>;

export const Primary: Story = {
  args: {
    label: "Primary Badge",
    primary: true,
    size: "medium",
  },
};

export const Secondary: Story = {
  args: {
    label: "Secondary Badge",
    backgroundColor: "#eee",
    color: "#333",
    size: "medium",
  },
};

export const Large: Story = {
  args: {
    label: "Large Badge",
    size: "large",
    backgroundColor: "#007BFF",
    color: "#fff",
  },
};

export const Small: Story = {
  args: {
    label: "Small Badge",
    size: "small",
    backgroundColor: "#6c757d",
    color: "#fff",
  },
};