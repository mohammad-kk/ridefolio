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
      cars: {
        Row: {
          color: string | null
          created_at: string | null
          description: string | null
          id: string
          instagram_url: string | null
          location: string | null
          make: string
          model: string
          trim: string | null
          user_id: string | null
          year: number
        }
        Insert: {
          color?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          instagram_url?: string | null
          location?: string | null
          make: string
          model: string
          trim?: string | null
          user_id?: string | null
          year: number
        }
        Update: {
          color?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          instagram_url?: string | null
          location?: string | null
          make?: string
          model?: string
          trim?: string | null
          user_id?: string | null
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: "cars_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      garages: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          images: string[] | null
          nickname: string | null
          size: number | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          images?: string[] | null
          nickname?: string | null
          size?: number | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          images?: string[] | null
          nickname?: string | null
          size?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "garages_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      modification_categories: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      modification_specifications: {
        Row: {
          created_at: string | null
          data_type: string
          id: string
          name: string
          required: boolean | null
          subcategory_id: string | null
          validation_rules: Json | null
        }
        Insert: {
          created_at?: string | null
          data_type: string
          id?: string
          name: string
          required?: boolean | null
          subcategory_id?: string | null
          validation_rules?: Json | null
        }
        Update: {
          created_at?: string | null
          data_type?: string
          id?: string
          name?: string
          required?: boolean | null
          subcategory_id?: string | null
          validation_rules?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "modification_specifications_subcategory_id_fkey"
            columns: ["subcategory_id"]
            isOneToOne: false
            referencedRelation: "modification_subcategories"
            referencedColumns: ["id"]
          },
        ]
      }
      modification_subcategories: {
        Row: {
          category_id: string | null
          created_at: string | null
          description: string | null
          id: string
          name: string
        }
        Insert: {
          category_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          category_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "modification_subcategories_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "modification_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      modifications: {
        Row: {
          car_id: string | null
          created_at: string | null
          description: string | null
          id: string
          installation_date: string | null
          manufacturer: string | null
          part_number: string | null
          price: number | null
          specifications: Json | null
          status: string | null
          subcategory_id: string | null
          updated_at: string | null
        }
        Insert: {
          car_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          installation_date?: string | null
          manufacturer?: string | null
          part_number?: string | null
          price?: number | null
          specifications?: Json | null
          status?: string | null
          subcategory_id?: string | null
          updated_at?: string | null
        }
        Update: {
          car_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          installation_date?: string | null
          manufacturer?: string | null
          part_number?: string | null
          price?: number | null
          specifications?: Json | null
          status?: string | null
          subcategory_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "modifications_car_id_fkey"
            columns: ["car_id"]
            isOneToOne: false
            referencedRelation: "cars"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "modifications_subcategory_id_fkey"
            columns: ["subcategory_id"]
            isOneToOne: false
            referencedRelation: "modification_subcategories"
            referencedColumns: ["id"]
          },
        ]
      }
      posts: {
        Row: {
          car_id: string | null
          content: string | null
          created_at: string | null
          id: string
          media: string[] | null
          user_id: string | null
        }
        Insert: {
          car_id?: string | null
          content?: string | null
          created_at?: string | null
          id?: string
          media?: string[] | null
          user_id?: string | null
        }
        Update: {
          car_id?: string | null
          content?: string | null
          created_at?: string | null
          id?: string
          media?: string[] | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "posts_car_id_fkey"
            columns: ["car_id"]
            isOneToOne: false
            referencedRelation: "cars"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "posts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      User: {
        Row: {
          bio: string | null
          created_at: string
          email: string
          first_name: string
          id: string
          is_private: boolean
          last_name: string | null
          password: string
          profile_pic: string | null
          username: string
        }
        Insert: {
          bio?: string | null
          created_at?: string
          email: string
          first_name: string
          id?: string
          is_private?: boolean
          last_name?: string | null
          password: string
          profile_pic?: string | null
          username: string
        }
        Update: {
          bio?: string | null
          created_at?: string
          email?: string
          first_name?: string
          id?: string
          is_private?: boolean
          last_name?: string | null
          password?: string
          profile_pic?: string | null
          username?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          bio: string | null
          created_at: string | null
          email: string
          first_name: string
          id: string
          instagram_url: string | null
          is_private: boolean
          last_name: string | null
          location: string | null
          profile_picture: string | null
          username: string
        }
        Insert: {
          bio?: string | null
          created_at?: string | null
          email: string
          first_name: string
          id?: string
          instagram_url?: string | null
          is_private?: boolean
          last_name?: string | null
          location?: string | null
          profile_picture?: string | null
          username: string
        }
        Update: {
          bio?: string | null
          created_at?: string | null
          email?: string
          first_name?: string
          id?: string
          instagram_url?: string | null
          is_private?: boolean
          last_name?: string | null
          location?: string | null
          profile_picture?: string | null
          username?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
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
