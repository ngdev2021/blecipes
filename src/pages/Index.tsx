import { motion } from "framer-motion";
import { SearchBar } from "@/components/SearchBar";
import { RecipeCard } from "@/components/RecipeCard";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut, Upload } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Tables } from "@/integrations/supabase/types";

const featuredRecipes = [
  {
    title: "Classic Margherita Pizza",
    description: "A traditional Italian pizza with fresh basil, mozzarella, and tomatoes",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    time: "30 mins",
    difficulty: "Easy",
  },
  {
    title: "Creamy Mushroom Risotto",
    description: "Rich and creamy Italian rice dish with wild mushrooms",
    image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    time: "45 mins",
    difficulty: "Medium",
  },
  {
    title: "Grilled Salmon",
    description: "Fresh salmon fillet with lemon and herbs",
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    time: "25 mins",
    difficulty: "Easy",
  },
];

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const recipes = JSON.parse(text) as Tables<"recipes">[];

      for (const recipe of recipes) {
        const { error } = await supabase
          .from("recipes")
          .insert({
            title: recipe.title,
            description: recipe.description,
            image: recipe.image,
            prep_time: recipe.prep_time,
            cook_time: recipe.cook_time,
            total_time: recipe.total_time,
            difficulty: recipe.difficulty,
            servings: recipe.servings,
            categories: recipe.categories,
            tags: recipe.tags,
            user_id: (await supabase.auth.getUser()).data.user?.id,
          });

        if (error) {
          console.error("Error inserting recipe:", error);
          toast({
            title: "Error",
            description: `Failed to import recipe: ${recipe.title}`,
            variant: "destructive",
          });
        }
      }

      toast({
        title: "Success",
        description: `Successfully imported ${recipes.length} recipes`,
      });
    } catch (error) {
      console.error("Error processing file:", error);
      toast({
        title: "Error",
        description: "Failed to process the JSON file. Please check the format.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-cream">
      <header className="relative flex min-h-[60vh] items-center justify-center bg-[url('https://images.unsplash.com/photo-1556910103-1c02745aae4d?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute top-4 right-4 z-20 flex gap-4">
          <label className="cursor-pointer">
            <input
              type="file"
              accept=".json"
              onChange={handleFileUpload}
              className="hidden"
            />
            <Button
              variant="outline"
              className="bg-white/90 hover:bg-white"
            >
              <Upload className="mr-2 h-4 w-4" />
              Import Recipes
            </Button>
          </label>
          <Button
            variant="outline"
            className="bg-white/90 hover:bg-white"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
        <div className="relative z-10 text-center text-white">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 font-playfair text-5xl font-bold md:text-6xl"
          >
            Discover Culinary Excellence
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8 text-lg md:text-xl"
          >
            Explore our collection of carefully curated recipes
          </motion.p>
          <SearchBar />
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-16">
        <section>
          <h2 className="mb-8 text-center font-playfair text-3xl font-semibold text-charcoal">
            Featured Recipes
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {featuredRecipes.map((recipe, index) => (
              <RecipeCard key={index} {...recipe} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;