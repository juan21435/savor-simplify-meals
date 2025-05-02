
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from 'lucide-react';
import { ScrapbookItem } from './types';
import ScrapbookItemRenderer, { getItemIcon } from './ScrapbookItemRenderer';

interface ScrapbookItemCardProps {
  item: ScrapbookItem;
  onRemove: (itemId: string) => void;
}

const ScrapbookItemCard: React.FC<ScrapbookItemCardProps> = ({ item, onRemove }) => {
  return (
    <Card className="overflow-hidden">
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
            onClick={() => onRemove(item.id)}
          >
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <ScrapbookItemRenderer item={item} />
      </CardContent>
    </Card>
  );
};

export default ScrapbookItemCard;
