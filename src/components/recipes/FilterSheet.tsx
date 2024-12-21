import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { SlidersHorizontal } from "lucide-react";

interface Filters {
  difficulty?: string;
  timeRange?: string;
  categories?: string[];
  dietaryRestrictions?: string[];
}

interface FilterSheetProps {
  filters: Filters;
  onFilterChange: (type: keyof Filters, value: any) => void;
  onClearFilters: () => void;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const difficultyOptions = ["easy", "medium", "hard"];
const timeRangeOptions = ["< 30 mins", "30-60 mins", "> 60 mins"];
const categoryOptions = ["Breakfast", "Lunch", "Dinner", "Dessert", "Snack", "Appetizer"];
const dietaryOptions = ["Vegetarian", "Vegan", "Gluten-Free", "Dairy-Free", "Nut-Free"];

export const FilterSheet = ({ filters, onFilterChange, onClearFilters, isOpen, onOpenChange }: FilterSheetProps) => {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4" />
          Filters
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Filter Recipes</SheetTitle>
        </SheetHeader>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label>Difficulty</Label>
            <Select
              value={filters.difficulty}
              onValueChange={(value) => onFilterChange("difficulty", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select difficulty" />
              </SelectTrigger>
              <SelectContent>
                {difficultyOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Cooking Time</Label>
            <Select
              value={filters.timeRange}
              onValueChange={(value) => onFilterChange("timeRange", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select time range" />
              </SelectTrigger>
              <SelectContent>
                {timeRangeOptions.map((option) => (
                  <SelectItem key={option} value={option}>{option}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Categories</Label>
            <div className="space-y-2">
              {categoryOptions.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
                    id={category}
                    checked={filters.categories?.includes(category)}
                    onCheckedChange={(checked) => {
                      const newCategories = filters.categories || [];
                      if (checked) {
                        onFilterChange("categories", [...newCategories, category]);
                      } else {
                        onFilterChange(
                          "categories",
                          newCategories.filter((c) => c !== category)
                        );
                      }
                    }}
                  />
                  <Label htmlFor={category}>{category}</Label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Dietary Restrictions</Label>
            <div className="space-y-2">
              {dietaryOptions.map((restriction) => (
                <div key={restriction} className="flex items-center space-x-2">
                  <Checkbox
                    id={restriction}
                    checked={filters.dietaryRestrictions?.includes(restriction)}
                    onCheckedChange={(checked) => {
                      const newRestrictions = filters.dietaryRestrictions || [];
                      if (checked) {
                        onFilterChange("dietaryRestrictions", [...newRestrictions, restriction]);
                      } else {
                        onFilterChange(
                          "dietaryRestrictions",
                          newRestrictions.filter((r) => r !== restriction)
                        );
                      }
                    }}
                  />
                  <Label htmlFor={restriction}>{restriction}</Label>
                </div>
              ))}
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full"
            onClick={onClearFilters}
          >
            Clear Filters
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
