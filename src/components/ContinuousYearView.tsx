
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
  monthColors?: string[];
  doubleUpView?: boolean;
}

const defaultMonthColors = {
  0: '#F2FCE2',  // January
  1: '#FEF7CD',  // February
  2: '#FEC6A1',  // March
  3: '#E5DEFF',  // April
  4: '#FFDEE2',  // May
  5: '#FDE1D3',  // June
  6: '#D3E4FD',  // July
  7: '#F2FCE2',  // August
  8: '#FEF7CD',  // September
  9: '#FEC6A1',  // October
  10: '#E5DEFF', // November
  11: '#FFDEE2'  // December
};

const ContinuousYearView = ({
  currentDate,
  events,
  onEventClick,
  monthColors = [],
  doubleUpView = false
}: ContinuousYearViewProps) => {
  const year = currentDate.getFullYear();
  const months = eachMonthOfInterval({
    start: startOfYear(currentDate),
    end: new Date(year, 11, 31)
  });
  
  // Change to more intuitive day ordering with Sunday first
  const weekDays = doubleUpView 
    ? ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const allDays = months.reduce((acc, month) => {
    const monthStart = startOfMonth(month);
    const monthEnd = endOfMonth(month);
    const days = eachDayOfInterval({
      start: monthStart,
      end: monthEnd
    });
    return [...acc, ...days];
  }, [] as Date[]);

  const monthBoundaries = months.map(month => ({
    month,
    firstDayIndex: allDays.findIndex(day => isSameMonth(day, month))
  }));

  // Determine the grid columns based on double-up view
  const gridCols = doubleUpView ? 'grid-cols-14' : 'grid-cols-7';

  return (
    <div className="w-full overflow-auto rounded-lg border border-border/50">
      <div className="sticky top-0 z-10 bg-white text-gray-900 border-b border-border/50 py-2">
        <div className={`grid ${gridCols} gap-px`}>
          {weekDays.map((day, idx) => (
            <div key={`${day}-${idx}`} className="text-center text-sm font-medium text-gray-600 p-1">
              {day}
            </div>
          ))}
        </div>
      </div>

      <div className={`relative grid ${gridCols} gap-px bg-white text-gray-900`}>
        {monthBoundaries.map(({ month, firstDayIndex }, index) => {
          const nextMonthStart = monthBoundaries[index + 1]?.firstDayIndex || allDays.length;
          const daysInMonth = nextMonthStart - firstDayIndex;
          const monthColor = monthColors[month.getMonth()] || defaultMonthColors[month.getMonth()];
          
          // Calculate grid columns for double-up view
          const gridColSpan = doubleUpView ? 14 : 7;
          
          return (
            <div
              key={month.toString()}
              className="absolute z-0"
              style={{
                gridRow: `${Math.floor(firstDayIndex / (doubleUpView ? 14 : 7)) + 1} / span ${Math.ceil(daysInMonth / (doubleUpView ? 14 : 7))}`,
                gridColumn: `1 / span ${gridColSpan}`,
                backgroundColor: monthColor + '1A', // Adding transparency
              }}
            />
          );
        })}

        {allDays.map((day, index) => {
          const dayEvents = events.filter(event => 
            isSameMonth(event.date, day) && isSameDay(event.date, day)
          );
          
          // Determine if this day is at a week boundary (for more visible separation)
          const isWeekBoundary = index % (doubleUpView ? 14 : 7) === 0;
          
          // For double-up view, calculate duplicate position
          let displayIndex = index;
          if (doubleUpView) {
            const weekIndex = Math.floor(index / 7);
            const dayOfWeek = index % 7;
            displayIndex = weekIndex * 14 + dayOfWeek;
          }
          
          return (
            <div
              key={`${day.toString()}-${displayIndex}`}
              className={cn(
                "relative z-10 aspect-square p-1 border border-gray-100 transition-colors",
                isWeekBoundary && "border-l-2 border-l-gray-300", // More visible week boundary
                isSameDay(day, new Date()) && "ring-1 ring-primary",
                "group hover:bg-gray-50/80"
              )}
              style={{
                gridRow: `auto`,
                gridColumn: `auto`,
                ...(doubleUpView && {
                  gridColumnStart: (displayIndex % 14) + 1
                })
              }}
            >
              <span className="text-xs text-gray-600">
                {format(day, 'd')}
              </span>

              <div className="absolute bottom-1 left-1 right-1">
                {dayEvents.slice(0, 2).map((event) => (
                  <div
                    key={event.id}
                    onClick={() => onEventClick(event.id)}
                    className="h-1 w-full rounded-sm mb-0.5 bg-gray-400/40 hover:bg-gray-400/60 cursor-pointer transition-colors"
                    title={event.title}
                  />
                ))}
                {dayEvents.length > 2 && (
                  <div className="text-[10px] text-gray-500">
                    +{dayEvents.length - 2}
                  </div>
                )}
              </div>
            </div>
          );
        })}
        
        {/* If double-up view is enabled, duplicate the days */}
        {doubleUpView && allDays.map((day, index) => {
          const dayEvents = events.filter(event => 
            isSameMonth(event.date, day) && isSameDay(event.date, day)
          );
          
          // Calculate second column position
          const weekIndex = Math.floor(index / 7);
          const dayOfWeek = index % 7;
          const displayIndex = weekIndex * 14 + dayOfWeek + 7; // +7 for second column
          
          return (
            <div
              key={`${day.toString()}-duplicate-${displayIndex}`}
              className={cn(
                "relative z-10 aspect-square p-1 border border-gray-100 transition-colors",
                dayOfWeek === 0 && "border-l-2 border-l-gray-300", // More visible week boundary
                isSameDay(day, new Date()) && "ring-1 ring-primary",
                "group hover:bg-gray-50/80"
              )}
              style={{
                gridRow: `auto`,
                gridColumnStart: (displayIndex % 14) + 1
              }}
            >
              <span className="text-xs text-gray-600">
                {format(day, 'd')}
              </span>

              <div className="absolute bottom-1 left-1 right-1">
                {dayEvents.slice(0, 2).map((event) => (
                  <div
                    key={`dup-${event.id}`}
                    onClick={() => onEventClick(event.id)}
                    className="h-1 w-full rounded-sm mb-0.5 bg-gray-400/40 hover:bg-gray-400/60 cursor-pointer transition-colors"
                    title={event.title}
                  />
                ))}
                {dayEvents.length > 2 && (
                  <div className="text-[10px] text-gray-500">
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
