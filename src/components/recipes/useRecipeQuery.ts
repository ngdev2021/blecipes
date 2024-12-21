import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { RecipeType } from "./RecipeTypeTabs";

interface UseRecipeQueryProps {
  activeTab: RecipeType;
  searchQuery: string;
  collection?: string;
}

export function useRecipeQuery({ activeTab, searchQuery, collection }: UseRecipeQueryProps) {
  return useQuery({
    queryKey: ["recipes", activeTab, searchQuery, collection],
    queryFn: async () => {
      let query = supabase.from(activeTab).select("*");

      if (searchQuery) {
        if (activeTab === "recipes") {
          query = query.ilike("title", `%${searchQuery}%`);
        } else {
          query = query.ilike("name", `%${searchQuery}%`);
        }
      }

      // Only apply collection filter to recipes table
      if (collection && activeTab === "recipes") {
        query = query.contains('categories', [collection]);
      }

      const { data, error } = await query.order("created_at", { ascending: false });

      if (error) {
        throw error;
      }

      return data;
    },
  });
}