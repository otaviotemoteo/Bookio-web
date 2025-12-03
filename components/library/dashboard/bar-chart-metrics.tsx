"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface BarChartMetricsProps {
  books: any[];
  readers: any[];
  loans: any[];
  penalties: any[];
}

export function BarChartMetrics({
  books,
  readers,
  loans,
  penalties
}: BarChartMetricsProps) {
  const data = [
    {
      name: 'Livros',
      total: books.length,
      fill: '#3b82f6'
    },
    {
      name: 'Leitores',
      total: readers.length,
      fill: '#10b981'
    },
    {
      name: 'Empréstimos',
      total: loans.length,
      fill: '#eab308'
    },
    {
      name: 'Multas',
      total: penalties.length,
      fill: '#ef4444'
    }
  ];

  const CustomTooltip = (props: any) => {
    const { active, payload } = props;
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border border-gray-200 rounded shadow-lg">
          <p className="text-black font-semibold">Total: {payload[0].value}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">
        Visão Geral do Sistema
      </h2>
      
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ paddingTop: '20px' }} />
          <Bar dataKey="total" fill="#3b82f6" name="Total" />
        </BarChart>
      </ResponsiveContainer>

      <div className="mt-6 grid grid-cols-2 gap-4">
        {data.map((item, index) => (
          <div key={index} className="flex items-center space-x-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: item.fill }}
            />
            <span className="text-sm text-gray-600">
              {item.name}: <span className="font-semibold">{item.total}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}