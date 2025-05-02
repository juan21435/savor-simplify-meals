
import React from 'react';
import { Button } from "@/components/ui/button";
import { File, Plus } from 'lucide-react';

interface EmptyStateProps {
  onAddItem: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ onAddItem }) => {
  return (
    <div className="text-center py-12 border-2 border-dashed rounded-md">
      <div className="flex justify-center mb-4">
        <File className="h-12 w-12 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-medium mb-2">No items yet</h3>
      <p className="text-muted-foreground mb-4">Add your first item to start your digital scrapbook for today.</p>
      <Button onClick={onAddItem}>
        <Plus className="h-4 w-4 mr-2" />
        Add Your First Item
      </Button>
    </div>
  );
};

export default EmptyState;
