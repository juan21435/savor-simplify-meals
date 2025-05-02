
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
      className="bg-black/90 border border-white/20 rounded-md backdrop-blur-sm shadow-md"
    >
      <ToggleGroupItem value="year" aria-label="Year view" className="data-[state=on]:bg-gray-700 text-white hover:bg-gray-800">
        <Calendar className="h-4 w-4 mr-1" />
        Year
      </ToggleGroupItem>
      <ToggleGroupItem value="month" aria-label="Month view" className="data-[state=on]:bg-gray-700 text-white hover:bg-gray-800">
        <CalendarDays className="h-4 w-4 mr-1" />
        Month
      </ToggleGroupItem>
      <ToggleGroupItem value="week" aria-label="Week view" className="data-[state=on]:bg-gray-700 text-white hover:bg-gray-800">
        <Columns3 className="h-4 w-4 mr-1" />
        Week
      </ToggleGroupItem>
      <ToggleGroupItem value="day" aria-label="Day view" className="data-[state=on]:bg-gray-700 text-white hover:bg-gray-800">
        <Layout className="h-4 w-4 mr-1" />
        Day
      </ToggleGroupItem>
    </ToggleGroup>
  );
};

export default ViewModeSelector;
