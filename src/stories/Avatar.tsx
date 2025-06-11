import React from "react";

interface AvatarProps {
  /**
   * Nom complet de l'utilisateur (pour générer les initiales)
   */
  name: string;
  /**
   * Couleur de fond de l'avatar
   */
  backgroundColor?: string;
  /**
   * Couleur du texte (initiales)
   */
  color?: string;
  /**
   * Taille de l'avatar
   */
  size?: "small" | "medium" | "large";
}

// function getInitials(name: string) {
//   const names = name.trim().split(" ");
//   if (names.length === 1) return names[0][0].toUpperCase();
//   return (names[0][0] + names[names.length - 1][0]).toUpperCase();
// }

function getInitials(name: string) {
  const names = name.trim().split(" ").filter(Boolean);
  return names.map((n) => n[0].toUpperCase()).join("");
}

export const Avatar = ({
  name = "Romain Guinand",
  backgroundColor = "#007BFF",
  color = "#fff",
  size = "medium",
  ...props
}: AvatarProps) => {
  const dimension = size === "small" ? 32 : size === "large" ? 64 : 48;

  const avatarStyle = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: dimension,
    height: dimension,
    borderRadius: "50%",
    backgroundColor,
    color,
    fontWeight: 700,
    fontSize: size === "small" ? "14px" : size === "large" ? "28px" : "20px",
    fontFamily: "'Arial', sans-serif",
    userSelect: "none" as const,
    boxShadow: "0 2px 4px rgba(0,0,0,0.08)",
    margin: "4px",
  };

  return (
    <span style={avatarStyle} {...props}>
      {getInitials(name)}
    </span>
  );
};
