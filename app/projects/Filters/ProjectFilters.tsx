// app/projects/Filters/ProjectFilters.tsx
"use client";

import { useState } from "react";
import useProjects, { Project } from "../hooks/useProjects";


export default function ProjectFilters() {
  const { projects, filterByStatus } = useProjects();
  const [selectedStatus, setSelectedStatus] = useState<Project["status"] | "All">("All");

  // Filter projects based on selected status
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatus(e.target.value as Project["status"] | "All");
  };

  // Compute filtered projects (for demonstration, normally handled in page.tsx)
  const filteredProjects =
    selectedStatus === "All" ? projects : filterByStatus(selectedStatus);

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
      <label style={{ fontWeight: 500 }}>Status:</label>
      <select
        value={selectedStatus}
        onChange={handleChange}
        style={{
          padding: "0.4rem 0.6rem",
          borderRadius: "6px",
          border: "1px solid #cbd5e1",
          fontSize: "14px",
        }}
      >
        <option value="All">All</option>
        <option value="Active">Active</option>
        <option value="Completed">Completed</option>
        <option value="Archived">Archived</option>
      </select>

      <p style={{ fontSize: "14px", color: "#475569", margin: 0 }}>
        Showing: {filteredProjects.length} / {projects.length}
      </p>
    </div>
  );
}
