
import React from 'react';
import { ChevronLeft, ChevronRight, List, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';

interface ScheduleControlsProps {
  currentDate: Date;
  viewMode: 'year' | 'month' | 'week' | 'day';
  showSidebar: boolean;
  onPreviousPeriod: () => void;
  onNextPeriod: () => void;
  onToggleSidebar: () => void;
  onAddEvent: () => void;
}

const ScheduleControls = ({
  currentDate,
  viewMode,
  showSidebar,
  onPreviousPeriod,
  onNextPeriod,
  onToggleSidebar,
  onAddEvent
}: ScheduleControlsProps) => {
  const getDateTitle = () => {
    switch (viewMode) {
      case 'year':
        return currentDate.getFullYear().toString();
      case 'month':
        return format(currentDate, 'MMMM yyyy');
      case 'week':
        return `Week of ${format(currentDate, 'MMM d, yyyy')}`;
      case 'day':
        return format(currentDate, 'MMMM d, yyyy');
      default:
        return format(currentDate, 'MMMM yyyy');
    }
  };

  return (
    <>
      <div className="flex gap-4 mb-8">
        <Button onClick={onPreviousPeriod} variant="outline" size="icon">
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1 text-center">
          <h2 className="text-2xl font-display">{getDateTitle()}</h2>
        </div>
        <Button onClick={onNextPeriod} variant="outline" size="icon">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="flex gap-4 mb-6">
        <div className="flex-1"></div>
        <Button 
          variant="outline" 
          onClick={onToggleSidebar}
          className="flex gap-2 items-center"
        >
          <List className="h-4 w-4" />
          {showSidebar ? 'Hide Events' : 'Show Events'}
        </Button>
        <Button 
          onClick={onAddEvent}
          className="flex gap-2 items-center"
        >
          <Plus className="h-4 w-4" />
          Add Event
        </Button>
      </div>
    </>
  );
};

export default ScheduleControls;
