import type { Meta, StoryObj } from "@storybook/react";
import { ProgressBar } from "./ProgressBar";

const meta: Meta<typeof ProgressBar> = {
  title: "Example/ProgressBar",
  component: ProgressBar,
  tags: ["autodocs"],
  argTypes: {
    color: { control: "color" },
    height: { control: { type: "number", min: 4, max: 40, step: 1 } },
    value: { control: { type: "range", min: 0, max: 100, step: 1 } },
    showLabel: { control: "boolean" },
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
- \`height\` (\`number\`) : Hauteur de la barre (en px).
- \`showLabel\` (\`boolean\`) : Affiche le pourcentage si \`true\`.

**Exemple** :
\`\`\`tsx
<ProgressBar value={60} color="#1976d2" height={20} showLabel />
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
    height: 16,
    showLabel: false,
  },
};

export const WithLabel: Story = {
  args: {
    value: 75,
    color: "#43a047",
    height: 20,
    showLabel: true,
  },
};

export const CustomColor: Story = {
  args: {
    value: 90,
    color: "#ff9800",
    height: 16,
    showLabel: true,
  },
};

export const Thin: Story = {
  args: {
    value: 30,
    color: "#b71c1c",
    height: 6,
    showLabel: false,
  },
};