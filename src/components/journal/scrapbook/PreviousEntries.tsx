
import React from 'react';
import { Card, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrapbookEntry } from './types';

interface PreviousEntriesProps {
  entries: ScrapbookEntry[];
  currentEntryId: string;
  onSelectEntry: (entry: ScrapbookEntry) => void;
}

const PreviousEntries: React.FC<PreviousEntriesProps> = ({ entries, currentEntryId, onSelectEntry }) => {
  if (entries.length === 0 || !entries.some(entry => entry.id !== currentEntryId)) {
    return null;
  }

  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Previous Entries</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {entries
          .filter(entry => entry.id !== currentEntryId)
          .map((entry) => (
            <Card key={entry.id} className="overflow-hidden">
              <CardHeader>
                <CardTitle className="text-base">{entry.title}</CardTitle>
                <p className="text-xs text-muted-foreground">{entry.items.length} items</p>
              </CardHeader>
              <CardFooter className="flex justify-between">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => onSelectEntry(entry)}
                >
                  View
                </Button>
              </CardFooter>
            </Card>
          ))
        }
      </div>
    </div>
  );
};

export default PreviousEntries;
