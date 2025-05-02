
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrapbookItemType } from './types';

interface AddItemDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddItem: (type: ScrapbookItemType, content: string, caption: string) => void;
}

const AddItemDialog: React.FC<AddItemDialogProps> = ({ open, onOpenChange, onAddItem }) => {
  const [newItemType, setNewItemType] = useState<ScrapbookItemType>('note');
  const [newItemContent, setNewItemContent] = useState('');
  const [newItemCaption, setNewItemCaption] = useState('');

  const handleAddItem = () => {
    if (!newItemContent) return;
    onAddItem(newItemType, newItemContent, newItemCaption);
    resetForm();
  };

  const resetForm = () => {
    setNewItemType('note');
    setNewItemContent('');
    setNewItemCaption('');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
              onValueChange={(value) => setNewItemType(value as ScrapbookItemType)}
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
          <Button type="submit" onClick={handleAddItem}>Add to Scrapbook</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddItemDialog;
