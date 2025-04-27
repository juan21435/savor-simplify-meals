import React, { useState } from 'react';
import { format, addMonths, subMonths } from 'date-fns';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import EventList, { eventCategoryColors, EventCategory } from '@/components/EventList';
import EventForm from '@/components/EventForm';
import ContinuousYearView from '@/components/ContinuousYearView';
import ViewModeSelector from '@/components/schedule/ViewModeSelector';
import MonthView from '@/components/schedule/MonthView';
import ScheduleControls from '@/components/schedule/ScheduleControls';

// Mock data for events
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
  const [viewMode, setViewMode] = useState('year'); // year, month, week, day

  // Helper function to get category color
  const getCategoryColor = (category: string): string => {
    const normalizedCategory = category.toLowerCase() as EventCategory;
    return eventCategoryColors[normalizedCategory] || eventCategoryColors.other;
  };

  const handlePreviousPeriod = () => {
    if (viewMode === 'year') {
      setCurrentDate(new Date(currentDate.getFullYear() - 1, 0, 1));
    } else if (viewMode === 'month') {
      setCurrentDate(subMonths(currentDate, 1));
    }
  };

  const handleNextPeriod = () => {
    if (viewMode === 'year') {
      setCurrentDate(new Date(currentDate.getFullYear() + 1, 0, 1));
    } else if (viewMode === 'month') {
      setCurrentDate(addMonths(currentDate, 1));
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
      
      <ScheduleControls
        currentDate={currentDate}
        viewMode={viewMode}
        showSidebar={showSidebar}
        onPreviousPeriod={handlePreviousPeriod}
        onNextPeriod={handleNextPeriod}
        onToggleSidebar={toggleSidebar}
        onAddEvent={() => setShowEventForm(true)}
      />

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
              onViewModeChange={setViewMode} 
            />
          </div>

          {viewMode === 'year' ? (
            <ContinuousYearView
              currentDate={currentDate}
              events={events}
              onEventClick={handleEventClick}
            />
          ) : (
            <MonthView
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
