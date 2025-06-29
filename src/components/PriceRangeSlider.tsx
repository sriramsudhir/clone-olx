"use client";

import { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface PriceRangeSliderProps {
  min?: number;
  max?: number;
  step?: number;
  value: [number, number];
  onValueChange: (value: [number, number]) => void;
}

export default function PriceRangeSlider({
  min = 0,
  max = 100000000,
  step = 100000,
  value,
  onValueChange
}: PriceRangeSliderProps) {
  const [localValue, setLocalValue] = useState(value);

  const formatPrice = (price: number) => {
    return '₹' + new Intl.NumberFormat('en-IN').format(price);
  };

  const handleSliderChange = (newValue: number[]) => {
    const range: [number, number] = [newValue[0], newValue[1]];
    setLocalValue(range);
    onValueChange(range);
  };

  const handleInputChange = (index: 0 | 1, inputValue: string) => {
    const numValue = parseInt(inputValue.replace(/[^\d]/g, '')) || 0;
    const newValue: [number, number] = [...localValue];
    newValue[index] = Math.max(min, Math.min(max, numValue));
    setLocalValue(newValue);
    onValueChange(newValue);
  };

  return (
    <div className="space-y-4">
      <Label className="text-sm font-medium">Price Range</Label>
      
      <div className="px-2">
        <Slider
          value={localValue}
          onValueChange={handleSliderChange}
          max={max}
          min={min}
          step={step}
          className="w-full"
        />
      </div>
      
      <div className="flex items-center space-x-2">
        <div className="flex-1">
          <Label htmlFor="min-price" className="text-xs text-muted-foreground">Min</Label>
          <Input
            id="min-price"
            type="text"
            value={formatPrice(localValue[0])}
            onChange={(e) => handleInputChange(0, e.target.value)}
            className="text-sm"
          />
        </div>
        <span className="text-muted-foreground">-</span>
        <div className="flex-1">
          <Label htmlFor="max-price" className="text-xs text-muted-foreground">Max</Label>
          <Input
            id="max-price"
            type="text"
            value={formatPrice(localValue[1])}
            onChange={(e) => handleInputChange(1, e.target.value)}
            className="text-sm"
          />
        </div>
      </div>
      
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>{formatPrice(min)}</span>
        <span>{formatPrice(max)}</span>
      </div>
    </div>
  );
}