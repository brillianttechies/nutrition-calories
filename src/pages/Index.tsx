import React, { useState } from 'react';
import { ImageUploader } from '@/components/ImageUploader';
import { MacroDisplay } from '@/components/MacroDisplay';
import { FoodBreakdown } from '@/components/FoodBreakdown';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Sparkles, ChefHat, Activity } from 'lucide-react';
import { toast } from 'sonner';
import { MacroData, NutritionResponse } from '@/types/nutrition';

const Index = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [nutritionData, setNutritionData] = useState<MacroData | null>(null);
  const [foodBreakdown, setFoodBreakdown] = useState<NutritionResponse['food'] | null>(null);

  const handleImageSelect = async (file: File) => {
    setSelectedImage(file);
    setNutritionData(null);
    
    // Auto-analyze when image is selected
    await analyzeImage(file);
  };

  const analyzeImage = async (file: File) => {
    setIsAnalyzing(true);
    
    try {
      // Create FormData for API request
      const formData = new FormData();
      formData.append('image', file);
      
      const API_ENDPOINT = 'https://ai.anchoos.com/webhook/mealai';
      
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error('Failed to analyze image');
      }
      
      const data = await response.json();
      
      // Check if the response contains an error
      if (data.error) {
        console.error('API Error:', data.error);
        throw new Error(data.error || 'Analysis failed');
      }
      
      // Handle the response structure
      if (data && data.status === 'success') {
        // Set the total macros for display
        setNutritionData({
          calories: data.total.calories,
          protein: data.total.protein,
          carbs: data.total.carbs,
          fat: data.total.fat
        });
        
        // Set the food breakdown
        setFoodBreakdown(data.food);
        
        toast.success('Nutrition analysis complete!');
      } else {
        console.error('Unexpected response format:', data);
        throw new Error('Unable to analyze image. Please try a clearer photo of your meal.');
      }
    } catch (error) {
      console.error('Error analyzing image:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to analyze image';
      toast.error(errorMessage.includes('Model output') 
        ? 'Unable to identify food items. Please try a clearer photo with visible food.' 
        : errorMessage);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetAnalysis = () => {
    setSelectedImage(null);
    setNutritionData(null);
    setFoodBreakdown(null);
  };

  return (
    <div className="min-h-screen bg-gradient-health">
      {/* Hero Section */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary opacity-5" />
        <div className="container mx-auto px-4 py-8 md:py-12 relative">
          <nav className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-2">
              <ChefHat className="w-8 h-8 text-primary" />
              <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Hill Calories AI
              </h1>
            </div>
            <Button variant="ghost" size="sm">
              <Activity className="w-4 h-4 mr-2" />
              Track Progress
            </Button>
          </nav>

          <div className="text-center max-w-2xl mx-auto space-y-4 animate-fade-in">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground leading-tight">
              Instant Nutrition Analysis
              <span className="block text-primary mt-2">Powered by AI</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Simply upload a photo of your meal and get detailed macronutrient breakdown in seconds
            </p>
            
            <div className="flex gap-4 justify-center flex-wrap pt-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">AI-Powered</span>
              </div>
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">Instant Results</span>
              </div>
              <div className="flex items-center gap-2">
                <ChefHat className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">Any Meal</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          {!nutritionData ? (
            <Card className="p-6 md:p-8 bg-card/95 backdrop-blur border-0 shadow-xl">
              <ImageUploader 
                onImageSelect={handleImageSelect}
                isLoading={isAnalyzing}
              />
              
              {isAnalyzing && (
                <div className="mt-6 text-center">
                  <p className="text-sm text-muted-foreground animate-pulse">
                    Our AI is analyzing your meal...
                  </p>
                </div>
              )}
            </Card>
          ) : (
            <div className="space-y-6">
              <MacroDisplay data={nutritionData} />
              
              {foodBreakdown && foodBreakdown.length > 0 && (
                <FoodBreakdown foods={foodBreakdown} />
              )}
              
              <div className="flex justify-center">
                <Button 
                  onClick={resetAnalysis}
                  variant="hero"
                  size="lg"
                >
                  Analyze Another Meal
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 mt-auto">
        <div className="text-center text-sm text-muted-foreground">
          <p>© 2024 Hill Calories AI • Track your nutrition journey</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;