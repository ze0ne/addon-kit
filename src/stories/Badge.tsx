import React from "react";

interface BadgeProps {
  /**
   * Le texte affiché dans le badge
   */
  label: string;
  /**
   * Couleur de fond du badge
   */
  backgroundColor?: string;
  /**
   * Couleur du texte
   */
  color?: string;
  /**
   * Taille du badge
   */
  size?: "small" | "medium" | "large";
  /**
   * Badge principal ?
   */
  primary?: boolean;
}

export const Badge = ({
  label,
  backgroundColor = "#eee",
  color = "#333",
  size = "medium",
  primary = false,
  ...props
}: BadgeProps) => {
  const badgeStyle = {
    display: "inline-block",
    padding:
      size === "small" ? "2px 8px" : size === "large" ? "8px 20px" : "4px 12px",
    fontSize: size === "small" ? "12px" : size === "large" ? "18px" : "14px",
    borderRadius: "50px",
    backgroundColor: primary ? "#007BFF" : backgroundColor,
    color: primary ? "#fff" : color,
    fontWeight: 600,
    boxShadow: "0 2px 4px rgba(0,0,0,0.08)",
    fontFamily: "'Arial', sans-serif",
    margin: "4px",
  };

  return (
    <span style={badgeStyle} {...props}>
      {label}
    </span>
  );
};
