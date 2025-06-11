import type { Meta, StoryObj } from "@storybook/react";
import { BadForm } from "./BadForm";

const meta: Meta<typeof BadForm> = {
  title: "💀 Anti-Pattern/BadForm (A11y Hell)",
  component: BadForm,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        story: `
> ⚠️ **Ce composant est un contre-exemple volontaire** pour illustrer de **graves problèmes d'accessibilité**.

### Liste des erreurs incluses volontairement

- ❌ Champs sans \`<label>\`
- ❌ Boutons sans texte accessible
- ❌ Contraste insuffisant
- ❌ Suppression du \`:focus\`
- ❌ Utilisation incorrecte des rôles et attributs ARIA
- ❌ Manque de groupements logiques pour les radios/checkboxes

Utilisez ce composant pour vos démonstrations, audits ou formations à l'accessibilité.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof BadForm>;

export const Default: Story = {
  name: "Formulaire bourré d’erreurs 🔥",
  args: {},
};
