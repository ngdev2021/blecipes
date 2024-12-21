import { useState } from "react";
import { FilterSheet } from "@/components/recipes/FilterSheet";
import { RecipeFilters } from "@/components/recipes/RecipeFilters";
import { RecipeGrid } from "@/components/recipes/RecipeGrid";
import { useRecipeQuery } from "@/components/recipes/useRecipeQuery";
import { useSearchParams } from "react-router-dom";

export default function AllRecipes() {
  const [searchParams] = useSearchParams();
  const collection = searchParams.get("collection");
  
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("recipes");
  const [showFilters, setShowFilters] = useState(false);

  const { data: recipes, isLoading, error } = useRecipeQuery({
    activeTab,
    searchQuery,
    collection,
  });

  if (error) {
    console.error("Error fetching recipes:", error);
    return <div>Error loading recipes</div>;
  }

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

      <FilterSheet open={showFilters} onOpenChange={setShowFilters} />

      <RecipeGrid recipes={recipes || []} isLoading={isLoading} />
    </div>
  );
}