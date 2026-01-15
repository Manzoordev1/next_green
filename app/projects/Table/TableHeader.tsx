"use client";
import { useState } from "react";
import styles from "./../Table/ProjectTable.module.css";
import CreateProjectModal from "./../../projects/Form/ProjectForm"; // adjust the path if needed

export default function ProjectHeader() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h1 className={styles.title}>Project Module</h1>
          <p className={styles.subtitle}>
           Manage and Track Accounting Entries
          </p>
        </div>

       <div className={styles.headerRight}>
          <button className={styles.btnSecondary}>📊 Reports</button>
          <button
            className={styles.btnPrimary}
            onClick={() => setIsModalOpen(true)}
          >
            ＋ New Project
          </button>
        </div>
      </div>

      {isModalOpen && <CreateProjectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />}
    </>
  );
}
