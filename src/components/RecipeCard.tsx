import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { RecipeCardImage } from "./recipe-card/RecipeCardImage";
import { RecipeCardActions } from "./recipe-card/RecipeCardActions";
import { RecipeCardContent } from "./recipe-card/RecipeCardContent";

interface RecipeCardProps {
  id: number;
  title: string;
  description: string;
  image: string;
  time: string;
  difficulty: string;
  categories?: string[];
  servings?: number;
  layout?: "grid" | "list";
}

export const RecipeCard = ({
  id,
  title,
  description,
  image,
  time,
  difficulty,
  categories = [],
  servings,
  layout = "grid",
}: RecipeCardProps) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  return (
    <Link to={`/recipe/${id}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`group relative overflow-hidden rounded-lg bg-white shadow-md transition-all hover:shadow-lg ${
          layout === "list"
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            : ""
        }`}
      >
        <RecipeCardImage
          image={image}
          title={title}
          difficulty={difficulty}
          servings={servings}
          layout={layout}
        />
        <div className="flex flex-col">
          <div className="mb-2 flex items-start justify-between px-4 pt-4">
            <RecipeCardContent
              title={title}
              description={description}
              time={time}
              categories={categories}
              layout={layout}
            />
            <RecipeCardActions
              id={id}
              isBookmarked={isBookmarked}
              isLiked={isLiked}
              setIsBookmarked={setIsBookmarked}
              setIsLiked={setIsLiked}
            />
          </div>
        </div>
      </motion.div>
    </Link>
  );
};