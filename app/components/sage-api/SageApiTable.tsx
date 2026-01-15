"use client";

import React, { useMemo, useState } from "react";
import styles from "./ProjectTable.module.css";

interface SageModule {
  name: string;
  description: string;
}

export default function SageApiTable({ data }: { data: SageModule[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortAsc, setSortAsc] = useState(true);

  const filteredData = useMemo(() => {
    return data.filter((row) =>
      row.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [data, searchTerm]);

  const sortedData = useMemo(() => {
    return [...filteredData].sort((a, b) =>
      sortAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    );
  }, [filteredData, sortAsc]);

  return (
    <div className={styles.container}>
      {/* Search */}
      <input
        className={styles.searchInput}
        placeholder="Search module..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Table */}
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th onClick={() => setSortAsc(!sortAsc)}>
                Module Name <span className={styles.sortIcon}>⇅</span>
              </th>
              <th>Description</th>
            </tr>
          </thead>

          <tbody>
            {sortedData.map((row, index) => (
              <tr key={index}>
                <td>{row.name}</td>
                <td>{row.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
