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
    label: "Badge",
    backgroundColor: "#007BFF",
    color: "#fff",
    size: "medium",
    primary: true,
  },
};
