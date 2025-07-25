import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Upload, X, Image as ImageIcon } from "lucide-react";

interface Submission {
  name: string;
  siteUrl: string;
  description: string;
  categories: string[];
  imageFile?: File;
  imageUrl?: string;
}

interface SubmissionFormProps {
  onSubmit: (submission: Submission) => void;
}

const categories = [
  "Web3/Blockchain",
  "AI/ML",
  "Developer Tools",
  "Social Platforms",
  "E-commerce",
  "Gaming",
  "Education",
  "Healthcare",
  "Fintech",
  "Other"
];

export const SubmissionForm = ({ onSubmit }: SubmissionFormProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [formData, setFormData] = useState<Submission>({
    name: "",
    siteUrl: "",
    description: "",
    categories: [],
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error("Image must be smaller than 5MB");
        return;
      }
      
      if (!file.type.startsWith('image/')) {
        toast.error("Please upload an image file");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImagePreview(result);
        setFormData({ ...formData, imageFile: file, imageUrl: result });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    setFormData({ ...formData, imageFile: undefined, imageUrl: undefined });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleCategoryChange = (category: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      categories: checked 
        ? [...prev.categories, category]
        : prev.categories.filter(c => c !== category)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.siteUrl || !formData.description || formData.categories.length === 0) {
      toast.error("Please fill in all required fields");
      return;
    }

    onSubmit(formData);
    setFormData({
      name: "",
      siteUrl: "",
      description: "",
      categories: [],
    });
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    toast.success("Project submitted successfully!");
  };

  return (
    <Card className="w-full max-w-2xl mx-auto border-neon-purple bg-card backdrop-blur-sm shadow-2xl shadow-neon-purple/20">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold bg-gradient-to-r from-neon-purple to-neon-pink bg-clip-text text-transparent">
          Submit Your Project
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-foreground font-medium">
              Project Name *
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter your project name"
              className="bg-input border-border focus:border-neon-purple focus:ring-neon-purple"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="siteUrl" className="text-foreground font-medium">
              Project URL *
            </Label>
            <Input
              id="siteUrl"
              type="url"
              value={formData.siteUrl}
              onChange={(e) => setFormData({ ...formData, siteUrl: e.target.value })}
              placeholder="https://yourproject.com"
              className="bg-input border-border focus:border-neon-purple focus:ring-neon-purple"
            />
          </div>

          <div className="space-y-3">
            <Label className="text-foreground font-medium">
              Categories * (Select one or more)
            </Label>
            <div className="grid grid-cols-2 gap-3">
              {categories.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
                    id={category}
                    checked={formData.categories.includes(category)}
                    onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
                    className="border-border data-[state=checked]:bg-neon-purple data-[state=checked]:border-neon-purple"
                  />
                  <Label
                    htmlFor={category}
                    className="text-sm text-foreground cursor-pointer"
                  >
                    {category}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-foreground font-medium">
              Project Image
            </Label>
            
            {!imagePreview ? (
              <div className="border-2 border-dashed border-border hover:border-neon-purple transition-colors rounded-lg p-8 text-center bg-input/50">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full h-full flex flex-col items-center gap-3 text-muted-foreground hover:text-neon-purple transition-colors"
                >
                  <Upload className="w-8 h-8" />
                  <div>
                    <div className="font-medium">Click to upload image</div>
                    <div className="text-sm">PNG, JPG up to 5MB</div>
                  </div>
                </Button>
              </div>
            ) : (
              <div className="relative border border-border rounded-lg overflow-hidden bg-card">
                <img
                  src={imagePreview}
                  alt="Project preview"
                  className="w-full h-48 object-cover"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={removeImage}
                  className="absolute top-2 right-2 bg-background/80 hover:bg-background text-foreground hover:text-destructive transition-colors"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-foreground font-medium">
              Project Description *
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Tell us about your project, what it does, and what makes it special..."
              rows={4}
              className="bg-input border-border focus:border-neon-purple focus:ring-neon-purple resize-none"
            />
          </div>

          <Button 
            type="submit" 
            variant="outline"
            className="w-full border-neon-purple text-neon-purple hover:bg-neon-purple hover:text-primary-foreground font-bold py-3 text-lg transition-all duration-300 hover:shadow-neon-purple/30 hover:shadow-2xl animate-pulse-glow"
          >
            Submit Project
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};