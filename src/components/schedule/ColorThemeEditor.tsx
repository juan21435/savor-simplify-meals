
import React, { useState, useEffect } from 'react';
import { Paintbrush, Save, Shuffle, Palette } from 'lucide-react';
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
import { Slider } from '@/components/ui/slider';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

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

const colorPalettes = {
  "Pastel": ["#F2FCE2", "#FEF7CD", "#FEC6A1", "#E5DEFF", "#FFDEE2", "#FDE1D3", "#D3E4FD"],
  "Cool Blues": ["#E3F2FD", "#BBDEFB", "#90CAF9", "#64B5F6", "#42A5F5", "#2196F3", "#1E88E5"],
  "Warm Earth": ["#FFECB3", "#FFE082", "#FFD54F", "#FFCA28", "#FFC107", "#FFB300", "#FFA000"],
  "Forest": ["#C8E6C9", "#A5D6A7", "#81C784", "#66BB6A", "#4CAF50", "#43A047", "#388E3C"],
  "Vibrant": ["#FF9AA2", "#FFB7B2", "#FFDAC1", "#E2F0CB", "#B5EAD7", "#C7CEEA", "#F6E6EA"]
};

interface ColorThemeEditorProps {
  onColorsChange: (colors: MonthColor[]) => void;
}

const ColorThemeEditor = ({ onColorsChange }: ColorThemeEditorProps) => {
  const [colors, setColors] = useState<MonthColor[]>(defaultMonthColors);
  const [tempColors, setTempColors] = useState<MonthColor[]>(defaultMonthColors);
  const [selectedPalette, setSelectedPalette] = useState<string>("Pastel");
  const [shadeIntensity, setShadeIntensity] = useState<number>(50);
  const { toast } = useToast();

  // Apply shade intensity to colors
  useEffect(() => {
    const applyShade = () => {
      const newColors = [...tempColors];
      
      newColors.forEach((month, index) => {
        const baseColor = month.color;
        
        // Only apply shade if not default intensity (50%)
        if (shadeIntensity !== 50) {
          const factor = shadeIntensity / 50;
          
          // Convert hex to RGB
          const r = parseInt(baseColor.slice(1, 3), 16);
          const g = parseInt(baseColor.slice(3, 5), 16);
          const b = parseInt(baseColor.slice(5, 7), 16);
          
          // Apply shading (darken or lighten)
          const newR = Math.min(255, Math.max(0, factor < 1 ? r * factor : r + (255 - r) * (factor - 1)));
          const newG = Math.min(255, Math.max(0, factor < 1 ? g * factor : g + (255 - g) * (factor - 1)));
          const newB = Math.min(255, Math.max(0, factor < 1 ? b * factor : b + (255 - b) * (factor - 1)));
          
          // Convert back to hex
          const newColor = '#' + 
            Math.round(newR).toString(16).padStart(2, '0') + 
            Math.round(newG).toString(16).padStart(2, '0') + 
            Math.round(newB).toString(16).padStart(2, '0');
          
          newColors[index] = { ...month, color: newColor };
        }
      });
      
      setTempColors(newColors);
    };
    
    applyShade();
  }, [shadeIntensity, colors]);

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

  const applyPalette = (paletteName: string) => {
    setSelectedPalette(paletteName);
    const paletteColors = colorPalettes[paletteName as keyof typeof colorPalettes];
    
    const newColors = [...tempColors].map((month, index) => {
      return {
        ...month,
        color: paletteColors[index % paletteColors.length]
      };
    });
    
    setTempColors(newColors);
    
    toast({
      title: "Palette applied",
      description: `Applied ${paletteName} palette to months.`,
    });
  };

  const randomizeColors = () => {
    const newColors = [...tempColors].map(month => {
      const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
      return { ...month, color: randomColor };
    });
    
    setTempColors(newColors);
    
    toast({
      title: "Colors randomized",
      description: "Random colors have been applied.",
    });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="w-10 h-10">
          <Paintbrush className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[350px] sm:w-[450px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Color Theme Editor</SheetTitle>
          <SheetDescription>
            Customize the colors for each month in the calendar view.
          </SheetDescription>
        </SheetHeader>
        
        <div className="mt-6">
          <Label>Palettes:</Label>
          <div className="flex items-center gap-2 mt-2 mb-4 flex-wrap">
            {Object.keys(colorPalettes).map(palette => (
              <Button 
                key={palette}
                variant={selectedPalette === palette ? "default" : "outline"}
                size="sm"
                onClick={() => applyPalette(palette)}
                className="flex items-center gap-1"
              >
                <Palette className="w-3 h-3" />
                {palette}
              </Button>
            ))}
            <Button 
              variant="outline"
              size="sm"
              onClick={randomizeColors}
              className="flex items-center gap-1 ml-auto"
            >
              <Shuffle className="w-3 h-3" />
              Randomize
            </Button>
          </div>
        </div>
        
        <div className="mt-6">
          <div className="flex justify-between items-center">
            <Label>Shade:</Label>
            <span className="text-sm text-muted-foreground">
              {shadeIntensity < 50 ? 'Darker' : shadeIntensity > 50 ? 'Lighter' : 'Normal'}
            </span>
          </div>
          <Slider 
            value={[shadeIntensity]}
            min={0}
            max={100}
            step={1}
            className="mt-2"
            onValueChange={(value) => setShadeIntensity(value[0])}
          />
        </div>
        
        <div className="grid gap-4 py-4 mt-4">
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
