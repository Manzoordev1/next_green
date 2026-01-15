import React from "react";
import styles from "./../../projects/Table/loader.module.css";

export const EnterpriseLoader: React.FC = () => {
  return (
    <div className={styles.loaderOverlay}>
      <div className={styles.loaderContainer}>
        {/* Logo/Icon Area */}
        <div className={styles.loaderIcon}>
          <svg
            className={styles.loaderSvg}
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              className={styles.loaderCircle}
              cx="50"
              cy="50"
              r="45"
              fill="none"
              strokeWidth="8"
            />
            <circle
              className={styles.loaderCircleProgress}
              cx="50"
              cy="50"
              r="45"
              fill="none"
              strokeWidth="8"
            />
          </svg>
          <div className={styles.loaderIconInner}>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
          </div>
        </div>

        {/* Loading Text */}
        <div className={styles.loaderText}>
          <h3 className={styles.loaderTitle}>Loading Data</h3>
          <p className={styles.loaderSubtitle}>Please wait while we fetch your records...</p>
        </div>

        {/* Progress Bar */}
        <div className={styles.progressBarContainer}>
          <div className={styles.progressBar}>
            <div className={styles.progressBarFill}></div>
          </div>
        </div>

        {/* Loading Dots */}
        <div className={styles.loadingDots}>
          <span className={styles.dot}></span>
          <span className={styles.dot}></span>
          <span className={styles.dot}></span>
        </div>
      </div>
    </div>
  );
};