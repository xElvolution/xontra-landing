import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export type Database = {
  public: {
    Tables: {
      waitlist: {
        Row: {
          id: string
          email: string
          wallet_address: string | null
          referral_code: string
          referred_by: string | null
          position: number
          bonus_points: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          wallet_address?: string | null
          referral_code: string
          referred_by?: string | null
          position: number
          bonus_points?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          wallet_address?: string | null
          referral_code?: string
          referred_by?: string | null
          position?: number
          bonus_points?: number | null
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)
