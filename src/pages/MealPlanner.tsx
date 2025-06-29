import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { CookingPot, Plus, Wand2 } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { MealPlan, Recipe, MealType, DayOfWeek } from "@/types/meal-planner";

const DAYS: DayOfWeek[] = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const MealPlanner = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedDay, setSelectedDay] = useState<DayOfWeek | null>(null);
  const [selectedMeal, setSelectedMeal] = useState<MealType | null>(null);

  const { data: mealPlan, isLoading: isLoadingMealPlan } = useQuery({
    queryKey: ["mealPlan", user?.id],
    queryFn: async () => {
      if (!user?.id) return null;

      const { data, error } = await supabase
        .from("meal_plans")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      if (error && error.code !== "PGRST116") throw error;
      
      // If no meal plan exists, create a default one
      if (!data) {
        const defaultMealPlan = {
          user_id: user.id,
          recipes: {},
          schedule: {
            start_date: new Date().toISOString(),
            end_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          },
        };

        const { data: newPlan, error: createError } = await supabase
          .from("meal_plans")
          .insert(defaultMealPlan)
          .select()
          .single();

        if (createError) throw createError;
        
        return {
          ...newPlan,
          recipes: {},
          schedule: defaultMealPlan.schedule,
        } as MealPlan;
      }

      return {
        ...data,
        recipes: data.recipes as MealPlan["recipes"] || {},
        schedule: data.schedule as MealPlan["schedule"] || {
          start_date: new Date().toISOString(),
          end_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        },
      } as MealPlan;
    },
    enabled: !!user?.id,
  });

  const { data: recipes } = useQuery({
    queryKey: ["recipes"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("recipes")
        .select("id, title, description, prep_time, cook_time, difficulty, categories");

      if (error) throw error;
      return data as Recipe[];
    },
  });

  const updateMealPlanMutation = useMutation({
    mutationFn: async (newRecipeId: number) => {
      if (!selectedDay || !selectedMeal || !user?.id || !mealPlan) return;

      const updatedRecipes = {
        ...mealPlan.recipes,
        [selectedDay]: {
          ...(mealPlan.recipes[selectedDay] || {}),
          [selectedMeal]: newRecipeId,
        },
      };

      const { error } = await supabase
        .from("meal_plans")
        .update({
          recipes: updatedRecipes,
        })
        .eq("id", mealPlan.id)
        .eq("user_id", user.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mealPlan", user?.id] });
      toast({
        title: "Meal plan updated",
        description: "Your meal plan has been successfully updated.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error updating meal plan",
        description: "Failed to update meal plan. Please try again.",
        variant: "destructive",
      });
      console.error("Error updating meal plan:", error);
    },
  });

  const generateMealPlan = async () => {
    if (!user?.id || !mealPlan || !recipes?.length) return;

    toast({
      title: "Generating meal plan",
      description: "AI is creating your personalized meal plan...",
    });

    try {
      const newMealPlan: MealPlan["recipes"] = {};
      DAYS.forEach((day) => {
        newMealPlan[day] = {
          breakfast: recipes[Math.floor(Math.random() * recipes.length)].id,
          lunch: recipes[Math.floor(Math.random() * recipes.length)].id,
          dinner: recipes[Math.floor(Math.random() * recipes.length)].id,
        };
      });

      const { error } = await supabase
        .from("meal_plans")
        .update({
          recipes: newMealPlan,
        })
        .eq("id", mealPlan.id)
        .eq("user_id", user.id);

      if (error) throw error;

      queryClient.invalidateQueries({ queryKey: ["mealPlan", user?.id] });
      toast({
        title: "Success",
        description: "Your AI-generated meal plan is ready!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate meal plan. Please try again.",
        variant: "destructive",
      });
      console.error("Error generating meal plan:", error);
    }
  };

  const getRecipeTitle = (recipeId: number) => {
    return recipes?.find((r) => r.id === recipeId)?.title || "Loading...";
  };

  if (isLoadingMealPlan) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sage"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream px-4 py-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="font-playfair text-3xl font-bold text-charcoal">
            Meal Planner
          </h1>
          <Button 
            onClick={generateMealPlan} 
            className="gap-2"
            disabled={!recipes?.length}
          >
            <Wand2 className="h-4 w-4" />
            Generate AI Meal Plan
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {DAYS.map((day) => (
            <Card key={day}>
              <CardHeader>
                <CardTitle>{day}</CardTitle>
                <CardDescription>Plan your meals for {day}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {(["breakfast", "lunch", "dinner"] as MealType[]).map((meal) => (
                    <div key={meal} className="rounded-lg border p-4">
                      <div className="mb-2 flex items-center justify-between">
                        <h3 className="font-medium capitalize">{meal}</h3>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setSelectedDay(day);
                                setSelectedMeal(meal);
                              }}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Select a Recipe</DialogTitle>
                              <DialogDescription>
                                Choose a recipe for {meal} on {day}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              {recipes?.map((recipe) => (
                                <Button
                                  key={recipe.id}
                                  variant="ghost"
                                  className="justify-start"
                                  onClick={() => {
                                    updateMealPlanMutation.mutate(recipe.id);
                                  }}
                                >
                                  {recipe.title}
                                </Button>
                              ))}
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                      <div className="flex items-center gap-2 rounded-lg bg-cream/30 p-3">
                        <CookingPot className="h-4 w-4 text-sage" />
                        <span className="text-sm">
                          {mealPlan?.recipes?.[day]?.[meal]
                            ? getRecipeTitle(mealPlan.recipes[day][meal]!)
                            : "No meal planned"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MealPlanner;