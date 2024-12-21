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
import { useQuery, useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

interface MealPlan {
  id: number;
  user_id: string;
  recipes: {
    [key: string]: {
      breakfast?: number;
      lunch?: number;
      dinner?: number;
    };
  };
  schedule: {
    start_date: string;
    end_date: string;
  };
}

interface Recipe {
  id: number;
  title: string;
  description: string;
  prep_time: number;
  cook_time: number;
  difficulty: string;
  categories: string[];
}

const MealPlanner = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedMeal, setSelectedMeal] = useState<string | null>(null);

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

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
        return newPlan as MealPlan;
      }

      return {
        ...data,
        recipes: data.recipes || {},
        schedule: data.schedule || {
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
        .upsert({
          id: mealPlan.id,
          user_id: user.id,
          recipes: updatedRecipes,
          schedule: mealPlan.schedule,
        });

      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: "Meal plan updated",
        description: "Your meal plan has been successfully updated.",
      });
    },
  });

  const generateMealPlan = async () => {
    if (!user?.id || !mealPlan || !recipes?.length) return;

    toast({
      title: "Generating meal plan",
      description: "AI is creating your personalized meal plan...",
    });

    // Simulate AI generation delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const newMealPlan: { [key: string]: any } = {};
    days.forEach((day) => {
      newMealPlan[day] = {
        breakfast: recipes[Math.floor(Math.random() * recipes.length)].id,
        lunch: recipes[Math.floor(Math.random() * recipes.length)].id,
        dinner: recipes[Math.floor(Math.random() * recipes.length)].id,
      };
    });

    const { error } = await supabase
      .from("meal_plans")
      .upsert({
        id: mealPlan.id,
        user_id: user.id,
        recipes: newMealPlan,
        schedule: mealPlan.schedule,
      });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to generate meal plan. Please try again.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Your AI-generated meal plan is ready!",
    });
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
          {days.map((day) => (
            <Card key={day}>
              <CardHeader>
                <CardTitle>{day}</CardTitle>
                <CardDescription>Plan your meals for {day}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {["breakfast", "lunch", "dinner"].map((meal) => (
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
                            ? getRecipeTitle(mealPlan.recipes[day][meal])
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