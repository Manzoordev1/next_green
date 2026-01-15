"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  TooltipProps,
} from "recharts";

// Horizontal Bar Chart Component
type HorizontalBarChartProps = {
  data: { name: string; value: number; color?: string }[];
  title: string;
  unit?: string;
  height?: number;
};

const CustomTooltip = ({ active, payload, unit }: TooltipProps<number, string> & { unit?: string }) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    return (
      <div style={{
        backgroundColor: 'white',
        padding: '12px 16px',
        border: '1px solid #e5e7eb',
        borderRadius: '6px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
      }}>
        <p style={{ 
          fontWeight: 600, 
          color: '#1f2937', 
          marginBottom: '6px', 
          fontSize: '13px'
        }}>
          {data.payload.name}
        </p>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center',
          gap: '8px'
        }}>
          <div style={{
            width: '10px',
            height: '10px',
            borderRadius: '2px',
            backgroundColor: data.fill
          }} />
          <span style={{ 
            fontSize: '14px',
            fontWeight: 700,
            color: '#1f2937'
          }}>
            {data.value?.toLocaleString()} {unit || ''}
          </span>
        </div>
      </div>
    );
  }
  return null;
};

export function LCAHorizontalBarChart({ data, title, unit, height = 400 }: HorizontalBarChartProps) {
  const maxValue = Math.max(...data.map(d => d.value));
  const xAxisMax = Math.ceil(maxValue * 1.15 / 1000) * 1000;

  // Default colors if not provided
  const COLORS = [
    '#22d3ee', '#fbbf24', '#22c55e', '#a16207', '#eab308', 
    '#84cc16', '#10b981', '#c026d3', '#6b7280', '#34d399'
  ];

  return (
    <div style={{
      width: '100%',
      height: '100%'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '16px'
      }}>
        <h3 style={{
          fontSize: '16px',
          fontWeight: 600,
          color: '#1f2937',
          margin: 0
        }}>
          {title}
        </h3>
        <button style={{
          padding: '6px 8px',
          backgroundColor: 'transparent',
          border: '1px solid #e5e7eb',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '18px',
          color: '#6b7280'
        }}>
          ☰
        </button>
      </div>

      <ResponsiveContainer width="100%" height={height}>
        <BarChart 
          data={data} 
          layout="vertical"
          margin={{ top: 5, right: 30, left: 200, bottom: 5 }}
        >
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke="#e5e7eb" 
            horizontal={false}
          />
          
          <XAxis 
            type="number"
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#64748b', fontSize: 12 }}
            domain={[0, xAxisMax]}
            tickFormatter={(value) => {
              if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
              if (value >= 1000) return `${(value / 1000).toFixed(0)}k`;
              return value.toString();
            }}
          />
          
          <YAxis 
            type="category"
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#1f2937', fontSize: 12, fontWeight: 500 }}
            width={190}
          />
          
          <Tooltip 
            content={(props) => <CustomTooltip {...props} unit={unit} />}
            cursor={{ fill: 'rgba(0, 0, 0, 0.03)' }} 
          />
          
          <Bar 
            dataKey="value" 
            radius={[0, 4, 4, 0]}
            barSize={24}
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.color || COLORS[index % COLORS.length]}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// Vertical Column Chart Component
type VerticalColumnChartProps = {
  data: { name: string; value: number; color?: string }[];
  title: string;
  unit?: string;
  height?: number;
};

export function LCAVerticalColumnChart({ data, title, unit, height = 400 }: VerticalColumnChartProps) {
  const maxValue = Math.max(...data.map(d => d.value));
  const yAxisMax = Math.ceil(maxValue * 1.15 / 1000) * 1000;

  const COLORS = [
    '#22d3ee', '#fbbf24', '#22c55e', '#a16207', '#eab308', 
    '#84cc16', '#10b981', '#c026d3', '#6b7280', '#34d399'
  ];

  return (
    <div style={{
      width: '100%',
      height: '100%'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '16px'
      }}>
        <h3 style={{
          fontSize: '16px',
          fontWeight: 600,
          color: '#1f2937',
          margin: 0
        }}>
          {title}
        </h3>
        <button style={{
          padding: '6px 8px',
          backgroundColor: 'transparent',
          border: '1px solid #e5e7eb',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '18px',
          color: '#6b7280'
        }}>
          ☰
        </button>
      </div>

      <ResponsiveContainer width="100%" height={height}>
        <BarChart 
          data={data} 
          margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
        >
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke="#e5e7eb" 
            vertical={false}
          />
          
          <XAxis 
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#1f2937', fontSize: 11, fontWeight: 500 }}
            angle={-45}
            textAnchor="end"
            height={100}
          />
          
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#64748b', fontSize: 12 }}
            domain={[0, yAxisMax]}
            tickFormatter={(value) => {
              if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
              if (value >= 1000) return `${(value / 1000).toFixed(0)}k`;
              return value.toString();
            }}
          />
          
          <Tooltip 
            content={(props) => <CustomTooltip {...props} unit={unit} />}
            cursor={{ fill: 'rgba(0, 0, 0, 0.03)' }} 
          />
          
          <Bar 
            dataKey="value" 
            radius={[4, 4, 0, 0]}
            barSize={40}
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.color || COLORS[index % COLORS.length]}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}