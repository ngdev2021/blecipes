import { motion } from "framer-motion";
import { SearchBar } from "@/components/SearchBar";
import { RecipeCard } from "@/components/RecipeCard";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useRef } from "react";
import { importRecipes } from "@/utils/recipeImport";

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
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      console.log("Reading file:", file.name);
      const text = await file.text();
      console.log("File content:", text);
      
      let recipes;
      try {
        const parsedContent = JSON.parse(text);
        console.log("Parsed content:", parsedContent);
        
        // Handle both direct array and nested recipes array
        recipes = Array.isArray(parsedContent) ? parsedContent : parsedContent.recipes;
        
        if (!Array.isArray(recipes)) {
          console.error("Invalid format:", typeof recipes);
          toast({
            title: "Error",
            description: "Invalid format. The file must contain an array of recipes or a recipes array property.",
            variant: "destructive",
          });
          return;
        }
      } catch (parseError) {
        console.error("JSON parse error:", parseError);
        toast({
          title: "Error",
          description: "Invalid JSON format. Please check your file.",
          variant: "destructive",
        });
        return;
      }

      const userId = (await supabase.auth.getUser()).data.user?.id;
      if (!userId) {
        toast({
          title: "Error",
          description: "You must be logged in to import recipes.",
          variant: "destructive",
        });
        return;
      }

      await importRecipes(recipes, userId);
    } catch (error) {
      console.error("Error processing file:", error);
      toast({
        title: "Error",
        description: "Failed to process the JSON file. Please check the format.",
        variant: "destructive",
      });
    }

    // Reset the file input
    event.target.value = '';
  };

  return (
    <div className="min-h-screen bg-cream">
      <header className="relative flex min-h-[60vh] items-center justify-center bg-[url('https://images.unsplash.com/photo-1556910103-1c02745aae4d?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute top-4 right-4 z-20 flex gap-4">
          <input
            type="file"
            ref={fileInputRef}
            accept=".json"
            onChange={handleFileUpload}
            className="hidden"
          />
          <Button
            variant="outline"
            className="bg-white/90 hover:bg-white"
            onClick={handleImportClick}
          >
            <Upload className="mr-2 h-4 w-4" />
            Import Recipes
          </Button>
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