
import React from 'react';
import { Button } from "@/components/ui/button";
import { Mic, MicOff, Play, Pause } from 'lucide-react';

interface RecordingControlsProps {
  isRecording: boolean;
  audioURL: string | null;
  isPlaying: boolean;
  recordingTime: number;
  startRecording: () => void;
  stopRecording: () => void;
  togglePlayback: () => void;
  formatTime: (seconds: number) => string;
  audioPlayerRef: React.RefObject<HTMLAudioElement>;
}

const RecordingControls: React.FC<RecordingControlsProps> = ({
  isRecording,
  audioURL,
  isPlaying,
  recordingTime,
  startRecording,
  stopRecording,
  togglePlayback,
  formatTime,
  audioPlayerRef
}) => {
  return (
    <div className="flex flex-col items-center gap-4">
      {isRecording ? (
        <div className="flex flex-col items-center gap-2">
          <div className="text-2xl font-mono">{formatTime(recordingTime)}</div>
          <div className="animate-pulse text-destructive">● Recording</div>
        </div>
      ) : audioURL ? (
        <div className="w-full">
          <audio ref={audioPlayerRef} src={audioURL} onEnded={() => isPlaying && togglePlayback()} />
          <div className="flex items-center justify-center gap-2 mb-4">
            <Button variant="outline" size="sm" onClick={togglePlayback}>
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              {isPlaying ? "Pause" : "Play"}
            </Button>
          </div>
        </div>
      ) : null}
      
      <Button
        variant={isRecording ? "destructive" : "default"}
        size="lg"
        className="rounded-full w-16 h-16 flex items-center justify-center"
        onClick={isRecording ? stopRecording : startRecording}
      >
        {isRecording ? (
          <MicOff className="h-6 w-6" />
        ) : (
          <Mic className="h-6 w-6" />
        )}
      </Button>
      
      <div className="text-center text-sm text-muted-foreground">
        {isRecording 
          ? "Click to stop recording" 
          : audioURL 
            ? "Recording complete" 
            : "Click to start recording"}
      </div>
    </div>
  );
};

export default RecordingControls;
