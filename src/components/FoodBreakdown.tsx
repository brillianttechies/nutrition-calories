import React from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { FoodItem } from '@/types/nutrition';
import { Utensils, Scale } from 'lucide-react';

interface FoodBreakdownProps {
  foods: FoodItem[];
}

export const FoodBreakdown: React.FC<FoodBreakdownProps> = ({ foods }) => {
  return (
    <Card className="p-6 bg-card/95 backdrop-blur border-0 shadow-xl animate-fade-up">
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Utensils className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Food Breakdown</h3>
        </div>
        
        <div className="space-y-3">
          {foods.map((food, index) => (
            <div 
              key={index}
              className="p-4 rounded-lg bg-gradient-card border border-border/20 hover:border-primary/30 transition-all"
            >
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium text-foreground">{food.name}</h4>
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Scale className="w-3 h-3" />
                  {food.quantity}
                </Badge>
              </div>
              
              <div className="grid grid-cols-4 gap-2 text-sm">
                <div>
                  <span className="text-muted-foreground">Calories</span>
                  <p className="font-semibold text-primary">{food.calories}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Protein</span>
                  <p className="font-semibold text-nutrition-protein">{food.protein}g</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Carbs</span>
                  <p className="font-semibold text-nutrition-carbs">{food.carbs}g</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Fat</span>
                  <p className="font-semibold text-nutrition-fat">{food.fat}g</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};