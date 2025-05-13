// .storybook/preview.ts
import React, { useState } from "react";
import type {
  Preview,
  StoryFnReactReturnType,
  DecoratorFunction,
} from "@storybook/react";
import { useChannel } from "storybook/internal/preview-api";
import { EVENTS } from "../src/constants";

const withOverrideTitle: DecoratorFunction = (Story, context) => {
  const { args } = context;

  const [overrideTitle, setOverrideTitle] = useState<string | undefined>(
    args.overrideTitle || undefined,
  );

  useChannel({
    [EVENTS.SET_DATA]: (newTitle: any) => {
      setOverrideTitle(newTitle.title);
      context.args.overrideTitle = newTitle; // Met à jour les args
      alert(`Override title set to: ${newTitle}`);
    },
  });

  return Story({ ...context, overrideTitle });
};

const preview: Preview = {
  decorators: [withOverrideTitle],
  parameters: {
    /* … */
  },
  initialGlobals: { background: { value: "light" } },
};

export default preview;
