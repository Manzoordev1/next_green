"use client";
import React from "react";
import styles from "../styles/Footer.module.css";

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      © {new Date().getFullYear()} GC All rights Reserved. Powered by Alatayaboon Technology
    </footer>
  );
};

export default Footer;
