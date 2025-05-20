import React from "react";
// Ajout des icônes FontAwesome via react-icons
import { FaInfoCircle, FaCheckCircle, FaExclamationTriangle, FaTimesCircle } from "react-icons/fa";

interface HelperProps {
  /**
   * Le message à afficher
   */
  message: string;
  /**
   * Type de message : error, info, success, warning
   */
  type?: "error" | "info" | "success" | "warning";
}

const typeStyles = {
  error: {
    backgroundColor: "#fdecea",
    color: "#b71c1c",
    border: "1px solid #f44336",
    icon: <FaTimesCircle style={{ marginRight: 8 }} />,
  },
  info: {
    backgroundColor: "#e3f2fd",
    color: "#0d47a1",
    border: "1px solid #2196f3",
    icon: <FaInfoCircle style={{ marginRight: 8 }} />,
  },
  success: {
    backgroundColor: "#e8f5e9",
    color: "#1b5e20",
    border: "1px solid #4caf50",
    icon: <FaCheckCircle style={{ marginRight: 8 }} />,
  },
  warning: {
    backgroundColor: "#fff8e1",
    color: "#ff6f00",
    border: "1px solid #ff9800",
    icon: <FaExclamationTriangle style={{ marginRight: 8 }} />,
  },
};

export const Helper = ({
  message,
  type = "info",
  ...props
}: HelperProps) => {
  const style = {
    padding: "12px 20px",
    borderRadius: "6px",
    fontFamily: "'Arial', sans-serif",
    fontSize: "15px",
    margin: "8px 0",
    display: "flex",
    alignItems: "center",
    ...typeStyles[type],
  };

  return (
    <div style={style} {...props}>
      {typeStyles[type].icon}
      <span>{message}</span>
    </div>
  );
};