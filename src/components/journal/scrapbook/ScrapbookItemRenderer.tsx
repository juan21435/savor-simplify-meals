
import React from 'react';
import { FileText, LinkIcon, Image, Video } from 'lucide-react';
import { ScrapbookItem, ScrapbookItemType } from './types';

interface ScrapbookItemRendererProps {
  item: ScrapbookItem;
}

export const getItemIcon = (type: ScrapbookItemType) => {
  switch (type) {
    case 'note': return <FileText className="h-4 w-4" />;
    case 'image': return <Image className="h-4 w-4" />;
    case 'video': return <Video className="h-4 w-4" />;
    case 'link': return <LinkIcon className="h-4 w-4" />;
  }
};

const ScrapbookItemRenderer: React.FC<ScrapbookItemRendererProps> = ({ item }) => {
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

export default ScrapbookItemRenderer;
