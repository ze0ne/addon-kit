import React from "react";

import { Header } from "./Header";
import "./page.css";

type User = {
  name: string;
};

interface PageProps {
  overrideTitle?: any;
  summary?: string;
}

export const Page: React.FC<PageProps> = ({ overrideTitle, summary }) => {
  const [user, setUser] = React.useState<User>();
  console.log("Override title:", overrideTitle);

  return (
    <article>
      <Header
        user={user}
        onLogin={() => setUser({ name: "Jane Doe" })}
        onLogout={() => setUser(undefined)}
        onCreateAccount={() => setUser({ name: "Jane Doe" })}
      />

      <section>
        <h2>Pages in Storybook</h2>
        <p>Summary</p>
      </section>
    </article>
  );
};
