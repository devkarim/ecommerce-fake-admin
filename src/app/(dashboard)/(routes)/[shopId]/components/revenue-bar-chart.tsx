'use client';

import { useState, useEffect } from 'react';
import {
  BarChart,
  XAxis,
  YAxis,
  Bar,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

import Skeleton from '@/components/ui/skeleton';
import { currencyFormatter } from '@/lib/utils';
import { RevenueChartData } from '@/types/ui';

interface RevenueBarChartProps {
  data: RevenueChartData[];
}

const RevenueBarChart: React.FC<RevenueBarChartProps> = ({ data }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return <Skeleton className="w-full h-96" />;

  return (
    <div className="lg:px-0 space-y-4">
      <h1 className="text-3xl font-bold">{new Date().getFullYear()}</h1>
      <div className="divider" />
      <div className="lg:py-12">
        {data.length == 0 ? (
          <p className="text-center opacity-60">No data found.</p>
        ) : (
          <ResponsiveContainer height={450}>
            <BarChart data={data}>
              <XAxis
                dataKey="name"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => currencyFormatter.format(value)}
              />
              <Tooltip
                formatter={(value) => currencyFormatter.format(+value || 0)}
              />
              <Bar dataKey="revenue" fill="#BE4B92" radius={8} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default RevenueBarChart;
