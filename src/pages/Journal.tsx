
import React, { useState } from 'react';
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
          <h1 className="text-4xl font-display font-bold text-foreground">Personal Journal</h1>
        </div>
      </div>
      
      <div className="flex flex-col gap-12">
        {/* Audio Journal */}
        <div>
          <h2 className="text-2xl font-display font-semibold flex items-center gap-2 mb-6">
            <Mic className="h-5 w-5 text-primary" />
            Audio Journal
          </h2>
          <AudioJournal />
        </div>
        
        {/* Digital Scrapbook */}
        <div>
          <h2 className="text-2xl font-display font-semibold flex items-center gap-2 mb-6">
            <Book className="h-5 w-5 text-primary" />
            Digital Scrapbook
          </h2>
          <DigitalScrapbook />
        </div>
      </div>
    </div>
  );
};

export default Journal;
