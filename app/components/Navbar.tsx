"use client";

import React from "react";
import styles from "../styles/Navbar.module.css";
import { CiSearch } from "react-icons/ci";
import { FaUserCircle } from "react-icons/fa";


const Navbar: React.FC = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.leftSection}>
        <h1 className={styles.title}>Accounting Dashboard</h1>
        <p className={styles.subtitle}></p>
      </div>

      <div className={styles.rightSection}>
        <div className={styles.searchContainer}>
          <span className={styles.searchIcon}>
            <CiSearch />
          </span>
          <input
            type="text"
            placeholder="Search"
            className={styles.searchInput}
          />
        </div>

        <div className={styles.iconButtons}>
          <button className={styles.iconBtn} title="Settings">
            ⚙️
          </button>
          <button className={styles.iconBtn} title="Dark Mode">
            🌙
          </button>
          <button className={styles.iconBtn} title="Notifications">
            🔔
            <span className={styles.notificationBadge}></span>
          </button>
        </div>

        <div className={styles.userSection}>
          <FaUserCircle className={styles.userAvatar} />
          <span className={styles.userName}>Admin</span>
          <span className={styles.dropdownIcon}>▼</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
