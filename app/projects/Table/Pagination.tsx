"use client";
import React from "react";
import styles from "./ProjectTable.module.css";

interface PaginationProps {
  currentPage: number;
  setCurrentPage: (v: number) => void;
  totalPages: number;
  startIndex: number;
  endIndex: number;
  sortedDataLength: number;
  itemsPerPage: number;
  setItemsPerPage: (v: number) => void;
}

export const Pagination = ({
  currentPage,
  setCurrentPage,
  totalPages,
  startIndex,
  endIndex,
  sortedDataLength,
  itemsPerPage,
  setItemsPerPage,
}: PaginationProps) => (
  <div className={styles.pagination}>
    <div className={styles.paginationLeft}>
      <span className={styles.paginationText}>
        Showing {startIndex + 1} to {Math.min(endIndex, sortedDataLength)} of {sortedDataLength} entries
      </span>
      <select className={styles.rowsPerPage} value={itemsPerPage} onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}>
        <option value={5}>5 per page</option>
        <option value={10}>10 per page</option>
        <option value={25}>25 per page</option>
        <option value={50}>50 per page</option>
      </select>
    </div>

    <div className={styles.paginationRight}>
      <button className={styles.pageBtn} onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>⟨⟨</button>
      <button className={styles.pageBtn} onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>⟨</button>
      
      {[...Array(Math.min(5, totalPages))].map((_, i) => {
        let pageNum;
        if (totalPages <= 5) pageNum = i + 1;
        else if (currentPage <= 3) pageNum = i + 1;
        else if (currentPage >= totalPages - 2) pageNum = totalPages - 4 + i;
        else pageNum = currentPage - 2 + i;

        return (
          <button key={i} className={`${styles.pageBtn} ${currentPage === pageNum ? styles.activePageBtn : ""}`} onClick={() => setCurrentPage(pageNum)}>{pageNum}</button>
        );
      })}

      <button className={styles.pageBtn} onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>⟩</button>
      <button className={styles.pageBtn} onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages}>⟩⟩</button>
    </div>
  </div>
);
