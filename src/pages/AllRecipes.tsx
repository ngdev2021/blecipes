import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { SearchBar } from "@/components/SearchBar";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { FilterSheet } from "@/components/recipes/FilterSheet";
import { RecipeGrid } from "@/components/recipes/RecipeGrid";
import { RecipeTypeTabs } from "@/components/recipes/RecipeTypeTabs";
import { RecipeListControls } from "@/components/recipes/RecipeListControls";
import { FeaturedRecipes } from "@/components/recipes/FeaturedRecipes";
import { RecipeCollections } from "@/components/recipes/RecipeCollections";

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
  const [view, setView] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("newest");
  const navigate = useNavigate();
  const { toast } = useToast();
  const searchQuery = searchParams.get("search") || "";
  const collection = searchParams.get("collection");

  const { data: items, isLoading } = useQuery({
    queryKey: ["culinary-items", activeTab, searchQuery, filters, sortBy, collection],
    queryFn: async () => {
      try {
        let query = supabase.from(activeTab).select("*");

        if (searchQuery) {
          query = query.ilike(
            activeTab === "recipes" ? "title" : "name",
            `%${searchQuery}%`
          );
        }

        if (collection) {
          // Fix: Use proper JSONB array containment check
          query = query.contains('categories', JSON.stringify([collection]));
        }

        if (activeTab === "recipes") {
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
            query = query.contains("categories", filters.categories);
          }

          if (filters.dietaryRestrictions?.length) {
            query = query.contains(
              "dietary_restrictions",
              filters.dietaryRestrictions
            );
          }

          switch (sortBy) {
            case "oldest":
              query = query.order("created_at", { ascending: true });
              break;
            case "popular":
              query = query.order("total_time", { ascending: false });
              break;
            case "rating":
              query = query.order("rating", { ascending: false });
              break;
            default:
              query = query.order("created_at", { ascending: false });
          }
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

  const getTimeRangeValues = (
    range: string
  ): [number | undefined, number | undefined] => {
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
    setFilters((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  const featuredRecipes = items
    ?.slice(0, 3)
    .map((item: any) => ({
      ...item,
      time: item.total_time ? `${item.total_time} mins` : "N/A",
    }));

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

        {!searchQuery && !collection && <RecipeCollections />}

        {featuredRecipes && featuredRecipes.length > 0 && !searchQuery && !collection && (
          <FeaturedRecipes recipes={featuredRecipes} />
        )}

        <RecipeTypeTabs activeTab={activeTab} onTabChange={setActiveTab}>
          <div className="mb-6">
            <RecipeListControls
              view={view}
              onViewChange={setView}
              sortBy={sortBy}
              onSortChange={setSortBy}
            />
          </div>
          <RecipeGrid
            items={items}
            isLoading={isLoading}
            view={view}
          />
        </RecipeTypeTabs>
      </div>
    </div>
  );
};

export default AllRecipes;