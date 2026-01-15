"use client";

import DashboardCard from "./components/Dashboard/DashboardCard";
import ScopeChart from "./components/Dashboard/Charts/ScopeChart";
import FootprintLineChart from "./components/Dashboard/Charts/FootprintLineChart";
import FootprintBarChart from "./components/Dashboard/Charts/FootprintBarChart";
import { FaDollarSign, FaMoneyBillWave, FaChartLine } from "react-icons/fa";

export default function DashboardPage() {
  const co2Data = [
    { month: "Jan", CO2: 120, Energy: 80, Water: 300 },
    { month: "Feb", CO2: 130, Energy: 85, Water: 320 },
    { month: "Mar", CO2: 110, Energy: 75, Water: 310 },
    { month: "Apr", CO2: 140, Energy: 90, Water: 330 },
    { month: "May", CO2: 125, Energy: 82, Water: 315 },
  ];

  const footprintData = [
    { name: "CO₂", value: 690 },
    { name: "Energy", value: 1240 },
    { name: "Water", value: 820 },
  ];

  const scopeData = [
    { month: "Jan '23", scope1: 19571, scope2: 5000 },
    { month: "Feb '23", scope1: 14529, scope2: 5000 },
    { month: "Mar '23", scope1: 7529, scope2: 5000 },
    { month: "Apr '23", scope1: 15000, scope2: 5000 },
    { month: "May '23", scope1: 20000, scope2: 5000 },
    { month: "Jun '23", scope1: 8529, scope2: 5000 },
    { month: "Jul '23", scope1: 11000, scope2: 5000 },
    { month: "Aug '23", scope1: 16529, scope2: 5000 },
    { month: "Sep '23", scope1: 5000, scope2: 5000 },
    { month: "Oct '23", scope1: 5000, scope2: 5000 },
    { month: "Nov '23", scope1: 11000, scope2: 5000 },
    { month: "Dec '23", scope1: 20000, scope2: 5000 },
  ];

  return (
    <div style={{ padding: "2rem", fontFamily: "Inter, sans-serif" }}>
      {/* Dashboard Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.5rem" }}>
        <DashboardCard 
          title="Total Revenue" 
          value={125000} 
          unit="AED" 
          icon={<FaDollarSign />} 
          trend={{ value: 12, isPositive: true }} 
          color="green"
        />
        <DashboardCard 
          title="Total Expenses" 
          value={85000} 
          unit="AED" 
          icon={<FaMoneyBillWave />} 
          trend={{ value: -5, isPositive: false }} 
          color="amber"
        />
        <DashboardCard 
          title="Net Profit" 
          value={40000} 
          unit="AED" 
          icon={<FaChartLine />} 
          trend={{ value: 8, isPositive: true }} 
          color="blue"
        />
      </div>

      {/* Scope Chart */}
      <div style={{ marginTop: "2rem", background: "#fff", padding: "16px", borderRadius: "14px", boxShadow: "0 8px 24px rgba(0,0,0,0.08)" }}>
        <ScopeChart data={scopeData} />
      </div>

      {/* Line Chart */}
      <div style={{ marginTop: "2rem", background: "#fff", padding: "16px", borderRadius: "14px", boxShadow: "0 8px 24px rgba(0,0,0,0.08)" }}>
        <h3 style={{ fontWeight: 600, fontSize: "16px", marginBottom: "12px" }}>Financial Trends</h3>
        <FootprintLineChart data={co2Data} />
      </div>

      {/* Bar Chart */}
      <div style={{ marginTop: "2rem", background: "#fff", padding: "16px", borderRadius: "14px", boxShadow: "0 8px 24px rgba(0,0,0,0.08)" }}>
        <h3 style={{ fontWeight: 600, fontSize: "16px", marginBottom: "12px" }}>Financial Distribution</h3>
        <FootprintBarChart data={footprintData} />
      </div>
    </div>
  );
}
