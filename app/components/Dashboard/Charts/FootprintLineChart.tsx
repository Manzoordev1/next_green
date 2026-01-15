"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  TooltipProps,
} from "recharts";

type Props = {
  data: { month: string; Revenue: number; Expenses: number; Profit: number }[];
};

const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        backgroundColor: 'white',
        padding: '16px',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
      }}>
        <p style={{ 
          fontWeight: 600, 
          color: '#1f2937', 
          marginBottom: '12px', 
          fontSize: '14px',
          borderBottom: '2px solid #f3f4f6',
          paddingBottom: '8px'
        }}>
          {label}
        </p>
        {payload.map((entry: any, index: number) => (
          <div key={index} style={{ 
            display: 'flex', 
            alignItems: 'center', 
            marginBottom: '6px',
            fontSize: '13px'
          }}>
            <div style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: entry.color,
              marginRight: '8px'
            }} />
            <span style={{ color: '#6b7280', marginRight: '8px' }}>{entry.name}:</span>
            <span style={{ fontWeight: 600, color: '#1f2937' }}>
              {entry.value.toLocaleString()} Amount
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const CustomDot = (props: any) => {
  const { cx, cy, stroke } = props;
  
  return (
    <circle
      cx={cx}
      cy={cy}
      r={5}
      fill="white"
      stroke={stroke}
      strokeWidth={3}
      style={{ 
        filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
        cursor: 'pointer'
      }}
    />
  );
};

export default function AccountLineChart({ data }: Props) {
  return (
    <div style={{
      width: '100%',
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      padding: '24px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
    }}>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart 
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
              <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.1}/>
              <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
            </linearGradient>
          </defs>
          
          <CartesianGrid 
            strokeDasharray="0" 
            stroke="#e2e8f0" 
            vertical={false}
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
            width={60}
          />
          
          <Tooltip content={<CustomTooltip />} />
          
          <Legend 
            verticalAlign="bottom"
            height={50}
            iconType="circle"
            iconSize={10}
            wrapperStyle={{ paddingTop: '20px' }}
            formatter={(value) => (
              <span style={{ 
                fontSize: '14px', 
                color: '#475569', 
                fontWeight: 500,
                marginLeft: '6px'
              }}>
                {value} (Amount)
              </span>
            )}
          />
          
          <Line 
            type="monotone" 
            dataKey="Revenue" 
            stroke="#10b981" 
            strokeWidth={3}
            dot={<CustomDot />}
            activeDot={{ r: 7, strokeWidth: 3 }}
            name="Revenue"
          />
          
          <Line 
            type="monotone" 
            dataKey="Expenses" 
            stroke="#3b82f6" 
            strokeWidth={3}
            dot={<CustomDot />}
            activeDot={{ r: 7, strokeWidth: 3 }}
            name="Expenses"
          />
          
          <Line 
            type="monotone" 
            dataKey="Profit" 
            stroke="#f59e0b" 
            strokeWidth={3}
            dot={<CustomDot />}
            activeDot={{ r: 7, strokeWidth: 3 }}
            name="Profit"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
