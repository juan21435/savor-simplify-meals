
import React from 'react';
import { Textarea } from "@/components/ui/textarea";

interface TranscriptionEditorProps {
  audioURL: string | null;
  transcription: string;
  setTranscription: (value: string) => void;
}

const TranscriptionEditor: React.FC<TranscriptionEditorProps> = ({
  audioURL,
  transcription,
  setTranscription
}) => {
  return (
    <>
      {audioURL ? (
        <>
          {transcription ? (
            <Textarea
              className="h-64 resize-none"
              value={transcription}
              onChange={(e) => setTranscription(e.target.value)}
              placeholder="Transcription will appear here..."
            />
          ) : (
            <div className="flex items-center justify-center h-64 border rounded-md bg-muted/10">
              <div className="text-center animate-pulse">Generating transcription...</div>
            </div>
          )}
        </>
      ) : (
        <div className="flex items-center justify-center h-64 border rounded-md bg-muted/10">
          <div className="text-center text-muted-foreground">
            Record your thoughts to see the transcription here
          </div>
        </div>
      )}
    </>
  );
};

export default TranscriptionEditor;
