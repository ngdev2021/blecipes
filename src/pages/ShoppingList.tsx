import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery, useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Loader2, Plus, RefreshCw, Trash } from "lucide-react";
import { ShoppingItem, ShoppingList as ShoppingListType, isShoppingItemArray } from "@/types/shopping-list";

interface NewItem {
  name: string;
  category: string;
  quantity: number;
  unit: string;
}

const ShoppingList = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [newItem, setNewItem] = useState<NewItem>({
    name: "",
    category: "",
    quantity: 1,
    unit: "",
  });

  const { data: shoppingList, isLoading } = useQuery({
    queryKey: ["shoppingList", user?.id],
    queryFn: async () => {
      if (!user?.id) return null;

      const { data, error } = await supabase
        .from("shopping_lists")
        .select("*")
        .eq("user_id", user.id)
        .eq("status", "active")
        .maybeSingle();

      if (error && error.code !== "PGRST116") throw error;

      // If no shopping list exists, create a default one
      if (!data) {
        const defaultList = {
          user_id: user.id,
          items: [],
          status: "active",
        };

        const { data: newList, error: createError } = await supabase
          .from("shopping_lists")
          .insert(defaultList)
          .select()
          .single();

        if (createError) throw createError;
        return {
          ...newList,
          items: [],
        } as ShoppingListType;
      }

      return {
        ...data,
        items: isShoppingItemArray(data.items) ? data.items : [],
      } as ShoppingListType;
    },
    enabled: !!user?.id,
  });

  const updateShoppingListMutation = useMutation({
    mutationFn: async (items: ShoppingItem[]) => {
      if (!user?.id || !shoppingList) return;

      const { error } = await supabase
        .from("shopping_lists")
        .upsert({
          id: shoppingList.id,
          user_id: user.id,
          items: items as any, // Type assertion needed due to Supabase JSON type
          status: "active",
        });

      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: "Shopping list updated",
        description: "Your shopping list has been saved.",
      });
    },
  });

  const handleAddItem = () => {
    if (!newItem.name || !newItem.category || !newItem.unit) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    const newItems = [
      ...(shoppingList?.items || []),
      {
        id: crypto.randomUUID(),
        ...newItem,
        completed: false,
      },
    ];

    updateShoppingListMutation.mutate(newItems);
    setNewItem({ name: "", category: "", quantity: 1, unit: "" });
  };

  const handleToggleItem = (itemId: string) => {
    if (!shoppingList?.items) return;

    const updatedItems = shoppingList.items.map((item) =>
      item.id === itemId ? { ...item, completed: !item.completed } : item
    );

    updateShoppingListMutation.mutate(updatedItems);
  };

  const handleClearCompleted = () => {
    if (!shoppingList?.items) return;

    const updatedItems = shoppingList.items.filter((item) => !item.completed);
    updateShoppingListMutation.mutate(updatedItems);
  };

  const generateFromMealPlan = async () => {
    toast({
      title: "Generating shopping list",
      description: "Creating your shopping list from meal plan...",
    });

    // Simulate AI generation delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const mockItems: ShoppingItem[] = [
      {
        id: crypto.randomUUID(),
        name: "Chicken breast",
        category: "meat",
        quantity: 2,
        unit: "kg",
        completed: false,
      },
      {
        id: crypto.randomUUID(),
        name: "Rice",
        category: "pantry",
        quantity: 1,
        unit: "kg",
        completed: false,
      },
    ];

    updateShoppingListMutation.mutate(mockItems);
  };

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-sage" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="font-playfair text-3xl font-bold text-charcoal">
            Shopping List
          </h1>
          <div className="flex gap-4">
            <Button variant="outline" onClick={handleClearCompleted}>
              <Trash className="mr-2 h-4 w-4" />
              Clear Completed
            </Button>
            <Button onClick={generateFromMealPlan}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Generate from Meal Plan
            </Button>
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-lg">
          <div className="mb-8 grid gap-4 rounded-lg border p-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="item-name">Item Name</Label>
                <Input
                  id="item-name"
                  value={newItem.name}
                  onChange={(e) =>
                    setNewItem({ ...newItem, name: e.target.value })
                  }
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Select
                  value={newItem.category}
                  onValueChange={(value) =>
                    setNewItem({ ...newItem, category: value })
                  }
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="produce">Produce</SelectItem>
                    <SelectItem value="dairy">Dairy</SelectItem>
                    <SelectItem value="meat">Meat</SelectItem>
                    <SelectItem value="pantry">Pantry</SelectItem>
                    <SelectItem value="frozen">Frozen</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  value={newItem.quantity}
                  onChange={(e) =>
                    setNewItem({ ...newItem, quantity: Number(e.target.value) })
                  }
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="unit">Unit</Label>
                <Select
                  value={newItem.unit}
                  onValueChange={(value) => setNewItem({ ...newItem, unit: value })}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pieces">pieces</SelectItem>
                    <SelectItem value="grams">grams</SelectItem>
                    <SelectItem value="kg">kg</SelectItem>
                    <SelectItem value="ml">ml</SelectItem>
                    <SelectItem value="liters">liters</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button onClick={handleAddItem} className="mt-2">
              <Plus className="mr-2 h-4 w-4" />
              Add Item
            </Button>
          </div>

          <div className="space-y-6">
            {Object.entries(
              (shoppingList?.items || []).reduce((acc, item) => {
                acc[item.category] = [...(acc[item.category] || []), item];
                return acc;
              }, {} as Record<string, ShoppingItem[]>)
            ).map(([category, items]) => (
              <div key={category} className="space-y-4">
                <h2 className="font-playfair text-xl font-semibold text-charcoal capitalize">
                  {category}
                </h2>
                <div className="space-y-2">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 rounded-lg border p-3"
                    >
                      <Checkbox
                        id={item.id}
                        checked={item.completed}
                        onCheckedChange={() => handleToggleItem(item.id)}
                      />
                      <Label
                        htmlFor={item.id}
                        className={`flex-1 ${
                          item.completed ? "line-through text-gray-400" : ""
                        }`}
                      >
                        {item.name}
                      </Label>
                      <span className="text-sm text-gray-600">
                        {item.quantity} {item.unit}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingList;
