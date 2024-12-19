import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Clock, ChefHat, Bookmark } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

interface RecipeCardProps {
  id: number;
  title: string;
  description: string;
  image: string;
  time: string;
  difficulty: string;
  categories?: string[];
  servings?: number;
}

export const RecipeCard = ({ 
  id,
  title, 
  description, 
  image, 
  time, 
  difficulty,
  categories = [],
  servings
}: RecipeCardProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const handleBookmark = async () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to bookmark recipes",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase
        .from("user_bookmarks")
        .upsert({ 
          user_id: user.id,
          recipe_id: id,
        });

      if (error) throw error;

      setIsBookmarked(!isBookmarked);
      toast({
        title: isBookmarked ? "Recipe unbookmarked" : "Recipe bookmarked",
        description: isBookmarked ? "Removed from your saved recipes" : "Added to your saved recipes",
      });
    } catch (error) {
      console.error("Error bookmarking recipe:", error);
      toast({
        title: "Error",
        description: "Failed to bookmark recipe. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleLike = async () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to like recipes",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase
        .from("recipe_votes")
        .upsert({ 
          user_id: user.id,
          recipe_id: id,
          vote_type: "like",
          vote_data: { timestamp: new Date().toISOString() }
        });

      if (error) throw error;

      setIsLiked(!isLiked);
      toast({
        title: isLiked ? "Recipe unliked" : "Recipe liked",
        description: isLiked ? "Removed from your liked recipes" : "Added to your liked recipes",
      });
    } catch (error) {
      console.error("Error liking recipe:", error);
      toast({
        title: "Error",
        description: "Failed to like recipe. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="group relative overflow-hidden rounded-lg bg-white shadow-md transition-all hover:shadow-lg"
    >
      <div className="relative h-48 overflow-hidden">
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
      <div className="p-4">
        <div className="mb-2 flex items-start justify-between">
          <h3 className="font-playfair text-xl font-semibold text-charcoal">
            {title}
          </h3>
          <div className="flex gap-2">
            <button
              onClick={handleBookmark}
              className="rounded-full p-2 transition-colors hover:bg-gray-100"
            >
              <Bookmark 
                className={`h-5 w-5 ${isBookmarked ? 'fill-current text-sage' : 'text-gray-400'}`}
              />
            </button>
            <button
              onClick={handleLike}
              className="rounded-full p-2 transition-colors hover:bg-gray-100"
            >
              <Heart 
                className={`h-5 w-5 ${isLiked ? 'fill-current text-rose-500' : 'text-gray-400'}`}
              />
            </button>
          </div>
        </div>
        <p className="mb-4 text-sm text-gray-600 line-clamp-2">
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
    </motion.div>
  );
};