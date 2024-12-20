import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Ingredient {
  id: number;
  quantity: number;
  unit: string;
  name: string;
  notes?: string;
}

interface RecipeIngredientsProps {
  ingredients: Ingredient[];
}

export const RecipeIngredients = ({ ingredients }: RecipeIngredientsProps) => {
  return (
    <div className="mb-8">
      <h2 className="mb-4 font-playfair text-2xl font-semibold text-charcoal">
        Ingredients
      </h2>
      <ul className="space-y-3">
        {ingredients?.map((ingredient) => (
          <li key={ingredient.id} className="flex items-baseline gap-2">
            <span className="font-medium">
              {ingredient.quantity} {ingredient.unit}
            </span>
            <span>{ingredient.name}</span>
            <TooltipProvider>
              {ingredient.notes && (
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="ml-1 h-4 w-4 text-gray-400" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{ingredient.notes}</p>
                  </TooltipContent>
                </Tooltip>
              )}
            </TooltipProvider>
          </li>
        ))}
      </ul>
    </div>
  );
};