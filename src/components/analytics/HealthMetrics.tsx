
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Activity, Weight, Heart, Utensils, Droplet, Thermometer } from 'lucide-react';

const HealthMetrics = () => {
  // Sample data for demonstration
  const sleepData = [
    { day: 'Mon', hours: 7.2 },
    { day: 'Tue', hours: 6.8 },
    { day: 'Wed', hours: 7.5 },
    { day: 'Thu', hours: 8.1 },
    { day: 'Fri', hours: 6.9 },
    { day: 'Sat', hours: 8.4 },
    { day: 'Sun', hours: 7.9 },
  ];

  const weightData = [
    { date: '04/01', weight: 78.2 },
    { date: '04/08', weight: 77.8 },
    { date: '04/15', weight: 77.1 },
    { date: '04/22', weight: 76.5 },
    { date: '04/29', weight: 76.2 },
    { date: '05/01', weight: 75.9 },
  ];

  const heartRateData = [
    { time: '6am', rate: 62 },
    { time: '9am', rate: 78 },
    { time: '12pm', rate: 82 },
    { time: '3pm', rate: 76 },
    { time: '6pm', rate: 84 },
    { time: '9pm', rate: 72 },
  ];

  const caloriesBurnedData = [
    { day: 'Mon', calories: 420 },
    { day: 'Tue', calories: 380 },
    { day: 'Wed', calories: 520 },
    { day: 'Thu', calories: 460 },
    { day: 'Fri', calories: 410 },
    { day: 'Sat', calories: 650 },
    { day: 'Sun', calories: 580 },
  ];
  
  const milesWalkedData = [
    { day: 'Mon', miles: 3.2 },
    { day: 'Tue', miles: 2.8 },
    { day: 'Wed', miles: 4.5 },
    { day: 'Thu', miles: 3.8 },
    { day: 'Fri', miles: 3.1 },
    { day: 'Sat', miles: 5.4 },
    { day: 'Sun', miles: 4.2 },
  ];
  
  const exerciseData = [
    { type: 'Running', minutes: 45 },
    { type: 'Cycling', minutes: 60 },
    { type: 'Swimming', minutes: 30 },
    { type: 'Weights', minutes: 50 },
    { type: 'Yoga', minutes: 40 },
  ];
  
  const stressLevelData = [
    { day: 'Mon', level: 6 },
    { day: 'Tue', level: 7 },
    { day: 'Wed', level: 4 },
    { day: 'Thu', level: 3 },
    { day: 'Fri', level: 5 },
    { day: 'Sat', level: 2 },
    { day: 'Sun', level: 3 },
  ];

  const nutritionData = [
    { name: 'Dairy', value: 15, color: '#FFE29F' },
    { name: 'Sugar', value: 10, color: '#FF719A' },
    { name: 'Carbs', value: 35, color: '#9b87f5' },
    { name: 'Protein', value: 25, color: '#7E69AB' },
    { name: 'Vegetables', value: 15, color: '#33C3F0' }
  ];

  const chartConfig = {
    sleep: { color: '#9b87f5' },
    weight: { color: '#7E69AB' },
    heartRate: { color: '#FF719A' },
    calories: { color: '#FFE29F' },
    miles: { color: '#33C3F0' },
    exercise: { color: '#0EA5E9' },
    stress: { color: '#D946EF' },
    nutrition: { color: '#0FA0CE' }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass-morphism">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Average Sleep
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">7.4 hrs</div>
            <div className="text-sm text-muted-foreground">
              +0.3 hrs from last week
            </div>
          </CardContent>
        </Card>

        <Card className="glass-morphism">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Weight className="h-5 w-5 text-primary" />
              Current Weight
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">75.9 kg</div>
            <div className="text-sm text-muted-foreground">
              -2.3 kg since program start
            </div>
          </CardContent>
        </Card>

        <Card className="glass-morphism">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Heart className="h-5 w-5 text-primary" />
              Avg Heart Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">76 bpm</div>
            <div className="text-sm text-muted-foreground">
              Resting: 62 bpm
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass-morphism">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Calories Burned
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">3,420</div>
            <div className="text-sm text-muted-foreground">
              +420 from last week
            </div>
          </CardContent>
        </Card>

        <Card className="glass-morphism">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Miles Walked
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">27 mi</div>
            <div className="text-sm text-muted-foreground">
              +3.5 mi from last week
            </div>
          </CardContent>
        </Card>

        <Card className="glass-morphism">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Thermometer className="h-5 w-5 text-primary" />
              Stress Level
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">4.3/10</div>
            <div className="text-sm text-muted-foreground">
              -1.2 from last week
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="glass-morphism">
          <CardHeader>
            <CardTitle className="text-xl">Sleep Trends</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sleepData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fill: "#fff", fontSize: 12 }} />
                  <YAxis domain={[0, 10]} tickLine={false} axisLine={false} tick={{ fill: "#fff", fontSize: 12 }} />
                  <ChartTooltip content={<ChartTooltipContent />} cursor={{ fill: "rgba(255,255,255,0.05)" }} />
                  <Bar dataKey="hours" name="Sleep Hours" fill="var(--color-sleep)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
        
        <Card className="glass-morphism">
          <CardHeader>
            <CardTitle className="text-xl">Weight Tracking</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weightData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="date" tickLine={false} axisLine={false} tick={{ fill: "#fff", fontSize: 12 }} />
                  <YAxis domain={[70, 80]} tickLine={false} axisLine={false} tick={{ fill: "#fff", fontSize: 12 }} />
                  <ChartTooltip content={<ChartTooltipContent />} cursor={{ stroke: "rgba(255,255,255,0.2)" }} />
                  <Line type="monotone" dataKey="weight" name="Weight (kg)" stroke="var(--color-weight)" strokeWidth={2} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="glass-morphism">
          <CardHeader>
            <CardTitle className="text-xl">Calories Burned</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={caloriesBurnedData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fill: "#fff", fontSize: 12 }} />
                  <YAxis tickLine={false} axisLine={false} tick={{ fill: "#fff", fontSize: 12 }} />
                  <ChartTooltip content={<ChartTooltipContent />} cursor={{ fill: "rgba(255,255,255,0.05)" }} />
                  <Bar dataKey="calories" name="Calories" fill="var(--color-calories)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
        
        <Card className="glass-morphism">
          <CardHeader>
            <CardTitle className="text-xl">Miles Walked</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={milesWalkedData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fill: "#fff", fontSize: 12 }} />
                  <YAxis tickLine={false} axisLine={false} tick={{ fill: "#fff", fontSize: 12 }} />
                  <ChartTooltip content={<ChartTooltipContent />} cursor={{ stroke: "rgba(255,255,255,0.2)" }} />
                  <Line type="monotone" dataKey="miles" name="Miles" stroke="var(--color-miles)" strokeWidth={2} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
      
      <Card className="glass-morphism">
        <CardHeader>
          <CardTitle className="text-xl">Daily Heart Rate</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={heartRateData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="time" tickLine={false} axisLine={false} tick={{ fill: "#fff", fontSize: 12 }} />
                <YAxis domain={[50, 100]} tickLine={false} axisLine={false} tick={{ fill: "#fff", fontSize: 12 }} />
                <ChartTooltip content={<ChartTooltipContent />} cursor={{ stroke: "rgba(255,255,255,0.2)" }} />
                <Line type="monotone" dataKey="rate" name="Heart Rate (bpm)" stroke="var(--color-heartRate)" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="glass-morphism">
          <CardHeader>
            <CardTitle className="text-xl">Exercise Minutes</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={exerciseData} layout="vertical" margin={{ top: 10, right: 10, left: 60, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="rgba(255,255,255,0.1)" />
                  <XAxis type="number" tickLine={false} axisLine={false} tick={{ fill: "#fff", fontSize: 12 }} />
                  <YAxis dataKey="type" type="category" tickLine={false} axisLine={false} tick={{ fill: "#fff", fontSize: 12 }} />
                  <ChartTooltip content={<ChartTooltipContent />} cursor={{ fill: "rgba(255,255,255,0.05)" }} />
                  <Bar dataKey="minutes" name="Minutes" fill="var(--color-exercise)" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
        
        <Card className="glass-morphism">
          <CardHeader>
            <CardTitle className="text-xl">Weekly Stress Levels</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={stressLevelData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fill: "#fff", fontSize: 12 }} />
                  <YAxis domain={[0, 10]} tickLine={false} axisLine={false} tick={{ fill: "#fff", fontSize: 12 }} />
                  <ChartTooltip content={<ChartTooltipContent />} cursor={{ stroke: "rgba(255,255,255,0.2)" }} />
                  <Line type="monotone" dataKey="level" name="Stress Level" stroke="var(--color-stress)" strokeWidth={2} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="glass-morphism">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <Utensils className="h-5 w-5 text-primary" />
            Nutritional Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent className="h-[400px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
            <div className="flex items-center justify-center">
              <ChartContainer config={chartConfig}>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={nutritionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {nutritionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
            <div className="flex flex-col justify-center space-y-4">
              {nutritionData.map((item, index) => (
                <div key={index} className="flex items-center">
                  <div 
                    className="w-4 h-4 rounded-sm mr-2" 
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="mr-2 font-medium">{item.name}:</span>
                  <span>{item.value}%</span>
                </div>
              ))}
              <div className="pt-4 text-sm text-muted-foreground">
                <p>Your carb intake is higher than recommended. Consider increasing vegetable consumption and reducing sugar.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HealthMetrics;
