import { Json } from "@/integrations/supabase/types";

// Make ShoppingItem compatible with Json by extending Record<string, Json>
export interface ShoppingItem extends Record<string, Json> {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  completed: boolean;
}

export interface ShoppingList {
  id: number;
  user_id: string | null;
  items: ShoppingItem[];
  status: string;
  created_at?: string;
  updated_at?: string;
}

export const isShoppingItem = (item: Json): item is ShoppingItem => {
  return (
    typeof item === "object" &&
    item !== null &&
    "id" in item &&
    "name" in item &&
    "category" in item &&
    "quantity" in item &&
    "unit" in item &&
    "completed" in item
  );
};

export const isShoppingItemArray = (items: Json): items is ShoppingItem[] => {
  return Array.isArray(items) && items.every(isShoppingItem);
};