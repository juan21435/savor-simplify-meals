
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

const monthColors = {
  0: 'from-herb-500/5',  // January
  1: 'from-savor-500/5', // February
  2: 'from-tomato-500/5', // March
  3: 'from-herb-500/5',  // April
  4: 'from-savor-500/5', // May
  5: 'from-tomato-500/5', // June
  6: 'from-herb-500/5',  // July
  7: 'from-savor-500/5', // August
  8: 'from-tomato-500/5', // September
  9: 'from-herb-500/5',  // October
  10: 'from-savor-500/5', // November
  11: 'from-tomato-500/5' // December
};

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

  // Generate all days for the entire year in a single array
  const allDays = months.reduce((acc, month) => {
    const monthStart = startOfMonth(month);
    const monthEnd = endOfMonth(month);
    const days = eachDayOfInterval({
      start: monthStart,
      end: monthEnd
    });
    return [...acc, ...days];
  }, [] as Date[]);

  // Calculate which days belong to which month for month highlighting
  const monthBoundaries = months.map(month => ({
    month,
    firstDayIndex: allDays.findIndex(day => isSameMonth(day, month))
  }));

  return (
    <div className="w-full overflow-auto glass-morphism">
      {/* Header with weekday labels */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-border/50 py-2">
        <div className="grid grid-cols-7 gap-px">
          {weekDays.map(day => (
            <div key={day} className="text-center text-sm font-medium text-muted-foreground p-1">
              {day}
            </div>
          ))}
        </div>
      </div>

      {/* Continuous calendar grid */}
      <div className="relative grid grid-cols-7 gap-px">
        {/* Month highlight backgrounds */}
        {monthBoundaries.map(({ month, firstDayIndex }, index) => {
          const nextMonthStart = monthBoundaries[index + 1]?.firstDayIndex || allDays.length;
          const daysInMonth = nextMonthStart - firstDayIndex;
          
          return (
            <div
              key={month.toString()}
              className={cn(
                "absolute z-0 bg-gradient-to-b to-transparent",
                monthColors[month.getMonth()],
              )}
              style={{
                gridRow: `${Math.floor(firstDayIndex / 7) + 1} / span ${Math.ceil(daysInMonth / 7)}`,
                gridColumn: "1 / span 7",
              }}
            >
              <div className="text-center py-2 font-medium text-primary/80">
                {format(month, 'MMMM')}
              </div>
            </div>
          );
        })}

        {/* Days grid */}
        {allDays.map((day, index) => {
          const dayEvents = events.filter(event => 
            isSameMonth(event.date, day) && isSameDay(event.date, day)
          );

          return (
            <div
              key={day.toString()}
              className={cn(
                "relative z-10 aspect-square p-1 border border-border/5 group hover:bg-accent/5 transition-colors",
                isSameDay(day, new Date()) && "ring-1 ring-primary"
              )}
            >
              <span className="text-xs text-muted-foreground">
                {format(day, 'd')}
              </span>

              {/* Event indicators */}
              <div className="absolute bottom-1 left-1 right-1">
                {dayEvents.slice(0, 2).map((event, i) => (
                  <div
                    key={event.id}
                    onClick={() => onEventClick(event.id)}
                    className="h-1 w-full rounded-sm mb-0.5 bg-foreground/20 hover:bg-foreground/40 cursor-pointer transition-colors"
                    title={event.title}
                  />
                ))}
                {dayEvents.length > 2 && (
                  <div className="text-[10px] text-muted-foreground">
                    +{dayEvents.length - 2}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ContinuousYearView;

