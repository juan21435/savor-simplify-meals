
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell } from "recharts";

const MonthlyExpensesChart = () => {
  // Sample data for monthly expenses
  const monthlyData = [
    { name: "Jan", income: 4800, expenses: 3200 },
    { name: "Feb", income: 5100, expenses: 3500 },
    { name: "Mar", income: 5300, expenses: 3300 },
    { name: "Apr", income: 5500, expenses: 3800 },
    { name: "May", income: 5200, expenses: 3100 },
    { name: "Jun", income: 5800, expenses: 3400 },
    { name: "Jul", income: 5820, expenses: 3250 },
  ];

  const chartConfig = {
    income: { color: "#FFE29F" },
    expenses: { color: "#FF719A" }
  };

  return (
    <Card className="glass-morphism">
      <CardHeader>
        <CardTitle className="text-xl">Income vs. Expenses</CardTitle>
        <CardDescription>Monthly comparison for 2025</CardDescription>
      </CardHeader>
      <CardContent className="h-[280px]">
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fill: "#fff", fontSize: 12 }} />
              <YAxis tickLine={false} axisLine={false} tick={{ fill: "#fff", fontSize: 12 }} />
              <ChartTooltip content={<ChartTooltipContent />} cursor={{ fill: "rgba(255,255,255,0.05)" }} />
              <Bar dataKey="income" name="Income" fill="var(--color-income)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="expenses" name="Expenses" fill="var(--color-expenses)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default MonthlyExpensesChart;
