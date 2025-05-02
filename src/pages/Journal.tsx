
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Mic, Book, ImageIcon, FileText, Link as LinkIcon } from 'lucide-react';
import AudioJournal from '@/components/journal/AudioJournal';
import DigitalScrapbook from '@/components/journal/DigitalScrapbook';

const Journal = () => {
  const [activeTab, setActiveTab] = useState("audio");
  
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
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 mb-8 bg-secondary">
          <TabsTrigger value="audio" className="flex gap-2 items-center">
            <Mic className="h-4 w-4" />
            <span>Audio Journal</span>
          </TabsTrigger>
          <TabsTrigger value="scrapbook" className="flex gap-2 items-center">
            <Book className="h-4 w-4" />
            <span>Digital Scrapbook</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="audio">
          <AudioJournal />
        </TabsContent>
        
        <TabsContent value="scrapbook">
          <DigitalScrapbook />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Journal;
