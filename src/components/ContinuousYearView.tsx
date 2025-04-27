import React from 'react';
import { format, startOfYear, eachMonthOfInterval, eachDayOfInterval, startOfMonth, endOfMonth, isSameMonth, isSameDay } from 'date-fns';
import { cn } from '@/lib/utils';
interface Event {
  id: string;
  title: string;
  date: Date;
  endDate: Date;
  category: string;
}
interface ContinuousYearViewProps {
  currentDate: Date;
  events: Event[];
  onEventClick: (eventId: string) => void;
}
const ContinuousYearView = ({
  currentDate,
  events,
  onEventClick
}: ContinuousYearViewProps) => {
  const year = currentDate.getFullYear();
  const months = eachMonthOfInterval({
    start: startOfYear(currentDate),
    end: new Date(year, 11, 31)
  });
  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  return <div className="w-full overflow-auto glass-morphism">
      {/* Header with weekday labels */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-border/50 py-2">
        <div className="grid grid-cols-7 gap-px">
          {weekDays.map(day => <div key={day} className="text-center text-sm font-medium text-muted-foreground p-1">
              {day}
            </div>)}
        </div>
      </div>

      {/* Continuous months scroll */}
      <div className="divide-y divide-border/20">
        {months.map(month => {
        const monthStart = startOfMonth(month);
        const monthEnd = endOfMonth(month);
        const days = eachDayOfInterval({
          start: monthStart,
          end: monthEnd
        });
        const startingDayOffset = monthStart.getDay() === 0 ? 6 : monthStart.getDay() - 1;
        return <div key={month.toString()} className="py-6">
              {/* Month label */}
              

              {/* Calendar grid */}
              <div className="grid grid-cols-7 gap-px">
                {/* Empty cells for offset */}
                {Array.from({
              length: startingDayOffset
            }).map((_, index) => {})}

                {/* Day cells */}
                {days.map(day => {
              const dayEvents = events.filter(event => isSameMonth(event.date, day) && isSameDay(event.date, day));
              return <div key={day.toString()} className={cn("aspect-square p-1 border border-border/10 relative group hover:bg-accent/5 transition-colors", isSameDay(day, new Date()) && "ring-1 ring-primary")}>
                      <span className="text-xs text-muted-foreground">
                        {format(day, 'd')}
                      </span>

                      {/* Event indicators */}
                      <div className="absolute bottom-1 left-1 right-1">
                        {dayEvents.slice(0, 2).map((event, index) => <div key={event.id} onClick={() => onEventClick(event.id)} className="h-1 w-full rounded-sm mb-0.5 bg-foreground/20 hover:bg-foreground/40 cursor-pointer transition-colors" title={event.title} />)}
                        {dayEvents.length > 2 && <div className="text-[10px] text-muted-foreground">
                            +{dayEvents.length - 2}
                          </div>}
                      </div>
                    </div>;
            })}
              </div>
            </div>;
      })}
      </div>
    </div>;
};
export default ContinuousYearView;