import { motion } from "framer-motion";

interface RecipeCardProps {
  title: string;
  description: string;
  image: string;
  time: string;
  difficulty: string;
}

export const RecipeCard = ({ title, description, image, time, difficulty }: RecipeCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="recipe-card"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          <span className="inline-block rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-charcoal">
            {difficulty}
          </span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="mb-2 font-playfair text-xl font-semibold text-charcoal">
          {title}
        </h3>
        <p className="mb-4 text-sm text-gray-600 line-clamp-2">
          {description}
        </p>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>{time}</span>
        </div>
      </div>
    </motion.div>
  );
};