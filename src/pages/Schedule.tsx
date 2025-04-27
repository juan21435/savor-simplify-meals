
import React, { useState } from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay } from 'date-fns';
import { ChevronLeft, ChevronRight, Plus, Calendar as CalendarIcon, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import EventList from '@/components/EventList';
import EventForm from '@/components/EventForm';

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

  // Generate months for the year view
  const generateYearView = () => {
    const months = [];
    for (let i = 0; i < 12; i++) {
      months.push(new Date(currentDate.getFullYear(), i, 1));
    }
    return months;
  };

  const monthsInYear = generateYearView();
  
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

  const toggleViewMode = (mode) => {
    setViewMode(mode);
  };

  // Days for the month view
  const daysInMonth = viewMode === 'month' ? eachDayOfInterval({
    start: startOfMonth(currentDate),
    end: endOfMonth(currentDate)
  }) : [];

  // Filter events for the current view
  const filteredEvents = events.filter(event => {
    if (viewMode === 'year') {
      return event.date.getFullYear() === currentDate.getFullYear();
    } else if (viewMode === 'month') {
      return isSameMonth(event.date, currentDate);
    }
    return true;
  });

  return (
    <div className="container-custom py-12">
      <h1 className="text-4xl font-display font-bold text-foreground mb-8">Schedule</h1>
      
      <div className="flex gap-4 mb-8">
        <Button onClick={handlePreviousPeriod} variant="outline" size="icon">
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1 text-center">
          {viewMode === 'year' ? (
            <h2 className="text-2xl font-display">{currentDate.getFullYear()}</h2>
          ) : (
            <h2 className="text-2xl font-display">{format(currentDate, 'MMMM yyyy')}</h2>
          )}
        </div>
        <Button onClick={handleNextPeriod} variant="outline" size="icon">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="flex gap-4 mb-6">
        <Button 
          variant={viewMode === 'year' ? 'default' : 'outline'} 
          onClick={() => toggleViewMode('year')}
          className="flex gap-2 items-center"
        >
          <CalendarIcon className="h-4 w-4" />
          Year
        </Button>
        <Button 
          variant={viewMode === 'month' ? 'default' : 'outline'} 
          onClick={() => toggleViewMode('month')}
          className="flex gap-2 items-center"
        >
          <CalendarIcon className="h-4 w-4" />
          Month
        </Button>
        <div className="flex-1"></div>
        <Button 
          variant="outline" 
          onClick={toggleSidebar}
          className="flex gap-2 items-center"
        >
          <List className="h-4 w-4" />
          {showSidebar ? 'Hide Events' : 'Show Events'}
        </Button>
        <Button 
          onClick={() => setShowEventForm(true)}
          className="flex gap-2 items-center"
        >
          <Plus className="h-4 w-4" />
          Add Event
        </Button>
      </div>
      
      <div className="flex gap-6">
        <div className={cn("flex-grow", showSidebar ? "w-3/4" : "w-full")}>
          {viewMode === 'year' && (
            <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
              {monthsInYear.map((month) => (
                <Card 
                  key={month.toString()} 
                  className="glass-morphism p-4 cursor-pointer hover:ring-1 hover:ring-primary"
                  onClick={() => {
                    setCurrentDate(month);
                    toggleViewMode('month');
                  }}
                >
                  <h3 className="text-center font-medium mb-2">{format(month, 'MMMM')}</h3>
                  <div className="h-24 relative">
                    {events
                      .filter(event => 
                        event.date.getMonth() === month.getMonth() && 
                        event.date.getFullYear() === month.getFullYear()
                      )
                      .slice(0, 3)
                      .map((event, index) => (
                        <div 
                          key={event.id}
                          className="absolute h-1 bg-foreground rounded-sm"
                          style={{
                            left: '10%',
                            width: '80%',
                            top: `${(index * 25) + 10}%`
                          }}
                        />
                      ))
                    }
                    {events.filter(event => 
                      event.date.getMonth() === month.getMonth() && 
                      event.date.getFullYear() === month.getFullYear()
                    ).length > 3 && (
                      <div className="absolute bottom-0 right-0 text-xs text-muted-foreground">
                        +{events.filter(event => 
                          event.date.getMonth() === month.getMonth() && 
                          event.date.getFullYear() === month.getFullYear()
                        ).length - 3} more
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          )}
          
          {viewMode === 'month' && (
            <div className="glass-morphism p-6">
              <div className="grid grid-cols-7 gap-1 mb-2">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <div key={day} className="text-center text-muted-foreground font-medium">
                    {day}
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: startOfMonth(currentDate).getDay() }, (_, i) => (
                  <div key={`empty-start-${i}`} className="aspect-square p-2" />
                ))}
                
                {daysInMonth.map((day) => {
                  const dayEvents = events.filter(event => isSameDay(event.date, day));
                  
                  return (
                    <div 
                      key={day.toString()} 
                      className={cn(
                        "aspect-square p-2 border border-border/30 hover:bg-accent/10 rounded-md relative",
                        isSameDay(day, new Date()) && "ring-1 ring-primary"
                      )}
                    >
                      <div className="text-sm">{format(day, 'd')}</div>
                      
                      {dayEvents.slice(0, 3).map((event, index) => (
                        <div 
                          key={event.id}
                          onClick={() => handleEventClick(event.id)}
                          className="h-1 bg-foreground rounded-sm my-1 cursor-pointer"
                        />
                      ))}
                      
                      {dayEvents.length > 3 && (
                        <div className="absolute bottom-1 right-1 text-xs text-muted-foreground">
                          +{dayEvents.length - 3}
                        </div>
                      )}
                    </div>
                  );
                })}
                
                {Array.from({ length: 6 - endOfMonth(currentDate).getDay() }, (_, i) => (
                  <div key={`empty-end-${i}`} className="aspect-square p-2" />
                ))}
              </div>
            </div>
          )}
        </div>
        
        {showSidebar && (
          <Card className="glass-morphism w-full md:w-1/4 p-4">
            <h2 className="text-xl font-medium mb-4">Upcoming Events</h2>
            <ScrollArea className="h-[500px] pr-4">
              <EventList 
                events={filteredEvents.sort((a, b) => a.date.getTime() - b.date.getTime())} 
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
