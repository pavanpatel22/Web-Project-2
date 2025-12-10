import { supabase, type User, type Session } from './supabase'

export const authService = {
  // Sign up with email and password
  async signUp(email: string, password: string, userData: { name?: string }) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData,
          emailRedirectTo: `${window.location.origin}/auth/callback`
        }
      })

      if (error) throw error

      // Create user profile in database
      if (data.user) {
        await this.createUserProfile(data.user.id, {
          email,
          ...userData,
          role: 'user'
        })
      }

      return {
        success: true,
        user: data.user,
        session: data.session,
        message: 'Registration successful! Please check your email to confirm.'
      }
    } catch (error: any) {
      return {
        success: false,
        error: error.message,
        message: 'Registration failed. Please try again.'
      }
    }
  },

  // Sign in with email and password
  async signIn(email: string, password: string) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) throw error

      // Update last login
      if (data.user) {
        await supabase
          .from('profiles')
          .update({ last_login: new Date().toISOString() })
          .eq('id', data.user.id)
      }

      return {
        success: true,
        user: data.user,
        session: data.session
      }
    } catch (error: any) {
      return {
        success: false,
        error: error.message,
        message: 'Invalid email or password'
      }
    }
  },

  // Sign in with Google
  async signInWithGoogle() {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      })

      if (error) throw error

      return { success: true }
    } catch (error: any) {
      return {
        success: false,
        error: error.message
      }
    }
  },

  // Sign out
  async signOut() {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      return { success: true }
    } catch (error: any) {
      return {
        success: false,
        error: error.message
      }
    }
  },

  // Get current session
  async getSession() {
    const { data } = await supabase.auth.getSession()
    return data.session
  },

  // Get current user
  async getCurrentUser() {
    const { data } = await supabase.auth.getUser()
    return data.user
  },

  // Check if user is authenticated
  async isAuthenticated() {
    const session = await this.getSession()
    return !!session
  },

  // Reset password
  async resetPassword(email: string) {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`
      })

      if (error) throw error

      return {
        success: true,
        message: 'Password reset email sent!'
      }
    } catch (error: any) {
      return {
        success: false,
        error: error.message
      }
    }
  },

  // Update password
  async updatePassword(newPassword: string) {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      })

      if (error) throw error

      return {
        success: true,
        message: 'Password updated successfully!'
      }
    } catch (error: any) {
      return {
        success: false,
        error: error.message
      }
    }
  },

  // Create user profile
  async createUserProfile(userId: string, profileData: Partial<User>) {
    try {
      const { error } = await supabase
        .from('profiles')
        .insert([{
          id: userId,
          email: profileData.email,
          name: profileData.name,
          role: profileData.role || 'user',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }])

      if (error) throw error

      return { success: true }
    } catch (error: any) {
      return {
        success: false,
        error: error.message
      }
    }
  },

  // Update user profile
  async updateProfile(userId: string, updates: Partial<User>) {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', userId)

      if (error) throw error

      return { success: true }
    } catch (error: any) {
      return {
        success: false,
        error: error.message
      }
    }
  },

  // Get user profile
  async getUserProfile(userId: string) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) throw error

      return { success: true, profile: data }
    } catch (error: any) {
      return {
        success: false,
        error: error.message
      }
    }
  }
}