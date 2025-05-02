
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { Activity } from 'lucide-react';

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

  const chartConfig = {
    sleep: { color: '#9b87f5' },
    weight: { color: '#7E69AB' },
    heartRate: { color: '#FF719A' },
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
              <Activity className="h-5 w-5 text-primary" />
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
              <Activity className="h-5 w-5 text-primary" />
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
    </div>
  );
};

export default HealthMetrics;
