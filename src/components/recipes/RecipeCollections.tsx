import { motion } from "framer-motion";
import { ChefHat, Clock, Leaf, Fire, Coffee, Cake } from "lucide-react";
import { Link } from "react-router-dom";

interface Collection {
  id: string;
  name: string;
  description: string;
  icon: JSX.Element;
  count: number;
}

const collections: Collection[] = [
  {
    id: "quick-meals",
    name: "Quick Meals",
    description: "Ready in 30 minutes or less",
    icon: <Clock className="h-6 w-6" />,
    count: 24,
  },
  {
    id: "vegetarian",
    name: "Vegetarian",
    description: "Plant-based delights",
    icon: <Leaf className="h-6 w-6" />,
    count: 18,
  },
  {
    id: "spicy",
    name: "Spicy",
    description: "Hot and flavorful dishes",
    icon: <Fire className="h-6 w-6" />,
    count: 12,
  },
  {
    id: "breakfast",
    name: "Breakfast",
    description: "Start your day right",
    icon: <Coffee className="h-6 w-6" />,
    count: 15,
  },
  {
    id: "desserts",
    name: "Desserts",
    description: "Sweet treats",
    icon: <Cake className="h-6 w-6" />,
    count: 20,
  },
  {
    id: "gourmet",
    name: "Gourmet",
    description: "Fine dining at home",
    icon: <ChefHat className="h-6 w-6" />,
    count: 8,
  },
];

export const RecipeCollections = () => {
  return (
    <div className="mb-12">
      <h2 className="mb-6 font-playfair text-2xl font-semibold text-charcoal">
        Recipe Collections
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {collections.map((collection) => (
          <Link
            key={collection.id}
            to={`/recipes?collection=${collection.id}`}
            className="group"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start gap-4 rounded-lg bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="rounded-full bg-cream/50 p-3 text-sage transition-colors group-hover:bg-sage group-hover:text-white">
                {collection.icon}
              </div>
              <div>
                <h3 className="font-medium text-charcoal">{collection.name}</h3>
                <p className="text-sm text-gray-600">{collection.description}</p>
                <span className="mt-1 text-xs text-sage">
                  {collection.count} recipes
                </span>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
};