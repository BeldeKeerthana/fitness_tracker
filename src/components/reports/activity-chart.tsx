'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

interface ActivityChartProps {
  data: any[];
  config: ChartConfig;
  dataKey: string;
}

export function ActivityChart({ data, config, dataKey }: ActivityChartProps) {
  return (
    <ChartContainer config={config} className="min-h-[200px] w-full">
        <ResponsiveContainer width="100%" height={350}>
            <BarChart data={data}>
                <CartesianGrid vertical={false} />
                <XAxis
                dataKey="date"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                />
                <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
                />
                <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dot" />}
                />
                <Bar dataKey={dataKey} fill="var(--color-primary)" radius={4} />
            </BarChart>
        </ResponsiveContainer>
    </ChartContainer>
  );
}
