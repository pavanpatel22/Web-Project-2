// src/services/supabase.ts
import { createClient } from '@supabase/supabase-js'

// Replace these with your actual Supabase project credentials
// You can find these in your Supabase project settings
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'YOUR_SUPABASE_URL'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    storageKey: 'supabase.auth.token',
    storage: window.localStorage,
  },
})

// Database Types (these will match your Supabase tables)
export interface Profile {
  id: string
  name: string | null
  email: string
  bio: string | null
  location: string | null
  website: string | null
  github: string | null
  linkedin: string | null
  avatar_url: string | null
  role: 'user' | 'admin'
  created_at: string
  updated_at: string
  last_login: string | null
}

export interface Post {
  id: string
  user_id: string
  title: string
  content: string
  excerpt: string | null
  tags: string[]
  views: number
  published: boolean
  created_at: string
  updated_at: string
}

export interface UserDashboard {
  postsCount: number
  totalViews: number
  recentPosts: Post[]
}

// Helper function to handle Supabase errors
export function handleSupabaseError(error: any) {
  if (error) {
    console.error('Supabase error:', error)
    return {
      success: false,
      message: error.message || 'An error occurred',
      error
    }
  }
  return null
}