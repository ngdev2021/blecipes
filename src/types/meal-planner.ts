import { Json } from "@/integrations/supabase/types";

export interface MealPlan {
  id: number;
  user_id: string;
  recipes: {
    [key: string]: {
      breakfast?: number;
      lunch?: number;
      dinner?: number;
    };
  };
  schedule: {
    start_date: string;
    end_date: string;
  };
  created_at?: string;
  updated_at?: string;
}

export interface Recipe {
  id: number;
  title: string;
  description: string;
  prep_time: number;
  cook_time: number;
  difficulty: string;
  categories: string[];
}

export type MealType = "breakfast" | "lunch" | "dinner";
export type DayOfWeek = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";