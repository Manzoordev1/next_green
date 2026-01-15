"use client";

import React, { useEffect, useState, useMemo } from "react";
import styles from "./ProjectTable.module.css";
import { FaSearchLocation } from "react-icons/fa";
import { FcPrint } from "react-icons/fc";

interface ProjectFiltersProps {
  searchTerm: string;
  setSearchTerm: (v: string) => void;
  monthFilter: string;
  setMonthFilter: (v: string) => void;
  statusFilter: string;
  setStatusFilter: (v: string) => void;
  departmentFilter: string;
  setDepartmentFilter: (v: string) => void;
  clearFilters: () => void;
}

// Generic Select Component
const FilterSelect = ({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) => (
  <div className={styles.filterGroup}>
    <label className={styles.filterLabel}>{label}</label>
    <select className={styles.filterSelect} value={value} onChange={(e) => onChange(e.target.value)}>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);

// Debounce hook for search input
const useDebounce = (value: string, delay: number = 300) => {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debounced;
};

export const ProjectFilters = React.memo(
  ({
    searchTerm,
    setSearchTerm,
    monthFilter,
    setMonthFilter,
    statusFilter,
    setStatusFilter,
    departmentFilter,
    setDepartmentFilter,
    clearFilters,
  }: ProjectFiltersProps) => {
    const debouncedSearch = useDebounce(searchTerm);

    const months = useMemo(
      () => [
        { value: "all", label: "All Months" },
        { value: "01", label: "January" },
        { value: "02", label: "February" },
        { value: "03", label: "March" },
        { value: "04", label: "April" },
        { value: "05", label: "May" },
        { value: "06", label: "June" },
        { value: "07", label: "July" },
        { value: "08", label: "August" },
        { value: "09", label: "September" },
        { value: "10", label: "October" },
        { value: "11", label: "November" },
        { value: "12", label: "December" },
      ],
      []
    );

    const departments = useMemo(
      () => [
        { value: "all", label: "All Departments" },
        { value: "Manufacturing", label: "Manufacturing" },
        { value: "Construction", label: "Construction" },
        { value: "Recycling", label: "Recycling" },
        { value: "Packaging", label: "Packaging" },
        { value: "Energy", label: "Energy" },
        { value: "Textile", label: "Textile" },
        { value: "Automotive", label: "Automotive" },
      ],
      []
    );

    const statuses = useMemo(
      () => [
        { value: "all", label: "All Status" },
        { value: "In Progress", label: "In Progress" },
        { value: "Completed", label: "Completed" },
        { value: "Under Review", label: "Under Review" },
        { value: "Planning", label: "Planning" },
      ],
      []
    );

    // Update search term only after debounce
    useEffect(() => {
      setSearchTerm(debouncedSearch);
    }, [debouncedSearch, setSearchTerm]);

    return (
      <div className={styles.toolbar}>
        {/* Top Toolbar */}
        <div className={styles.toolbarTop}>
          <div className={styles.searchBox}>
            <span className={styles.searchIcon}>
              <FaSearchLocation />
            </span>
            <input
              type="text"
              aria-label="Search Projects"
              placeholder="Search by project name, analyst, or ID..."
              className={styles.searchInput}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className={styles.toolbarActions}>
            <button className={styles.btnIcon} title="Export to Excel">
              📤
            </button>
            <button className={styles.btnIcon} title="Print Report">
              <FcPrint/>
            </button>
            <button className={styles.btnIcon} title="Refresh Data">
              🔄
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className={styles.toolbarFilters}>
          <FilterSelect label="Month:" value={monthFilter} onChange={setMonthFilter} options={months} />
          <FilterSelect label="Status:" value={statusFilter} onChange={setStatusFilter} options={statuses} />
          <FilterSelect label="Department:" value={departmentFilter} onChange={setDepartmentFilter} options={departments} />

          <button className={styles.clearFiltersBtn} onClick={clearFilters}>
            ✕ Clear Filters
          </button>
        </div>
      </div>
    );
  }
);
