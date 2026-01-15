"use client";

import React from "react";
import styles from "./ProjectTable.module.css";
import { FiChevronRight } from "react-icons/fi";

interface ProjectRowProps {
  row: {
    sno: number;
    documentNo: string;
    clientId: string;
    clientName: string;
    projectValue: number;
    service: string;
    serviceValue: number;
    invoiceRaised: number;
    paymentReceived: number;
    remainingValue: number;
    nextServiceAllowed: string;
    notes: string;
  };
  selectedRows: number[];
  expandedRows: number[];
  toggleRowExpand: (sno: number) => void;
  handleRowSelect: (sno: number, checked: boolean) => void;
}

export const ProjectRow = ({
  row,
  selectedRows,
  expandedRows,
  toggleRowExpand,
  handleRowSelect,
}: ProjectRowProps) => {
  const isExpanded = expandedRows.includes(row.sno);
  const isSelected = selectedRows.includes(row.sno);

  return (
    <React.Fragment>
      {/* ================= MAIN ROW ================= */}
      <tr className={isSelected ? styles.selectedRow : ""}>
        <td className={styles.expandCell}>
          <button
            className={styles.expandBtn}
            onClick={() => toggleRowExpand(row.sno)}
            aria-label={isExpanded ? "Collapse Row" : "Expand Row"}
          >
            <FiChevronRight
              size={18}
              className={`${styles.expandIcon} ${
                isExpanded ? styles.expanded : ""
              }`}
            />
          </button>
        </td>

        <td>
          <input
            type="checkbox"
            className={styles.checkbox}
            checked={isSelected}
            onChange={(e) =>
              handleRowSelect(row.sno, e.target.checked)
            }
          />
        </td>

        <td>{row.sno}</td>
        <td>{row.documentNo}</td>
        <td>{row.clientId}</td>
        <td className={styles.nameCell}>{row.clientName}</td>
        <td>{row.projectValue}</td>
        <td>{row.service}</td>
        <td>{row.serviceValue}</td>
        <td>{row.invoiceRaised}</td>
        <td>{row.paymentReceived}</td>
        <td>{row.remainingValue}</td>
        <td>{row.nextServiceAllowed}</td>

        <td className={styles.actionsCell}>
          <button className={styles.actionBtn}>⋮</button>
        </td>
      </tr>

      {/* ================= EXPANDED ROW ================= */}
      {isExpanded && (
        <tr className={styles.expandedRow}>
          <td colSpan={13}>
            <div className={styles.expandedContent}>
              <div className={styles.expandedGrid}>
                <div className={styles.expandedItem}>
                  <span className={styles.expandedLabel}>Notes:</span>
                  <span className={styles.expandedValue}>
                    {row.notes || "—"}
                  </span>
                </div>
              </div>

              <div className={styles.expandedActions}>
                <button className={styles.expandedBtn}>📝 Edit</button>
                <button className={styles.expandedBtn}>📄 Invoice</button>
                <button className={styles.expandedBtn}>💰 Payment</button>
                <button className={styles.expandedBtn}>🗑️ Delete</button>
              </div>
            </div>
          </td>
        </tr>
      )}
    </React.Fragment>
  );
};
