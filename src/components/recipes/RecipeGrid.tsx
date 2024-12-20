import { Loader2 } from "lucide-react";
import { RecipeCard } from "@/components/RecipeCard";
import { Json } from "@/integrations/supabase/types";

interface BaseItem {
  id: number;
  description?: string | null;
}

interface Recipe extends BaseItem {
  title: string;
  prep_time?: number | null;
  cook_time?: number | null;
  total_time?: number | null;
  difficulty?: string | null;
  image?: string | null;
  categories?: Json | null;
  servings?: number | null;
}

interface NamedItem extends BaseItem {
  name: string;
  preparation_time?: number | null;
  cooking_time?: number | null;
}

interface RecipeGridProps {
  items: (Recipe | NamedItem)[] | undefined;
  isLoading: boolean;
}

export const RecipeGrid = ({ items, isLoading }: RecipeGridProps) => {
  const getItemTitle = (item: Recipe | NamedItem): string => {
    if ("title" in item) return item.title;
    if ("name" in item) return item.name;
    return "Untitled";
  };

  const getItemTime = (item: Recipe | NamedItem): string => {
    if ("total_time" in item && item.total_time) 
      return `${item.total_time} mins`;
    if ("preparation_time" in item && item.preparation_time) 
      return `${item.preparation_time} mins`;
    if ("cooking_time" in item && item.cooking_time) 
      return `${item.cooking_time} mins`;
    return "N/A";
  };

  const getItemImage = (item: Recipe | NamedItem): string => {
    if ("image" in item && item.image) return item.image;
    return "https://images.unsplash.com/photo-1546069901-ba9599a7e63c";
  };

  const getItemDifficulty = (item: Recipe | NamedItem): string => {
    if ("difficulty" in item && item.difficulty) return item.difficulty;
    return "medium";
  };

  const getItemCategories = (item: Recipe | NamedItem): string[] => {
    if ("categories" in item && item.categories) {
      if (Array.isArray(item.categories)) return item.categories;
      if (typeof item.categories === 'object') return Object.values(item.categories as object);
    }
    return [];
  };

  const getItemServings = (item: Recipe | NamedItem): number | undefined => {
    if ("servings" in item) return item.servings ?? undefined;
    return undefined;
  };

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
        No items found with the current filters
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {items.map((item) => (
        <RecipeCard
          key={item.id}
          id={item.id}
          title={getItemTitle(item)}
          description={item.description || ""}
          image={getItemImage(item)}
          time={getItemTime(item)}
          difficulty={getItemDifficulty(item)}
          categories={getItemCategories(item)}
          servings={getItemServings(item)}
        />
      ))}
    </div>
  );
};