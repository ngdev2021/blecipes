import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { RecipeHeader } from "@/components/recipe/RecipeHeader";
import { RecipeStats } from "@/components/recipe/RecipeStats";
import { RecipeIngredients } from "@/components/recipe/RecipeIngredients";
import { RecipeInstructions } from "@/components/recipe/RecipeInstructions";

const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const { data: recipe, isLoading } = useQuery({
    queryKey: ["recipe", id],
    queryFn: async () => {
      console.log("Fetching recipe with ID:", id);

      if (!id || isNaN(Number(id))) {
        console.error("Invalid recipe ID:", id);
        toast({
          title: "Invalid Recipe ID",
          description: "The recipe ID provided is invalid",
          variant: "destructive",
        });
        return null;
      }

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
        .eq("id", Number(id))
        .maybeSingle();

      console.log("Recipe data:", recipeData);
      console.log("Recipe error:", recipeError);

      if (recipeError) {
        console.error("Error fetching recipe:", recipeError);
        toast({
          title: "Error",
          description: "Failed to load recipe details",
          variant: "destructive",
        });
        throw recipeError;
      }

      if (!recipeData) {
        console.log("Recipe not found for ID:", id);
        toast({
          title: "Recipe not found",
          description: "The requested recipe could not be found",
          variant: "destructive",
        });
        return null;
      }

      return {
        ...recipeData,
        equipment: typeof recipeData.equipment === 'object' && recipeData.equipment !== null
          ? recipeData.equipment
          : {}
      };
    },
    retry: false,
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

            <RecipeIngredients ingredients={recipe.ingredients || []} />
            <RecipeInstructions instructions={recipe.instructions || []} />

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