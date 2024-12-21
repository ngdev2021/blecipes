import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FilterSheet } from "./FilterSheet";
import { RecipeTypeTabs } from "./RecipeTypeTabs";

interface RecipeFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
}

export function RecipeFilters({
  searchQuery,
  setSearchQuery,
  activeTab,
  setActiveTab,
  showFilters,
  setShowFilters,
}: RecipeFiltersProps) {
  return (
    <div className="mb-8 space-y-4">
      <div className="flex items-center gap-4">
        <Input
          type="search"
          placeholder="Search recipes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm"
        />
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="hidden sm:flex"
        >
          Filters
        </Button>
      </div>
      <RecipeTypeTabs value={activeTab} onValueChange={setActiveTab} />
    </div>
  );
}