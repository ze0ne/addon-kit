import type { Meta, StoryObj } from "@storybook/react";
import { Helper } from "./Helper";

const meta: Meta<typeof Helper> = {
  title: "Example/Helper",
  component: Helper,
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["info", "success", "warning", "error"],
    },
  },
  parameters: {
    docs: {
      description: {
        story: `
### Helper

Composant React pour afficher des messages contextuels : information, succès, avertissement ou erreur.

**Props** :

- \`message\` (\`string\`) : Le texte à afficher dans le message.
- \`type\` (\`"info" | "success" | "warning" | "error"\`) : Le type de message à afficher (par défaut : "info").

**Exemple** :
\`\`\`tsx
<Helper message="Ceci est un message d'information." type="info" />
\`\`\`
        `,
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof Helper>;

export const Info: Story = {
  args: {
    message: "Ceci est un message d'information.",
    type: "info",
  },
};

export const Success: Story = {
  args: {
    message: "L'opération a réussi !",
    type: "success",
  },
};

export const Warning: Story = {
  args: {
    message: "Attention, vérifiez vos paramètres.",
    type: "warning",
  },
};

export const Error: Story = {
  args: {
    message: "Une erreur est survenue.",
    type: "error",
  },
};
