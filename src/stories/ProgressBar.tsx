import React from "react";

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
   * Hauteur de la barre (en px)
   */
  height?: number;
  /**
   * Afficher le pourcentage ?
   */
  showLabel?: boolean;
}

export const ProgressBar = ({
  value,
  color = "#1976d2",
  height = 16,
  showLabel = false,
  ...props
}: ProgressBarProps) => {
  const containerStyle: React.CSSProperties = {
    width: "100%",
    background: "#e0e0e0",
    borderRadius: height / 2,
    overflow: "hidden",
    height,
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
    fontSize: height > 20 ? 16 : 12,
    pointerEvents: "none",
    textShadow: "0 1px 2px rgba(0,0,0,0.15)",
  };

  return (
    <div style={containerStyle} {...props}>
      <div style={barStyle} />
      {showLabel && (
        <span style={labelStyle}>{`${Math.round(value)}%`}</span>
      )}
    </div>
  );
};