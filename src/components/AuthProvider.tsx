import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { supabase } from '../services/supabase'
import type { User, Session } from '@supabase/auth-js'

interface AuthContextType {
  user: User | null
  session: Session | null
  loading: boolean
  profile: any
  signIn: (email: string, password: string) => Promise<any>
  signUp: (email: string, password: string, userData: any) => Promise<any>
  signOut: () => Promise<void>
  signInWithGoogle: () => Promise<any>
  resetPassword: (email: string) => Promise<any>
  updateProfile: (updates: any) => Promise<any>
  refreshUser: () => Promise<void>
  isAuthenticated: boolean
  isAdmin: boolean
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within an AuthProvider')
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    initializeAuth()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session) {
          setSession(session)
          setUser(session.user)
          await loadUserProfile(session.user.id)
        } else {
          setSession(null)
          setUser(null)
          setProfile(null)
        }
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const initializeAuth = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        setSession(session)
        setUser(session.user)
        await loadUserProfile(session.user.id)
      }
    } catch (error) {
      console.error('Auth initialization error:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) console.error('Failed to load user profile:', error)
      else setProfile(data)
    } catch (error) {
      console.error('Failed to load user profile:', error)
    }
  }

  const signIn = async (email: string, password: string) => {
    setLoading(true)
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) return { success: false, message: error.message }
      if (data.user) {
        setUser(data.user)
        setSession(data.session ?? null)
        await loadUserProfile(data.user.id)
        return { success: true, user: data.user, session: data.session }
      }
      return { success: false, message: 'Login failed' }
    } finally {
      setLoading(false)
    }
  }

  const signUp = async (email: string, password: string, userData: any) => {
    setLoading(true)
    try {
      const { data, error } = await supabase.auth.signUp({ email, password })
      if (error) return { success: false, message: error.message }
      if (data.user) {
        setUser(data.user)
        setSession(data.session ?? null)
        await supabase.from('profiles').insert([{ id: data.user.id, ...userData }])
        await loadUserProfile(data.user.id)
        return { success: true, user: data.user, session: data.session }
      }
      return { success: false, message: 'Sign up failed' }
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    setLoading(true)
    try {
      await supabase.auth.signOut()
      setUser(null)
      setSession(null)
      setProfile(null)
    } finally {
      setLoading(false)
    }
  }

  const signInWithGoogle = async () => {
    return supabase.auth.signInWithOAuth({ provider: 'google' })
  }

  const resetPassword = async (email: string) => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email)
    if (error) return { success: false, message: error.message }
    return { success: true, data }
  }

  const updateProfile = async (updates: any) => {
    if (!user) throw new Error('No user logged in')

    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', user.id)

    if (error) return { success: false, message: error.message }
    setProfile({ ...profile, ...updates })
    return { success: true }
  }

  const refreshUser = async () => {
    if (user) await loadUserProfile(user.id)
  }

  const value: AuthContextType = {
    user,
    session,
    loading,
    profile,
    signIn,
    signUp,
    signOut,
    signInWithGoogle,
    resetPassword,
    updateProfile,
    refreshUser,
    isAuthenticated: !!user,
    isAdmin: profile?.role === 'admin'
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
