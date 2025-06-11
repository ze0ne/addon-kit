import type { Meta, StoryObj } from "@storybook/react";
import { ProgressBar } from "./ProgressBar";

const meta: Meta<typeof ProgressBar> = {
  title: "Example/ProgressBar",
  component: ProgressBar,
  tags: ["autodocs"],
  argTypes: {
    color: { control: "color" },
    value: { control: { type: "range", min: 0, max: 100, step: 1 } },
    showLabel: { control: "boolean" },
    size: {
      control: { type: "radio" },
      options: ["small", "medium", "large"],
    },
  },
  parameters: {
    docs: {
      description: {
        story: `
### ProgressBar

Composant React pour afficher une barre de progression personnalisable.

**Props** :

- \`value\` (\`number\`) : Valeur actuelle de la progression (0 à 100).
- \`color\` (\`string\`) : Couleur de la barre de progression.
- \`showLabel\` (\`boolean\`) : Affiche le pourcentage si \`true\`.
- \`size\` (\`"small" | "medium" | "large"\`) : Taille prédéfinie de la barre.

**Exemple** :
\`\`\`tsx
<ProgressBar value={60} color="#1976d2" size="large" showLabel />
\`\`\`
        `,
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof ProgressBar>;

export const Default: Story = {
  args: {
    value: 40,
    color: "#1976d2",
    size: "medium",
    showLabel: false,
  },
};

export const WithLabel: Story = {
  args: {
    value: 75,
    color: "#43a047",
    size: "medium",
    showLabel: true,
  },
};

export const CustomColor: Story = {
  args: {
    value: 90,
    color: "#ff9800",
    size: "medium",
    showLabel: true,
  },
};

export const Thin: Story = {
  args: {
    value: 30,
    color: "#b71c1c",
    size: "small",
    showLabel: false,
  },
};

export const Large: Story = {
  args: {
    value: 60,
    color: "#1976d2",
    size: "large",
    showLabel: true,
  },
};
