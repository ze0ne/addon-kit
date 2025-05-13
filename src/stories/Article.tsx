import React from "react";

interface ArticleProps {
  /**
   * The title of the article
   */
  title?: string;
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean;
  /**
   * What background color to use
   */
  backgroundColor?: string;
  /**
   * How large should the button be?
   */
  size?: "small" | "medium" | "large";
  /**
   * Button contents
   */
  label: string;
  /**
   * The content of the article
   */
  content: string;
  /**
   * The URL of the article's image
   */
  imageUrl?: string;
  /**
   * The author of the article
   */
  author: string;
  /**
   * The publication date of the article
   */
  publicationDate: string;
}

export const Article = ({
  title = "Blog Title",
  primary = false,
  size = "medium",
  backgroundColor = "#ffffff",
  label,
  content,
  imageUrl,
  author,
  publicationDate,
  ...props
}: ArticleProps) => {
  const articleStyle = {
    backgroundColor,
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    padding: "20px",
    fontFamily: "'Arial', sans-serif",
    lineHeight: "1.6",
    maxWidth: "800px",
    margin: "20px auto",
  };

  const headerStyle = {
    borderBottom: "2px solid #ddd",
    paddingBottom: "10px",
    marginBottom: "20px",
  };

  const imageStyle = {
    width: "100%",
    borderRadius: "8px",
    marginBottom: "20px",
  };

  const footerStyle = {
    marginTop: "20px",
    textAlign: "center",
  };

  const buttonStyle = {
    backgroundColor: primary ? "#007BFF" : "#6c757d",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    padding:
      size === "small"
        ? "8px 12px"
        : size === "large"
          ? "16px 24px"
          : "12px 18px",
    fontSize: size === "small" ? "14px" : size === "large" ? "18px" : "16px",
    cursor: "pointer",
  };

  return (
    <article style={articleStyle} {...props}>
      <header style={headerStyle}>
        <h1>{title}</h1>
        <p>
          <strong>By {author}</strong> | <em>{publicationDate}</em>
        </p>
      </header>
      {imageUrl && <img src={imageUrl} alt={title} style={imageStyle} />}
      <section>
        <p>{content}</p>
      </section>
      <footer style={footerStyle}>
        <button style={buttonStyle}>{label}</button>
      </footer>
    </article>
  );
};
