import { type ReactNode, useEffect } from 'react'
import { useNavigate, useLocation } from '@tanstack/react-router'
import { useAuth } from './AuthProvider'

interface ProtectedRouteProps {
  children: ReactNode
  requireAuth?: boolean
  roles?: string[]
  redirectTo?: string
  requireUnauth?: boolean
}

export function ProtectedRoute({
  children,
  requireAuth = true,
  roles = [],
  redirectTo = '/auth/login',
  requireUnauth = false
}: ProtectedRouteProps) {
  const { user, profile, loading, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (loading) return

    // If route requires authentication but user is not authenticated
    if (requireAuth && !isAuthenticated) {
      navigate({
        to: redirectTo,
        search: { redirect: location.pathname }
      })
      return
    }

    // If route requires unauthenticated access but user is authenticated
    if (requireUnauth && isAuthenticated) {
      navigate({ to: '/' })
      return
    }

    // Check role-based access
    if (requireAuth && isAuthenticated && roles.length > 0) {
      const hasRequiredRole = roles.some(role => profile?.role === role)
      if (!hasRequiredRole) {
        navigate({ to: '/unauthorized' })
        return
      }
    }
  }, [loading, isAuthenticated, user, profile, roles, requireAuth, requireUnauth, navigate, location, redirectTo])

  // Show loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  // If route requires authentication and user is authenticated
  if (requireAuth && !isAuthenticated) {
    return null // Will redirect in useEffect
  }

  // If route requires unauthenticated access and user is authenticated
  if (requireUnauth && isAuthenticated) {
    return null // Will redirect in useEffect
  }

  // Check role permissions
  if (requireAuth && isAuthenticated && roles.length > 0) {
    const hasRequiredRole = roles.some(role => profile?.role === role)
    if (!hasRequiredRole) {
      return (
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="text-gray-600 dark:text-gray-400">
            You don't have permission to access this page.
          </p>
        </div>
      )
    }
  }

  return <>{children}</>
}

// Higher-order component for protecting routes
export function withProtection(
  Component: React.ComponentType,
  options?: Omit<ProtectedRouteProps, 'children'>
) {
  return function ProtectedComponent(props: any) {
    return (
      <ProtectedRoute {...options}>
        <Component {...props} />
      </ProtectedRoute>
    )
  }
}

// Specialized route protectors
export const UserOnlyRoute = ({ children }: { children: ReactNode }) => (
  <ProtectedRoute roles={['user', 'admin']}>
    {children}
  </ProtectedRoute>
)

export const AdminOnlyRoute = ({ children }: { children: ReactNode }) => (
  <ProtectedRoute roles={['admin']}>
    {children}
  </ProtectedRoute>
)

export const GuestOnlyRoute = ({ children }: { children: ReactNode }) => (
  <ProtectedRoute requireUnauth>
    {children}
  </ProtectedRoute>
)