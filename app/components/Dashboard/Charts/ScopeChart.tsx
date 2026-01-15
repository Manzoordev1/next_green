"use client";
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList } from 'recharts';

interface ScopeChartProps {
  data?: Array<{
    month: string;
    scope1: number;
    scope2: number;
  }>;
}

// Default data (still using scope1/scope2 internally for chart logic)
const defaultData = [
  { month: "Jan '23", scope1: 19529, scope2: 5000 },
  { month: "Feb '23", scope1: 14529, scope2: 7000 },
  { month: "Mar '23", scope1: 7529, scope2: 4500 },
  { month: "Apr '23", scope1: 15529, scope2: 6000 },
  { month: "May '23", scope1: 20529, scope2: 8000 },
  { month: "Jun '23", scope1: 8529, scope2: 4200 },
  { month: "Jul '23", scope1: 11000, scope2: 5000 },
  { month: "Aug '23", scope1: 16529, scope2: 7500 },
  { month: "Sep '23", scope1: 14000, scope2: 4000 },
  { month: "Oct '23", scope1: 12000, scope2: 3500 },
  { month: "Nov '23", scope1: 11000, scope2: 4800 },
  { month: "Dec '23", scope1: 20529, scope2: 9000 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const total = payload.reduce((sum: number, entry: any) => sum + entry.value, 0);
    return (
      <div style={{
        backgroundColor: 'white',
        padding: '12px 16px',
        border: '1px solid #e5e7eb',
        borderRadius: '6px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
      }}>
        <p style={{ fontWeight: 600, color: '#1f2937', marginBottom: '8px', fontSize: '13px' }}>{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} style={{ color: entry.color, fontSize: '13px', margin: '4px 0' }}>
            {entry.name}: {entry.value.toLocaleString()} Amount
          </p>
        ))}
        <p style={{
          fontWeight: 600,
          color: '#1f2937',
          fontSize: '13px',
          marginTop: '8px',
          paddingTop: '8px',
          borderTop: '1px solid #e5e7eb'
        }}>
          Total: {total.toLocaleString()} Amount
        </p>
      </div>
    );
  }
  return null;
};

const renderCustomLabel = (props: any, data: any[]) => {
  const { x, y, width, index } = props;
  if (index === undefined || !data[index]) return null;
  
  const total = data[index].scope1 + data[index].scope2;
  
  return (
    <text
      x={x + width / 2}
      y={y - 8}
      fill="#009647"
      textAnchor="middle"
      fontSize={12}
      fontWeight={500}
    >
      {total.toLocaleString()}
    </text>
  );
};

const ScopeChart: React.FC<ScopeChartProps> = ({ data = defaultData }) => {
  return (
    <div style={{ 
      width: '100%', 
      backgroundColor: '#f8fafc', 
      borderRadius: '12px', 
      padding: '24px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
    }}>
      <h2 style={{ 
        fontSize: '20px', 
        fontWeight: 700, 
        color: '#0f172a', 
        marginBottom: '24px',
        fontFamily: 'system-ui, -apple-system, sans-serif'
      }}>
        Account Overview
      </h2>
      <ResponsiveContainer width="100%" height={420}>
        <BarChart
          data={data}
          margin={{ top: 30, right: 20, left: 10, bottom: 20 }}
          barGap={8}
          barSize={40}
          barCategoryGap="20%"
        >
          <CartesianGrid 
            strokeDasharray="0" 
            stroke="#e2e8f0" 
            vertical={false}
            horizontalPoints={[0, 5000, 10000, 15000, 20000, 25000, 30000]}
          />
          <XAxis 
            dataKey="month" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#64748b', fontSize: 13, fontWeight: 500 }}
            dy={10}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#64748b', fontSize: 13 }}
            tickFormatter={(value) => `${value / 1000}k`}
            domain={[0, 30000]}
            ticks={[0, 5000, 10000, 15000, 20000, 25000, 30000]}
            label={{ 
              value: 'Amount', 
              angle: -90, 
              position: 'insideLeft', 
              style: { fill: '#64748b', fontSize: 13, fontWeight: 500 } 
            }}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0, 0, 0, 0.03)' }} />
          <Legend 
            verticalAlign="bottom" 
            height={50}
            iconType="circle"
            iconSize={10}
            wrapperStyle={{ paddingTop: '20px' }}
            formatter={(value) => (
              <span style={{ fontSize: '14px', color: '#475569', fontWeight: 500, marginLeft: '6px' }}>
                {value === "scope1" ? "Revenue" : "Expenses"}
              </span>
            )}
          />
          <Bar 
            dataKey="scope2" 
            stackId="a" 
            fill="#095375ff" 
            name="Expenses"
            radius={[0, 0, 0, 0]}
          />
          <Bar 
            dataKey="scope1" 
            stackId="a" 
            fill="#4ade80" 
            name="Revenue"
            radius={[6, 6, 0, 0]}
          >
            <LabelList 
              content={(props) => renderCustomLabel(props, data)}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ScopeChart;
