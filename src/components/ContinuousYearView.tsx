
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
  0: 'from-[#F2FCE2]/10',  // January - Soft Green
  1: 'from-[#FEF7CD]/10',  // February - Soft Yellow
  2: 'from-[#FEC6A1]/10',  // March - Soft Orange
  3: 'from-[#E5DEFF]/10',  // April - Soft Purple
  4: 'from-[#FFDEE2]/10',  // May - Soft Pink
  5: 'from-[#FDE1D3]/10',  // June - Soft Peach
  6: 'from-[#D3E4FD]/10',  // July - Soft Blue
  7: 'from-[#F2FCE2]/10',  // August - Soft Green
  8: 'from-[#FEF7CD]/10',  // September - Soft Yellow
  9: 'from-[#FEC6A1]/10',  // October - Soft Orange
  10: 'from-[#E5DEFF]/10', // November - Soft Purple
  11: 'from-[#FFDEE2]/10'  // December - Soft Pink
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

  return (
    <div className="w-full overflow-auto rounded-lg border border-border/50">
      <div className="sticky top-0 z-10 bg-white text-gray-900 border-b border-border/50 py-2">
        <div className="grid grid-cols-7 gap-px">
          {weekDays.map(day => (
            <div key={day} className="text-center text-sm font-medium text-gray-600 p-1">
              {day}
            </div>
          ))}
        </div>
      </div>

      <div className="relative grid grid-cols-7 gap-px bg-white text-gray-900">
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
            />
          );
        })}

        {allDays.map((day, index) => {
          const dayEvents = events.filter(event => 
            isSameMonth(event.date, day) && isSameDay(event.date, day)
          );

          return (
            <div
              key={day.toString()}
              className={cn(
                "relative z-10 aspect-square p-1 border border-gray-100 group hover:bg-gray-50/80 transition-colors",
                isSameDay(day, new Date()) && "ring-1 ring-primary"
              )}
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
      </div>
    </div>
  );
};

export default ContinuousYearView;
