
import React from 'react';
import { CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ViewModeSelectorProps {
  viewMode: 'year' | 'month';
  onViewModeChange: (mode: 'year' | 'month') => void;
}

const ViewModeSelector = ({ viewMode, onViewModeChange }: ViewModeSelectorProps) => {
  return (
    <>
      <Button 
        variant={viewMode === 'year' ? 'default' : 'outline'} 
        onClick={() => onViewModeChange('year')}
        className="flex gap-2 items-center"
      >
        <CalendarIcon className="h-4 w-4" />
        Year
      </Button>
      <Button 
        variant={viewMode === 'month' ? 'default' : 'outline'} 
        onClick={() => onViewModeChange('month')}
        className="flex gap-2 items-center"
      >
        <CalendarIcon className="h-4 w-4" />
        Month
      </Button>
    </>
  );
};

export default ViewModeSelector;
