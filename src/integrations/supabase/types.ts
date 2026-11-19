export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.17"
  }
  public: {
    Tables: {
      blog_categories: {
        Row: {
          created_at: string
          description: string
          display_order: number
          id: string
          is_active: boolean
          name: string
          parent_id: string | null
          slug: string
        }
        Insert: {
          created_at?: string
          description?: string
          display_order?: number
          id?: string
          is_active?: boolean
          name: string
          parent_id?: string | null
          slug: string
        }
        Update: {
          created_at?: string
          description?: string
          display_order?: number
          id?: string
          is_active?: boolean
          name?: string
          parent_id?: string | null
          slug?: string
        }
        Relationships: [
          {
            foreignKeyName: "blog_categories_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "blog_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      blog_comments: {
        Row: {
          author_name: string
          body: string
          created_at: string
          id: string
          post_id: string
          user_id: string
        }
        Insert: {
          author_name: string
          body: string
          created_at?: string
          id?: string
          post_id: string
          user_id: string
        }
        Update: {
          author_name?: string
          body?: string
          created_at?: string
          id?: string
          post_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "blog_comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "blog_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      blog_posts: {
        Row: {
          author_id: string | null
          author_name: string
          category_id: string | null
          content: string
          created_at: string
          excerpt: string
          faqs: Json
          featured_image: string | null
          featured_image_alt: string
          id: string
          live_notified_at: string | null
          noindex: boolean
          published_at: string | null
          seo_description: string | null
          seo_title: string | null
          slug: string
          status: Database["public"]["Enums"]["blog_status"]
          subcategory_id: string | null
          tags: string[]
          title: string
          updated_at: string
          view_count: number
        }
        Insert: {
          author_id?: string | null
          author_name?: string
          category_id?: string | null
          content: string
          created_at?: string
          excerpt: string
          faqs?: Json
          featured_image?: string | null
          featured_image_alt?: string
          id?: string
          live_notified_at?: string | null
          noindex?: boolean
          published_at?: string | null
          seo_description?: string | null
          seo_title?: string | null
          slug: string
          status?: Database["public"]["Enums"]["blog_status"]
          subcategory_id?: string | null
          tags?: string[]
          title: string
          updated_at?: string
          view_count?: number
        }
        Update: {
          author_id?: string | null
          author_name?: string
          category_id?: string | null
          content?: string
          created_at?: string
          excerpt?: string
          faqs?: Json
          featured_image?: string | null
          featured_image_alt?: string
          id?: string
          live_notified_at?: string | null
          noindex?: boolean
          published_at?: string | null
          seo_description?: string | null
          seo_title?: string | null
          slug?: string
          status?: Database["public"]["Enums"]["blog_status"]
          subcategory_id?: string | null
          tags?: string[]
          title?: string
          updated_at?: string
          view_count?: number
        }
        Relationships: [
          {
            foreignKeyName: "blog_posts_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "blog_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "blog_posts_subcategory_id_fkey"
            columns: ["subcategory_id"]
            isOneToOne: false
            referencedRelation: "blog_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      blog_settings: {
        Row: {
          guest_post_cost: number
          id: boolean
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          guest_post_cost?: number
          id?: boolean
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          guest_post_cost?: number
          id?: boolean
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      cost_estimate_leads: {
        Row: {
          business_model: string
          created_at: string
          currency: string
          email: string
          estimate_max: number
          estimate_min: number
          full_name: string
          id: string
          integrations: string[]
          phone: string
          source_page: string
        }
        Insert: {
          business_model: string
          created_at?: string
          currency?: string
          email: string
          estimate_max: number
          estimate_min: number
          full_name: string
          id?: string
          integrations?: string[]
          phone?: string
          source_page?: string
        }
        Update: {
          business_model?: string
          created_at?: string
          currency?: string
          email?: string
          estimate_max?: number
          estimate_min?: number
          full_name?: string
          id?: string
          integrations?: string[]
          phone?: string
          source_page?: string
        }
        Relationships: []
      }
      credit_ledger: {
        Row: {
          amount: number
          created_at: string
          id: string
          reason: string
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          id?: string
          reason: string
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          id?: string
          reason?: string
          user_id?: string
        }
        Relationships: []
      }
      engagement_rewards: {
        Row: {
          kind: string
          post_id: string
          rewarded_at: string | null
          started_at: string
          user_id: string
        }
        Insert: {
          kind: string
          post_id: string
          rewarded_at?: string | null
          started_at?: string
          user_id: string
        }
        Update: {
          kind?: string
          post_id?: string
          rewarded_at?: string | null
          started_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "engagement_rewards_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "blog_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      enquiries: {
        Row: {
          created_at: string
          email: string
          id: string
          message: string
          name: string
          phone: string
          replied_at: string | null
          reply_message: string | null
          service: string
          status: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
          phone?: string
          replied_at?: string | null
          reply_message?: string | null
          service?: string
          status?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
          phone?: string
          replied_at?: string | null
          reply_message?: string | null
          service?: string
          status?: string
        }
        Relationships: []
      }
      game_attempts: {
        Row: {
          completed_at: string | null
          id: string
          level: number
          started_at: string
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          id?: string
          level: number
          started_at?: string
          user_id: string
        }
        Update: {
          completed_at?: string | null
          id?: string
          level?: number
          started_at?: string
          user_id?: string
        }
        Relationships: []
      }
      game_progress: {
        Row: {
          completed_at: string
          level: number
          user_id: string
        }
        Insert: {
          completed_at?: string
          level: number
          user_id: string
        }
        Update: {
          completed_at?: string
          level?: number
          user_id?: string
        }
        Relationships: []
      }
      homepage_reviews: {
        Row: {
          avatar_url: string | null
          company_name: string
          created_at: string
          customer_name: string
          customer_role: string
          display_order: number
          id: string
          is_published: boolean
          rating: number
          review_text: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          company_name?: string
          created_at?: string
          customer_name: string
          customer_role?: string
          display_order?: number
          id?: string
          is_published?: boolean
          rating?: number
          review_text: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          company_name?: string
          created_at?: string
          customer_name?: string
          customer_role?: string
          display_order?: number
          id?: string
          is_published?: boolean
          rating?: number
          review_text?: string
          updated_at?: string
        }
        Relationships: []
      }
      indexing_requests: {
        Row: {
          created_at: string
          id: string
          status: string
          url: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          status?: string
          url: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          status?: string
          url?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          display_name: string
          id: string
          preferences: Json
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string
          id: string
          preferences?: Json
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string
          id?: string
          preferences?: Json
          updated_at?: string
        }
        Relationships: []
      }
      regional_demo_leads: {
        Row: {
          company_email: string
          created_at: string
          full_name: string
          id: string
          project_scope: string
          region: string
          webhook_status: string
          whatsapp: string
        }
        Insert: {
          company_email: string
          created_at?: string
          full_name: string
          id?: string
          project_scope: string
          region: string
          webhook_status?: string
          whatsapp: string
        }
        Update: {
          company_email?: string
          created_at?: string
          full_name?: string
          id?: string
          project_scope?: string
          region?: string
          webhook_status?: string
          whatsapp?: string
        }
        Relationships: []
      }
      share_clicks: {
        Row: {
          clicked_at: string
          platform: string
          post_id: string
          user_id: string
        }
        Insert: {
          clicked_at?: string
          platform: string
          post_id: string
          user_id: string
        }
        Update: {
          clicked_at?: string
          platform?: string
          post_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "share_clicks_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "blog_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      share_rewards: {
        Row: {
          created_at: string
          id: string
          platform: string
          post_id: string
          share_day: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          platform: string
          post_id: string
          share_day?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          platform?: string
          post_id?: string
          share_day?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "share_rewards_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "blog_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      support_tickets: {
        Row: {
          created_at: string
          id: string
          message: string
          status: string
          subject: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          message: string
          status?: string
          subject: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          message?: string
          status?: string
          subject?: string
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      web_stories: {
        Row: {
          created_at: string
          id: string
          slides: Json
          title: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          slides?: Json
          title: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          slides?: Json
          title?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      _spend: {
        Args: { _amount: number; _reason: string; _uid: string }
        Returns: undefined
      }
      add_blog_comment: {
        Args: { _author_name: string; _body: string; _post_id: string }
        Returns: undefined
      }
      award_verified_game_attempt: {
        Args: { _attempt_id: string; _user_id: string }
        Returns: Json
      }
      buy_game_glass: { Args: never; Returns: number }
      claim_read_reward: { Args: { _post_id: string }; Returns: boolean }
      claim_share_bonus: { Args: { _post_id: string }; Returns: boolean }
      claim_share_reward: {
        Args: { _platform: string; _post_id: string }
        Returns: boolean
      }
      complete_game_level: { Args: { _level: number }; Returns: number }
      create_web_story: {
        Args: { _slides: Json; _title: string }
        Returns: undefined
      }
      credit_balance: { Args: { _user_id: string }; Returns: number }
      game_level_reward: { Args: { _level: number }; Returns: number }
      get_guest_post_cost: { Args: never; Returns: number }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      increment_post_view: { Args: { _slug: string }; Returns: undefined }
      mark_regional_lead_webhook: {
        Args: { _id: string; _status: string }
        Returns: undefined
      }
      my_credit_balance: { Args: never; Returns: number }
      record_share_click: {
        Args: { _platform: string; _post_id: string }
        Returns: number
      }
      request_instant_indexing: { Args: { _url: string }; Returns: undefined }
      set_guest_post_cost: { Args: { _cost: number }; Returns: number }
      start_blog_read: { Args: { _post_id: string }; Returns: undefined }
      start_game_attempt: { Args: { _level: number }; Returns: string }
      submit_cost_estimate: {
        Args: {
          _email: string
          _integrations: string[]
          _model: string
          _name: string
          _phone: string
          _source: string
        }
        Returns: string
      }
      submit_enquiry: {
        Args: {
          _email: string
          _message: string
          _name: string
          _phone: string
          _service: string
        }
        Returns: string
      }
      submit_guest_post: {
        Args: {
          _author_name: string
          _category_id: string
          _content: string
          _excerpt: string
          _image: string
          _title: string
        }
        Returns: string
      }
      submit_guest_post_v2:
        | {
            Args: {
              _author_name: string
              _category_id: string
              _content: string
              _excerpt: string
              _faqs: Json
              _image: string
              _subcategory_id: string
              _tags: string[]
              _title: string
            }
            Returns: string
          }
        | {
            Args: {
              _author_name: string
              _category_id: string
              _content: string
              _excerpt: string
              _faqs: Json
              _image: string
              _seo_description?: string
              _seo_title?: string
              _subcategory_id: string
              _tags: string[]
              _title: string
            }
            Returns: string
          }
      submit_regional_lead: {
        Args: {
          _email: string
          _name: string
          _region: string
          _scope: string
          _whatsapp: string
        }
        Returns: string
      }
      validate_guest_article_content: {
        Args: { _content: string; _excerpt: string; _title: string }
        Returns: undefined
      }
    }
    Enums: {
      app_role: "admin" | "editor"
      blog_status: "draft" | "published"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "editor"],
      blog_status: ["draft", "published"],
    },
  },
} as const
