
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Save, Trash } from 'lucide-react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import RecordingControls from './audio/RecordingControls';
import TranscriptionEditor from './audio/TranscriptionEditor';
import EntriesList from './audio/EntriesList';
import { useAudioJournal } from '@/hooks/useAudioJournal';

const AudioJournal = () => {
  const {
    isRecording,
    recordingTime,
    audioURL,
    isPlaying,
    transcription,
    title,
    entries,
    audioPlayerRef,
    setTitle,
    setTranscription,
    startRecording,
    stopRecording,
    togglePlayback,
    formatTime,
    saveEntry,
    discardRecording
  } = useAudioJournal();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Record Your Thoughts</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="mb-4">
              <Label htmlFor="entry-title">Entry Title</Label>
              <Input 
                id="entry-title" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                placeholder="Give your entry a title"
                disabled={isRecording}
              />
            </div>
            
            <RecordingControls 
              isRecording={isRecording}
              audioURL={audioURL}
              isPlaying={isPlaying}
              recordingTime={recordingTime}
              startRecording={startRecording}
              stopRecording={stopRecording}
              togglePlayback={togglePlayback}
              formatTime={formatTime}
              audioPlayerRef={audioPlayerRef}
            />
          </CardContent>
          
          {audioURL && (
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline" onClick={discardRecording}>
                <Trash className="h-4 w-4 mr-2" />
                Discard
              </Button>
              <Button onClick={saveEntry}>
                <Save className="h-4 w-4 mr-2" />
                Save Entry
              </Button>
            </CardFooter>
          )}
        </Card>
      </div>
      
      <div>
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Transcription</CardTitle>
          </CardHeader>
          <CardContent>
            <TranscriptionEditor 
              audioURL={audioURL}
              transcription={transcription}
              setTranscription={setTranscription}
            />
          </CardContent>
        </Card>
      </div>
      
      <div className="md:col-span-2">
        <h3 className="text-lg font-medium mb-4">Previous Entries</h3>
        <EntriesList entries={entries} />
      </div>
    </div>
  );
};

export default AudioJournal;
