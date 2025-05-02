
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowLeft, Mic, Book } from 'lucide-react';
import AudioJournal from '@/components/journal/AudioJournal';
import DigitalScrapbook from '@/components/journal/DigitalScrapbook';

const Journal = () => {
  return (
    <div className="container-custom py-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link to="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-4xl font-display font-bold text-foreground italic">My Journal</h1>
        </div>
      </div>
      
      <div className="journal-page">
        <div className="relative p-8 bg-[#f3f3f3] rounded-lg shadow-md border-t-4 border-primary">
          {/* Journal Header */}
          <div className="mb-8 pb-4 border-b border-gray-300">
            <h2 className="text-3xl font-display font-semibold text-center italic text-gray-800">
              Personal Journal
            </h2>
          </div>
          
          {/* Audio Journal */}
          <div className="mb-10">
            <h2 className="text-2xl font-display font-semibold flex items-center gap-2 mb-6 text-gray-700">
              <Mic className="h-5 w-5 text-primary" />
              Voice Entries
            </h2>
            <AudioJournal />
          </div>
          
          {/* Digital Scrapbook */}
          <div className="mb-6">
            <h2 className="text-2xl font-display font-semibold flex items-center gap-2 mb-6 text-gray-700">
              <Book className="h-5 w-5 text-primary" />
              Scrapbook
            </h2>
            <DigitalScrapbook />
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-3 left-3 w-3 h-40 border-r border-gray-300"></div>
          <div className="absolute top-3 right-3 w-3 h-40 border-l border-gray-300"></div>
          <div className="absolute -left-2 top-20 w-4 h-10 bg-primary rounded-l-full"></div>
          <div className="absolute -left-2 top-40 w-4 h-10 bg-primary rounded-l-full"></div>
          <div className="absolute -left-2 top-60 w-4 h-10 bg-primary rounded-l-full"></div>
        </div>
      </div>
    </div>
  );
};

export default Journal;
