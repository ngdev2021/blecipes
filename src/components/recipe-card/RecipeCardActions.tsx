import { Heart, Bookmark, Share2, Printer } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

interface RecipeCardActionsProps {
  id: number;
  isBookmarked: boolean;
  isLiked: boolean;
  setIsBookmarked: (value: boolean) => void;
  setIsLiked: (value: boolean) => void;
}

export const RecipeCardActions = ({
  id,
  isBookmarked,
  isLiked,
  setIsBookmarked,
  setIsLiked,
}: RecipeCardActionsProps) => {
  const { user } = useAuth();
  const { toast } = useToast();

  const handleBookmark = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to bookmark recipes",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase.from("user_bookmarks").upsert({
        user_id: user.id,
        recipe_id: id,
      });

      if (error) throw error;

      setIsBookmarked(!isBookmarked);
      toast({
        title: isBookmarked ? "Recipe unbookmarked" : "Recipe bookmarked",
        description: isBookmarked
          ? "Removed from your saved recipes"
          : "Added to your saved recipes",
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

  const handleLike = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to like recipes",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase.from("recipe_votes").upsert({
        user_id: user.id,
        recipe_id: id,
        vote_type: "like",
        vote_data: { timestamp: new Date().toISOString() },
      });

      if (error) throw error;

      setIsLiked(!isLiked);
      toast({
        title: isLiked ? "Recipe unliked" : "Recipe liked",
        description: isLiked
          ? "Removed from your liked recipes"
          : "Added to your liked recipes",
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

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.share({
      title: "Recipe",
      url: window.location.href,
    }).catch(() => {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied",
        description: "Recipe link copied to clipboard",
      });
    });
  };

  const handlePrint = (e: React.MouseEvent) => {
    e.preventDefault();
    window.print();
  };

  return (
    <div className="flex gap-2">
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={handleBookmark}
            className="rounded-full p-2 transition-colors hover:bg-gray-100"
          >
            <Bookmark
              className={`h-5 w-5 ${
                isBookmarked ? "fill-current text-sage" : "text-gray-400"
              }`}
            />
          </button>
        </TooltipTrigger>
        <TooltipContent>
          {isBookmarked ? "Remove bookmark" : "Bookmark recipe"}
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={handleLike}
            className="rounded-full p-2 transition-colors hover:bg-gray-100"
          >
            <Heart
              className={`h-5 w-5 ${
                isLiked ? "fill-current text-rose-500" : "text-gray-400"
              }`}
            />
          </button>
        </TooltipTrigger>
        <TooltipContent>{isLiked ? "Unlike recipe" : "Like recipe"}</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={handleShare}
            className="rounded-full p-2 transition-colors hover:bg-gray-100"
          >
            <Share2 className="h-5 w-5 text-gray-400" />
          </button>
        </TooltipTrigger>
        <TooltipContent>Share recipe</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={handlePrint}
            className="rounded-full p-2 transition-colors hover:bg-gray-100"
          >
            <Printer className="h-5 w-5 text-gray-400" />
          </button>
        </TooltipTrigger>
        <TooltipContent>Print recipe</TooltipContent>
      </Tooltip>
    </div>
  );
};