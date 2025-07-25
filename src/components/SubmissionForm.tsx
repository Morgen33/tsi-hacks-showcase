import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Upload, X, Image as ImageIcon } from "lucide-react";

interface Submission {
  name: string;
  siteUrl: string;
  description: string;
  category: string;
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
    category: "",
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.siteUrl || !formData.description || !formData.category) {
      toast.error("Please fill in all required fields");
      return;
    }

    onSubmit(formData);
    setFormData({
      name: "",
      siteUrl: "",
      description: "",
      category: "",
    });
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    toast.success("Project submitted successfully!");
  };

  return (
    <Card className="w-full max-w-2xl mx-auto border-border bg-card backdrop-blur-sm">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold bg-gradient-neon bg-clip-text text-transparent text-glow">
          Submit Your Project
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-foreground font-medium">
              Your Name *
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter your full name"
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

          <div className="space-y-2">
            <Label htmlFor="category" className="text-foreground font-medium">
              Category *
            </Label>
            <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
              <SelectTrigger className="bg-input border-border focus:border-neon-purple focus:ring-neon-purple">
                <SelectValue placeholder="Select project category" />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border">
                {categories.map((category) => (
                  <SelectItem key={category} value={category} className="focus:bg-accent">
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
            className="w-full bg-gradient-neon hover:opacity-90 transition-all duration-300 text-primary-foreground font-bold py-3 text-lg neon-glow animate-pulse-glow"
          >
            Submit Project
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};