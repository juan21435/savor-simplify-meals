
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";

const UpcomingExpenses = () => {
  // Sample data for upcoming expenses
  const upcomingExpenses = [
    {
      id: 1,
      name: "Rent",
      amount: 1200,
      dueDate: "2025-05-01",
      category: "Housing",
      isPaid: false,
    },
    {
      id: 2,
      name: "Car Insurance",
      amount: 95,
      dueDate: "2025-05-15",
      category: "Transportation",
      isPaid: false,
    },
    {
      id: 3,
      name: "Internet",
      amount: 75,
      dueDate: "2025-05-18",
      category: "Utilities",
      isPaid: false,
    },
    {
      id: 4,
      name: "Phone Bill",
      amount: 65,
      dueDate: "2025-05-22",
      category: "Utilities",
      isPaid: false,
    },
    {
      id: 5,
      name: "Gym Membership",
      amount: 50,
      dueDate: "2025-05-28",
      category: "Health",
      isPaid: false,
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  return (
    <Card className="glass-morphism">
      <CardHeader>
        <CardTitle className="text-xl">Upcoming Bills</CardTitle>
        <CardDescription>Bills due this month</CardDescription>
      </CardHeader>
      <CardContent className="px-2">
        <div className="space-y-1">
          {upcomingExpenses.map((expense) => (
            <div
              key={expense.id}
              className="flex items-center justify-between p-3 rounded-md hover:bg-secondary/20 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="bg-secondary/40 p-1.5 rounded-full">
                  <Calendar className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">{expense.name}</p>
                  <p className="text-xs text-muted-foreground">{formatDate(expense.dueDate)}</p>
                </div>
              </div>
              <p className="text-sm font-semibold">{formatCurrency(expense.amount)}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default UpcomingExpenses;
