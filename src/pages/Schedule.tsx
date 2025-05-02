
import React, { useState } from 'react';
import { format, addMonths, subMonths, addWeeks, subWeeks, addDays, subDays } from 'date-fns';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import EventList, { eventCategoryColors, EventCategory } from '@/components/EventList';
import EventForm from '@/components/EventForm';
import ContinuousYearView from '@/components/ContinuousYearView';
import ViewModeSelector from '@/components/schedule/ViewModeSelector';
import MonthView from '@/components/schedule/MonthView';
import ScheduleControls from '@/components/schedule/ScheduleControls';
import ColorThemeEditor from '@/components/schedule/ColorThemeEditor';
import WeekView from '@/components/schedule/WeekView';
import DayView from '@/components/schedule/DayView';
import { Calendar, LayoutGrid, AlignJustify, Columns } from 'lucide-react';

const initialEvents = [
  { 
    id: '1', 
    title: 'Doctor Appointment', 
    date: new Date(2025, 3, 28, 10, 0), 
    endDate: new Date(2025, 3, 28, 11, 0),
    category: 'health'
  },
  { 
    id: '2', 
    title: 'Grocery Shopping', 
    date: new Date(2025, 3, 29, 15, 0), 
    endDate: new Date(2025, 3, 29, 16, 30),
    category: 'shopping'
  },
  { 
    id: '3', 
    title: 'Team Meeting', 
    date: new Date(2025, 3, 30, 9, 0), 
    endDate: new Date(2025, 3, 30, 10, 0),
    category: 'work'
  }
];

const Schedule = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState(initialEvents);
  const [showSidebar, setShowSidebar] = useState(true);
  const [showEventForm, setShowEventForm] = useState(false);
  const [viewMode, setViewMode] = useState<'year' | 'month' | 'week' | 'day'>('year');
  const [monthColors, setMonthColors] = useState(Array(12).fill(''));
  const [doubleUpView, setDoubleUpView] = useState(false);
  const [layoutMode, setLayoutMode] = useState<'continuous' | 'aligned' | 'monthly'>('continuous');

  const getCategoryColor = (category: string): string => {
    const normalizedCategory = category.toLowerCase() as EventCategory;
    return eventCategoryColors[normalizedCategory] || eventCategoryColors.other;
  };

  const handlePreviousPeriod = () => {
    if (viewMode === 'year') {
      setCurrentDate(new Date(currentDate.getFullYear() - 1, 0, 1));
    } else if (viewMode === 'month') {
      setCurrentDate(subMonths(currentDate, 1));
    } else if (viewMode === 'week') {
      setCurrentDate(subWeeks(currentDate, 1));
    } else if (viewMode === 'day') {
      setCurrentDate(subDays(currentDate, 1));
    }
  };

  const handleNextPeriod = () => {
    if (viewMode === 'year') {
      setCurrentDate(new Date(currentDate.getFullYear() + 1, 0, 1));
    } else if (viewMode === 'month') {
      setCurrentDate(addMonths(currentDate, 1));
    } else if (viewMode === 'week') {
      setCurrentDate(addWeeks(currentDate, 1));
    } else if (viewMode === 'day') {
      setCurrentDate(addDays(currentDate, 1));
    }
  };

  const handleAddEvent = (newEvent) => {
    setEvents([...events, { id: Date.now().toString(), ...newEvent }]);
    setShowEventForm(false);
  };
  
  const handleEventClick = (eventId) => {
    console.log('Event clicked:', eventId);
    // Future functionality: edit event
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div className="container-custom py-12">
      <h1 className="text-4xl font-display font-bold text-foreground mb-8">Schedule</h1>
      
      <div className="flex justify-between items-center">
        <ScheduleControls
          currentDate={currentDate}
          viewMode={viewMode}
          showSidebar={showSidebar}
          onPreviousPeriod={handlePreviousPeriod}
          onNextPeriod={handleNextPeriod}
          onToggleSidebar={toggleSidebar}
          onAddEvent={() => setShowEventForm(true)}
        />
        <div className="flex items-center gap-4">
          {viewMode === 'year' && (
            <>
              <div className="flex items-center space-x-2">
                <Switch
                  id="double-up-view"
                  checked={doubleUpView}
                  onCheckedChange={setDoubleUpView}
                />
                <Label htmlFor="double-up-view">Double-Up View</Label>
              </div>
              
              <div className="flex items-center gap-2">
                <Label className="mr-2">Layout:</Label>
                <ToggleGroup 
                  type="single" 
                  value={layoutMode}
                  onValueChange={(value) => {
                    if (value) setLayoutMode(value as 'continuous' | 'aligned' | 'monthly');
                  }}
                  className="bg-black/90 border border-white/20 rounded-md backdrop-blur-sm shadow-md"
                >
                  <ToggleGroupItem value="continuous" aria-label="Continuous view" className="data-[state=on]:bg-gray-700 text-white hover:bg-gray-800">
                    <AlignJustify className="h-4 w-4" />
                  </ToggleGroupItem>
                  <ToggleGroupItem value="aligned" aria-label="Aligned view" className="data-[state=on]:bg-gray-700 text-white hover:bg-gray-800">
                    <LayoutGrid className="h-4 w-4" />
                  </ToggleGroupItem>
                  <ToggleGroupItem value="monthly" aria-label="Monthly view" className="data-[state=on]:bg-gray-700 text-white hover:bg-gray-800">
                    <Columns className="h-4 w-4" />
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>
            </>
          )}
          <ColorThemeEditor onColorsChange={(colors) => setMonthColors(colors.map(c => c.color))} />
        </div>
      </div>

      <div className="glass-morphism p-3 mb-4 rounded flex flex-wrap gap-2">
        <div className="text-sm font-medium mr-2">Categories:</div>
        {Object.entries(eventCategoryColors).map(([category, colorClass]) => (
          <div key={category} className="flex items-center gap-1">
            <div className={cn("w-2 h-2 rounded-full", colorClass)} />
            <span className="text-xs text-muted-foreground capitalize">{category}</span>
          </div>
        ))}
      </div>
      
      <div className="flex gap-6">
        <div className={cn("flex-grow", showSidebar ? "w-3/4" : "w-full")}>
          <div className="flex gap-4 mb-4">
            <ViewModeSelector 
              viewMode={viewMode} 
              onViewModeChange={(mode) => setViewMode(mode as 'year' | 'month' | 'week' | 'day')} 
            />
          </div>

          {viewMode === 'year' && (
            <ContinuousYearView
              currentDate={currentDate}
              events={events}
              onEventClick={handleEventClick}
              monthColors={monthColors}
              doubleUpView={doubleUpView}
              layoutMode={layoutMode}
            />
          )}
          
          {viewMode === 'month' && (
            <MonthView
              currentDate={currentDate}
              events={events}
              onEventClick={handleEventClick}
              getCategoryColor={getCategoryColor}
            />
          )}
          
          {viewMode === 'week' && (
            <WeekView 
              currentDate={currentDate}
              events={events}
              onEventClick={handleEventClick}
              getCategoryColor={getCategoryColor}
            />
          )}
          
          {viewMode === 'day' && (
            <DayView
              currentDate={currentDate}
              events={events}
              onEventClick={handleEventClick}
              getCategoryColor={getCategoryColor}
            />
          )}
        </div>
        
        {showSidebar && (
          <Card className="glass-morphism w-full md:w-1/4 p-4">
            <h2 className="text-xl font-medium mb-4">Upcoming Events</h2>
            <ScrollArea className="h-[500px] pr-4">
              <EventList 
                events={events.sort((a, b) => a.date.getTime() - b.date.getTime())} 
                onEventClick={handleEventClick} 
              />
            </ScrollArea>
          </Card>
        )}
      </div>
      
      {showEventForm && (
        <EventForm 
          onSave={handleAddEvent} 
          onCancel={() => setShowEventForm(false)}
        />
      )}
    </div>
  );
};

export default Schedule;
