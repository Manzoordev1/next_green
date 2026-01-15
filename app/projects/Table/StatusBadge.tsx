"use client";
import React from "react";
import styles from "./ProjectTable.module.css";

export const StatusBadge = ({ status }: { status: string }) => {
  const statusConfig: Record<string, string> = {
    "In Progress": styles.statusProgress,
    "Completed": styles.statusCompleted,
    "Under Review": styles.statusReview,
    "Planning": styles.statusPlanning,
  };

  return (
    <span className={`${styles.statusBadge} ${statusConfig[status]}`}>
      <span className={styles.statusDot}></span>
      {status}
    </span>
  );
};
