import { Clock } from "lucide-react";

interface RecipeCardContentProps {
  title: string;
  description: string;
  time: string;
  categories?: string[];
  layout?: "grid" | "list";
}

export const RecipeCardContent = ({
  title,
  description,
  time,
  categories = [],
  layout = "grid",
}: RecipeCardContentProps) => {
  return (
    <div className="p-4">
      <h3 className="mb-2 font-playfair text-xl font-semibold text-charcoal">
        {title}
      </h3>
      <p
        className={`mb-4 text-sm text-gray-600 ${
          layout === "grid" ? "line-clamp-2" : "line-clamp-3"
        }`}
      >
        {description}
      </p>
      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4" />
          <span>{time}</span>
        </div>
        {categories?.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {categories.slice(0, 2).map((category, index) => (
              <span
                key={index}
                className="rounded-full bg-sage/10 px-2 py-1 text-xs text-sage"
              >
                {category}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};