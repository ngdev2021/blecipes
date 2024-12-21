import { Grid, List, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface RecipeListControlsProps {
  view: "grid" | "list";
  onViewChange: (view: "grid" | "list") => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
}

export const RecipeListControls = ({
  view,
  onViewChange,
  sortBy,
  onSortChange,
}: RecipeListControlsProps) => {
  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2 rounded-lg border bg-white p-1">
        <Button
          variant={view === "grid" ? "default" : "ghost"}
          size="icon"
          onClick={() => onViewChange("grid")}
          className="h-8 w-8"
        >
          <Grid className="h-4 w-4" />
        </Button>
        <Button
          variant={view === "list" ? "default" : "ghost"}
          size="icon"
          onClick={() => onViewChange("list")}
          className="h-8 w-8"
        >
          <List className="h-4 w-4" />
        </Button>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowUpDown className="h-4 w-4" />
            Sort by
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem onClick={() => onSortChange("newest")}>
            Newest first
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onSortChange("oldest")}>
            Oldest first
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onSortChange("popular")}>
            Most popular
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onSortChange("rating")}>
            Highest rated
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};