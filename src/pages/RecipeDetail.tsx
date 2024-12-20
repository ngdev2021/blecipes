import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Clock, ChefHat, Users, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

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
            notes
          ),
          instructions (
            id,
            step,
            instruction,
            tip
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
            </div>
          )}

          <div className="p-6">
            <h1 className="font-playfair text-3xl font-bold text-charcoal">
              {recipe.title}
            </h1>
            
            <p className="mt-4 text-gray-600">{recipe.description}</p>

            <div className="mt-6 flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-sage" />
                <span>{recipe.total_time} mins</span>
              </div>
              <div className="flex items-center gap-2">
                <ChefHat className="h-5 w-5 text-sage" />
                <span>{recipe.difficulty}</span>
              </div>
              {recipe.servings && (
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-sage" />
                  <span>{recipe.servings} servings</span>
                </div>
              )}
            </div>

            {recipe.categories && (
              <div className="mt-4 flex flex-wrap gap-2">
                {recipe.categories.map((category: string, index: number) => (
                  <span
                    key={index}
                    className="rounded-full bg-sage/10 px-3 py-1 text-sm text-sage"
                  >
                    {category}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-8">
              <h2 className="mb-4 font-playfair text-2xl font-semibold text-charcoal">
                Ingredients
              </h2>
              <ul className="space-y-2">
                {recipe.ingredients?.map((ingredient: any) => (
                  <li key={ingredient.id} className="flex items-baseline gap-2">
                    <span className="font-medium">
                      {ingredient.quantity} {ingredient.unit}
                    </span>
                    <span>{ingredient.name}</span>
                    {ingredient.notes && (
                      <span className="text-sm text-gray-500">
                        ({ingredient.notes})
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8">
              <h2 className="mb-4 font-playfair text-2xl font-semibold text-charcoal">
                Instructions
              </h2>
              <ol className="space-y-4">
                {recipe.instructions?.sort((a: any, b: any) => a.step - b.step).map((instruction: any) => (
                  <li key={instruction.id} className="flex gap-4">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sage text-sm text-white">
                      {instruction.step}
                    </span>
                    <div>
                      <p>{instruction.instruction}</p>
                      {instruction.tip && (
                        <p className="mt-2 text-sm text-sage">Tip: {instruction.tip}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RecipeDetail;