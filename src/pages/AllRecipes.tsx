import { useState } from "react";
import { FilterSheet } from "@/components/recipes/FilterSheet";
import { RecipeFilters } from "@/components/recipes/RecipeFilters";
import { RecipeGrid } from "@/components/recipes/RecipeGrid";
import { useRecipeQuery } from "@/components/recipes/useRecipeQuery";
import { useSearchParams } from "react-router-dom";
import { RecipeType } from "@/components/recipes/RecipeTypeTabs";

export default function AllRecipes() {
  const [searchParams] = useSearchParams();
  const collection = searchParams.get("collection");
  
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<RecipeType>("recipes");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    difficulty: undefined,
    timeRange: undefined,
    categories: [],
    dietaryRestrictions: [],
  });

  const { data: items, isLoading } = useRecipeQuery({
    activeTab,
    searchQuery,
    collection,
  });

  const handleFilterChange = (type: keyof typeof filters, value: any) => {
    setFilters(prev => ({ ...prev, [type]: value }));
  };

  const handleClearFilters = () => {
    setFilters({
      difficulty: undefined,
      timeRange: undefined,
      categories: [],
      dietaryRestrictions: [],
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="font-playfair text-4xl font-bold">All Recipes</h1>
        <p className="mt-2 text-muted-foreground">
          Browse through our collection of delicious recipes
        </p>
      </div>

      <RecipeFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        showFilters={showFilters}
        setShowFilters={setShowFilters}
      />

      <FilterSheet
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
        isOpen={showFilters}
        onOpenChange={setShowFilters}
      />

      <RecipeGrid items={items} isLoading={isLoading} />
    </div>
  );
}