import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

interface UseRecipeQueryProps {
  activeTab: string;
  searchQuery: string;
  collection?: string;
}

export function useRecipeQuery({ activeTab, searchQuery, collection }: UseRecipeQueryProps) {
  return useQuery({
    queryKey: ["recipes", activeTab, searchQuery, collection],
    queryFn: async () => {
      let query = supabase.from(activeTab).select("*");

      if (searchQuery) {
        query = query.ilike("name", `%${searchQuery}%`);
      }

      // Only apply collection filter to recipes table
      if (collection && activeTab === "recipes") {
        query = query.contains('categories', JSON.stringify([collection]));
      }

      const { data, error } = await query.order("created_at", { ascending: false });

      if (error) {
        throw error;
      }

      return data;
    },
  });
}