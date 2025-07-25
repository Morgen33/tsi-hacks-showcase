import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, User } from "lucide-react";

interface Project {
  id: string;
  name: string;
  siteUrl: string;
  description: string;
  category: string;
  imageUrl?: string;
}

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Web3/Blockchain":
        return "bg-neon-purple text-primary-foreground";
      case "AI/ML":
        return "bg-neon-pink text-primary-foreground";
      case "Developer Tools":
        return "bg-neon-blue text-primary-foreground";
      case "Social Platforms":
        return "bg-neon-green text-primary-foreground";
      default:
        return "bg-accent text-accent-foreground";
    }
  };

  return (
    <Card className="group bg-card border-border hover:border-neon-purple transition-all duration-500 hover:shadow-lg hover:shadow-neon-purple/20 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-neon-purple" />
            <h3 className="font-bold text-foreground group-hover:text-neon-purple transition-colors">
              {project.name}
            </h3>
          </div>
          <Badge className={`${getCategoryColor(project.category)} font-medium`}>
            {project.category}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {project.imageUrl && (
          <div className="relative overflow-hidden rounded-lg aspect-video bg-muted">
            <img
              src={project.imageUrl}
              alt={`${project.name} project`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
        )}
        
        <p className="text-muted-foreground leading-relaxed text-sm">
          {project.description}
        </p>
        
        <Button
          variant="outline"
          className="w-full group/btn border-neon-purple text-neon-purple hover:bg-neon-purple hover:text-primary-foreground transition-all duration-300"
          onClick={() => window.open(project.siteUrl, '_blank')}
        >
          <ExternalLink className="w-4 h-4 mr-2" />
          Visit Project
        </Button>
      </CardContent>
    </Card>
  );
};