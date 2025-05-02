
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const BudgetPlanner = () => {
  // Sample data for budget categories
  const budgetCategories = [
    {
      id: 1,
      name: "Housing",
      budgeted: 1500,
      spent: 1200,
      remaining: 300,
    },
    {
      id: 2,
      name: "Food",
      budgeted: 800,
      spent: 650,
      remaining: 150,
    },
    {
      id: 3,
      name: "Transportation",
      budgeted: 500,
      spent: 450,
      remaining: 50,
    },
    {
      id: 4,
      name: "Entertainment",
      budgeted: 400,
      spent: 350,
      remaining: 50,
    },
    {
      id: 5,
      name: "Utilities",
      budgeted: 350,
      spent: 320,
      remaining: 30,
    },
    {
      id: 6,
      name: "Savings",
      budgeted: 1000,
      spent: 1000,
      remaining: 0,
    },
    {
      id: 7,
      name: "Others",
      budgeted: 350,
      spent: 280,
      remaining: 70,
    },
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const totalBudgeted = budgetCategories.reduce((sum, category) => sum + category.budgeted, 0);
  const totalSpent = budgetCategories.reduce((sum, category) => sum + category.spent, 0);
  const totalRemaining = budgetCategories.reduce((sum, category) => sum + category.remaining, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-display font-semibold">Monthly Budget</h2>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          <span>Add Budget</span>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="glass-morphism">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Budget</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{formatCurrency(totalBudgeted)}</p>
          </CardContent>
        </Card>
        
        <Card className="glass-morphism">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Spent</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{formatCurrency(totalSpent)}</p>
          </CardContent>
        </Card>
        
        <Card className="glass-morphism">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Remaining</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{formatCurrency(totalRemaining)}</p>
          </CardContent>
        </Card>
      </div>
      
      <Card className="glass-morphism">
        <CardHeader>
          <CardTitle>Budget Categories</CardTitle>
          <CardDescription>Track spending across different categories</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {budgetCategories.map((category) => (
              <div key={category.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{category.name}</span>
                  <div className="text-sm space-x-2">
                    <span className="text-muted-foreground">
                      {formatCurrency(category.spent)} / {formatCurrency(category.budgeted)}
                    </span>
                    <span className={`${category.remaining >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {formatCurrency(category.remaining)}
                    </span>
                  </div>
                </div>
                <Progress 
                  value={(category.spent / category.budgeted) * 100} 
                  className="h-2"
                  style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BudgetPlanner;
