import { useState, useEffect } from 'react'
import { useAuth } from './useAuth'
import { databaseService } from '../services/database'
import { apiClient } from '../services/api'

export function useUserData() {
  const { user } = useAuth()
  const [userData, setUserData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (user) {
      fetchUserData()
    } else {
      setUserData(null)
      setLoading(false)
    }
  }, [user])

  const fetchUserData = async () => {
    if (!user) return
    
    setLoading(true)
    setError(null)
    
    try {
      // Fetch multiple data sources in parallel
      const [postsResult, dashboardResult, analyticsResult] = await Promise.all([
        databaseService.getUserPosts(user.id),
        databaseService.getUserDashboardData(user.id),
        apiClient.getAnalytics(user.id)
      ])

      const data = {
        posts: postsResult.success ? postsResult.posts : [],
        dashboard: dashboardResult.success ? dashboardResult.dashboard : null,
        analytics: analyticsResult.success ? analyticsResult.data : null,
        lastUpdated: new Date().toISOString()
      }

      setUserData(data)
    } catch (err: any) {
      setError(err.message)
      console.error('Failed to fetch user data:', err)
    } finally {
      setLoading(false)
    }
  }

  const createPost = async (postData: any) => {
    if (!user) throw new Error('User not authenticated')
    
    const result = await databaseService.createPost(user.id, postData)
    if (result.success) {
      // Update local state
      setUserData((prev: any) => ({
        ...prev,
        posts: [result.post, ...(prev?.posts || [])],
        dashboard: prev?.dashboard ? {
          ...prev.dashboard,
          postsCount: prev.dashboard.postsCount + 1
        } : null
      }))
    }
    return result
  }

  const updatePost = async (postId: string, updates: any) => {
    const result = await databaseService.updatePost(postId, updates)
    if (result.success) {
      // Update local state
      setUserData((prev: any) => ({
        ...prev,
        posts: prev?.posts?.map((post: any) => 
          post.id === postId ? { ...post, ...updates } : post
        ) || []
      }))
    }
    return result
  }

  const deletePost = async (postId: string) => {
    const result = await databaseService.deletePost(postId)
    if (result.success) {
      // Update local state
      setUserData((prev: any) => ({
        ...prev,
        posts: prev?.posts?.filter((post: any) => post.id !== postId) || [],
        dashboard: prev?.dashboard ? {
          ...prev.dashboard,
          postsCount: Math.max(0, prev.dashboard.postsCount - 1)
        } : null
      }))
    }
    return result
  }

  const searchPosts = async (query: string) => {
    const result = await databaseService.searchPosts(query)
    return result
  }

  const refreshData = async () => {
    await fetchUserData()
  }

  // Subscribe to real-time updates
  useEffect(() => {
    if (!user) return
    
    const subscription = databaseService.subscribeToUserPosts(
      user.id,
      (newPost) => {
        setUserData((prev: any) => ({
          ...prev,
          posts: [newPost, ...(prev?.posts || [])]
        }))
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [user])

  return {
    data: userData,
    loading,
    error,
    createPost,
    updatePost,
    deletePost,
    searchPosts,
    refreshData,
    hasData: !!userData,
    isEmpty: userData?.posts?.length === 0
  }
}

// Hook for user posts
export function useUserPosts() {
  const { data, loading, error, createPost, updatePost, deletePost } = useUserData()
  
  return {
    posts: data?.posts || [],
    loading,
    error,
    createPost,
    updatePost,
    deletePost,
    totalPosts: data?.posts?.length || 0
  }
}

// Hook for user dashboard
export function useUserDashboard() {
  const { data, loading, error } = useUserData()
  
  return {
    dashboard: data?.dashboard,
    analytics: data?.analytics,
    loading,
    error,
    lastUpdated: data?.lastUpdated
  }
}

// Hook for user stats
export function useUserStats() {
  const { data } = useUserData()
  
  return {
    postsCount: data?.dashboard?.postsCount || 0,
    totalViews: data?.dashboard?.totalViews || 0,
    recentPosts: data?.dashboard?.recentPosts || []
  }
}