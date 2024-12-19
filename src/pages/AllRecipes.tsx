import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SearchBar } from "@/components/SearchBar";
import { RecipeCard } from "@/components/RecipeCard";
import { Loader2 } from "lucide-react";

type RecipeType = "recipes" | "sides" | "drinks" | "sauces" | "seasoning_blends";

const AllRecipes = () => {
  const [activeTab, setActiveTab] = useState<RecipeType>("recipes");

  const { data: items, isLoading } = useQuery({
    queryKey: ["culinary-items", activeTab],
    queryFn: async () => {
      const { data, error } = await supabase
        .from(activeTab)
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching items:", error);
        throw error;
      }

      return data;
    },
  });

  const renderItems = () => {
    if (isLoading) {
      return (
        <div className="flex h-64 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      );
    }

    if (!items?.length) {
      return (
        <div className="text-center text-gray-500">
          No items found in this category
        </div>
      );
    }

    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((item) => (
          <RecipeCard
            key={item.id}
            title={item.name || item.title}
            description={item.description || ""}
            image={item.image || "/placeholder.svg"}
            time={`${item.prep_time || item.preparation_time || 0} mins`}
            difficulty={item.difficulty || "medium"}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-cream px-4 py-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-center font-playfair text-4xl font-bold text-charcoal">
          Culinary Collection
        </h1>
        <div className="mb-8">
          <SearchBar />
        </div>

        <Tabs
          defaultValue="recipes"
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as RecipeType)}
          className="w-full"
        >
          <TabsList className="mb-8 grid w-full grid-cols-2 gap-4 md:grid-cols-5">
            <TabsTrigger value="recipes">Recipes</TabsTrigger>
            <TabsTrigger value="sides">Sides</TabsTrigger>
            <TabsTrigger value="drinks">Drinks</TabsTrigger>
            <TabsTrigger value="sauces">Sauces</TabsTrigger>
            <TabsTrigger value="seasoning_blends">Seasonings</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-6">
            {renderItems()}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AllRecipes;