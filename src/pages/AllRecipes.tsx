import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { SearchBar } from "@/components/SearchBar";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { FilterSheet } from "@/components/recipes/FilterSheet";
import { RecipeGrid } from "@/components/recipes/RecipeGrid";
import { RecipeTypeTabs } from "@/components/recipes/RecipeTypeTabs";

type RecipeType = "recipes" | "sides" | "drinks" | "sauces" | "seasoning_blends";

interface Filters {
  difficulty?: string;
  timeRange?: string;
  categories?: string[];
  dietaryRestrictions?: string[];
}

const AllRecipes = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<RecipeType>("recipes");
  const [filters, setFilters] = useState<Filters>({});
  const navigate = useNavigate();
  const { toast } = useToast();
  const searchQuery = searchParams.get("search") || "";

  const { data: items, isLoading } = useQuery({
    queryKey: ["culinary-items", activeTab, searchQuery, filters],
    queryFn: async () => {
      try {
        let query = supabase.from(activeTab).select("*");

        if (searchQuery) {
          query = query.ilike(activeTab === "recipes" ? "title" : "name", `%${searchQuery}%`);
        }

        if (filters.difficulty) {
          query = query.eq("difficulty", filters.difficulty);
        }

        if (filters.timeRange) {
          const [min, max] = getTimeRangeValues(filters.timeRange);
          if (min !== undefined) {
            query = query.gte("total_time", min);
          }
          if (max !== undefined) {
            query = query.lte("total_time", max);
          }
        }

        if (filters.categories?.length) {
          // For JSONB array, use containedBy to check if any of the categories match
          query = query.containedBy("categories", filters.categories);
        }

        if (filters.dietaryRestrictions?.length) {
          // For JSONB array, use containedBy to check if any of the dietary restrictions match
          query = query.containedBy("dietary_restrictions", filters.dietaryRestrictions);
        }

        const { data, error } = await query;

        if (error) {
          console.error("Error fetching items:", error);
          toast({
            title: "Error",
            description: "Failed to fetch items. Please try again.",
            variant: "destructive",
          });
          throw error;
        }

        return data;
      } catch (error) {
        console.error("Error in query:", error);
        if ((error as any)?.message?.includes("JWT")) {
          navigate("/login");
        }
        throw error;
      }
    },
  });

  const getTimeRangeValues = (range: string): [number | undefined, number | undefined] => {
    switch (range) {
      case "< 30 mins":
        return [undefined, 30];
      case "30-60 mins":
        return [30, 60];
      case "> 60 mins":
        return [60, undefined];
      default:
        return [undefined, undefined];
    }
  };

  const handleSearch = (query: string) => {
    setSearchParams({ search: query });
  };

  const handleFilterChange = (type: keyof Filters, value: any) => {
    setFilters(prev => ({
      ...prev,
      [type]: value
    }));
  };

  return (
    <div className="min-h-screen bg-cream px-4 py-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-center font-playfair text-4xl font-bold text-charcoal">
          Culinary Collection
        </h1>
        <div className="mb-8 flex items-center gap-4">
          <div className="flex-1">
            <SearchBar onSearch={handleSearch} initialQuery={searchQuery} />
          </div>
          <FilterSheet 
            filters={filters} 
            onFilterChange={handleFilterChange}
            onClearFilters={() => setFilters({})}
          />
        </div>

        <RecipeTypeTabs 
          activeTab={activeTab} 
          onTabChange={setActiveTab}
        >
          <RecipeGrid items={items} isLoading={isLoading} />
        </RecipeTypeTabs>
      </div>
    </div>
  );
};

export default AllRecipes;