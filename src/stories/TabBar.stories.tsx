import type { Meta, StoryObj } from "@storybook/react";
import { TabBar } from "./TabBar";
import React, { useState } from "react";

const meta: Meta<typeof TabBar> = {
  title: "Example/TabBar",
  component: TabBar,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["small", "medium", "large"],
    },
    color: { control: "color" },
    hoverBackground: { control: "color" },
  },
  parameters: {
    docs: {
      description: {
        story: `
### TabBar

Composant React pour afficher une barre d'onglets interactive.
        `,
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof TabBar>;

const tabs = [
  { label: "Vue d’ensemble", value: "overview" },
  { label: "Produits", value: "products" },
  { label: "Historique", value: "history", disabled: true },
];

// 🔁 Composants React avec state, utilisés dans les stories

const DefaultStoryComponent = (args: any) => {
  const [activeTab, setActiveTab] = useState("overview");
  return (
    <TabBar
      {...args}
      tabs={tabs}
      activeTab={activeTab}
      onChange={setActiveTab}
    />
  );
};

const LargeStoryComponent = (args: any) => {
  const [activeTab, setActiveTab] = useState("products");
  return (
    <TabBar
      {...args}
      tabs={tabs}
      activeTab={activeTab}
      onChange={setActiveTab}
    />
  );
};

const SmallStoryComponent = (args: any) => {
  const [activeTab, setActiveTab] = useState("overview");
  return (
    <TabBar
      {...args}
      tabs={tabs}
      activeTab={activeTab}
      onChange={setActiveTab}
    />
  );
};

// ✅ Stories

export const Default: Story = {
  render: (args) => <DefaultStoryComponent {...args} />,
  args: {
    size: "medium",
    color: "#007bff",
    hoverBackground: "#f3f3f3",
  },
};

export const Large: Story = {
  render: (args) => <LargeStoryComponent {...args} />,
  args: {
    size: "large",
    color: "#6200ea",
    hoverBackground: "#ede7f6",
  },
};

export const Small: Story = {
  render: (args) => <SmallStoryComponent {...args} />,
  args: {
    size: "small",
    color: "#ff5722",
    hoverBackground: "#fbe9e7",
  },
};
