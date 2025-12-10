import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types
export type User = {
  [x: string]: any
  id: string
  email: string
  name?: string
  avatar_url?: string
  role: 'user' | 'admin'
  created_at: string
}

export type Post = {
  id: string
  user_id: string
  title: string
  content: string
  is_public: boolean
  tags: string[]
  views: number
  created_at: string
  updated_at: string
}

export type Profile = User & {
  bio?: string
  location?: string
  website?: string
  github?: string
  linkedin?: string
  skills: string[]
}

export type Session = {
  user: User
  access_token: string
  expires_at: number
}