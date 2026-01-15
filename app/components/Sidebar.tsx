"use client";

import React, { useState, useEffect } from "react";
import styles from "../styles/Sidebar.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

// ✅ IMPORT YOUR EXISTING LOADER
import { EnterpriseLoader } from "../projects/Table/loader";

import {
  AiFillDashboard,
  AiOutlineProject,
  AiOutlineAppstore,
  AiOutlineSync,
  AiOutlineBarChart,
  AiOutlineGlobal,
  AiOutlineCloud,
  AiOutlineFolder,
  AiOutlineRight,
} from "react-icons/ai";
import { SiSwagger } from "react-icons/si";

const menuItems = [
  { name: "Dashboard", icon: <AiFillDashboard />, path: "/" },

  {
    name: "Projects",
    icon: <AiOutlineProject />,
    subMenu: [
      { name: "Create Project", path: "/projects/create" },
      { name: "All Projects", path: "/projects" },
      { name: "Archived Projects", path: "/projects/archived" },
    ],
  },

  {
    name: "Accounting",
    icon: <AiOutlineAppstore />,
    subMenu: [
      "Chart of Accounts",
      "General Ledger",
      "Journals",
      "Bank Reconciliation",
      "Accounts Payable",
      "Accounts Receivable",
    ],
  },

  {
    name: "Inventory",
    icon: <AiOutlineSync />,
    subMenu: [
      "Products & Services",
      "Stock Management",
      "Warehouses",
      "Inventory Adjustments",
    ],
  },

  {
    name: "Purchasing",
    icon: <AiOutlineBarChart />,
    subMenu: [
      "Purchase Orders",
      "Suppliers",
      "Receive Goods",
      "Supplier Invoices",
    ],
  },

  {
    name: "Sales",
    icon: <AiOutlineGlobal />,
    subMenu: [
      "Customers",
      { name: "Sales Orders", path: "/projects" },
      // "Sales Orders",
      "Sales Invoices",
      "Payments Received",
      "Credit Notes",
    ],
  },

  {
    name: "Reports",
    icon: <AiOutlineFolder />,
    subMenu: [
      "Financial Reports",
      "Inventory Reports",
      "Sales Reports",
      "Purchase Reports",
      "Custom Reports",
    ],
  },

  {
    name: "Analytics",
    icon: <AiOutlineBarChart />,
    subMenu: [
      "Profit & Loss",
      "Balance Sheet",
      "Cash Flow Analysis",
      "KPI Dashboard",
    ],
  },

  {
    name: "Settings",
    icon: <AiOutlineAppstore />,
    subMenu: [
      "Company Profile",
      "User Management",
      "Permissions",
      "Tax Settings",
      "Payment Methods",
    ],
  },

  {
    name: "Sage Accounting API",
    icon: <SiSwagger />,
    path: "/sage-api",
  },

  {
    name: "Data Management",
    icon: <AiOutlineCloud />,
    subMenu: [
      "Import Data",
      "Export Data",
      "Database Connections",
      "Version Control",
    ],
  },
];

const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);

  // ✅ LOADER STATE
  const [loading, setLoading] = useState(false);

  const pathname = usePathname();

  const toggleSubMenu = (name: string) => {
    setOpenSubMenu((prev) => (prev === name ? null : name));
  };

  // ✅ HIDE LOADER AFTER ROUTE CHANGE
  useEffect(() => {
    setLoading(false);
  }, [pathname]);

  // ✅ SHOW LOADER ON CLICK
  const handleNavigation = (targetPath?: string) => {
    // If clicking same route, do nothing
    if (targetPath && targetPath === pathname) return;

    setLoading(true);

    // 🛡️ Safety fallback (never get stuck)
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  return (
    <>
      {/* ===== GLOBAL LOADER ===== */}
      {loading && <EnterpriseLoader />}

      <aside
        className={`${styles.sidebar} ${collapsed ? styles.collapsed : ""}`}
      >
        {/* Logo */}
        <div className={styles.logo}>
          {!collapsed && <img src="/logo/logo.png" alt="Logo" />}
        </div>

        {/* Menu Items */}
        <ul className={styles.menuList}>
          {menuItems.map((item) => (
            <li key={item.name}>
              {/* MAIN ITEM */}
              {item.path ? (
                <Link
                  href={item.path}
                  className={styles.menuItem}
                  onClick={() => handleNavigation(item.path)}
                >
                  <span className={styles.icon}>{item.icon}</span>
                  {!collapsed && (
                    <span className={styles.label}>{item.name}</span>
                  )}
                </Link>
              ) : (
                <div
                  className={styles.menuItem}
                  onClick={() => toggleSubMenu(item.name)}
                >
                  <span className={styles.icon}>{item.icon}</span>
                  {!collapsed && (
                    <span className={styles.label}>
                      {item.name}
                      <span
                        className={`${styles.arrow} ${
                          openSubMenu === item.name ? styles.arrowOpen : ""
                        }`}
                      >
                        <AiOutlineRight />
                      </span>
                    </span>
                  )}
                </div>
              )}

              {/* SUB MENU */}
              {item.subMenu && (
                <ul
                  className={`${styles.subMenu} ${
                    openSubMenu === item.name ? styles.subMenuOpen : ""
                  }`}
                >
                  {item.subMenu.map((sub) =>
                    typeof sub === "string" ? (
                      <li key={sub} className={styles.menuItem}>
                        <span className={styles.subIcon}>
                          <AiOutlineFolder />
                        </span>
                        <span className={styles.label}>{sub}</span>
                      </li>
                    ) : (
                      <li key={sub.name}>
                        <Link
                          href={sub.path}
                          className={styles.menuItem}
                          onClick={() => handleNavigation(sub.path)}
                        >
                          <span className={styles.subIcon}>
                            <AiOutlineFolder />
                          </span>
                          <span className={styles.label}>{sub.name}</span>
                        </Link>
                      </li>
                    )
                  )}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
};

export default Sidebar;
