
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
  layoutMode?: 'continuous' | 'aligned' | 'monthly';
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
  doubleUpView = false,
  layoutMode = 'continuous'
}: ContinuousYearViewProps) => {
  const year = currentDate.getFullYear();
  const months = eachMonthOfInterval({
    start: startOfYear(currentDate),
    end: new Date(year, 11, 31)
  });
  
  // Change to more intuitive day ordering with Sunday first
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Generate all days in the year
  const allDays = months.reduce((acc, month) => {
    const monthStart = startOfMonth(month);
    const monthEnd = endOfMonth(month);
    const days = eachDayOfInterval({
      start: monthStart,
      end: monthEnd
    });
    return [...acc, ...days];
  }, [] as Date[]);

  // Track month boundaries for coloring
  const monthBoundaries = months.map(month => ({
    month,
    firstDayIndex: allDays.findIndex(day => isSameMonth(day, month))
  }));

  // Adjust layout based on layoutMode
  let adjustedDays = [...allDays];
  
  if (layoutMode === 'aligned') {
    // For aligned mode, we need to adjust days to align by weekday
    adjustedDays = months.flatMap((month, monthIndex) => {
      const monthDays = eachDayOfInterval({
        start: startOfMonth(month),
        end: endOfMonth(month)
      });
      
      // Add padding days for alignment (empty days to align the 1st of each month)
      const firstDayOfMonth = monthDays[0];
      const dayOfWeek = firstDayOfMonth.getDay();
      const paddingDays = Array(dayOfWeek).fill(null);
      
      return [...paddingDays, ...monthDays];
    });
  } else if (layoutMode === 'monthly') {
    // For monthly mode, we'd separate by month completely
    // This would be a more complex implementation with month headers
    // For now, we'll use the same layout as 'continuous'
    adjustedDays = [...allDays];
  }

  return (
    <div className="w-full overflow-auto rounded-lg border border-border/50 bg-black">
      <div className="sticky top-0 z-10 bg-black text-white border-b border-border/50 py-2">
        <div className={`grid ${doubleUpView ? 'grid-cols-14' : 'grid-cols-7'} gap-px`}>
          {/* First week header */}
          {weekDays.map((day, idx) => (
            <div key={`${day}-${idx}-first`} className="text-center text-sm font-medium text-white p-1">
              {day}
            </div>
          ))}
          
          {/* Second week header for double-up view */}
          {doubleUpView && weekDays.map((day, idx) => (
            <div key={`${day}-${idx}-second`} className="text-center text-sm font-medium text-white p-1">
              {day}
            </div>
          ))}
        </div>
      </div>

      <div className={`relative grid ${doubleUpView ? 'grid-cols-14' : 'grid-cols-7'} gap-px bg-black text-white`}>
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
          
          // Calculate the position for the days based on doubleUpView
          let gridColumn = index % 7 + 1; // Default single week view
          let gridRow = Math.floor(index / 7) + 1;
          
          if (doubleUpView) {
            // For double-up view, we need to alternate between the first and second week columns
            const weekIndex = Math.floor(index / 7);
            const dayOfWeek = index % 7;
            
            // If it's an even week (0, 2, 4...), place it in the first week columns (1-7)
            // If it's an odd week (1, 3, 5...), place it in the second week columns (8-14)
            gridColumn = dayOfWeek + 1 + (weekIndex % 2 === 0 ? 0 : 7);
            gridRow = Math.floor(weekIndex / 2) + 1;
          }
          
          // Determine if this day is at a week boundary (for more visible separation)
          const isWeekBoundary = index % 7 === 0;
          
          return (
            <div
              key={`${day.toString()}-${index}`}
              className={cn(
                "relative z-10 aspect-square p-1 border border-gray-800 transition-colors",
                isWeekBoundary && "border-l-2 border-l-gray-500", // More visible week boundary
                (doubleUpView && gridColumn === 8) && "border-l-2 border-l-gray-500", // Add visible separation between weeks in double-up
                isSameDay(day, new Date()) && "ring-1 ring-primary",
                "group hover:bg-gray-900"
              )}
              style={{
                gridColumn,
                gridRow
              }}
            >
              <span className="text-xs text-white font-medium">
                {format(day, 'd')}
              </span>

              <div className="absolute bottom-1 left-1 right-1">
                {dayEvents.slice(0, 2).map((event) => (
                  <div
                    key={event.id}
                    onClick={() => onEventClick(event.id)}
                    className="h-1 w-full rounded-sm mb-0.5 bg-white/40 hover:bg-white/60 cursor-pointer transition-colors"
                    title={event.title}
                  />
                ))}
                {dayEvents.length > 2 && (
                  <div className="text-[10px] text-gray-300">
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
