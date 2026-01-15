// hooks/useProjectTable.ts
import { useState, useMemo } from "react";

export const useProjectTable = (data: any[]) => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [expandedRows, setExpandedRows] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [monthFilter, setMonthFilter] = useState("all");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" }>({ key: "id", direction: "desc" });

  // Filter data
  const filteredData = useMemo(() => {
    return data.filter((row) => {
      const matchesSearch = Object.values(row).some((v) =>
        v.toString().toLowerCase().includes(searchTerm.toLowerCase())
      );
      const matchesStatus = statusFilter === "all" || row.status === statusFilter;
      const matchesDepartment = departmentFilter === "all" || row.department === departmentFilter;
      const matchesMonth = monthFilter === "all" || row.startDate.split("-")[1] === monthFilter;
      return matchesSearch && matchesStatus && matchesDepartment && matchesMonth;
    });
  }, [data, searchTerm, statusFilter, departmentFilter, monthFilter]);

  // Sort data
  const sortedData = useMemo(() => {
    return [...filteredData].sort((a, b) => {
      const aVal = a[sortConfig.key as keyof typeof a];
      const bVal = b[sortConfig.key as keyof typeof b];
      if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortConfig]);

  // Pagination
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const currentData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedData.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedData, currentPage, itemsPerPage]);

  // Handlers
  const handleSort = (key: string) =>
    setSortConfig({ key, direction: sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc" });

  const handleSelectAll = (checked: boolean) =>
    setSelectedRows(checked ? currentData.map((row) => row.id) : []);

  const toggleRowExpand = (id: string) =>
    setExpandedRows(expandedRows.includes(id) ? expandedRows.filter((r) => r !== id) : [...expandedRows, id]);

  const handleRowSelect = (id: string, checked: boolean) =>
    setSelectedRows(checked ? [...selectedRows, id] : selectedRows.filter((r) => r !== id));

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setMonthFilter("all");
    setDepartmentFilter("all");
  };

  return {
    selectedRows,
    expandedRows,
    searchTerm,
    statusFilter,
    monthFilter,
    departmentFilter,
    currentPage,
    itemsPerPage,
    sortConfig,
    filteredData,
    sortedData,
    totalPages,
    currentData,
    handleSort,
    handleSelectAll,
    toggleRowExpand,
    handleRowSelect,
    setSearchTerm,
    setStatusFilter,
    setMonthFilter,
    setDepartmentFilter,
    setCurrentPage,
    setItemsPerPage,
    clearFilters,
  };
};
