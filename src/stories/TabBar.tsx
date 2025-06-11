import React from "react";
import { Badge } from "./Badge";

interface Tab {
  label: string;
  value: string;
  disabled?: boolean;
}

interface TabBarProps {
  /**
   * Liste des onglets
   */
  tabs: Tab[];
  /**
   * Valeur de l’onglet actif
   */
  activeTab: string;
  /**
   * Callback quand on change d’onglet
   */
  onChange: (value: string) => void;
  /**
   * Taille des onglets
   */
  size?: "small" | "medium" | "large";
  /**
   * Couleur principale
   */
  color?: string;
  /**
   * Couleur du fond au survol
   */
  hoverBackground?: string;
}

export const TabBar = ({
  tabs,
  activeTab,
  onChange,
  size = "medium",
  color = "#007bff",
  hoverBackground = "#f0f0f0",
}: TabBarProps) => {
  const fontSize =
    size === "small" ? "12px" : size === "large" ? "18px" : "14px";
  const padding =
    size === "small" ? "6px 12px" : size === "large" ? "12px 24px" : "8px 16px";

  const containerStyle: React.CSSProperties = {
    display: "flex",
    borderBottom: "2px solid #ddd",
    fontFamily: "'Arial', sans-serif",
  };

  const tabStyle = (
    isActive: boolean,
    disabled: boolean,
  ): React.CSSProperties => ({
    padding,
    fontSize,
    cursor: disabled ? "not-allowed" : "pointer",
    border: "none",
    outline: "none",
    background: "none",
    color: isActive ? color : "#333",
    fontWeight: isActive ? 600 : 500,
    borderBottom: `2px solid ${isActive ? color : "transparent"}`,
    opacity: disabled ? 0.5 : 1,
    transition: "all 0.2s ease-in-out",
  });

  return (
    <div style={containerStyle}>
      {tabs.map((tab, idx) => (
        <button
          key={tab.value}
          style={tabStyle(tab.value === activeTab, !!tab.disabled)}
          onClick={() => !tab.disabled && onChange(tab.value)}
          disabled={tab.disabled}
          onMouseOver={(e) => {
            if (!tab.disabled && tab.value !== activeTab) {
              (e.currentTarget as HTMLElement).style.backgroundColor =
                hoverBackground;
            }
          }}
          onMouseOut={(e) => {
            (e.currentTarget as HTMLElement).style.backgroundColor =
              "transparent";
          }}
        >
          {tab.label}{" "}
          {idx === 0 && (
            <Badge
              label="Beta"
              backgroundColor={tab.disabled ? "#f0f0f0" : "#e3f2fd"}
              color={tab.disabled ? "#999" : "#1976d2"}
              size={size}
              primary={tab.value === activeTab}
            />
          )}
        </button>
      ))}
    </div>
  );
};
