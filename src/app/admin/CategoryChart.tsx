
'use client';

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface CategoryChartProps {
  data: { name: string; value: number }[];
}

export default function CategoryChart({ data }: CategoryChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Listings by Category</CardTitle>
        <CardDescription>A breakdown of listings across different categories.</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
            <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
            <Tooltip
              cursor={{ fill: 'hsl(var(--secondary))' }}
              contentStyle={{
                backgroundColor: 'hsl(var(--background))',
                border: '1px solid hsl(var(--border))',
                borderRadius: 'var(--radius)',
              }}
            />
            <Legend iconType="circle" />
            <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="Listings" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
