
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { ShoppingCart } from 'lucide-react';

const ShoppingAnalytics = () => {
  // Sample data for demonstration
  const weeklySpending = [
    { week: 'Week 1', amount: 125 },
    { week: 'Week 2', amount: 98 },
    { week: 'Week 3', amount: 142 },
    { week: 'Week 4', amount: 105 },
  ];

  const categoryBreakdown = [
    { name: 'Produce', value: 35 },
    { name: 'Meat', value: 25 },
    { name: 'Dairy', value: 15 },
    { name: 'Bakery', value: 10 },
    { name: 'Pantry', value: 15 },
  ];

  const topItems = [
    { name: 'Bananas', quantity: 12, totalSpent: 6.48 },
    { name: 'Eggs', quantity: 2, totalSpent: 5.98 },
    { name: 'Milk', quantity: 3, totalSpent: 8.97 },
    { name: 'Chicken Breast', quantity: 2, totalSpent: 15.96 },
    { name: 'Bread', quantity: 3, totalSpent: 10.47 },
  ];

  const COLORS = ['#9b87f5', '#7E69AB', '#6E59A5', '#FFE29F', '#FF719A'];

  const chartConfig = {
    spending: { color: '#9b87f5' },
    ...Object.fromEntries(categoryBreakdown.map((entry, index) => [
      entry.name, { color: COLORS[index % COLORS.length] }
    ])),
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass-morphism">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <ShoppingCart className="h-5 w-5 text-primary" />
              Monthly Total
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">{formatCurrency(470)}</div>
            <div className="text-sm text-muted-foreground">
              +$35 from last month
            </div>
          </CardContent>
        </Card>

        <Card className="glass-morphism">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <ShoppingCart className="h-5 w-5 text-primary" />
              Average Per Trip
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">{formatCurrency(58.75)}</div>
            <div className="text-sm text-muted-foreground">
              8 shopping trips
            </div>
          </CardContent>
        </Card>

        <Card className="glass-morphism">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <ShoppingCart className="h-5 w-5 text-primary" />
              Most Expensive Item
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">{formatCurrency(24.99)}</div>
            <div className="text-sm text-muted-foreground">
              Premium Olive Oil
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="glass-morphism">
          <CardHeader>
            <CardTitle className="text-xl">Weekly Spending</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklySpending} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="week" tickLine={false} axisLine={false} tick={{ fill: "#fff", fontSize: 12 }} />
                  <YAxis tickLine={false} axisLine={false} tick={{ fill: "#fff", fontSize: 12 }} />
                  <ChartTooltip content={<ChartTooltipContent />} cursor={{ fill: "rgba(255,255,255,0.05)" }} />
                  <Bar dataKey="amount" name="Spending" fill="var(--color-spending)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="glass-morphism">
          <CardHeader>
            <CardTitle className="text-xl">Category Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryBreakdown}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {categoryBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={`var(--color-${entry.name})`} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
      
      <Card className="glass-morphism">
        <CardHeader>
          <CardTitle className="text-xl">Most Purchased Items</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Total Spent</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topItems.map((item) => (
                <TableRow key={item.name}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{formatCurrency(item.totalSpent)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ShoppingAnalytics;
