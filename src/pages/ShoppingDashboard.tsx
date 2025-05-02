
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ShoppingCart, Book, Package, Scale, Calendar } from 'lucide-react';
import RecipeBook from '@/components/shopping/RecipeBook';
import Inventory from '@/components/shopping/Inventory';
import ShoppingList from '@/pages/ShoppingList';
import MealPlanner from '@/components/shopping/MealPlanner';

const ShoppingDashboard = () => {
  const [activeTab, setActiveTab] = useState("recipes");
  
  return (
    <div className="container-custom py-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link to="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-4xl font-display font-bold text-foreground">Kitchen Management</h1>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 mb-8 bg-secondary">
          <TabsTrigger value="recipes" className="flex gap-2 items-center">
            <Book className="h-4 w-4" />
            <span>Recipe Book</span>
          </TabsTrigger>
          <TabsTrigger value="meal-planner" className="flex gap-2 items-center">
            <Calendar className="h-4 w-4" />
            <span>Meal Planner</span>
          </TabsTrigger>
          <TabsTrigger value="inventory" className="flex gap-2 items-center">
            <Package className="h-4 w-4" />
            <span>Inventory</span>
          </TabsTrigger>
          <TabsTrigger value="shopping-list" className="flex gap-2 items-center">
            <ShoppingCart className="h-4 w-4" />
            <span>Shopping List</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="recipes">
          <RecipeBook />
        </TabsContent>
        
        <TabsContent value="meal-planner">
          <MealPlanner />
        </TabsContent>
        
        <TabsContent value="inventory">
          <Inventory />
        </TabsContent>
        
        <TabsContent value="shopping-list">
          <ShoppingList />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ShoppingDashboard;
