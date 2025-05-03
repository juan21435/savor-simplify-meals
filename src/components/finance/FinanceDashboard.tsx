
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
import { useIsMobile } from '@/hooks/use-mobile';

const FinanceDashboard = () => {
  // Current date
  const currentDate = new Date();
  const monthName = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(currentDate);
  const isMobile = useIsMobile();
  
  return (
    <div className="space-y-4 md:space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <FinancialSummary />
        <MonthlyExpensesChart />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        <SpendingByCategory />
        <div className={`${isMobile ? "" : "lg:col-span-2"}`}>
          <UpcomingExpenses />
        </div>
      </div>
    </div>
  );
};

export default FinanceDashboard;
