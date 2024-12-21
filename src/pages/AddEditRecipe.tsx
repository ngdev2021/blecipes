import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { ChefHat, Timer, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AddEditRecipe = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-cream px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => navigate("/recipes")}
        >
          ← Back to Recipes
        </Button>

        <div className="rounded-lg bg-white p-6 shadow-lg">
          <h1 className="mb-8 font-playfair text-3xl font-bold text-charcoal">
            Create New Recipe
          </h1>

          <form className="space-y-8">
            {/* Basic Information */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Recipe Title</Label>
                <Input
                  id="title"
                  placeholder="Enter recipe title"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your recipe"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="image">Image URL</Label>
                <Input
                  id="image"
                  type="url"
                  placeholder="Enter image URL"
                  className="mt-1"
                />
              </div>
            </div>

            {/* Recipe Details */}
            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <Label htmlFor="prep-time">Prep Time (mins)</Label>
                <Input
                  id="prep-time"
                  type="number"
                  className="mt-1"
                  min="0"
                />
              </div>

              <div>
                <Label htmlFor="cook-time">Cook Time (mins)</Label>
                <Input
                  id="cook-time"
                  type="number"
                  className="mt-1"
                  min="0"
                />
              </div>

              <div>
                <Label htmlFor="servings">Servings</Label>
                <Input
                  id="servings"
                  type="number"
                  className="mt-1"
                  min="1"
                />
              </div>
            </div>

            {/* Recipe Metadata */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="difficulty">Difficulty</Label>
                <Select>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="cuisine">Cuisine Type</Label>
                <Select>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select cuisine" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="italian">Italian</SelectItem>
                    <SelectItem value="mexican">Mexican</SelectItem>
                    <SelectItem value="indian">Indian</SelectItem>
                    <SelectItem value="chinese">Chinese</SelectItem>
                    <SelectItem value="japanese">Japanese</SelectItem>
                    <SelectItem value="american">American</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Recipe Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col items-center rounded-lg bg-cream/30 p-4">
                <Timer className="mb-2 h-6 w-6 text-sage" />
                <span className="text-sm">Total Time</span>
                <span className="font-medium">45 mins</span>
              </div>
              <div className="flex flex-col items-center rounded-lg bg-cream/30 p-4">
                <ChefHat className="mb-2 h-6 w-6 text-sage" />
                <span className="text-sm">Difficulty</span>
                <span className="font-medium">Medium</span>
              </div>
              <div className="flex flex-col items-center rounded-lg bg-cream/30 p-4">
                <Users className="mb-2 h-6 w-6 text-sage" />
                <span className="text-sm">Servings</span>
                <span className="font-medium">4</span>
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <Button variant="outline" onClick={() => navigate("/recipes")}>
                Cancel
              </Button>
              <Button type="submit">Save Recipe</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEditRecipe;