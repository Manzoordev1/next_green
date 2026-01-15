// DashboardCard.tsx
import React from "react";
import styles from "./DashboardCard.module.css";

type DashboardCardProps = {
  title: string;
  value: string | number;
  unit?: string;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: 'green' | 'blue' | 'amber' | 'purple';
};

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  value,
  unit,
  icon,
  trend,
  color = 'green'
}) => {
  return (
    <div className={`${styles.card} ${styles[`card--${color}`]}`}>
      <div className={styles.cardInner}>
        <div className={styles.header}>
          <div className={styles.titleRow}>
            {icon && <div className={styles.icon}>{icon}</div>}
            <span className={styles.title}>{title}</span>
          </div>
          {trend && (
            <div className={`${styles.trend} ${trend.isPositive ? styles.trendUp : styles.trendDown}`}>
              <span className={styles.trendIcon}>
                {trend.isPositive ? '↑' : '↓'}
              </span>
              <span className={styles.trendValue}>{Math.abs(trend.value)}%</span>
            </div>
          )}
        </div>

        <div className={styles.valueContainer}>
          <div className={styles.value}>
            {typeof value === 'number' ? value.toLocaleString() : value}
            {unit && <span className={styles.unit}> {unit}</span>}
          </div>
          <div className={styles.progressBar}>
            <div className={styles.progressFill}></div>
          </div>
        </div>
      </div>
      
      <div className={styles.cardGlow}></div>
    </div>
  );
};

export default DashboardCard;
