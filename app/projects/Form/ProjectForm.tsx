"use client";
import { useState, ChangeEvent } from "react";
import styles from "./CreateProjectModal.module.css";

interface FormData {
  projectName: string;
  leadAnalyst: string;
  department: string;
  startDate: string;
  endDate: string;
  description: string;
  status: "Planning" | "In Progress" | "Under Review" | "Completed";
  progress: number;
  methodology: string;
  functionalUnit: string;
  systemBoundary: "Cradle to Gate" | "Cradle to Grave" | "Gate to Gate";
  impactCategories: string;
  geographicalScope: "Global" | "Europe" | "UAE" | "Asia";
  calculationType: "Attributional" | "Consequential";
  budget: string;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateProjectModal({ isOpen, onClose }: ModalProps) {
  const [formData, setFormData] = useState<FormData>({
    projectName: "",
    leadAnalyst: "",
    department: "",
    startDate: "",
    endDate: "",
    description: "",
    status: "Planning",
    progress: 0,
    methodology: "",
    functionalUnit: "",
    systemBoundary: "Cradle to Gate",
    impactCategories: "",
    geographicalScope: "Global",
    calculationType: "Attributional",
    budget: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        {/* Header */}
        <div className={styles.header}>
          <h2>Create New Project</h2>
          <button className={styles.closeBtn} onClick={onClose}>
            ×
          </button>
        </div>

        {/* Form Content */}
        <div className={styles.content}>
          <div className={styles.grid}>
            {/* Project Name */}
            <div className={styles.full}>
              <label className={styles.label}>Project Name *</label>
              <input
                type="text"
                name="projectName"
                value={formData.projectName}
                onChange={handleChange}
                placeholder="Enter project name"
                className={styles.input}
              />
            </div>

            {/* Lead Analyst */}
            <div className={styles.full}>
              <label className={styles.label}>Lead Analyst *</label>
              <input
                type="text"
                name="leadAnalyst"
                value={formData.leadAnalyst}
                onChange={handleChange}
                placeholder="Enter lead analyst"
                className={styles.input}
              />
            </div>

            {/* Department */}
            <div className={styles.full}>
              <label className={styles.label}>Department *</label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                placeholder="Enter department"
                className={styles.input}
              />
            </div>

            {/* Start Date */}
            <div>
              <label className={styles.label}>Start Date *</label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className={styles.input}
              />
            </div>

            {/* End Date */}
            <div>
              <label className={styles.label}>End Date</label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className={styles.input}
              />
            </div>

            {/* Budget */}
            <div className={styles.full}>
              <label className={styles.label}>Budget</label>
              <input
                type="text"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                placeholder="$ 0.00"
                className={styles.input}
              />
            </div>

            {/* Methodology */}
            <div className={styles.full}>
              <label className={styles.label}>Methodology *</label>
              <select 
                name="methodology"
                value={formData.methodology}
                onChange={handleChange}
                className={styles.select}
              >
                <option value="">Select methodology</option>
                <option value="ISO 14040:2006">ISO 14040:2006</option>
                <option value="ISO 14044:2006">ISO 14044:2006</option>
                <option value="PEF">PEF</option>
              </select>
            </div>

            {/* Functional Unit */}
            <div className={styles.full}>
              <label className={styles.label}>Functional Unit *</label>
              <input
                type="text"
                name="functionalUnit"
                value={formData.functionalUnit}
                onChange={handleChange}
                placeholder="e.g. 1 ton of product"
                className={styles.input}
              />
            </div>

            {/* System Boundary */}
            <div className={styles.full}>
              <label className={styles.label}>System Boundary *</label>
              <select
                name="systemBoundary"
                value={formData.systemBoundary}
                onChange={handleChange}
                className={styles.select}
              >
                <option value="Cradle to Gate">Cradle to Gate</option>
                <option value="Cradle to Grave">Cradle to Grave</option>
                <option value="Gate to Gate">Gate to Gate</option>
              </select>
            </div>

            {/* Impact Categories */}
            <div className={styles.full}>
              <label className={styles.label}>Impact Categories</label>
              <input
                type="text"
                name="impactCategories"
                value={formData.impactCategories}
                onChange={handleChange}
                placeholder="e.g. GWP, AP, EP"
                className={styles.input}
              />
            </div>

            {/* Geographical Scope */}
            <div className={styles.full}>
              <label className={styles.label}>Geographical Scope *</label>
              <select
                name="geographicalScope"
                value={formData.geographicalScope}
                onChange={handleChange}
                className={styles.select}
              >
                <option value="Global">Global</option>
                <option value="Europe">Europe</option>
                <option value="UAE">UAE</option>
                <option value="Asia">Asia</option>
              </select>
            </div>

            {/* Calculation Type */}
            <div className={styles.full}>
              <label className={styles.label}>Calculation Type *</label>
              <select
                name="calculationType"
                value={formData.calculationType}
                onChange={handleChange}
                className={styles.select}
              >
                <option value="Attributional">Attributional</option>
                <option value="Consequential">Consequential</option>
              </select>
            </div>

            {/* Description */}
            <div className={styles.full}>
              <label className={styles.label}>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Project description..."
                rows={4}
                className={styles.textarea}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          <button className={styles.cancelBtn} onClick={onClose}>
            Cancel
          </button>
          <button className={styles.submitBtn} onClick={handleSubmit}>
            Create Project
          </button>
        </div>
      </div>
    </div>
  );
}
