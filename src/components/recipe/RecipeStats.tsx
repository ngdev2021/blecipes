import { Clock, ChefHat, Users, Utensils } from "lucide-react";

interface RecipeStatsProps {
  totalTime?: number;
  difficulty?: string;
  servings?: number;
  equipment?: Record<string, any>;
}

export const RecipeStats = ({
  totalTime,
  difficulty,
  servings,
  equipment,
}: RecipeStatsProps) => {
  return (
    <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
      {totalTime && (
        <div className="flex flex-col items-center rounded-lg bg-cream/30 p-4">
          <Clock className="mb-2 h-6 w-6 text-sage" />
          <span className="text-sm font-medium">{totalTime} mins</span>
          <span className="text-xs text-gray-500">Total Time</span>
        </div>
      )}
      {difficulty && (
        <div className="flex flex-col items-center rounded-lg bg-cream/30 p-4">
          <ChefHat className="mb-2 h-6 w-6 text-sage" />
          <span className="text-sm font-medium">{difficulty}</span>
          <span className="text-xs text-gray-500">Difficulty</span>
        </div>
      )}
      {servings && (
        <div className="flex flex-col items-center rounded-lg bg-cream/30 p-4">
          <Users className="mb-2 h-6 w-6 text-sage" />
          <span className="text-sm font-medium">{servings} servings</span>
          <span className="text-xs text-gray-500">Yield</span>
        </div>
      )}
      {equipment && (
        <div className="flex flex-col items-center rounded-lg bg-cream/30 p-4">
          <Utensils className="mb-2 h-6 w-6 text-sage" />
          <span className="text-sm font-medium">
            {Object.keys(equipment).length}
          </span>
          <span className="text-xs text-gray-500">Tools Needed</span>
        </div>
      )}
    </div>
  );
};