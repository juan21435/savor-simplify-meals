import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Separator } from '@/components/ui/separator';
import { Calendar as CalendarIcon, Plus, ChevronLeft, ChevronRight, Utensils } from 'lucide-react';
import { format, addDays, eachDayOfInterval, startOfWeek, endOfWeek } from 'date-fns';
import { mealPlans, recipes, getRecipeById } from '@/lib/data';
import RecipeCard from '@/components/RecipeCard';
const MealPlanner = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currentWeekStart, setCurrentWeekStart] = useState<Date>(startOfWeek(new Date(), {
    weekStartsOn: 1
  }) // Week starts on Monday
  );

  // Calculate week range
  const weekRange = eachDayOfInterval({
    start: currentWeekStart,
    end: endOfWeek(currentWeekStart, {
      weekStartsOn: 1
    })
  });

  // Navigate weeks
  const previousWeek = () => {
    setCurrentWeekStart(addDays(currentWeekStart, -7));
  };
  const nextWeek = () => {
    setCurrentWeekStart(addDays(currentWeekStart, 7));
  };

  // Format date for lookup in mealPlans
  const formatDateForLookup = (date: Date) => {
    return format(date, 'yyyy-MM-dd');
  };

  // Find meal plan for selected date
  const getMealPlanForDate = (date: Date) => {
    const dateStr = formatDateForLookup(date);
    return mealPlans.find(plan => plan.date === dateStr);
  };

  // Get recipes for a specific date
  const getRecipesForDate = (date: Date) => {
    const mealPlan = getMealPlanForDate(date);
    if (!mealPlan) return {
      breakfast: null,
      lunch: null,
      dinner: null
    };
    const breakfastRecipe = mealPlan.recipes.breakfast ? getRecipeById(mealPlan.recipes.breakfast) : null;
    const lunchRecipe = mealPlan.recipes.lunch ? getRecipeById(mealPlan.recipes.lunch) : null;
    const dinnerRecipe = mealPlan.recipes.dinner ? getRecipeById(mealPlan.recipes.dinner) : null;
    return {
      breakfast: breakfastRecipe,
      lunch: lunchRecipe,
      dinner: dinnerRecipe
    };
  };
  return <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          
          <CardContent>
            <Calendar mode="single" selected={selectedDate} onSelect={date => date && setSelectedDate(date)} className="border py-[32px] rounded-none" />
            
            <div className="mt-6">
              <h3 className="font-medium mb-2">Upcoming Meal Plans</h3>
              <ul className="space-y-2">
                {mealPlans.map(plan => <li key={plan.id} className="flex justify-between p-2 hover:bg-muted rounded-md cursor-pointer" onClick={() => setSelectedDate(new Date(plan.date))}>
                    <span>{format(new Date(plan.date), 'EEEE, MMM d')}</span>
                    <span className="text-muted-foreground">
                      {Object.values(plan.recipes).filter(Boolean).length} meals
                    </span>
                  </li>)}
              </ul>
            </div>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Weekly Meal Plan</CardTitle>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" onClick={previousWeek}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm font-medium">
                  {format(currentWeekStart, 'MMM d')} - {format(addDays(currentWeekStart, 6), 'MMM d, yyyy')}
                </span>
                <Button variant="outline" size="icon" onClick={nextWeek}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {weekRange.map(day => {
              const dayMeals = getRecipesForDate(day);
              const hasMeals = dayMeals.breakfast || dayMeals.lunch || dayMeals.dinner;
              return <div key={day.toString()} className={`p-4 rounded-lg ${selectedDate && format(selectedDate, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd') ? 'border-2 border-primary' : 'border'}`} onClick={() => setSelectedDate(day)}>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className={`font-medium ${format(day, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd') ? 'text-primary' : ''}`}>
                        {format(day, 'EEEE, MMMM d')}
                      </h3>
                      <Button variant="outline" size="sm">
                        <Plus className="h-3.5 w-3.5 mr-1" />
                        Add Meal
                      </Button>
                    </div>
                    
                    {hasMeals ? <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-1 text-sm font-medium text-muted-foreground mb-2">
                            <CalendarIcon className="h-3.5 w-3.5" />
                            <span>Breakfast</span>
                          </div>
                          {dayMeals.breakfast ? <div className="p-2 border rounded-md text-sm">
                              {dayMeals.breakfast.title}
                            </div> : <Button variant="outline" className="w-full h-auto py-2 border-dashed" size="sm">
                              <Plus className="h-3.5 w-3.5 mr-1" />
                              Add
                            </Button>}
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center gap-1 text-sm font-medium text-muted-foreground mb-2">
                            <CalendarIcon className="h-3.5 w-3.5" />
                            <span>Lunch</span>
                          </div>
                          {dayMeals.lunch ? <div className="p-2 border rounded-md text-sm">
                              {dayMeals.lunch.title}
                            </div> : <Button variant="outline" className="w-full h-auto py-2 border-dashed" size="sm">
                              <Plus className="h-3.5 w-3.5 mr-1" />
                              Add
                            </Button>}
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center gap-1 text-sm font-medium text-muted-foreground mb-2">
                            <CalendarIcon className="h-3.5 w-3.5" />
                            <span>Dinner</span>
                          </div>
                          {dayMeals.dinner ? <div className="p-2 border rounded-md text-sm">
                              {dayMeals.dinner.title}
                            </div> : <Button variant="outline" className="w-full h-auto py-2 border-dashed" size="sm">
                              <Plus className="h-3.5 w-3.5 mr-1" />
                              Add
                            </Button>}
                        </div>
                      </div> : <div className="py-6 flex flex-col items-center justify-center">
                        <Utensils className="h-8 w-8 text-muted-foreground mb-2" />
                        <p className="text-muted-foreground">No meals planned for this day</p>
                        <Button variant="outline" className="mt-2">
                          <Plus className="h-3.5 w-3.5 mr-1" />
                          Plan Meals
                        </Button>
                      </div>}
                  </div>;
            })}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Selected Day Meal Plan</CardTitle>
          <CardDescription>
            {selectedDate ? format(selectedDate, 'EEEE, MMMM d, yyyy') : 'No date selected'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {selectedDate && <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Breakfast</h3>
                  {getRecipesForDate(selectedDate).breakfast ? <RecipeCard recipe={getRecipesForDate(selectedDate).breakfast!} size="sm" /> : <div className="h-40 border-2 border-dashed rounded-lg flex items-center justify-center">
                      <Button variant="ghost">
                        <Plus className="h-5 w-5 mr-2" />
                        Add Breakfast
                      </Button>
                    </div>}
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Lunch</h3>
                  {getRecipesForDate(selectedDate).lunch ? <RecipeCard recipe={getRecipesForDate(selectedDate).lunch!} size="sm" /> : <div className="h-40 border-2 border-dashed rounded-lg flex items-center justify-center">
                      <Button variant="ghost">
                        <Plus className="h-5 w-5 mr-2" />
                        Add Lunch
                      </Button>
                    </div>}
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Dinner</h3>
                  {getRecipesForDate(selectedDate).dinner ? <RecipeCard recipe={getRecipesForDate(selectedDate).dinner!} size="sm" /> : <div className="h-40 border-2 border-dashed rounded-lg flex items-center justify-center">
                      <Button variant="ghost">
                        <Plus className="h-5 w-5 mr-2" />
                        Add Dinner
                      </Button>
                    </div>}
                </div>
              </div>
              
              <Separator className="my-6" />
              
              <div className="flex justify-between">
                <Button variant="outline">
                  Generate Shopping List
                </Button>
                <Button className="bg-herb-600 hover:bg-herb-700">
                  Save Meal Plan
                </Button>
              </div>
            </>}
        </CardContent>
      </Card>
    </div>;
};
export default MealPlanner;