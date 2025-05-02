
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

const FinanceSummary = () => {
  // Sample data for demonstration
  const monthlyData = [
    { name: 'Jan', income: 4800, expenses: 3200, savings: 1600 },
    { name: 'Feb', income: 5100, expenses: 3500, savings: 1600 },
    { name: 'Mar', income: 5300, expenses: 3300, savings: 2000 },
    { name: 'Apr', income: 5500, expenses: 3800, savings: 1700 },
    { name: 'May', income: 5200, expenses: 3100, savings: 2100 },
    { name: 'Jun', income: 5800, expenses: 3400, savings: 2400 },
    { name: 'Jul', income: 5820, expenses: 3250, savings: 2570 },
  ];

  const categoryExpenses = [
    { category: 'Housing', amount: 1200, percentage: 36.9 },
    { category: 'Food', amount: 650, percentage: 20.0 },
    { category: 'Transportation', amount: 450, percentage: 13.8 },
    { category: 'Entertainment', amount: 350, percentage: 10.8 },
    { category: 'Utilities', amount: 320, percentage: 9.8 },
    { category: 'Others', amount: 280, percentage: 8.7 },
  ];

  const chartConfig = {
    income: { color: '#FFE29F' },
    expenses: { color: '#FF719A' },
    savings: { color: '#9b87f5' }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="space-y-6">
      <Card className="glass-morphism">
        <CardHeader>
          <CardTitle className="text-xl">Financial Trends</CardTitle>
        </CardHeader>
        <CardContent className="h-[350px]">
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fill: "#fff", fontSize: 12 }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fill: "#fff", fontSize: 12 }} />
                <ChartTooltip content={<ChartTooltipContent />} cursor={{ fill: "rgba(255,255,255,0.05)" }} />
                <Line type="monotone" dataKey="income" name="Income" stroke="var(--color-income)" strokeWidth={2} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="expenses" name="Expenses" stroke="var(--color-expenses)" strokeWidth={2} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="savings" name="Savings" stroke="var(--color-savings)" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="glass-morphism">
          <CardHeader>
            <CardTitle className="text-xl">Income vs. Expenses</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData.slice(-4)} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
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
        
        <Card className="glass-morphism">
          <CardHeader>
            <CardTitle className="text-xl">Expense Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Category</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>%</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categoryExpenses.map((item) => (
                  <TableRow key={item.category}>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>{formatCurrency(item.amount)}</TableCell>
                    <TableCell>{item.percentage}%</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FinanceSummary;
