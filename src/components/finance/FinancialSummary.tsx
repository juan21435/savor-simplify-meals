
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, TrendingUp, TrendingDown } from "lucide-react";

const FinancialSummary = () => {
  // Sample data
  const financialData = {
    income: 5820,
    expenses: 3250,
    savings: 2570,
    incomeChange: 3.2,
    expensesChange: -1.7,
    savingsChange: 12.5,
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
    <Card className="glass-morphism">
      <CardHeader>
        <CardTitle className="text-xl">Monthly Summary</CardTitle>
        <CardDescription>Overview of your financial activities</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-4">
        <div className="flex items-center justify-between p-4 rounded-md bg-secondary/40">
          <div className="flex items-center gap-4">
            <div className="bg-primary/20 p-2 rounded-full">
              <DollarSign className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Income</p>
              <p className="text-xl font-bold">{formatCurrency(financialData.income)}</p>
            </div>
          </div>
          <div className={`flex items-center ${financialData.incomeChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {financialData.incomeChange >= 0 ? (
              <TrendingUp className="h-4 w-4 mr-1" />
            ) : (
              <TrendingDown className="h-4 w-4 mr-1" />
            )}
            <span>{Math.abs(financialData.incomeChange)}%</span>
          </div>
        </div>

        <div className="flex items-center justify-between p-4 rounded-md bg-secondary/40">
          <div className="flex items-center gap-4">
            <div className="bg-accent/20 p-2 rounded-full">
              <DollarSign className="h-5 w-5 text-accent" />
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Expenses</p>
              <p className="text-xl font-bold">{formatCurrency(financialData.expenses)}</p>
            </div>
          </div>
          <div className={`flex items-center ${financialData.expensesChange <= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {financialData.expensesChange >= 0 ? (
              <TrendingUp className="h-4 w-4 mr-1" />
            ) : (
              <TrendingDown className="h-4 w-4 mr-1" />
            )}
            <span>{Math.abs(financialData.expensesChange)}%</span>
          </div>
        </div>

        <div className="flex items-center justify-between p-4 rounded-md bg-secondary/40">
          <div className="flex items-center gap-4">
            <div className="bg-primary/20 p-2 rounded-full">
              <DollarSign className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Savings</p>
              <p className="text-xl font-bold">{formatCurrency(financialData.savings)}</p>
            </div>
          </div>
          <div className={`flex items-center ${financialData.savingsChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {financialData.savingsChange >= 0 ? (
              <TrendingUp className="h-4 w-4 mr-1" />
            ) : (
              <TrendingDown className="h-4 w-4 mr-1" />
            )}
            <span>{Math.abs(financialData.savingsChange)}%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FinancialSummary;
