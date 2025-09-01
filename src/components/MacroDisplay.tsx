import React from 'react';
import { ProgressRing } from './ProgressRing';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

export interface MacroData {
  protein: number;
  carbs: number;
  fat: number;
  calories: number;
  fiber?: number;
  sugar?: number;
}

interface MacroDisplayProps {
  data: MacroData;
}

export const MacroDisplay: React.FC<MacroDisplayProps> = ({ data }) => {
  const totalMacros = data.protein + data.carbs + data.fat;
  const proteinPercentage = (data.protein / totalMacros) * 100;
  const carbsPercentage = (data.carbs / totalMacros) * 100;
  const fatPercentage = (data.fat / totalMacros) * 100;

  return (
    <div className="w-full max-w-md mx-auto space-y-6 animate-fade-up">
      {/* Calories Card */}
      <Card className="p-6 bg-gradient-card backdrop-blur shadow-lg border-0">
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-2">Total Calories</p>
          <p className="text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            {data.calories}
          </p>
          <p className="text-sm text-muted-foreground mt-1">kcal</p>
        </div>
      </Card>

      {/* Macros Grid */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="p-4 bg-card/90 backdrop-blur border-0 shadow-md hover:shadow-lg transition-all">
          <div className="flex flex-col items-center space-y-3">
            <ProgressRing
              percentage={proteinPercentage}
              size={80}
              strokeWidth={8}
              color="hsl(var(--protein))"
              backgroundColor="hsl(var(--protein-light))"
            />
            <div className="text-center">
              <p className="text-2xl font-bold text-nutrition-protein">{data.protein}g</p>
              <p className="text-xs text-muted-foreground">Protein</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-card/90 backdrop-blur border-0 shadow-md hover:shadow-lg transition-all">
          <div className="flex flex-col items-center space-y-3">
            <ProgressRing
              percentage={carbsPercentage}
              size={80}
              strokeWidth={8}
              color="hsl(var(--carbs))"
              backgroundColor="hsl(var(--carbs-light))"
            />
            <div className="text-center">
              <p className="text-2xl font-bold text-nutrition-carbs">{data.carbs}g</p>
              <p className="text-xs text-muted-foreground">Carbs</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-card/90 backdrop-blur border-0 shadow-md hover:shadow-lg transition-all">
          <div className="flex flex-col items-center space-y-3">
            <ProgressRing
              percentage={fatPercentage}
              size={80}
              strokeWidth={8}
              color="hsl(var(--fat))"
              backgroundColor="hsl(var(--fat-light))"
            />
            <div className="text-center">
              <p className="text-2xl font-bold text-nutrition-fat">{data.fat}g</p>
              <p className="text-xs text-muted-foreground">Fat</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Additional Nutrients */}
      {(data.fiber || data.sugar) && (
        <Card className="p-4 bg-card/90 backdrop-blur border-0 shadow-md">
          <div className="flex justify-around">
            {data.fiber && (
              <div className="text-center">
                <p className="text-lg font-semibold text-foreground">{data.fiber}g</p>
                <p className="text-xs text-muted-foreground">Fiber</p>
              </div>
            )}
            {data.sugar && (
              <div className="text-center">
                <p className="text-lg font-semibold text-foreground">{data.sugar}g</p>
                <p className="text-xs text-muted-foreground">Sugar</p>
              </div>
            )}
          </div>
        </Card>
      )}

      {/* Macro Distribution */}
      <div className="flex gap-2 justify-center flex-wrap">
        <Badge className="bg-nutrition-protein-light text-nutrition-protein border-0">
          Protein {Math.round(proteinPercentage)}%
        </Badge>
        <Badge className="bg-nutrition-carbs-light text-nutrition-carbs border-0">
          Carbs {Math.round(carbsPercentage)}%
        </Badge>
        <Badge className="bg-nutrition-fat-light text-nutrition-fat border-0">
          Fat {Math.round(fatPercentage)}%
        </Badge>
      </div>
    </div>
  );
};