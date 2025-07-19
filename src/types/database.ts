export interface Database {
  public: {
    Tables: {
      vibe_boards: {
        Row: {
          id: string
          user_id: string | null
          project_id: string | null
          prompt: string
          colors: any[] // JSON array of hex color codes
          font_pairing: {
            heading: string
            body: string
            category: string
          }
          image_urls: string[] // JSON array of image URLs
          ai_concept: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          project_id?: string | null
          prompt: string
          colors: any[] // JSON array of hex color codes
          font_pairing: {
            heading: string
            body: string
            category: string
          }
          image_urls: string[] // JSON array of image URLs
          ai_concept?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          project_id?: string | null
          prompt?: string
          colors?: any[] // JSON array of hex color codes
          font_pairing?: {
            heading: string
            body: string
            category: string
          }
          image_urls?: string[] // JSON array of image URLs
          ai_concept?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      projects: {
        Row: {
          id: string
          user_id: string | null
          name: string
          description: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          name: string
          description?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          name?: string
          description?: string | null
          created_at?: string
        }
      }
    }
    Views: {}
    Functions: {}
    Enums: {}
  }
} 