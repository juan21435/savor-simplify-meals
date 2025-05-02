
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowLeft, ChartBar, Calendar, Activity, Wallet, Dumbbell, ShoppingCart } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import FinanceSummary from '@/components/analytics/FinanceSummary';
import HealthMetrics from '@/components/analytics/HealthMetrics';
import ActivityTrends from '@/components/analytics/ActivityTrends';
import ShoppingAnalytics from '@/components/analytics/ShoppingAnalytics';

const Analytics = () => {
  const [activeTab, setActiveTab] = useState("finance");
  
  return (
    <div className="container-custom py-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link to="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-4xl font-display font-bold text-foreground">Analytics Dashboard</h1>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 mb-8 bg-secondary">
          <TabsTrigger value="finance" className="flex gap-2 items-center">
            <Wallet className="h-4 w-4" />
            <span>Finance</span>
          </TabsTrigger>
          <TabsTrigger value="health" className="flex gap-2 items-center">
            <Activity className="h-4 w-4" />
            <span>Health</span>
          </TabsTrigger>
          <TabsTrigger value="activity" className="flex gap-2 items-center">
            <Dumbbell className="h-4 w-4" />
            <span>Activity</span>
          </TabsTrigger>
          <TabsTrigger value="shopping" className="flex gap-2 items-center">
            <ShoppingCart className="h-4 w-4" />
            <span>Shopping</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="finance">
          <FinanceSummary />
        </TabsContent>
        
        <TabsContent value="health">
          <HealthMetrics />
        </TabsContent>
        
        <TabsContent value="activity">
          <ActivityTrends />
        </TabsContent>
        
        <TabsContent value="shopping">
          <ShoppingAnalytics />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analytics;
