
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { useToast } from "@/components/ui/use-toast";
import { ScrapbookEntry, ScrapbookItem, ScrapbookItemType } from '../components/journal/scrapbook/types';

export const useScrapbook = () => {
  const [entries, setEntries] = useState<ScrapbookEntry[]>([]);
  const [currentEntry, setCurrentEntry] = useState<ScrapbookEntry | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Load saved entries from localStorage
    const savedEntries = localStorage.getItem('scrapbookEntries');
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries));
    }
    
    // Initialize today's entry if it doesn't exist
    const today = format(new Date(), 'yyyy-MM-dd');
    initializeOrLoadEntry(today);
  }, []);
  
  const initializeOrLoadEntry = (date: string) => {
    const existingEntry = entries.find(entry => entry.date === date);
    
    if (existingEntry) {
      setCurrentEntry(existingEntry);
    } else {
      const newEntry: ScrapbookEntry = {
        id: crypto.randomUUID(),
        date,
        title: format(new Date(date), 'MMMM d, yyyy'),
        items: []
      };
      setCurrentEntry(newEntry);
    }
  };
  
  const saveCurrentEntry = () => {
    if (!currentEntry) return;
    
    const updatedEntries = entries.filter(entry => entry.id !== currentEntry.id);
    const newEntries = [...updatedEntries, currentEntry].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    
    setEntries(newEntries);
    localStorage.setItem('scrapbookEntries', JSON.stringify(newEntries));
    
    toast({
      title: "Entry saved",
      description: "Your scrapbook entry has been saved successfully.",
    });
  };
  
  const addNewItem = (type: ScrapbookItemType, content: string, caption: string) => {
    if (!currentEntry || !content) return;
    
    const newItem: ScrapbookItem = {
      id: crypto.randomUUID(),
      type,
      content,
      caption: caption || undefined,
      date: format(new Date(), 'HH:mm'),
      title: `${type.charAt(0).toUpperCase() + type.slice(1)} - ${format(new Date(), 'HH:mm')}`
    };
    
    setCurrentEntry({
      ...currentEntry,
      items: [...currentEntry.items, newItem]
    });
    
    setDialogOpen(false);
    
    toast({
      title: "Item added",
      description: `Your ${type} has been added to the scrapbook.`,
    });
  };
  
  const removeItem = (itemId: string) => {
    if (!currentEntry) return;
    
    setCurrentEntry({
      ...currentEntry,
      items: currentEntry.items.filter(item => item.id !== itemId)
    });
    
    toast({
      title: "Item removed",
      description: "The item has been removed from your scrapbook.",
    });
  };

  return {
    entries,
    currentEntry,
    dialogOpen,
    setDialogOpen,
    initializeOrLoadEntry,
    saveCurrentEntry,
    addNewItem,
    removeItem,
    setCurrentEntry
  };
};
