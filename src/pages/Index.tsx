import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { SubmissionForm } from "@/components/SubmissionForm";
import { ProjectCard } from "@/components/ProjectCard";
import { CategoryFilter } from "@/components/CategoryFilter";
import { Button } from "@/components/ui/button";
import { Code2, Zap, Users, Trophy, ExternalLink } from "lucide-react";
import heroBanner from "@/assets/hero-banner.jpg";
interface Project {
  id: string;
  name: string;
  siteUrl: string;
  description: string;
  category: string;
  imageUrl?: string;
  imageFile?: File;
}
const Index = () => {
  const [projects, setProjects] = useState<Project[]>([{
    id: "1",
    name: "BOINK",
    siteUrl: "https://boinkme.xyz/",
    description: "A dating/networking platform for Web3 people. Our ai matches you up with like minded people.",
    category: "Web3/Blockchain",
    imageUrl: "/lovable-uploads/946b12de-11b6-45f6-ba28-fa6e7515d1f0.png"
  }]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const categories = [...new Set(projects.map(p => p.category))];
  const filteredProjects = selectedCategory === "all" ? projects : projects.filter(p => p.category === selectedCategory);
  const handleSubmit = (submission: { name: string; siteUrl: string; description: string; categories: string[]; imageUrl?: string }) => {
    const newProject: Project = {
      ...submission,
      category: submission.categories[0], // Use first category for display
      id: Date.now().toString()
    };
    setProjects([...projects, newProject]);
    setShowForm(false);
  };
  return <div className="min-h-screen bg-background">
      {/* Navigation */}
      <Navigation onSubmitClick={() => setShowForm(true)} />
      {/* Hero Section */}
      <div className="relative overflow-hidden pt-16">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{
        backgroundImage: `url(${heroBanner})`
      }} />
        <div className="absolute inset-0 bg-background/80" />
        
        <div className="relative container mx-auto px-4 py-20">
          <div className="text-center space-y-8">
            {/* Large TSI Logo */}
            <div className="flex justify-center mb-8">
              <img src="/lovable-uploads/ed720235-4972-4f7d-8bd2-2c1b207c3111.png" alt="TSI Logo" className="w-32 h-32 md:w-40 md:h-40 object-contain animate-float drop-shadow-2xl" />
            </div>
            
            {/* TSI Badge */}
            <div className="flex justify-center">
              <div className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-card/50 backdrop-blur-sm border border-neon-purple/30 shadow-lg">
                <Zap className="w-6 h-6 text-neon-purple animate-pulse-glow" />
                <span className="text-neon-purple font-bold text-xl tracking-wide bg-gradient-to-r from-neon-purple to-neon-pink bg-clip-text text-transparent animate-pulse-glow">TSI HACKATHON 2025</span>
              </div>
            </div>
            
            
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Discover amazing projects built by TSI Hackathon participants. 
              Showcase your innovation and explore what others have created.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => setShowForm(true)} variant="outline" className="border-neon-purple text-neon-purple hover:bg-neon-purple hover:text-primary-foreground px-8 py-3 text-lg transition-all duration-300 hover:shadow-neon-purple/30 hover:shadow-2xl">
                <Code2 className="w-5 h-5 mr-2" />
                Submit Your Project
              </Button>
              <Button variant="outline" onClick={() => document.getElementById('projects')?.scrollIntoView({
              behavior: 'smooth'
            })} className="border-neon-purple text-neon-purple hover:bg-neon-purple hover:text-primary-foreground px-8 py-3 text-lg transition-all duration-300 hover:shadow-neon-purple/30 hover:shadow-2xl">
                <Trophy className="w-5 h-5 mr-2" />
                View Projects
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-bold text-neon-purple text-glow animate-pulse-glow">
                {projects.length}
              </div>
              <div className="text-muted-foreground">Projects Submitted</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-neon-pink text-glow animate-pulse-glow">
                {categories.length}
              </div>
              <div className="text-muted-foreground">Categories</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-neon-blue text-glow animate-pulse-glow">
                <Users className="w-10 h-10 mx-auto mb-2 text-neon-blue" />
              </div>
              <div className="text-muted-foreground">Amazing Builders</div>
            </div>
          </div>
        </div>
      </div>

      {/* Submission Form */}
      {showForm && <div className="py-20">
          <div className="container mx-auto px-4">
            <SubmissionForm onSubmit={handleSubmit} />
            <div className="text-center mt-8">
              <Button variant="ghost" onClick={() => setShowForm(false)} className="text-muted-foreground hover:text-foreground">
                Cancel
              </Button>
            </div>
          </div>
        </div>}

      {/* Projects Section */}
      <div id="projects" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-8 mb-16">
            <h2 className="text-4xl md:text-6xl font-bold text-foreground">
              Featured Projects
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore innovative solutions built during the TSI Hackathon 2025
            </p>
          </div>

          {/* Category Filter */}
          <div className="mb-12">
            <CategoryFilter categories={categories} selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} />
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map(project => <ProjectCard key={project.id} project={project} />)}
          </div>

          {filteredProjects.length === 0 && <div className="text-center py-16">
              <Code2 className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-2xl font-bold text-foreground mb-2">No projects found</h3>
              <p className="text-muted-foreground">
                {selectedCategory === "all" ? "Be the first to submit a project!" : `No projects in ${selectedCategory} category yet.`}
              </p>
            </div>}
        </div>
      </div>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-6">
            {/* TSI Logo + Brand */}
            <div className="flex items-center justify-center gap-3">
              <img src="/lovable-uploads/ed720235-4972-4f7d-8bd2-2c1b207c3111.png" alt="TSI Logo" className="w-8 h-8 object-contain" />
              <div className="flex items-center gap-2">
                
                <span className="text-xl font-bold text-foreground bg-gradient-to-r from-neon-purple to-neon-pink bg-clip-text text-transparent">
                  TSI HACKATHON 2025
                </span>
              </div>
            </div>
            
            <p className="text-muted-foreground max-w-md mx-auto">
              Showcasing innovation and creativity from the tech community. 
              Built by developers, for developers.
            </p>
            
            {/* Footer Links */}
            <div className="flex items-center justify-center gap-6 text-sm">
              <Button variant="ghost" size="sm" onClick={() => document.getElementById('projects')?.scrollIntoView({
              behavior: 'smooth'
            })} className="text-muted-foreground hover:text-neon-purple transition-colors">
                Browse Projects
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setShowForm(true)} className="text-muted-foreground hover:text-neon-purple transition-colors">
                Submit Project
              </Button>
              <Button variant="ghost" size="sm" asChild className="text-muted-foreground hover:text-neon-purple transition-colors">
                <a href="https://tsi.org" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-3 h-3 mr-1" />
                  Visit TSI
                </a>
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>;
};
export default Index;