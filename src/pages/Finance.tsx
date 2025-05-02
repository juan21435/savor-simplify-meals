
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ArrowLeft, Wallet, CreditCard, TrendingUp, DollarSign, Calendar, ChartBar } from "lucide-react";
import { Link } from "react-router-dom";
import FinanceDashboard from "@/components/finance/FinanceDashboard";
import ExpensesTracker from "@/components/finance/ExpensesTracker";
import BudgetPlanner from "@/components/finance/BudgetPlanner";

const Finance = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  
  return (
    <div className="container-custom py-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link to="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-4xl font-display font-bold text-foreground">Finance</h1>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-8 bg-secondary">
          <TabsTrigger value="dashboard" className="flex gap-2 items-center">
            <ChartBar className="h-4 w-4" />
            <span>Dashboard</span>
          </TabsTrigger>
          <TabsTrigger value="expenses" className="flex gap-2 items-center">
            <CreditCard className="h-4 w-4" />
            <span>Expenses</span>
          </TabsTrigger>
          <TabsTrigger value="budget" className="flex gap-2 items-center">
            <Wallet className="h-4 w-4" />
            <span>Budget</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard">
          <FinanceDashboard />
        </TabsContent>
        
        <TabsContent value="expenses">
          <ExpensesTracker />
        </TabsContent>
        
        <TabsContent value="budget">
          <BudgetPlanner />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Finance;
