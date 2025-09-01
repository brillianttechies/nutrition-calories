import React, { useCallback, useState } from 'react';
import { Upload, Camera, X } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

interface ImageUploaderProps {
  onImageSelect: (file: File) => void;
  isLoading?: boolean;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelect, isLoading }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileSelect = useCallback((file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      onImageSelect(file);
    }
  }, [onImageSelect]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFileSelect(file);
  }, [handleFileSelect]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  }, [handleFileSelect]);

  const clearImage = useCallback(() => {
    setPreview(null);
  }, []);

  return (
    <div className="w-full max-w-md mx-auto">
      {!preview ? (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={cn(
            "relative rounded-2xl transition-all duration-300 min-h-[300px] flex flex-col items-center justify-center p-8",
            isDragging ? "scale-105 border-primary" : "",
            "border-2 border-dashed border-primary/30 bg-gradient-card hover:border-primary/50"
          )}
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleFileInput}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            disabled={isLoading}
          />
          
          <div className="text-center space-y-4 pointer-events-none">
            <div className="mx-auto w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
              <Upload className="w-10 h-10 text-primary" />
            </div>
            
            <div>
              <p className="text-lg font-semibold text-foreground mb-1">
                Drop your meal photo here
              </p>
              <p className="text-sm text-muted-foreground">
                or click to browse
              </p>
            </div>

            <div className="flex gap-2 justify-center mt-4">
              <Button variant="hero" size="sm" className="pointer-events-auto">
                <Camera className="w-4 h-4 mr-2" />
                Take Photo
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative rounded-2xl overflow-hidden shadow-lg animate-scale-in">
          <img
            src={preview}
            alt="Meal preview"
            className="w-full h-auto max-h-[400px] object-cover"
          />
          <Button
            onClick={clearImage}
            variant="destructive"
            size="icon"
            className="absolute top-4 right-4 rounded-full"
            disabled={isLoading}
          >
            <X className="w-4 h-4" />
          </Button>
          
          {isLoading && (
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center">
              <div className="space-y-4 text-center">
                <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="text-sm font-medium text-foreground animate-pulse">
                  Analyzing your meal...
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};