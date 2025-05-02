
import React from 'react';
import { format, isSameDay } from 'date-fns';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Event {
  id: string;
  title: string;
  date: Date;
  endDate: Date;
  category: string;
}

interface DayViewProps {
  currentDate: Date;
  events: Event[];
  onEventClick: (eventId: string) => void;
  getCategoryColor: (category: string) => string;
}

const hours = Array.from({ length: 24 }, (_, i) => i);

const DayView = ({ currentDate, events, onEventClick, getCategoryColor }: DayViewProps) => {
  const dayEvents = events.filter(event => isSameDay(event.date, currentDate));
  
  const getEventStyles = (event: Event) => {
    const startHour = event.date.getHours() + (event.date.getMinutes() / 60);
    const endHour = event.endDate.getHours() + (event.endDate.getMinutes() / 60);
    const duration = endHour - startHour;
    
    return {
      top: `${startHour * 60}px`,
      height: `${duration * 60}px`,
      left: '15%',
      width: '70%',
      position: 'absolute',
      backgroundColor: getCategoryColor(event.category),
    } as React.CSSProperties;
  };
  
  return (
    <div className="glass-morphism p-4">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-display">{format(currentDate, 'EEEE, MMMM d, yyyy')}</h2>
      </div>
      
      <ScrollArea className="h-[600px]">
        <div className="grid grid-cols-12 h-[1440px] relative"> {/* 24 hours * 60px = 1440px */}
          <div className="col-span-2 relative border-r border-border/20">
            {hours.map((hour) => (
              <div 
                key={hour} 
                className="absolute font-mono text-sm text-muted-foreground w-full text-right pr-2"
                style={{ top: `${hour * 60}px` }}
              >
                {hour === 0 ? '12 AM' : hour < 12 ? `${hour} AM` : hour === 12 ? '12 PM' : `${hour - 12} PM`}
              </div>
            ))}
          </div>
          
          <div className="col-span-10 relative">
            {/* Hour lines */}
            {hours.map((hour) => (
              <div 
                key={hour} 
                className="absolute w-full border-t border-border/20"
                style={{ top: `${hour * 60}px` }}
              />
            ))}
            
            {/* Half-hour lines */}
            {hours.map((hour) => (
              <div 
                key={`half-${hour}`} 
                className="absolute w-full border-t border-border/10"
                style={{ top: `${hour * 60 + 30}px` }}
              />
            ))}
            
            {/* Events */}
            {dayEvents.map(event => (
              <div
                key={event.id}
                className="absolute rounded p-2 text-sm overflow-hidden text-white shadow-md cursor-pointer hover:opacity-90 transition-opacity"
                style={getEventStyles(event)}
                onClick={() => onEventClick(event.id)}
              >
                <div className="font-medium">{event.title}</div>
                <div className="text-xs mt-1">{format(event.date, 'h:mm a')} - {format(event.endDate, 'h:mm a')}</div>
              </div>
            ))}
            
            {/* Current time indicator */}
            <div 
              className="absolute z-10 w-full border-t-2 border-red-500"
              style={{ 
                top: `${new Date().getHours() * 60 + new Date().getMinutes()}px`,
              }}
            >
              <div className="absolute -left-2 -top-2 w-3 h-3 rounded-full bg-red-500" />
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default DayView;
