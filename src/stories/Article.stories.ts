import type { Meta, StoryObj } from "@storybook/react";
import { Article } from "./Article";

const meta: Meta<typeof Article> = {
  title: "Example/Article",
  component: Article,
  tags: ["autodocs"],
  parameters: {
    myAddonParameter: `<MyComponent boolProp scalarProp={1} complexProp={{ foo: 1, bar: '2' }}>
  <SomeOtherComponent funcProp={(a) => a.id} />
</MyComponent>
`,
  },
};
export default meta;

type Story = StoryObj<typeof Article>;

export const Primary: Story = {
  args: {
    title: "How to Build a Blog with React",
    primary: true,
    label: "Read More",
    content:
      "This is a detailed guide on how to build a blog using React and modern tools.",
    imageUrl: "https://placehold.co/800x400/cccccc/000000?text=React+Blog",
    author: "John Doe",
    publicationDate: "May 13, 2025",
    backgroundColor: "#f0f0f0",
    size: "medium",
  },
};

export const Secondary: Story = {
  args: {
    title: "Understanding TypeScript",
    label: "Learn More",
    content:
      "TypeScript is a powerful tool for building scalable JavaScript applications.",
    imageUrl: "https://placehold.co/800x400/ffffff/000000?text=TypeScript",
    author: "Jane Smith",
    publicationDate: "May 10, 2025",
    backgroundColor: "#ffffff",
    size: "medium",
  },
};

export const Large: Story = {
  args: {
    title: "The Future of Web Development",
    label: "Explore",
    content:
      "Discover the latest trends and technologies shaping the future of web development.",
    imageUrl: "https://placehold.co/800x400/e0e0e0/000000?text=Web+Development",
    author: "Alice Johnson",
    publicationDate: "May 1, 2025",
    backgroundColor: "#e0e0e0",
    size: "large",
  },
};

export const Small: Story = {
  args: {
    title: "Quick Tips for React Developers",
    label: "Tips",
    content:
      "Short and actionable tips to improve your React development workflow.",
    imageUrl: "https://placehold.co/800x400/f9f9f9/000000?text=React+Tips",
    author: "Bob Brown",
    publicationDate: "April 25, 2025",
    backgroundColor: "#f9f9f9",
    size: "small",
  },
};

export const Max: Story = {
  args: {
    title: "Max",
    primary: true,
    label: "Read More",
    content: "This is a detailed guide on how to build a blog using React and modern tools.",
    imageUrl: "https://placehold.co/800x400/cccccc/000000?text=MPsls",
    author: "John Doef",
    publicationDate: "May 13, 2025",
    backgroundColor: "#f0f0f0",
    size: "medium"
  }
};
