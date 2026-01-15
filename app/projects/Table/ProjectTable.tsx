"use client";

import { fetchApi } from "./../../../app/lib/api";
import React, { useState, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import styles from "./ProjectTable.module.css";
import { ProjectFilters } from "./ProjectFilters";
import { Pagination } from "./Pagination";
import { EnterpriseLoader } from "./../../projects/Table/loader";

// Dynamic import for ProjectRow
const ProjectRow = dynamic(
  () => import("./ProjectRow").then((mod) => mod.ProjectRow),
  { ssr: false }
);

// Type definitions
export interface ProjectDummy {
  sno: number;
  documentNo: number;
  clientId: string;
  clientName: string;
  projectValue: number;
  service: string;
  serviceValue: number;
  invoiceRaised: number;
  paymentReceived: number;
  remainingValue: number;
  nextServiceAllowed: string;
  notes: string;
}

export default function ProjectTable() {
  const [data, setData] = useState<ProjectDummy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalRecords, setTotalRecords] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isSearching, setIsSearching] = useState(false);

  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [expandedRows, setExpandedRows] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [monthFilter, setMonthFilter] = useState("all");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof ProjectDummy;
    direction: "asc" | "desc";
  }>({
    key: "sno",
    direction: "asc",
  });

 useEffect(() => {
  const endpoint = process.env.NEXT_PUBLIC_API_SAGE!;
  const controller = new AbortController();

  setLoading(true);

  // ✅ Only include search params if searchTerm exists
  let baseUrl = endpoint; // default endpoint for all data
  if (searchTerm.trim().length > 0) {
    baseUrl = `${endpoint}/search?clientName=${encodeURIComponent(
      searchTerm.trim()
    )}`;
  }

  // ✅ Add pagination params safely
  const joiner = baseUrl.includes("?") ? "&" : "?";
  const finalUrl = `${baseUrl}${joiner}page=${currentPage}&limit=${itemsPerPage}`;

  fetchApi<{
    data: any[];
    total: number;
    page: number;
    lastPage: number;
  }>(finalUrl, { signal: controller.signal })
    .then((res) => {
      const mappedData: ProjectDummy[] = res.data.map((item, index) => {
        const pv = Number(item.projectValue);
        const ra = Number(item.remainingAmount);

        return {
          sno: (currentPage - 1) * itemsPerPage + index + 1, // 🔥 FIX S.NO
          documentNo: item.documentNo,
          clientId: item.clientId,
          clientName: item.clientName,
          projectValue: pv,
          service: item.status || "N/A",
          serviceValue: pv,
          invoiceRaised: pv - ra,
          paymentReceived: pv - ra,
          remainingValue: ra,
          nextServiceAllowed: item.status === "" ? "❌ No" : "✅ Yes",
          notes: item.importBatch ? `Imported: ${item.importBatch}` : "",
        };
      });

      setData(mappedData);
      setTotalRecords(res.total);
      setTotalPages(res.lastPage);
    })
    .catch((err) => {
      if (err.name !== "AbortError") {
        setError(err.message);
      }
    })
    .finally(() => setLoading(false));

  return () => controller.abort();
}, [currentPage, itemsPerPage, searchTerm]);


  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Memoized filtered & sorted data
  const filteredData = useMemo(() => {
    return data.filter((row) => {
      const matchesSearch = true; // search handled by backend
      const matchesStatus =
        statusFilter === "all" || row.nextServiceAllowed === statusFilter;
      const matchesDepartment =
        departmentFilter === "all" || row.clientName === departmentFilter;
      const matchesMonth =
        monthFilter === "all" ||
        row.sno.toString().padStart(2, "0").includes(monthFilter);

      return (
        matchesSearch && matchesStatus && matchesDepartment && matchesMonth
      );
    });
  }, [data, statusFilter, departmentFilter, monthFilter]);

  const sortedData = useMemo(() => {
    return [...filteredData].sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];
      if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortConfig]);

  // const startIndex = (currentPage - 1) * itemsPerPage;
  // const endIndex = startIndex + itemsPerPage;
  // const currentData = sortedData.slice(startIndex, endIndex);
  const currentData = data;

  // // Loading state with professional loader
  // {
  //   loading && <EnterpriseLoader />;
  // }

  // Error state
  if (error) {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.errorIcon}>⚠️</div>
        <h3 className={styles.errorTitle}>Error Loading Data</h3>
        <p className={styles.errorMessage}>{error}</p>
        <button
          className={styles.errorButton}
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }

  // ✅ Loader state SECOND
  if (loading) {
    return <EnterpriseLoader />;
  }

  // JSX return
  return (
    <div className={styles.container}>
      {/* Filters component */}
      <ProjectFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        monthFilter={monthFilter}
        setMonthFilter={setMonthFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        departmentFilter={departmentFilter}
        setDepartmentFilter={setDepartmentFilter}
        clearFilters={() => {
          setSearchTerm("");
          setStatusFilter("all");
          setMonthFilter("all");
          setDepartmentFilter("all");
        }}
      />

      {/* Stats */}
      <div className={styles.statsBar}>
        {["Total Projects", "In Progress", "Completed", "Selected"].map(
          (label) => {
            let value = 0;
            switch (label) {
              case "Total Projects":
                value = totalRecords;
                break;

              case "In Progress":
                value = filteredData.filter(
                  (d) => d.service === "In Progress"
                ).length;
                break;
              case "Completed":
                value = filteredData.filter(
                  (d) => d.service === "Completed"
                ).length;
                break;
              case "Selected":
                value = selectedRows.length;
            }
            return (
              <div key={label} className={styles.stat}>
                <span className={styles.statLabel}>{label}</span>
                <span className={styles.statValue}>{value}</span>
              </div>
            );
          }
        )}
      </div>

      {/* Table */}
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.expandCol}></th>
              <th className={styles.checkboxCol}>
                <input
                  type="checkbox"
                  className={styles.checkbox}
                  checked={
                    currentData.length > 0 &&
                    currentData.every((r) => selectedRows.includes(r.sno))
                  }
                  onChange={(e) =>
                    setSelectedRows(
                      e.target.checked ? currentData.map((r) => r.sno) : []
                    )
                  }
                />
              </th>
              {[
                { key: "sno", label: "S.NO" },
                { key: "documentNo", label: "Document No" },
                { key: "clientId", label: "Client ID" },
                { key: "clientName", label: "Client Name" },
                { key: "projectValue", label: "Project Value" },
                { key: "service", label: "Service" },
                { key: "serviceValue", label: "Service Value" },
                { key: "invoiceRaised", label: "Invoice Raised" },
                { key: "paymentReceived", label: "Payment Received" },
                { key: "remainingValue", label: "Remaining Value" },
                { key: "nextServiceAllowed", label: "Next Service" },
                { key: "notes", label: "Notes" },
              ].map((col) => (
                <th
                  key={col.key}
                  onClick={() =>
                    setSortConfig({
                      key: col.key as keyof ProjectDummy,
                      direction:
                        sortConfig.key === col.key &&
                        sortConfig.direction === "asc"
                          ? "desc"
                          : "asc",
                    })
                  }
                >
                  <div className={styles.thContent}>
                    {col.label}
                    <span className={styles.sortIcon}>
                      {sortConfig.key === col.key
                        ? sortConfig.direction === "asc"
                          ? "▲"
                          : "▼"
                        : "⇅"}
                    </span>
                  </div>
                </th>
              ))}
              <th className={styles.actionsCol}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((row) => (
              <ProjectRow
                key={row.sno}
                row={row}
                selectedRows={selectedRows}
                expandedRows={expandedRows}
                toggleRowExpand={(id) => {
                  setExpandedRows(
                    expandedRows.includes(id)
                      ? expandedRows.filter((r) => r !== id)
                      : [...expandedRows, id]
                  );
                }}
                handleRowSelect={(id, checked) => {
                  setSelectedRows(
                    checked
                      ? [...selectedRows, id]
                      : selectedRows.filter((r) => r !== id)
                  );
                }}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        startIndex={(currentPage - 1) * itemsPerPage + 1}
        endIndex={Math.min(currentPage * itemsPerPage, totalRecords)}
        sortedDataLength={totalRecords}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={(v) => {
          setCurrentPage(1);
          setItemsPerPage(v);
        }}
      />
    </div>
  );
}
