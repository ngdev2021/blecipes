import { motion } from "framer-motion";
import { SearchBar } from "@/components/SearchBar";
import { RecipeCard } from "@/components/RecipeCard";

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
  return (
    <div className="min-h-screen bg-cream">
      <header className="relative flex min-h-[60vh] items-center justify-center bg-[url('https://images.unsplash.com/photo-1556910103-1c02745aae4d?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/40" />
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