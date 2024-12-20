import { motion } from "framer-motion";

interface RecipeHeaderProps {
  image?: string;
  title: string;
  description?: string;
  isSeasonalRecipe?: boolean;
  culturalContext?: string;
}

export const RecipeHeader = ({
  image,
  title,
  description,
  isSeasonalRecipe,
  culturalContext,
}: RecipeHeaderProps) => {
  return (
    <div className="mb-6 border-b border-gray-200 pb-6">
      {image && (
        <div className="relative h-[400px]">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover"
          />
          {isSeasonalRecipe && (
            <div className="absolute right-4 top-4 rounded-full bg-sage px-4 py-2 text-sm font-medium text-white">
              Seasonal Recipe
            </div>
          )}
        </div>
      )}

      <h1 className="font-playfair text-3xl font-bold text-charcoal">
        {title}
      </h1>
      
      {description && <p className="mt-4 text-gray-600">{description}</p>}

      {culturalContext && (
        <div className="mt-4 rounded-lg bg-cream/50 p-4">
          <h3 className="mb-2 font-medium text-charcoal">Cultural Context</h3>
          <p className="text-sm text-gray-600">{culturalContext}</p>
        </div>
      )}
    </div>
  );
};