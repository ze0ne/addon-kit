import type { Meta, StoryObj } from "@storybook/react";
import { Tag } from "./Tags";

const meta: Meta<typeof Tag> = {
  title: "Example/Tag",
  component: Tag,
  tags: ["autodocs"],
  argTypes: {
    backgroundColor: { control: "color" },
    color: { control: "color" },
    size: {
      control: { type: "select" },
      options: ["small", "medium", "large"],
    },
    closable: { control: "boolean" },
  },
  parameters: {
    docs: {
      description: {
        story: `
### Tag

Composant React pour afficher un tag personnalisable, avec option de fermeture.

**Props** :

- \`label\` (\`string\`) : Le texte affiché dans le tag.
- \`backgroundColor\` (\`string\`) : Couleur de fond du tag.
- \`color\` (\`string\`) : Couleur du texte.
- \`size\` (\`"small" | "medium" | "large"\`) : Taille du tag.
- \`closable\` (\`boolean\`) : Affiche une croix de fermeture si \`true\`.

**Exemple** :
\`\`\`tsx
<Tag label="React" backgroundColor="#e3f2fd" color="#1976d2" closable />
\`\`\`
        `,
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof Tag>;

export const Default: Story = {
  args: {
    label: "Tag par défaut",
    backgroundColor: "#f3f3f3",
    color: "#333",
    size: "medium",
    closable: false,
  },
};

export const Closable: Story = {
  args: {
    label: "Tag closable",
    backgroundColor: "#e3f2fd",
    color: "#1976d2",
    size: "medium",
    closable: true,
  },
};

export const Large: Story = {
  args: {
    label: "Tag large",
    backgroundColor: "#ffe082",
    color: "#ff6f00",
    size: "large",
    closable: false,
  },
};

export const Small: Story = {
  args: {
    label: "Tag small",
    backgroundColor: "#c8e6c9",
    color: "#388e3c",
    size: "small",
    closable: false,
  },
};