
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { PieChart, Pie, ResponsiveContainer, Cell, Legend } from "recharts";
import { Progress } from "@/components/ui/progress";

const SpendingByCategory = () => {
  // Sample data for spending by category
  const categoryData = [
    { name: "Housing", value: 1200, color: "#FFE29F" },
    { name: "Food", value: 650, color: "#FFA99F" },
    { name: "Transportation", value: 450, color: "#FF719A" },
    { name: "Entertainment", value: 350, color: "#9b87f5" },
    { name: "Utilities", value: 320, color: "#7E69AB" },
    { name: "Others", value: 280, color: "#6E59A5" },
  ];

  const chartConfig = Object.fromEntries(
    categoryData.map(item => [item.name, { color: item.color }])
  );

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const totalSpending = categoryData.reduce((sum, item) => sum + item.value, 0);

  return (
    <Card className="glass-morphism col-span-1 lg:col-span-2">
      <CardHeader>
        <CardTitle className="text-xl">Spending By Category</CardTitle>
        <CardDescription>Breakdown of your monthly expenses</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-[240px] h-[240px]">
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={`var(--color-${entry.name})`} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
        
        <div className="flex-1 grid grid-cols-1 gap-4">
          {categoryData.map((category) => (
            <div key={category.name} className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground">{category.name}</span>
                <span className="text-sm font-semibold">{formatCurrency(category.value)}</span>
              </div>
              <Progress value={(category.value / totalSpending) * 100} className="h-2" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }} />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SpendingByCategory;
