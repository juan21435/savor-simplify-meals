
import React from 'react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Calendar, Layout, Columns3, CalendarDays, Calendar as CalendarIcon } from 'lucide-react';

interface ViewModeSelectorProps {
  viewMode: string;
  onViewModeChange: (mode: string) => void;
}

const ViewModeSelector = ({ viewMode, onViewModeChange }: ViewModeSelectorProps) => {
  return (
    <ToggleGroup 
      type="single" 
      value={viewMode}
      onValueChange={(value) => {
        if (value) onViewModeChange(value);
      }}
      className="bg-background/50 backdrop-blur-sm border rounded-md"
    >
      <ToggleGroupItem value="year" aria-label="Year view">
        <Calendar className="h-4 w-4 mr-1" />
        Year
      </ToggleGroupItem>
      <ToggleGroupItem value="month" aria-label="Month view">
        <CalendarDays className="h-4 w-4 mr-1" />
        Month
      </ToggleGroupItem>
      <ToggleGroupItem value="week" aria-label="Week view">
        <Columns3 className="h-4 w-4 mr-1" />
        Week
      </ToggleGroupItem>
      <ToggleGroupItem value="day" aria-label="Day view">
        <Layout className="h-4 w-4 mr-1" />
        Day
      </ToggleGroupItem>
    </ToggleGroup>
  );
};

export default ViewModeSelector;
