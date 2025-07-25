import { Button } from "@/components/ui/button";

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export const CategoryFilter = ({ categories, selectedCategory, onCategoryChange }: CategoryFilterProps) => {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      <Button
        variant={selectedCategory === "all" ? "default" : "outline"}
        onClick={() => onCategoryChange("all")}
        className={`${
          selectedCategory === "all"
            ? "bg-gradient-neon text-primary-foreground neon-glow"
            : "border-border text-foreground hover:border-neon-purple hover:text-neon-purple"
        } transition-all duration-300`}
      >
        All Projects
      </Button>
      {categories.map((category) => (
        <Button
          key={category}
          variant={selectedCategory === category ? "default" : "outline"}
          onClick={() => onCategoryChange(category)}
          className={`${
            selectedCategory === category
              ? "bg-gradient-neon text-primary-foreground neon-glow"
              : "border-border text-foreground hover:border-neon-purple hover:text-neon-purple"
          } transition-all duration-300`}
        >
          {category}
        </Button>
      ))}
    </div>
  );
};