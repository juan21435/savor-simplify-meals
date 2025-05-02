
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { format } from 'date-fns';
import { 
  ImageIcon, 
  FileText, 
  LinkIcon, 
  Plus, 
  Save, 
  Trash2, 
  Calendar,
  Image,
  Video,
  File
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type ScrapbookItem = {
  id: string;
  type: 'note' | 'image' | 'video' | 'link';
  content: string;
  caption?: string;
  date: string;
  title: string;
};

type ScrapbookEntry = {
  id: string;
  date: string;
  title: string;
  items: ScrapbookItem[];
};

const DigitalScrapbook = () => {
  const [entries, setEntries] = useState<ScrapbookEntry[]>([]);
  const [currentEntry, setCurrentEntry] = useState<ScrapbookEntry | null>(null);
  const [newItemType, setNewItemType] = useState<ScrapbookItem['type']>('note');
  const [newItemContent, setNewItemContent] = useState('');
  const [newItemCaption, setNewItemCaption] = useState('');
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
  
  const addNewItem = () => {
    if (!currentEntry || !newItemContent) return;
    
    const newItem: ScrapbookItem = {
      id: crypto.randomUUID(),
      type: newItemType,
      content: newItemContent,
      caption: newItemCaption || undefined,
      date: format(new Date(), 'HH:mm'),
      title: `${newItemType.charAt(0).toUpperCase() + newItemType.slice(1)} - ${format(new Date(), 'HH:mm')}`
    };
    
    setCurrentEntry({
      ...currentEntry,
      items: [...currentEntry.items, newItem]
    });
    
    // Reset form
    setNewItemType('note');
    setNewItemContent('');
    setNewItemCaption('');
    setDialogOpen(false);
    
    toast({
      title: "Item added",
      description: `Your ${newItemType} has been added to the scrapbook.`,
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
  
  const renderItemContent = (item: ScrapbookItem) => {
    switch (item.type) {
      case 'note':
        return (
          <div className="p-3 bg-muted/20 rounded-md">
            <p className="whitespace-pre-wrap">{item.content}</p>
          </div>
        );
      case 'image':
        return (
          <div className="flex flex-col gap-2">
            <img 
              src={item.content}
              alt={item.caption || "Scrapbook image"} 
              className="rounded-md max-h-64 object-contain"
            />
            {item.caption && <p className="text-sm text-muted-foreground">{item.caption}</p>}
          </div>
        );
      case 'video':
        return (
          <div className="flex flex-col gap-2">
            <div className="aspect-video">
              <iframe 
                src={item.content}
                className="w-full h-full rounded-md"
                allowFullScreen
                title={item.caption || "Scrapbook video"}
              />
            </div>
            {item.caption && <p className="text-sm text-muted-foreground">{item.caption}</p>}
          </div>
        );
      case 'link':
        return (
          <div className="flex flex-col gap-2">
            <a 
              href={item.content}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline flex items-center gap-2"
            >
              <LinkIcon className="h-4 w-4" />
              {item.content}
            </a>
            {item.caption && <p className="text-sm text-muted-foreground">{item.caption}</p>}
          </div>
        );
    }
  };
  
  const getItemIcon = (type: ScrapbookItem['type']) => {
    switch (type) {
      case 'note': return <FileText className="h-4 w-4" />;
      case 'image': return <Image className="h-4 w-4" />;
      case 'video': return <Video className="h-4 w-4" />;
      case 'link': return <LinkIcon className="h-4 w-4" />;
    }
  };
  
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
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Item
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add to your scrapbook</DialogTitle>
                    <DialogDescription>
                      Add notes, images, videos, or links to today's digital scrapbook.
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="item-type">Item type</Label>
                      <Select
                        value={newItemType}
                        onValueChange={(value) => setNewItemType(value as ScrapbookItem['type'])}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select item type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="note">Text Note</SelectItem>
                          <SelectItem value="image">Image URL</SelectItem>
                          <SelectItem value="video">Video Embed</SelectItem>
                          <SelectItem value="link">Link</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="content">
                        {newItemType === 'note' ? 'Text' : 
                        newItemType === 'image' ? 'Image URL' : 
                        newItemType === 'video' ? 'Video Embed URL' : 'Link URL'}
                      </Label>
                      {newItemType === 'note' ? (
                        <Textarea
                          id="content"
                          value={newItemContent}
                          onChange={(e) => setNewItemContent(e.target.value)}
                          placeholder="Write your note here..."
                          className="resize-none"
                          rows={5}
                        />
                      ) : (
                        <Input
                          id="content"
                          value={newItemContent}
                          onChange={(e) => setNewItemContent(e.target.value)}
                          placeholder={
                            newItemType === 'image' ? 'https://example.com/image.jpg' :
                            newItemType === 'video' ? 'https://youtube.com/embed/xyz' :
                            'https://example.com'
                          }
                        />
                      )}
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="caption">Caption (Optional)</Label>
                      <Input
                        id="caption"
                        value={newItemCaption}
                        onChange={(e) => setNewItemCaption(e.target.value)}
                        placeholder="Add a caption..."
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" onClick={addNewItem}>Add to Scrapbook</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              
              <Button variant="outline" onClick={saveCurrentEntry}>
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {currentEntry.items.length === 0 ? (
            <div className="text-center py-12 border-2 border-dashed rounded-md">
              <div className="flex justify-center mb-4">
                <File className="h-12 w-12 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">No items yet</h3>
              <p className="text-muted-foreground mb-4">Add your first item to start your digital scrapbook for today.</p>
              <Button onClick={() => setDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Item
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {currentEntry.items.map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        {getItemIcon(item.type)}
                        <CardTitle className="text-sm font-medium">
                          {item.title}
                        </CardTitle>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {renderItemContent(item)}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
      
      {entries.length > 0 && (
        <div>
          <h3 className="text-lg font-medium mb-4">Previous Entries</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {entries
              .filter(entry => entry.id !== currentEntry.id)
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
                      onClick={() => setCurrentEntry(entry)}
                    >
                      View
                    </Button>
                  </CardFooter>
                </Card>
              ))
            }
          </div>
        </div>
      )}
    </div>
  );
};

export default DigitalScrapbook;
