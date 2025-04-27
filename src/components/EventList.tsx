
import React from 'react';
import { format } from 'date-fns';
import { Calendar } from 'lucide-react';

interface Event {
  id: string;
  title: string;
  date: Date;
  endDate: Date;
  category: string;
}

interface EventListProps {
  events: Event[];
  onEventClick: (eventId: string) => void;
}

const EventList = ({ events, onEventClick }: EventListProps) => {
  // Group events by date
  const groupedEvents: { [date: string]: Event[] } = events.reduce((acc, event) => {
    const dateKey = format(event.date, 'yyyy-MM-dd');
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(event);
    return acc;
  }, {} as { [date: string]: Event[] });

  // Sort dates
  const sortedDates = Object.keys(groupedEvents).sort();

  return (
    <div className="space-y-6">
      {sortedDates.length === 0 ? (
        <p className="text-muted-foreground text-center py-4">No events scheduled</p>
      ) : (
        sortedDates.map(dateKey => {
          const dateEvents = groupedEvents[dateKey];
          const eventDate = new Date(dateEvents[0].date);
          
          return (
            <div key={dateKey} className="animate-fade-in">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="h-4 w-4 text-primary" />
                <h3 className="text-sm font-medium">
                  {format(eventDate, 'EEEE, MMMM d')}
                </h3>
              </div>
              
              <div className="space-y-2 pl-6">
                {dateEvents.map(event => (
                  <div
                    key={event.id}
                    onClick={() => onEventClick(event.id)}
                    className="glass-morphism p-3 rounded cursor-pointer hover:ring-1 hover:ring-primary transition-all"
                  >
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium">{event.title}</h4>
                      <span className="text-xs text-muted-foreground">
                        {format(event.date, 'h:mm a')}
                      </span>
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground">
                      {format(event.date, 'h:mm a')} - {format(event.endDate, 'h:mm a')}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default EventList;
