import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, ArrowLeft, Info, Timer, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { RecipeHeader } from "@/components/recipe/RecipeHeader";
import { RecipeStats } from "@/components/recipe/RecipeStats";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const { data: recipe, isLoading } = useQuery({
    queryKey: ["recipe", id],
    queryFn: async () => {
      const { data: recipeData, error: recipeError } = await supabase
        .from("recipes")
        .select(`
          *,
          ingredients (
            id,
            name,
            quantity,
            unit,
            notes,
            dietary_info,
            quality_indicators
          ),
          instructions (
            id,
            step,
            instruction,
            tip,
            troubleshooting,
            timer
          )
        `)
        .eq("id", id)
        .maybeSingle(); // Changed from .single() to .maybeSingle()

      if (recipeError) {
        toast({
          title: "Error",
          description: "Failed to load recipe details",
          variant: "destructive",
        });
        throw recipeError;
      }

      if (!recipeData) {
        toast({
          title: "Recipe not found",
          description: "The requested recipe could not be found",
          variant: "destructive",
        });
        return null;
      }

      return {
        ...recipeData,
        equipment: recipeData.equipment as Record<string, any> || {},
      };
    },
  });

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-semibold">Recipe not found</h1>
        <Button onClick={() => navigate("/recipes")}>Back to Recipes</Button>
      </div>
    );
  }

  const categories = Array.isArray(recipe.categories) ? recipe.categories : 
                    typeof recipe.categories === 'object' && recipe.categories !== null ? 
                    Object.values(recipe.categories) : [];

  const dietaryInfo = recipe.dietary_restrictions ? 
    (typeof recipe.dietary_restrictions === 'object' ? 
      Object.entries(recipe.dietary_restrictions) : []) : [];

  return (
    <div className="min-h-screen bg-cream px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => navigate("/recipes")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Recipes
        </Button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="overflow-hidden rounded-lg bg-white shadow-lg"
        >
          <div className="p-6">
            <RecipeHeader
              image={recipe.image}
              title={recipe.title}
              description={recipe.description}
              isSeasonalRecipe={recipe.is_seasonal}
              culturalContext={recipe.cultural_context}
            />

            <RecipeStats
              totalTime={recipe.total_time}
              difficulty={recipe.difficulty}
              servings={recipe.servings}
              equipment={recipe.equipment}
            />

            <div className="mb-8">
              <h2 className="mb-4 font-playfair text-2xl font-semibold text-charcoal">
                Ingredients
              </h2>
              <ul className="space-y-3">
                {recipe.ingredients?.map((ingredient: any) => (
                  <li key={ingredient.id} className="flex items-baseline gap-2">
                    <span className="font-medium">
                      {ingredient.quantity} {ingredient.unit}
                    </span>
                    <span>{ingredient.name}</span>
                    <TooltipProvider>
                      {ingredient.notes && (
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="ml-1 h-4 w-4 text-gray-400" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{ingredient.notes}</p>
                          </TooltipContent>
                        </Tooltip>
                      )}
                    </TooltipProvider>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="mb-4 font-playfair text-2xl font-semibold text-charcoal">
                Instructions
              </h2>
              <ol className="space-y-6">
                {recipe.instructions?.sort((a: any, b: any) => a.step - b.step).map((instruction: any) => (
                  <li key={instruction.id} className="relative">
                    <div className="flex gap-4">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sage text-sm text-white">
                        {instruction.step}
                      </span>
                      <div className="flex-1">
                        <p>{instruction.instruction}</p>
                        
                        {instruction.timer && (
                          <div className="mt-2 flex items-center gap-2 text-sm text-sage">
                            <Timer className="h-4 w-4" />
                            <span>{instruction.timer.duration} minutes</span>
                          </div>
                        )}
                        
                        {instruction.tip && (
                          <div className="mt-3 rounded-lg bg-blue-50 p-3 text-sm text-blue-700">
                            <strong className="block font-medium">Tip:</strong>
                            {instruction.tip}
                          </div>
                        )}
                        
                        {instruction.troubleshooting && (
                          <div className="mt-3 rounded-lg bg-amber-50 p-3 text-sm text-amber-700">
                            <div className="mb-1 flex items-center gap-1">
                              <AlertTriangle className="h-4 w-4" />
                              <strong className="font-medium">Troubleshooting:</strong>
                            </div>
                            {instruction.troubleshooting}
                          </div>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {recipe.presentation_notes && (
              <div className="rounded-lg bg-cream/50 p-6">
                <h2 className="mb-3 font-playfair text-xl font-semibold text-charcoal">
                  Presentation Notes
                </h2>
                <p className="text-gray-600">{recipe.presentation_notes}</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RecipeDetail;