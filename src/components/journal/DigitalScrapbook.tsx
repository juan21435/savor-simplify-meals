
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Plus, Save, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { useScrapbook } from '@/hooks/useScrapbook';
import ScrapbookItemCard from './scrapbook/ScrapbookItemCard';
import AddItemDialog from './scrapbook/AddItemDialog';
import EmptyState from './scrapbook/EmptyState';
import PreviousEntries from './scrapbook/PreviousEntries';

const DigitalScrapbook = () => {
  const {
    entries,
    currentEntry,
    dialogOpen,
    setDialogOpen,
    saveCurrentEntry,
    addNewItem,
    removeItem,
    setCurrentEntry
  } = useScrapbook();
  
  if (!currentEntry) {
    return <div>Loading...</div>;
  }
  
  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <CardTitle>{currentEntry.title}</CardTitle>
              <p className="text-sm text-muted-foreground">
                <Calendar className="inline h-4 w-4 mr-1" />
                {format(new Date(currentEntry.date), 'EEEE, MMMM d, yyyy')}
              </p>
            </div>
            <div className="flex gap-2">
              <Button onClick={() => setDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Item
              </Button>
              
              <Button variant="outline" onClick={saveCurrentEntry}>
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {currentEntry.items.length === 0 ? (
            <EmptyState onAddItem={() => setDialogOpen(true)} />
          ) : (
            <div className="space-y-6">
              {currentEntry.items.map((item) => (
                <ScrapbookItemCard 
                  key={item.id} 
                  item={item} 
                  onRemove={removeItem} 
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
      
      <PreviousEntries 
        entries={entries}
        currentEntryId={currentEntry.id}
        onSelectEntry={setCurrentEntry}
      />
      
      <AddItemDialog 
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onAddItem={addNewItem}
      />
    </div>
  );
};

export default DigitalScrapbook;
