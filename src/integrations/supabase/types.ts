export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      drinks: {
        Row: {
          alcohol_content: number | null
          description: string | null
          garnish: string | null
          glass_type: string | null
          id: number
          ingredients: Json | null
          instructions: Json | null
          name: string
          recipe_id: number | null
        }
        Insert: {
          alcohol_content?: number | null
          description?: string | null
          garnish?: string | null
          glass_type?: string | null
          id?: number
          ingredients?: Json | null
          instructions?: Json | null
          name: string
          recipe_id?: number | null
        }
        Update: {
          alcohol_content?: number | null
          description?: string | null
          garnish?: string | null
          glass_type?: string | null
          id?: number
          ingredients?: Json | null
          instructions?: Json | null
          name?: string
          recipe_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "drinks_recipe_id_fkey"
            columns: ["recipe_id"]
            isOneToOne: false
            referencedRelation: "recipes"
            referencedColumns: ["id"]
          },
        ]
      }
      ingredients: {
        Row: {
          id: number
          name: string
          notes: string | null
          quantity: number | null
          recipe_id: number | null
          sourcing_info: Json | null
          substitutions: Json | null
          type: string | null
          unit: string | null
        }
        Insert: {
          id?: number
          name: string
          notes?: string | null
          quantity?: number | null
          recipe_id?: number | null
          sourcing_info?: Json | null
          substitutions?: Json | null
          type?: string | null
          unit?: string | null
        }
        Update: {
          id?: number
          name?: string
          notes?: string | null
          quantity?: number | null
          recipe_id?: number | null
          sourcing_info?: Json | null
          substitutions?: Json | null
          type?: string | null
          unit?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ingredients_recipe_id_fkey"
            columns: ["recipe_id"]
            isOneToOne: false
            referencedRelation: "recipes"
            referencedColumns: ["id"]
          },
        ]
      }
      instructions: {
        Row: {
          id: number
          instruction: string
          media: Json | null
          recipe_id: number | null
          step: number
          timer: Json | null
          tip: string | null
          troubleshooting: string | null
        }
        Insert: {
          id?: number
          instruction: string
          media?: Json | null
          recipe_id?: number | null
          step: number
          timer?: Json | null
          tip?: string | null
          troubleshooting?: string | null
        }
        Update: {
          id?: number
          instruction?: string
          media?: Json | null
          recipe_id?: number | null
          step?: number
          timer?: Json | null
          tip?: string | null
          troubleshooting?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "instructions_recipe_id_fkey"
            columns: ["recipe_id"]
            isOneToOne: false
            referencedRelation: "recipes"
            referencedColumns: ["id"]
          },
        ]
      }
      meal_plans: {
        Row: {
          created_at: string | null
          id: number
          recipes: Json | null
          schedule: Json | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          recipes?: Json | null
          schedule?: Json | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          recipes?: Json | null
          schedule?: Json | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      pairings: {
        Row: {
          id: number
          notes: string | null
          pairing_type: string
          recipe_id: number | null
          reference_id: number | null
        }
        Insert: {
          id?: number
          notes?: string | null
          pairing_type: string
          recipe_id?: number | null
          reference_id?: number | null
        }
        Update: {
          id?: number
          notes?: string | null
          pairing_type?: string
          recipe_id?: number | null
          reference_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "pairings_recipe_id_fkey"
            columns: ["recipe_id"]
            isOneToOne: false
            referencedRelation: "recipes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pairings_reference_id_fkey"
            columns: ["reference_id"]
            isOneToOne: false
            referencedRelation: "recipes"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string
          id: string
          preferences: Json | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id: string
          preferences?: Json | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          preferences?: Json | null
          updated_at?: string | null
        }
        Relationships: []
      }
      recipes: {
        Row: {
          atmosphere: Json | null
          categories: Json | null
          cook_time: number | null
          created_at: string | null
          description: string | null
          difficulty: string | null
          difficulty_modifiers: Json | null
          id: number
          image: string | null
          inspiration: string | null
          is_seasonal: boolean | null
          prep_time: number | null
          regional_variations: Json | null
          servings: number | null
          tags: Json | null
          title: string
          total_time: number | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          atmosphere?: Json | null
          categories?: Json | null
          cook_time?: number | null
          created_at?: string | null
          description?: string | null
          difficulty?: string | null
          difficulty_modifiers?: Json | null
          id?: number
          image?: string | null
          inspiration?: string | null
          is_seasonal?: boolean | null
          prep_time?: number | null
          regional_variations?: Json | null
          servings?: number | null
          tags?: Json | null
          title: string
          total_time?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          atmosphere?: Json | null
          categories?: Json | null
          cook_time?: number | null
          created_at?: string | null
          description?: string | null
          difficulty?: string | null
          difficulty_modifiers?: Json | null
          id?: number
          image?: string | null
          inspiration?: string | null
          is_seasonal?: boolean | null
          prep_time?: number | null
          regional_variations?: Json | null
          servings?: number | null
          tags?: Json | null
          title?: string
          total_time?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      sauces: {
        Row: {
          consistency: string | null
          description: string | null
          flavor_profile: string | null
          id: number
          ingredients: Json | null
          instructions: Json | null
          name: string
          recipe_id: number | null
          storage_instructions: string | null
        }
        Insert: {
          consistency?: string | null
          description?: string | null
          flavor_profile?: string | null
          id?: number
          ingredients?: Json | null
          instructions?: Json | null
          name: string
          recipe_id?: number | null
          storage_instructions?: string | null
        }
        Update: {
          consistency?: string | null
          description?: string | null
          flavor_profile?: string | null
          id?: number
          ingredients?: Json | null
          instructions?: Json | null
          name?: string
          recipe_id?: number | null
          storage_instructions?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sauces_recipe_id_fkey"
            columns: ["recipe_id"]
            isOneToOne: false
            referencedRelation: "recipes"
            referencedColumns: ["id"]
          },
        ]
      }
      seasoning_blends: {
        Row: {
          cuisine_type: string | null
          description: string | null
          heat_level: string | null
          id: number
          ingredients: Json | null
          instructions: Json | null
          name: string
          recipe_id: number | null
          storage_instructions: string | null
        }
        Insert: {
          cuisine_type?: string | null
          description?: string | null
          heat_level?: string | null
          id?: number
          ingredients?: Json | null
          instructions?: Json | null
          name: string
          recipe_id?: number | null
          storage_instructions?: string | null
        }
        Update: {
          cuisine_type?: string | null
          description?: string | null
          heat_level?: string | null
          id?: number
          ingredients?: Json | null
          instructions?: Json | null
          name?: string
          recipe_id?: number | null
          storage_instructions?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "seasoning_blends_recipe_id_fkey"
            columns: ["recipe_id"]
            isOneToOne: false
            referencedRelation: "recipes"
            referencedColumns: ["id"]
          },
        ]
      }
      shopping_lists: {
        Row: {
          created_at: string | null
          id: number
          items: Json | null
          status: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          items?: Json | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          items?: Json | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      sides: {
        Row: {
          cooking_time: number | null
          description: string | null
          id: number
          ingredients: Json | null
          instructions: Json | null
          name: string
          notes: string | null
          preparation_time: number | null
          recipe_id: number | null
        }
        Insert: {
          cooking_time?: number | null
          description?: string | null
          id?: number
          ingredients?: Json | null
          instructions?: Json | null
          name: string
          notes?: string | null
          preparation_time?: number | null
          recipe_id?: number | null
        }
        Update: {
          cooking_time?: number | null
          description?: string | null
          id?: number
          ingredients?: Json | null
          instructions?: Json | null
          name?: string
          notes?: string | null
          preparation_time?: number | null
          recipe_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "sides_recipe_id_fkey"
            columns: ["recipe_id"]
            isOneToOne: false
            referencedRelation: "recipes"
            referencedColumns: ["id"]
          },
        ]
      }
      user_bookmarks: {
        Row: {
          created_at: string | null
          id: number
          recipe_id: number | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          recipe_id?: number | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          recipe_id?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_bookmarks_recipe_id_fkey"
            columns: ["recipe_id"]
            isOneToOne: false
            referencedRelation: "recipes"
            referencedColumns: ["id"]
          },
        ]
      }
      user_ratings: {
        Row: {
          created_at: string | null
          id: number
          rating: number | null
          recipe_id: number | null
          review: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          rating?: number | null
          recipe_id?: number | null
          review?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          rating?: number | null
          recipe_id?: number | null
          review?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_ratings_recipe_id_fkey"
            columns: ["recipe_id"]
            isOneToOne: false
            referencedRelation: "recipes"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      gtrgm_compress: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gtrgm_decompress: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gtrgm_in: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gtrgm_options: {
        Args: {
          "": unknown
        }
        Returns: undefined
      }
      gtrgm_out: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      set_limit: {
        Args: {
          "": number
        }
        Returns: number
      }
      show_limit: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      show_trgm: {
        Args: {
          "": string
        }
        Returns: string[]
      }
      unaccent: {
        Args: {
          "": string
        }
        Returns: string
      }
      unaccent_init: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
    }
    Enums: {
      difficulty_level: "easy" | "medium" | "hard"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
