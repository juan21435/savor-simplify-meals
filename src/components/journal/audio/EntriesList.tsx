
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";

interface Entry {
  id: string;
  title: string;
  date: string;
  audio: string;
  transcription: string;
}

interface EntriesListProps {
  entries: Entry[];
}

const EntriesList: React.FC<EntriesListProps> = ({ entries }) => {
  return (
    <>
      {entries.length === 0 ? (
        <div className="text-center py-8 border rounded-md bg-muted/10">
          <p className="text-muted-foreground">No entries yet. Start by recording your first audio journal.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {entries.map((entry) => (
            <Card key={entry.id}>
              <CardHeader>
                <CardTitle>{entry.title}</CardTitle>
                <p className="text-sm text-muted-foreground">{entry.date}</p>
              </CardHeader>
              <CardContent>
                <p className="line-clamp-3 text-sm">{entry.transcription}</p>
              </CardContent>
              <CardFooter>
                <audio controls src={entry.audio} className="w-full" />
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </>
  );
};

export default EntriesList;
