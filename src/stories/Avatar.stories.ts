import type { Meta, StoryObj } from "@storybook/react";
import { Avatar } from "./Avatar";

const meta: Meta<typeof Avatar> = {
  title: "Example/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  argTypes: {
    backgroundColor: { control: "color" },
    color: { control: "color" },
  },
};
export default meta;

type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  args: {
    name: "John Doe",
    backgroundColor: "#007BFF",
    color: "#fff",
    size: "medium",
  },
};

export const Large: Story = {
  args: {
    name: "Alice Johnson",
    backgroundColor: "#28a745",
    color: "#fff",
    size: "large",
  },
};

export const Small: Story = {
  args: {
    name: "Bob Brown",
    backgroundColor: "#ffc107",
    color: "#333",
    size: "small",
  },
};

export const CustomColors: Story = {
  args: {
    name: "Charlie Smith",
    backgroundColor: "#ff5722",
    color: "#fff",
    size: "medium",
  },
};