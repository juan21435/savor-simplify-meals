
import React from 'react';
import { format, startOfWeek, endOfWeek, eachDayOfInterval, addHours, isSameDay, isBefore, isAfter } from 'date-fns';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Event {
  id: string;
  title: string;
  date: Date;
  endDate: Date;
  category: string;
}

interface WeekViewProps {
  currentDate: Date;
  events: Event[];
  onEventClick: (eventId: string) => void;
  getCategoryColor: (category: string) => string;
}

const hours = Array.from({ length: 24 }, (_, i) => i);

const WeekView = ({ currentDate, events, onEventClick, getCategoryColor }: WeekViewProps) => {
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 0 });
  const weekEnd = endOfWeek(currentDate, { weekStartsOn: 0 });
  
  const days = eachDayOfInterval({ start: weekStart, end: weekEnd });
  
  const getEventStyles = (event: Event, day: Date) => {
    const eventDay = new Date(event.date);
    const eventEndDay = new Date(event.endDate);
    
    const startHour = eventDay.getHours() + (eventDay.getMinutes() / 60);
    const endHour = eventEndDay.getHours() + (eventEndDay.getMinutes() / 60);
    const duration = endHour - startHour;
    
    // Check if event is on this day
    if (isSameDay(day, eventDay)) {
      const top = `${startHour * 60}px`;
      const height = `${duration * 60}px`;
      
      return {
        top,
        height,
        left: '5%',
        width: '90%',
        position: 'absolute',
        backgroundColor: getCategoryColor(event.category),
      } as React.CSSProperties;
    }
    
    return { display: 'none' };
  };
  
  return (
    <div className="glass-morphism p-4 bg-black text-white">
      <div className="grid grid-cols-8 h-full border-b border-border/30">
        <div className="text-center font-medium text-white pt-6">
          Hour
        </div>
        {days.map((day) => (
          <div 
            key={day.toString()}
            className={cn(
              "text-center py-2 font-medium border-b-2",
              isSameDay(day, new Date()) ? "border-primary text-primary" : "border-white/10 text-white"
            )}
          >
            <div>{format(day, 'EEE')}</div>
            <div className="text-xl">{format(day, 'd')}</div>
          </div>
        ))}
      </div>
      
      <ScrollArea className="h-[600px]">
        <div className="relative">
          <div className="grid grid-cols-8 h-[1440px]"> {/* 24 hours * 60px = 1440px */}
            <div className="relative border-r border-white/20">
              {hours.map((hour) => (
                <div 
                  key={hour} 
                  className="absolute font-mono text-xs text-white w-full text-right pr-2"
                  style={{ top: `${hour * 60}px` }}
                >
                  {hour === 0 ? '12 AM' : hour < 12 ? `${hour} AM` : hour === 12 ? '12 PM' : `${hour - 12} PM`}
                </div>
              ))}
            </div>
            
            {days.map((day, dayIndex) => (
              <div 
                key={day.toString()}
                className={cn(
                  "relative h-full border-r border-white/20",
                  dayIndex % 2 === 0 ? "bg-black/80" : "bg-black/60"
                )}
              >
                {/* Hour lines */}
                {hours.map((hour) => (
                  <div 
                    key={hour} 
                    className="absolute w-full border-t border-white/10"
                    style={{ top: `${hour * 60}px` }}
                  />
                ))}
                
                {/* Half-hour lines */}
                {hours.map((hour) => (
                  <div 
                    key={`half-${hour}`} 
                    className="absolute w-full border-t border-white/5"
                    style={{ top: `${hour * 60 + 30}px` }}
                  />
                ))}
                
                {/* Events */}
                {events
                  .filter(event => isSameDay(day, event.date))
                  .map(event => (
                    <div
                      key={event.id}
                      className="absolute rounded p-1 text-xs overflow-hidden text-white shadow-sm cursor-pointer hover:opacity-90 transition-opacity"
                      style={getEventStyles(event, day)}
                      onClick={() => onEventClick(event.id)}
                      title={event.title}
                    >
                      <div className="font-medium">{event.title}</div>
                      <div>{format(event.date, 'h:mm a')}</div>
                    </div>
                  ))
                }
              </div>
            ))}
          </div>
          
          {/* Current time indicator */}
          <div 
            className="absolute z-10 w-full border-t border-red-500"
            style={{ 
              top: `${new Date().getHours() * 60 + new Date().getMinutes()}px`,
              left: '12.5%'
            }}
          >
            <div className="absolute -left-1 -top-1 w-2 h-2 rounded-full bg-red-500" />
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default WeekView;
