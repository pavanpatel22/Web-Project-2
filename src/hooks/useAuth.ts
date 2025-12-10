import { useContext } from 'react'
import { AuthContext } from '../components/AuthProvider'

export function useAuth() {
  const context = useContext(AuthContext)
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  
  return context
}

// Convenience hooks for specific auth states
export function useCurrentUser() {
  const { user } = useAuth()
  return user
}

export function useUserProfile() {
  const { profile } = useAuth()
  return profile
}

export function useIsAuthenticated() {
  const { isAuthenticated } = useAuth()
  return isAuthenticated
}

export function useIsAdmin() {
  const { isAdmin } = useAuth()
  return isAdmin
}

export function useAuthLoading() {
  const { loading } = useAuth()
  return loading
}

// Hook for protected actions
export function useProtectedAction() {
  const { isAuthenticated, user } = useAuth()
  
  const requireAuth = (action: () => void, fallback?: () => void) => {
    if (isAuthenticated) {
      action()
    } else {
      if (fallback) fallback()
      // Redirect to login or show auth modal
      window.location.href = `/auth/login?redirect=${encodeURIComponent(window.location.pathname)}`
    }
  }
  
  const withAuth = async <T,>(action: () => Promise<T>): Promise<T> => {
    if (!isAuthenticated) {
      throw new Error('Authentication required')
    }
    return action()
  }
  
  return {
    requireAuth,
    withAuth,
    can: (permission: string) => {
      // Implement permission checking logic
      if (!user) return false
      // Check user permissions/role
      return true
    }
  }
}