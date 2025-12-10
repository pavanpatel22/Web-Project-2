import { supabase, type Post } from './supabase'

export const databaseService = {
  // POSTS CRUD Operations
  async createPost(userId: string, postData: {
    title: string
    content: string
    tags?: string[]
    is_public?: boolean
  }) {
    try {
      const { data, error } = await supabase
        .from('posts')
        .insert([{
          user_id: userId,
          title: postData.title,
          content: postData.content,
          tags: postData.tags || [],
          is_public: postData.is_public ?? true,
          views: 0,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }])
        .select()
        .single()

      if (error) throw error

      return {
        success: true,
        post: data
      }
    } catch (error: any) {
      return {
        success: false,
        error: error.message
      }
    }
  },

  async getPost(postId: string) {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          profiles:user_id (
            name,
            avatar_url
          )
        `)
        .eq('id', postId)
        .single()

      if (error) throw error

      // Increment view count
      await this.incrementViews(postId)

      return {
        success: true,
        post: data
      }
    } catch (error: any) {
      return {
        success: false,
        error: error.message
      }
    }
  },

  async getUserPosts(userId: string) {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })

      if (error) throw error

      return {
        success: true,
        posts: data
      }
    } catch (error: any) {
      return {
        success: false,
        error: error.message
      }
    }
  },

  async getPublicPosts(page = 1, limit = 10) {
    try {
      const from = (page - 1) * limit
      const to = from + limit - 1

      const { data, error, count } = await supabase
        .from('posts')
        .select(`
          *,
          profiles:user_id (
            name,
            avatar_url
          )
        `, { count: 'exact' })
        .eq('is_public', true)
        .range(from, to)
        .order('created_at', { ascending: false })

      if (error) throw error

      return {
        success: true,
        posts: data,
        total: count || 0,
        page,
        totalPages: Math.ceil((count || 0) / limit)
      }
    } catch (error: any) {
      return {
        success: false,
        error: error.message
      }
    }
  },

  async updatePost(postId: string, updates: Partial<Post>) {
    try {
      const { data, error } = await supabase
        .from('posts')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', postId)
        .select()
        .single()

      if (error) throw error

      return {
        success: true,
        post: data
      }
    } catch (error: any) {
      return {
        success: false,
        error: error.message
      }
    }
  },

  async deletePost(postId: string) {
    try {
      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', postId)

      if (error) throw error

      return { success: true }
    } catch (error: any) {
      return {
        success: false,
        error: error.message
      }
    }
  },

  async incrementViews(postId: string) {
    try {
      await supabase.rpc('increment_views', { post_id: postId })
      return { success: true }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  },

  // USER DATA Operations
  async getUserDashboardData(userId: string) {
    try {
      // Get user's posts count
      const { count: postsCount } = await supabase
        .from('posts')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId)

      // Get total views
      const { data: viewsData } = await supabase
        .from('posts')
        .select('views')
        .eq('user_id', userId)

      const totalViews = viewsData?.reduce((sum: any, post: { views: any }) => sum + post.views, 0) || 0

      // Get recent activity
      const { data: recentPosts } = await supabase
        .from('posts')
        .select('*')
        .eq('user_id', userId)
        .order('updated_at', { ascending: false })
        .limit(5)

      return {
        success: true,
        dashboard: {
          postsCount: postsCount || 0,
          totalViews,
          recentPosts: recentPosts || []
        }
      }
    } catch (error: any) {
      return {
        success: false,
        error: error.message
      }
    }
  },

  // File Upload
  async uploadFile(file: File, bucket = 'avatars') {
    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`
      const filePath = `${fileName}`

      const { error } = await supabase.storage
        .from(bucket)
        .upload(filePath, file)

      if (error) throw error

      // Get public URL
      const { data } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath)

      return {
        success: true,
        url: data.publicUrl
      }
    } catch (error: any) {
      return {
        success: false,
        error: error.message
      }
    }
  },

  // Real-time Subscriptions
  subscribeToUserPosts(userId: string, callback: (post: Post) => void) {
  return supabase
    .channel('user-posts')
    .on(
      // cast to any to satisfy the current type definition
      'postgres_changes' as any,
      {
        event: '*',
        schema: 'public',
        table: 'posts',
        filter: `user_id=eq.${userId}`
      },
      (payload: { new: Post }) => {
        callback(payload.new as Post)
      }
    )
    .subscribe()
}
,

  // Search Posts
  async searchPosts(query: string) {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          profiles:user_id (
            name,
            avatar_url
          )
        `)
        .or(`title.ilike.%${query}%,content.ilike.%${query}%,tags.cs.{${query}}`)
        .eq('is_public', true)
        .order('created_at', { ascending: false })

      if (error) throw error

      return {
        success: true,
        results: data
      }
    } catch (error: any) {
      return {
        success: false,
        error: error.message
      }
    }
  }
}