import { Button } from "@/components/ui/button";
import { Code2, Menu, X } from "lucide-react";
import { useState } from "react";

interface NavigationProps {
  onSubmitClick: () => void;
}

export const Navigation = ({ onSubmitClick }: NavigationProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* TSI Logo and Brand */}
          <div className="flex items-center gap-3">
            <img 
              src="/lovable-uploads/b1367f8e-0df3-4cc9-bb73-ab9cd6a9069c.png" 
              alt="TSI Logo" 
              className="w-10 h-10 object-contain"
            />
            <div className="flex flex-col">
              <span className="text-lg font-bold bg-gradient-neon bg-clip-text text-transparent">
                TSI HACKATHON
              </span>
              <span className="text-xs text-muted-foreground -mt-1">
                Project Directory
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Button 
              variant="ghost" 
              onClick={scrollToProjects}
              className="text-foreground hover:text-neon-purple transition-colors"
            >
              Browse Projects
            </Button>
            <Button 
              onClick={onSubmitClick}
              className="bg-gradient-neon hover:opacity-90 text-primary-foreground font-medium px-6 transition-all duration-300"
            >
              <Code2 className="w-4 h-4 mr-2" />
              Submit Project
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-foreground hover:text-neon-purple"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border bg-background/95 backdrop-blur-lg">
            <div className="flex flex-col gap-3">
              <Button 
                variant="ghost" 
                onClick={scrollToProjects}
                className="justify-start text-foreground hover:text-neon-purple transition-colors"
              >
                Browse Projects
              </Button>
              <Button 
                onClick={() => {
                  onSubmitClick();
                  setIsMenuOpen(false);
                }}
                className="justify-start bg-gradient-neon hover:opacity-90 text-primary-foreground font-medium transition-all duration-300"
              >
                <Code2 className="w-4 h-4 mr-2" />
                Submit Project
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};