
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowLeft, ChartBar, Calendar, Activity, Wallet, Dumbbell, ShoppingCart } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import FinanceSummary from '@/components/analytics/FinanceSummary';
import HealthMetrics from '@/components/analytics/HealthMetrics';
import ActivityTrends from '@/components/analytics/ActivityTrends';
import ShoppingAnalytics from '@/components/analytics/ShoppingAnalytics';
import { useIsMobile } from '@/hooks/use-mobile';

const Analytics = () => {
  const [activeTab, setActiveTab] = useState("finance");
  const isMobile = useIsMobile();
  
  return (
    <div className="container-custom py-6 md:py-8 animate-fade-in">
      <div className="flex items-center justify-between mb-6 md:mb-8">
        <div className="flex items-center gap-2 md:gap-4">
          <Link to="/">
            <Button variant="ghost" size="icon" className="h-8 w-8 md:h-10 md:w-10">
              <ArrowLeft className="h-4 w-4 md:h-5 md:w-5" />
            </Button>
          </Link>
          <h1 className={`${isMobile ? "text-2xl" : "text-4xl"} font-display font-bold text-foreground`}>Analytics Dashboard</h1>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className={`grid ${isMobile ? "grid-cols-2 gap-y-2" : "grid-cols-4"} mb-6 md:mb-8 bg-secondary`}>
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
        
        <TabsContent value="finance" className="mt-0 animate-fade-in">
          <FinanceSummary />
        </TabsContent>
        
        <TabsContent value="health" className="mt-0 animate-fade-in">
          <HealthMetrics />
        </TabsContent>
        
        <TabsContent value="activity" className="mt-0 animate-fade-in">
          <ActivityTrends />
        </TabsContent>
        
        <TabsContent value="shopping" className="mt-0 animate-fade-in">
          <ShoppingAnalytics />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analytics;
