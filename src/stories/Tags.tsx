import React from "react";

interface TagProps {
  /**
   * Le texte affiché dans le tag
   */
  label: string;
  /**
   * Couleur de fond du tag
   */
  backgroundColor?: string;
  /**
   * Couleur du texte
   */
  color?: string;
  /**
   * Taille du tag
   */
  size?: "small" | "medium" | "large";
  /**
   * Peut-on fermer le tag ?
   */
  closable?: boolean;
}

export const Tag = ({
  label,
  backgroundColor = "#f3f3f3",
  color = "#333",
  size = "medium",
  closable = false,
  ...props
}: TagProps) => {
  const tagStyle = {
    display: "inline-flex",
    alignItems: "center",
    padding:
      size === "small"
        ? "2px 8px"
        : size === "large"
        ? "8px 20px"
        : "4px 12px",
    fontSize: size === "small" ? "12px" : size === "large" ? "18px" : "14px",
    borderRadius: "16px",
    backgroundColor,
    color,
    fontWeight: 500,
    fontFamily: "'Arial', sans-serif",
    margin: "4px",
    border: "none",
    outline: "none",
    cursor: "default",
  } as React.CSSProperties;

  const closeStyle = {
    marginLeft: 8,
    cursor: "pointer",
    fontWeight: 700,
    fontSize: "16px",
    lineHeight: 1,
    border: "none",
    background: "transparent",
    color,
  } as React.CSSProperties;

  return (
    <span style={tagStyle} {...props}>
      {label}
      {closable && (
        <button
          type="button"
          aria-label="Fermer le tag"
          style={closeStyle}
        >
          ×
        </button>
      )}
    </span>
  );
};