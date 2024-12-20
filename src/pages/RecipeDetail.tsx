import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { 
  Loader2, 
  Clock, 
  ChefHat, 
  Users, 
  ArrowLeft,
  Utensils,
  Timer,
  AlertTriangle,
  Info
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
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
        .single();

      if (recipeError) {
        toast({
          title: "Error",
          description: "Failed to load recipe details",
          variant: "destructive",
        });
        throw recipeError;
      }

      return recipeData;
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
          {recipe.image && (
            <div className="relative h-[400px]">
              <img
                src={recipe.image}
                alt={recipe.title}
                className="h-full w-full object-cover"
              />
              {recipe.is_seasonal && (
                <div className="absolute right-4 top-4 rounded-full bg-sage px-4 py-2 text-sm font-medium text-white">
                  Seasonal Recipe
                </div>
              )}
            </div>
          )}

          <div className="p-6">
            <div className="mb-6 border-b border-gray-200 pb-6">
              <h1 className="font-playfair text-3xl font-bold text-charcoal">
                {recipe.title}
              </h1>
              
              <p className="mt-4 text-gray-600">{recipe.description}</p>

              {recipe.cultural_context && (
                <div className="mt-4 rounded-lg bg-cream/50 p-4">
                  <h3 className="mb-2 font-medium text-charcoal">Cultural Context</h3>
                  <p className="text-sm text-gray-600">{recipe.cultural_context}</p>
                </div>
              )}
            </div>

            <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div className="flex flex-col items-center rounded-lg bg-cream/30 p-4">
                <Clock className="mb-2 h-6 w-6 text-sage" />
                <span className="text-sm font-medium">{recipe.total_time} mins</span>
                <span className="text-xs text-gray-500">Total Time</span>
              </div>
              <div className="flex flex-col items-center rounded-lg bg-cream/30 p-4">
                <ChefHat className="mb-2 h-6 w-6 text-sage" />
                <span className="text-sm font-medium">{recipe.difficulty}</span>
                <span className="text-xs text-gray-500">Difficulty</span>
              </div>
              <div className="flex flex-col items-center rounded-lg bg-cream/30 p-4">
                <Users className="mb-2 h-6 w-6 text-sage" />
                <span className="text-sm font-medium">{recipe.servings} servings</span>
                <span className="text-xs text-gray-500">Yield</span>
              </div>
              <div className="flex flex-col items-center rounded-lg bg-cream/30 p-4">
                <Utensils className="mb-2 h-6 w-6 text-sage" />
                <span className="text-sm font-medium">
                  {recipe.equipment ? Object.keys(recipe.equipment).length : 0}
                </span>
                <span className="text-xs text-gray-500">Tools Needed</span>
              </div>
            </div>

            {categories.length > 0 && (
              <div className="mb-6">
                <h2 className="mb-3 font-playfair text-xl font-semibold text-charcoal">
                  Categories
                </h2>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category: string, index: number) => (
                    <span
                      key={index}
                      className="rounded-full bg-sage/10 px-3 py-1 text-sm text-sage"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {dietaryInfo.length > 0 && (
              <div className="mb-6">
                <h2 className="mb-3 font-playfair text-xl font-semibold text-charcoal">
                  Dietary Information
                </h2>
                <div className="flex flex-wrap gap-2">
                  {dietaryInfo.map(([key, value]: [string, any], index: number) => (
                    <span
                      key={index}
                      className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600"
                    >
                      {key}: {String(value)}
                    </span>
                  ))}
                </div>
              </div>
            )}

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