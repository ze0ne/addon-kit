import React from "react";

type ProgressBarSize = "small" | "medium" | "large";

interface ProgressBarProps {
  /**
   * Valeur actuelle de la progression (0 à 100)
   */
  value: number;
  /**
   * Couleur de la barre de progression
   */
  color?: string;
  /**
   * Afficher le pourcentage ?
   */
  showLabel?: boolean;
  /**
   * Taille prédéfinie : small, medium, large
   */
  size?: ProgressBarSize;
}

const sizeToHeight: Record<ProgressBarSize, number> = {
  small: 8,
  medium: 16,
  large: 28,
};

export const ProgressBar = ({
  value,
  color = "#1976d2",
  showLabel = false,
  size = "medium",
  ...props
}: ProgressBarProps) => {
  const computedHeight = sizeToHeight[size];

  const containerStyle: React.CSSProperties = {
    width: "100%",
    background: "#e0e0e0",
    borderRadius: computedHeight / 2,
    overflow: "hidden",
    height: computedHeight,
    margin: "8px 0",
    position: "relative",
  };

  const barStyle: React.CSSProperties = {
    width: `${Math.max(0, Math.min(100, value))}%`,
    background: color,
    height: "100%",
    transition: "width 0.3s",
  };

  const labelStyle: React.CSSProperties = {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    color: "#fff",
    fontWeight: 600,
    fontSize: computedHeight > 20 ? 16 : 12,
    pointerEvents: "none",
    textShadow: "0 1px 2px rgba(0,0,0,0.15)",
  };

  return (
    <div style={containerStyle} {...props}>
      <div style={barStyle} />
      {showLabel && <span style={labelStyle}>{`${Math.round(value)}%`}</span>}
    </div>
  );
};
