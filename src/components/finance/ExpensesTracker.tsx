
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Calendar, CreditCard, DollarSign, Plus } from "lucide-react";

const ExpensesTracker = () => {
  // Sample data for recent transactions
  const recentTransactions = [
    {
      id: 1,
      description: "Grocery Shopping",
      amount: 85.75,
      date: "2025-05-01",
      category: "Food",
      type: "expense"
    },
    {
      id: 2,
      description: "Monthly Salary",
      amount: 4250.00,
      date: "2025-05-01",
      category: "Income",
      type: "income"
    },
    {
      id: 3,
      description: "Netflix Subscription",
      amount: 15.99,
      date: "2025-04-30",
      category: "Entertainment",
      type: "expense"
    },
    {
      id: 4,
      description: "Gas Station",
      amount: 45.25,
      date: "2025-04-28",
      category: "Transportation",
      type: "expense"
    },
    {
      id: 5,
      description: "Freelance Work",
      amount: 350.00,
      date: "2025-04-27",
      category: "Income",
      type: "income"
    },
    {
      id: 6,
      description: "Restaurant",
      amount: 72.50,
      date: "2025-04-25",
      category: "Food",
      type: "expense"
    },
    {
      id: 7,
      description: "Electric Bill",
      amount: 95.20,
      date: "2025-04-22",
      category: "Utilities",
      type: "expense"
    },
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-display font-semibold">Recent Transactions</h2>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          <span>Add Transaction</span>
        </Button>
      </div>
      
      <Card className="glass-morphism">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Description</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="font-medium">{transaction.description}</TableCell>
                  <TableCell>{transaction.category}</TableCell>
                  <TableCell>{formatDate(transaction.date)}</TableCell>
                  <TableCell className={`text-right ${transaction.type === 'income' ? 'text-green-500' : ''}`}>
                    {transaction.type === 'income' ? '+' : ''}{formatCurrency(transaction.amount)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExpensesTracker;
