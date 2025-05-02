
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell, PieChart, Pie, LineChart, Line } from "recharts";
import { DollarSign, TrendingUp, TrendingDown, CreditCard, Calendar } from "lucide-react";
import FinancialSummary from "./FinancialSummary";
import MonthlyExpensesChart from "./MonthlyExpensesChart";
import UpcomingExpenses from "./UpcomingExpenses";
import SpendingByCategory from "./SpendingByCategory";

const FinanceDashboard = () => {
  // Current date
  const currentDate = new Date();
  const monthName = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(currentDate);
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FinancialSummary />
        <MonthlyExpensesChart />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <SpendingByCategory />
        <UpcomingExpenses />
      </div>
    </div>
  );
};

export default FinanceDashboard;
