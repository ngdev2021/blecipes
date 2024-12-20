import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type RecipeType = "recipes" | "sides" | "drinks" | "sauces" | "seasoning_blends";

interface RecipeTypeTabsProps {
  activeTab: RecipeType;
  onTabChange: (value: RecipeType) => void;
  children: React.ReactNode;
}

export const RecipeTypeTabs = ({ activeTab, onTabChange, children }: RecipeTypeTabsProps) => {
  return (
    <Tabs
      defaultValue="recipes"
      value={activeTab}
      onValueChange={(value) => onTabChange(value as RecipeType)}
      className="w-full"
    >
      <TabsList className="mb-8 grid w-full grid-cols-2 gap-4 md:grid-cols-5">
        <TabsTrigger value="recipes">Recipes</TabsTrigger>
        <TabsTrigger value="sides">Sides</TabsTrigger>
        <TabsTrigger value="drinks">Drinks</TabsTrigger>
        <TabsTrigger value="sauces">Sauces</TabsTrigger>
        <TabsTrigger value="seasoning_blends">Seasonings</TabsTrigger>
      </TabsList>

      <TabsContent value={activeTab} className="mt-6">
        {children}
      </TabsContent>
    </Tabs>
  );
};