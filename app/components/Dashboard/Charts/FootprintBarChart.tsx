"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
  LabelList,
  TooltipProps,
} from "recharts";

type Props = {
  data: { name: string; value: number }[];
};

const COLORS = [
  { main: "#10b981", light: "#34d399" }, // Revenue
  { main: "#3b82f6", light: "#60a5fa" }, // Expenses
  { main: "#f59e0b", light: "#fbbf24" }, // Profit
];

// Get unit for account chart
const getUnit = (name: string) => {
  // Money unit for accounting
  return "Amount";
};

const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    return (
      <div style={{
        backgroundColor: 'white',
        padding: '16px 20px',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
      }}>
        <p style={{ 
          fontWeight: 600, 
          color: '#1f2937', 
          marginBottom: '8px', 
          fontSize: '14px'
        }}>
          {data.payload.name}
        </p>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center',
          gap: '8px'
        }}>
          <div style={{
            width: '12px',
            height: '12px',
            borderRadius: '3px',
            backgroundColor: data.fill
          }} />
          <span style={{ 
            fontSize: '15px',
            fontWeight: 700,
            color: '#1f2937'
          }}>
            {data.value?.toLocaleString()} {getUnit(data.payload.name)}
          </span>
        </div>
      </div>
    );
  }
  return null;
};

const renderCustomLabel = (props: any) => {
  const { x, y, width, height, value, index } = props;
  
  return (
    <text
      x={x + width / 2}
      y={y - 10}
      fill="#1f2937"
      textAnchor="middle"
      fontSize={14}
      fontWeight={600}
    >
      {value.toLocaleString()}
    </text>
  );
};

export default function AccountBarChart({ data }: Props) {
  const maxValue = Math.max(...data.map(d => d.value));
  const yAxisMax = Math.ceil(maxValue * 1.2 / 100) * 100;

  return (
    <div style={{
      width: '100%',
      backgroundColor: '#ffffff',
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
        Account Summary
      </h2>

      <ResponsiveContainer width="100%" height={400}>
        <BarChart 
          data={data} 
          margin={{ top: 40, right: 30, left: 20, bottom: 20 }}
          barSize={80}
          barGap={20}
        >
          <defs>
            {COLORS.map((color, index) => (
              <linearGradient 
                key={index} 
                id={`gradient${index}`} 
                x1="0" 
                y1="0" 
                x2="0" 
                y2="1"
              >
                <stop offset="0%" stopColor={color.light} stopOpacity={0.9}/>
                <stop offset="100%" stopColor={color.main} stopOpacity={1}/>
              </linearGradient>
            ))}
          </defs>
          
          <CartesianGrid 
            strokeDasharray="0" 
            stroke="#e2e8f0" 
            vertical={false}
          />
          
          <XAxis 
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#64748b', fontSize: 14, fontWeight: 500 }}
            dy={10}
          />
          
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#64748b', fontSize: 13 }}
            width={70}
            domain={[0, yAxisMax]}
          />
          
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0, 0, 0, 0.03)' }} />
          
          <Legend 
            verticalAlign="bottom"
            height={50}
            iconType="square"
            iconSize={14}
            wrapperStyle={{ paddingTop: '20px' }}
            formatter={(value, entry: any, index) => {
              const item = data[index];
              return (
                <span style={{ 
                  fontSize: '14px', 
                  color: '#475569', 
                  fontWeight: 500,
                  marginLeft: '6px'
                }}>
                  {item?.name} ({getUnit(item?.name)})
                </span>
              );
            }}
          />
          
          <Bar 
            dataKey="value" 
            radius={[8, 8, 0, 0]}
            animationDuration={800}
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={`url(#gradient${index % COLORS.length})`}
                style={{ 
                  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
                  cursor: 'pointer'
                }}
              />
            ))}
            <LabelList content={renderCustomLabel} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      
      {/* Summary Stats */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '16px',
        marginTop: '24px',
        paddingTop: '24px',
        borderTop: '2px solid #f1f5f9'
      }}>
        {data.map((item, index) => (
          <div key={index} style={{
            padding: '12px',
            backgroundColor: '#f8fafc',
            borderRadius: '8px',
            borderLeft: `4px solid ${COLORS[index % COLORS.length].main}`
          }}>
            <div style={{ 
              fontSize: '12px', 
              color: '#64748b',
              marginBottom: '4px',
              fontWeight: 500
            }}>
              {item.name}
            </div>
            <div style={{ 
              fontSize: '18px', 
              fontWeight: 700,
              color: '#1f2937'
            }}>
              {item.value.toLocaleString()}
              <span style={{ fontSize: '13px', fontWeight: 500, color: '#64748b', marginLeft: '4px' }}>
                {getUnit(item.name)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
