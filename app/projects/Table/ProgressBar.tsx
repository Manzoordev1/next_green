"use client";
import React from "react";
import styles from "./ProjectTable.module.css";

export const ProgressBar = ({ progress }: { progress: number }) => (
  <div className={styles.progressContainer}>
    <div className={styles.progressBar}>
      <div className={styles.progressFill} style={{ width: `${progress}%` }}></div>
    </div>
    <span className={styles.progressText}>{progress}%</span>
  </div>
);
