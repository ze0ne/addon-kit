import React from "react";

interface PaginationProps {
  /**
   * Page courante (commence à 1)
   */
  currentPage: number;
  /**
   * Nombre total de pages
   */
  totalPages: number;
  /**
   * Callback lors d'un changement de page
   */
  onPageChange: (page: number) => void;
  /**
   * Nombre de pages visibles autour de la page courante
   */
  siblingCount?: number;
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
}: PaginationProps) => {
  if (totalPages <= 1) return null;

  const range = [];
  const start = Math.max(1, currentPage - siblingCount);
  const end = Math.min(totalPages, currentPage + siblingCount);

  if (start > 1) range.push(1);
  if (start > 2) range.push("...");

  for (let i = start; i <= end; i++) {
    range.push(i);
  }

  if (end < totalPages - 1) range.push("...");
  if (end < totalPages) range.push(totalPages);

  return (
    <nav aria-label="Pagination" style={{ display: "flex", gap: 4, alignItems: "center", margin: "16px 0" }}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        style={{ padding: "6px 12px", borderRadius: 4, border: "1px solid #ccc", background: "#fff", cursor: currentPage === 1 ? "not-allowed" : "pointer" }}
        aria-label="Page précédente"
      >
        &lt;
      </button>
      {range.map((page, idx) =>
        typeof page === "number" ? (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            style={{
              padding: "6px 12px",
              borderRadius: 4,
              border: "1px solid #1976d2",
              background: page === currentPage ? "#1976d2" : "#fff",
              color: page === currentPage ? "#fff" : "#1976d2",
              fontWeight: page === currentPage ? 700 : 400,
              cursor: page === currentPage ? "default" : "pointer",
            }}
            disabled={page === currentPage}
            aria-current={page === currentPage ? "page" : undefined}
          >
            {page}
          </button>
        ) : (
          <span key={`ellipsis-${idx}`} style={{ padding: "0 8px" }}>
            ...
          </span>
        )
      )}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        style={{ padding: "6px 12px", borderRadius: 4, border: "1px solid #ccc", background: "#fff", cursor: currentPage === totalPages ? "not-allowed" : "pointer" }}
        aria-label="Page suivante"
      >
        &gt;
      </button>
    </nav>
  );
};