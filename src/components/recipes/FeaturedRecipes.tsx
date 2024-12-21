import { Star } from "lucide-react";
import { RecipeCard } from "@/components/RecipeCard";

interface FeaturedRecipe {
  id: number;
  title: string;
  description: string;
  image: string;
  time: string;
  difficulty: string;
  categories?: string[];
  servings?: number;
}

interface FeaturedRecipesProps {
  recipes: FeaturedRecipe[];
}

export const FeaturedRecipes = ({ recipes }: FeaturedRecipesProps) => {
  if (!recipes.length) return null;

  return (
    <div className="mb-8 space-y-4">
      <div className="flex items-center gap-2">
        <Star className="h-5 w-5 text-yellow-400 fill-current" />
        <h2 className="text-xl font-semibold">Featured Recipes</h2>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} {...recipe} />
        ))}
      </div>
    </div>
  );
};