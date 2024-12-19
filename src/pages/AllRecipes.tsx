import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SearchBar } from "@/components/SearchBar";
import { RecipeCard } from "@/components/RecipeCard";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

type RecipeType = "recipes" | "sides" | "drinks" | "sauces" | "seasoning_blends";

interface BaseItem {
  id: number;
  description?: string | null;
}

interface Recipe extends BaseItem {
  title: string;
  prep_time?: number | null;
  cook_time?: number | null;
  difficulty?: string | null;
  image?: string | null;
}

interface NamedItem extends BaseItem {
  name: string;
  preparation_time?: number | null;
  cooking_time?: number | null;
  difficulty?: string | null;
  image?: string | null;
}

interface Drink extends BaseItem {
  name: string;
  alcohol_content?: number | null;
  glass_type?: string | null;
}

interface Sauce extends BaseItem {
  name: string;
  consistency?: string | null;
  flavor_profile?: string | null;
}

interface SeasoningBlend extends BaseItem {
  name: string;
  cuisine_type?: string | null;
  heat_level?: string | null;
}

type CulinaryItem = Recipe | NamedItem | Drink | Sauce | SeasoningBlend;

const AllRecipes = () => {
  const [activeTab, setActiveTab] = useState<RecipeType>("recipes");
  const navigate = useNavigate();
  const { toast } = useToast();

  const { data: items, isLoading } = useQuery({
    queryKey: ["culinary-items", activeTab],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from(activeTab)
          .select("*");

        if (error) {
          console.error("Error fetching items:", error);
          toast({
            title: "Error",
            description: "Failed to fetch items. Please try again.",
            variant: "destructive",
          });
          throw error;
        }

        return data as CulinaryItem[];
      } catch (error) {
        console.error("Error in query:", error);
        if ((error as any)?.message?.includes("JWT")) {
          navigate("/login");
        }
        throw error;
      }
    },
  });

  const getItemTitle = (item: CulinaryItem): string => {
    if ("title" in item) return item.title;
    if ("name" in item) return item.name;
    return "Untitled";
  };

  const getItemTime = (item: CulinaryItem): string => {
    if ("prep_time" in item) return `${item.prep_time || 0} mins`;
    if ("preparation_time" in item) return `${item.preparation_time || 0} mins`;
    return "N/A";
  };

  const getItemImage = (item: CulinaryItem): string => {
    if ("image" in item && item.image) return item.image;
    return "/placeholder.svg";
  };

  const getItemDifficulty = (item: CulinaryItem): string => {
    if ("difficulty" in item && item.difficulty) return item.difficulty;
    return "medium";
  };

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
            title={getItemTitle(item)}
            description={item.description || ""}
            image={getItemImage(item)}
            time={getItemTime(item)}
            difficulty={getItemDifficulty(item)}
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