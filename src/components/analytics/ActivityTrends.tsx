
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Dumbbell } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const ActivityTrends = () => {
  // Sample data for demonstration
  const weeklyWorkouts = [
    { day: 'Mon', minutes: 45, calories: 320 },
    { day: 'Tue', minutes: 30, calories: 250 },
    { day: 'Wed', minutes: 0, calories: 0 },
    { day: 'Thu', minutes: 60, calories: 450 },
    { day: 'Fri', minutes: 45, calories: 350 },
    { day: 'Sat', minutes: 75, calories: 580 },
    { day: 'Sun', minutes: 30, calories: 220 },
  ];

  const monthlyProgress = [
    { week: 'Week 1', minutes: 185, target: 200 },
    { week: 'Week 2', minutes: 210, target: 200 },
    { week: 'Week 3', minutes: 195, target: 200 },
    { week: 'Week 4', minutes: 285, target: 200 },
  ];

  const workoutTypes = [
    { type: 'Cardio', sessions: 8, minutes: 240, percentage: 40 },
    { type: 'Strength', sessions: 6, minutes: 180, percentage: 30 },
    { type: 'Flexibility', sessions: 4, minutes: 120, percentage: 20 },
    { type: 'Recovery', sessions: 2, minutes: 60, percentage: 10 },
  ];

  const chartConfig = {
    minutes: { color: '#9b87f5' },
    calories: { color: '#FF719A' },
    target: { color: 'rgba(255,255,255,0.2)' }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass-morphism">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Dumbbell className="h-5 w-5 text-primary" />
              Weekly Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">285 mins</div>
            <div className="text-sm text-muted-foreground">
              +35 mins from last week
            </div>
          </CardContent>
        </Card>

        <Card className="glass-morphism">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Dumbbell className="h-5 w-5 text-primary" />
              Calories Burned
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">2,170 cal</div>
            <div className="text-sm text-muted-foreground">
              +320 cal from last week
            </div>
          </CardContent>
        </Card>

        <Card className="glass-morphism">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Dumbbell className="h-5 w-5 text-primary" />
              Active Days
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">6/7 days</div>
            <div className="text-sm text-muted-foreground">
              +1 day from last week
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="glass-morphism">
        <CardHeader>
          <CardTitle className="text-xl">Daily Activity</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyWorkouts} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fill: "#fff", fontSize: 12 }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fill: "#fff", fontSize: 12 }} />
                <ChartTooltip content={<ChartTooltipContent />} cursor={{ fill: "rgba(255,255,255,0.05)" }} />
                <Bar dataKey="minutes" name="Minutes" fill="var(--color-minutes)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="glass-morphism">
          <CardHeader>
            <CardTitle className="text-xl">Monthly Progress</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyProgress} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="week" tickLine={false} axisLine={false} tick={{ fill: "#fff", fontSize: 12 }} />
                  <YAxis tickLine={false} axisLine={false} tick={{ fill: "#fff", fontSize: 12 }} />
                  <ChartTooltip content={<ChartTooltipContent />} cursor={{ stroke: "rgba(255,255,255,0.2)" }} />
                  <Line type="monotone" dataKey="minutes" name="Active Minutes" stroke="var(--color-minutes)" strokeWidth={2} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="target" name="Target" stroke="var(--color-target)" strokeWidth={1} strokeDasharray="5 5" dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
        
        <Card className="glass-morphism">
          <CardHeader>
            <CardTitle className="text-xl">Workout Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {workoutTypes.map((workout) => (
                <div key={workout.type} className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">{workout.type}</span>
                    <span className="text-sm">{workout.sessions} sessions ({workout.minutes} mins)</span>
                  </div>
                  <Progress value={workout.percentage} className="h-2" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ActivityTrends;
