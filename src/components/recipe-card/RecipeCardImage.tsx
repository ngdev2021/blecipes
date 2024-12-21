import { motion } from "framer-motion";

interface RecipeCardImageProps {
  image: string;
  title: string;
  difficulty: string;
  servings?: number;
  layout?: "grid" | "list";
}

export const RecipeCardImage = ({
  image,
  title,
  difficulty,
  servings,
  layout = "grid",
}: RecipeCardImageProps) => {
  return (
    <div
      className={`relative ${
        layout === "grid" ? "h-48" : "h-32 sm:h-48 md:h-64"
      } overflow-hidden`}
    >
      <img
        src={image}
        alt={title}
        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
        <div className="flex items-center gap-2">
          <span className="inline-block rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-charcoal">
            {difficulty}
          </span>
          {servings && (
            <span className="inline-block rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-charcoal">
              {servings} servings
            </span>
          )}
        </div>
      </div>
    </div>
  );
};