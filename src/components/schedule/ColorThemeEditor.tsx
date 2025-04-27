
import React from 'react';
import { Paintbrush, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

interface MonthColor {
  name: string;
  color: string;
}

const defaultMonthColors: MonthColor[] = [
  { name: 'January', color: '#F2FCE2' },
  { name: 'February', color: '#FEF7CD' },
  { name: 'March', color: '#FEC6A1' },
  { name: 'April', color: '#E5DEFF' },
  { name: 'May', color: '#FFDEE2' },
  { name: 'June', color: '#FDE1D3' },
  { name: 'July', color: '#D3E4FD' },
  { name: 'August', color: '#F2FCE2' },
  { name: 'September', color: '#FEF7CD' },
  { name: 'October', color: '#FEC6A1' },
  { name: 'November', color: '#E5DEFF' },
  { name: 'December', color: '#FFDEE2' },
];

interface ColorThemeEditorProps {
  onColorsChange: (colors: MonthColor[]) => void;
}

const ColorThemeEditor = ({ onColorsChange }: ColorThemeEditorProps) => {
  const [colors, setColors] = React.useState<MonthColor[]>(defaultMonthColors);
  const [tempColors, setTempColors] = React.useState<MonthColor[]>(defaultMonthColors);
  const { toast } = useToast();

  const handleColorChange = (index: number, newColor: string) => {
    const updatedColors = [...tempColors];
    updatedColors[index] = { ...tempColors[index], color: newColor };
    setTempColors(updatedColors);
  };

  const handleSave = () => {
    setColors(tempColors);
    onColorsChange(tempColors);
    toast({
      title: "Colors saved",
      description: "Your color theme has been updated.",
    });
  };

  const handleReset = () => {
    setTempColors(colors);
    toast({
      title: "Changes reset",
      description: "Your changes have been discarded.",
    });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="w-10 h-10">
          <Paintbrush className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Color Theme Editor</SheetTitle>
          <SheetDescription>
            Customize the colors for each month in the calendar view.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          {tempColors.map((month, index) => (
            <div key={month.name} className="flex items-center gap-4">
              <Label htmlFor={`color-${index}`} className="w-24">
                {month.name}
              </Label>
              <Input
                id={`color-${index}`}
                type="color"
                value={month.color}
                onChange={(e) => handleColorChange(index, e.target.value)}
                className="w-16 h-8 p-0 cursor-pointer"
              />
              <div
                className="w-full h-8 rounded"
                style={{ backgroundColor: month.color + '1A' }}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-6">
          <Button variant="outline" onClick={handleReset}>
            Reset Changes
          </Button>
          <Button onClick={handleSave} className="flex items-center gap-2">
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ColorThemeEditor;
