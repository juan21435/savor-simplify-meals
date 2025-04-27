
import React from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from 'date-fns';
import { cn } from '@/lib/utils';

interface Event {
  id: string;
  title: string;
  date: Date;
  endDate: Date;
  category: string;
}

interface MonthViewProps {
  currentDate: Date;
  events: Event[];
  onEventClick: (eventId: string) => void;
  getCategoryColor: (category: string) => string;
}

const MonthView = ({ currentDate, events, onEventClick, getCategoryColor }: MonthViewProps) => {
  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentDate),
    end: endOfMonth(currentDate)
  });

  return (
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
              
              {dayEvents.slice(0, 3).map((event) => (
                <div 
                  key={event.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    onEventClick(event.id);
                  }}
                  className={cn(
                    "h-1 rounded-sm my-1 cursor-pointer",
                    getCategoryColor(event.category)
                  )}
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
  );
};

export default MonthView;
