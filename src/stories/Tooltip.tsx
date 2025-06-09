import React, { useRef, useState, useEffect } from "react";

interface TooltipProps {
  /**
   * Le contenu affiché dans la tooltip
   */
  content: React.ReactNode;
  /**
   * Position de la tooltip par rapport à l'enfant
   */
  placement?: "top" | "bottom" | "left" | "right";
  /**
   * Afficher la flèche ?
   */
  arrow?: boolean;
  /**
   * Délai avant affichage (ms)
   */
  delay?: number;
  /**
   * L'élément enfant qui déclenche la tooltip
   */
  children: React.ReactNode;
}

export const Tooltip = ({
  content,
  placement = "top",
  arrow = true,
  delay = 150,
  children,
}: TooltipProps) => {
  const [visible, setVisible] = useState(false);
  const [coords, setCoords] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLSpanElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  let timeout: NodeJS.Timeout;

  const showTooltip = () => {
    timeout = setTimeout(() => setVisible(true), delay);
  };

  const hideTooltip = () => {
    clearTimeout(timeout);
    setVisible(false);
  };

  useEffect(() => {
    if (visible && triggerRef.current && tooltipRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      let top = 0, left = 0;
      switch (placement) {
        case "top":
          top = triggerRect.top - tooltipRect.height - 8;
          left = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
          break;
        case "bottom":
          top = triggerRect.bottom + 8;
          left = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
          break;
        case "left":
          top = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;
          left = triggerRect.left - tooltipRect.width - 8;
          break;
        case "right":
          top = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;
          left = triggerRect.right + 8;
          break;
      }
      setCoords({ top: Math.max(top, 8), left: Math.max(left, 8) });
    }
  }, [visible, placement]);

  return (
    <>
      <span
        ref={triggerRef}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        onFocus={showTooltip}
        onBlur={hideTooltip}
        tabIndex={0}
        style={{ display: "inline-block" }}
        aria-describedby={visible ? "tooltip" : undefined}
      >
        {children}
      </span>
      {visible && (
        <div
          ref={tooltipRef}
          id="tooltip"
          role="tooltip"
          style={{
            position: "fixed",
            top: coords.top,
            left: coords.left,
            background: "#222",
            color: "#fff",
            padding: "8px 14px",
            borderRadius: 6,
            fontSize: 14,
            zIndex: 1000,
            pointerEvents: "none",
            boxShadow: "0 4px 16px rgba(0,0,0,0.18)",
            transition: "opacity 0.2s",
            opacity: visible ? 1 : 0,
            whiteSpace: "pre-line",
          }}
        >
          {arrow && (
            <span
              style={{
                position: "absolute",
                width: 0,
                height: 0,
                borderStyle: "solid",
                ...(
                  placement === "top"
                    ? {
                        borderWidth: "8px 8px 0 8px",
                        borderColor: "#222 transparent transparent transparent",
                        bottom: -8,
                        left: "50%",
                        transform: "translateX(-50%)",
                      }
                    : placement === "bottom"
                    ? {
                        borderWidth: "0 8px 8px 8px",
                        borderColor: "transparent transparent #222 transparent",
                        top: -8,
                        left: "50%",
                        transform: "translateX(-50%)",
                      }
                    : placement === "left"
                    ? {
                        borderWidth: "8px 0 8px 8px",
                        borderColor: "transparent transparent transparent #222",
                        right: -8,
                        top: "50%",
                        transform: "translateY(-50%)",
                      }
                    : {
                        borderWidth: "8px 8px 8px 0",
                        borderColor: "transparent #222 transparent transparent",
                        left: -8,
                        top: "50%",
                        transform: "translateY(-50%)",
                      }
                ),
              }}
            />
          )}
          {content}
        </div>
      )}
    </>
  );
};