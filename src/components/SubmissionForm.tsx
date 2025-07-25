import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface Submission {
  name: string;
  siteUrl: string;
  description: string;
  category: string;
  imageUrl: string;
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
  const [formData, setFormData] = useState<Submission>({
    name: "",
    siteUrl: "",
    description: "",
    category: "",
    imageUrl: ""
  });

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
      imageUrl: ""
    });
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
            <Label htmlFor="imageUrl" className="text-foreground font-medium">
              Project Image URL
            </Label>
            <Input
              id="imageUrl"
              type="url"
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              placeholder="https://example.com/image.jpg"
              className="bg-input border-border focus:border-neon-purple focus:ring-neon-purple"
            />
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