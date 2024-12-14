import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export const importRecipes = async (recipes: any[], userId: string) => {
  let successCount = 0;
  let errorCount = 0;

  for (const recipe of recipes) {
    console.log("Processing recipe:", recipe);
    const { error } = await supabase
      .from("recipes")
      .insert({
        title: recipe.title || "Untitled Recipe",
        description: recipe.description || "",
        image: recipe.image || null,
        prep_time: recipe.prep_time || null,
        cook_time: recipe.cook_time || null,
        total_time: recipe.total_time || null,
        difficulty: recipe.difficulty || "medium",
        servings: recipe.servings || null,
        categories: recipe.categories || [],
        tags: recipe.tags || [],
        user_id: userId,
      });

    if (error) {
      console.error("Error inserting recipe:", error);
      errorCount++;
      toast({
        title: "Error",
        description: `Failed to import recipe: ${recipe.title || "Untitled Recipe"}`,
        variant: "destructive",
      });
    } else {
      successCount++;
    }
  }

  if (successCount > 0) {
    toast({
      title: "Success",
      description: `Successfully imported ${successCount} recipes${
        errorCount > 0 ? ` (${errorCount} failed)` : ""
      }`,
    });
  }

  return { successCount, errorCount };
};