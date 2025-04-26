
import React, { useState } from 'react';
import { format, addDays } from 'date-fns';
import { Calendar as CalendarIcon, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Card, CardContent } from '@/components/ui/card';
import { recipes, mealPlans, getMealPlanByDate, getRecipeById } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

const MealPlanner = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [weekStartDate, setWeekStartDate] = useState(new Date());
  
  // Format the selected date to match our data structure
  const formattedDate = date ? format(date, 'yyyy-MM-dd') : '';
  
  // Get the meal plan for the selected date
  const mealPlan = formattedDate ? getMealPlanByDate(formattedDate) : undefined;
  
  // Get the recipes for each meal
  const breakfast = mealPlan?.recipes.breakfast ? getRecipeById(mealPlan.recipes.breakfast) : undefined;
  const lunch = mealPlan?.recipes.lunch ? getRecipeById(mealPlan.recipes.lunch) : undefined;
  const dinner = mealPlan?.recipes.dinner ? getRecipeById(mealPlan.recipes.dinner) : undefined;
  
  // Generate an array of dates for the current week view
  const weekDates = Array.from({ length: 7 }, (_, i) => addDays(weekStartDate, i));

  const handlePreviousWeek = () => {
    setWeekStartDate(addDays(weekStartDate, -7));
  };

  const handleNextWeek = () => {
    setWeekStartDate(addDays(weekStartDate, 7));
  };

  // Check if a date has a meal plan
  const hasMealPlan = (date: Date) => {
    const formatted = format(date, 'yyyy-MM-dd');
    return mealPlans.some(plan => plan.date === formatted);
  };

  return (
    <div className="container-custom py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <h1 className="text-3xl md:text-4xl font-display font-bold mb-4 md:mb-0">Meal Planner</h1>
        
        <div className="flex items-center gap-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-[280px] justify-start text-left font-normal",
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, 'PPP') : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          
          <Button className="bg-savor-500 hover:bg-savor-600">
            Add Meal
          </Button>
        </div>
      </div>
      
      {/* Weekly view */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-4">
          <Button variant="outline" size="sm" onClick={handlePreviousWeek}>
            Previous Week
          </Button>
          <h2 className="font-display font-medium">
            Week of {format(weekStartDate, 'MMMM d, yyyy')}
          </h2>
          <Button variant="outline" size="sm" onClick={handleNextWeek}>
            Next Week
          </Button>
        </div>
        
        <div className="grid grid-cols-7 gap-2">
          {weekDates.map((day, index) => (
            <Button
              key={index}
              variant="outline"
              className={cn(
                "h-auto flex flex-col items-center py-2 px-0",
                hasMealPlan(day) && "border-savor-300 bg-savor-50",
                format(day, 'yyyy-MM-dd') === formattedDate && "border-savor-500 bg-savor-100"
              )}
              onClick={() => setDate(day)}
            >
              <span className="text-xs text-muted-foreground">{format(day, 'EEE')}</span>
              <span className="text-lg font-medium">{format(day, 'd')}</span>
              {hasMealPlan(day) && (
                <span className="w-2 h-2 bg-savor-500 rounded-full mt-1"></span>
              )}
            </Button>
          ))}
        </div>
      </div>
      
      {/* Daily meal plan */}
      <div>
        <h2 className="text-2xl font-display font-medium mb-6">
          {date ? format(date, 'EEEE, MMMM d, yyyy') : 'Select a date'}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Breakfast */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-4">Breakfast</h3>
              {breakfast ? (
                <div>
                  <div className="aspect-video rounded-md overflow-hidden mb-3">
                    <img src={breakfast.image} alt={breakfast.title} className="w-full h-full object-cover" />
                  </div>
                  <Link to={`/recipe/${breakfast.id}`} className="font-medium text-savor-700 hover:underline">
                    {breakfast.title}
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-32 bg-muted/50 rounded-md">
                  <Button variant="ghost" className="text-muted-foreground">
                    <Plus size={18} className="mr-2" />
                    Add Breakfast
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* Lunch */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-4">Lunch</h3>
              {lunch ? (
                <div>
                  <div className="aspect-video rounded-md overflow-hidden mb-3">
                    <img src={lunch.image} alt={lunch.title} className="w-full h-full object-cover" />
                  </div>
                  <Link to={`/recipe/${lunch.id}`} className="font-medium text-savor-700 hover:underline">
                    {lunch.title}
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-32 bg-muted/50 rounded-md">
                  <Button variant="ghost" className="text-muted-foreground">
                    <Plus size={18} className="mr-2" />
                    Add Lunch
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* Dinner */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-4">Dinner</h3>
              {dinner ? (
                <div>
                  <div className="aspect-video rounded-md overflow-hidden mb-3">
                    <img src={dinner.image} alt={dinner.title} className="w-full h-full object-cover" />
                  </div>
                  <Link to={`/recipe/${dinner.id}`} className="font-medium text-savor-700 hover:underline">
                    {dinner.title}
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-32 bg-muted/50 rounded-md">
                  <Button variant="ghost" className="text-muted-foreground">
                    <Plus size={18} className="mr-2" />
                    Add Dinner
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MealPlanner;
