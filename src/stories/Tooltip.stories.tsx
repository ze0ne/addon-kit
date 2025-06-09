import type { Meta, StoryObj } from "@storybook/react";
import { Tooltip } from "./Tooltip";

const meta: Meta<typeof Tooltip> = {
  title: "Example/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  argTypes: {
    placement: {
      control: { type: "select" },
      options: ["top", "bottom", "left", "right"],
    },
    arrow: { control: "boolean" },
    delay: { control: { type: "number", min: 0, max: 2000, step: 50 } },
    content: { control: "text" },
  },
  parameters: {
    docs: {
      description: {
        story: `
### Tooltip

Composant React pour afficher une infobulle avancée, personnalisable en position, délai et affichage de la flèche.

**Props** :

- \`content\` (\`React.ReactNode\`) : Le contenu affiché dans la tooltip.
- \`placement\` (\`"top" | "bottom" | "left" | "right"\`) : Position de la tooltip.
- \`arrow\` (\`boolean\`) : Afficher la flèche.
- \`delay\` (\`number\`) : Délai avant affichage (ms).
- \`children\` (\`React.ReactNode\`) : Élément déclencheur.

**Exemple** :
\`\`\`tsx
<Tooltip content="Hello Tooltip" placement="right">
  <button>Survolez-moi</button>
</Tooltip>
\`\`\`
        `,
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof Tooltip>;

export const Basic: Story = {
  args: {
    content: "Ceci est une tooltip simple.",
    placement: "top",
    arrow: true,
    delay: 150,
    children: <button>Survolez-moi</button>,
  },
};

export const Bottom: Story = {
  args: {
    content: "Tooltip en bas",
    placement: "bottom",
    arrow: true,
    delay: 150,
    children: <span style={{ padding: 8, background: "#eee" }}>Texte cible</span>,
  },
};

export const Left: Story = {
  args: {
    content: "Tooltip à gauche",
    placement: "left",
    arrow: true,
    delay: 150,
    children: <button>À gauche</button>,
  },
};

export const Right: Story = {
  args: {
    content: "Tooltip à droite",
    placement: "right",
    arrow: true,
    delay: 150,
    children: <button>À droite</button>,
  },
};

export const LongContent: Story = {
  args: {
    content: "Ceci est une tooltip avec un contenu plus long et plusieurs lignes.\nVous pouvez personnaliser le texte.",
    placement: "top",
    arrow: true,
    delay: 150,
    children: <button>Tooltip longue</button>,
  },
};