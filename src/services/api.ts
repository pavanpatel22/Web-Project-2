// API Client for external services
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api'

interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

class ApiClient {
  private baseUrl: string
  private defaultHeaders: HeadersInit

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${this.baseUrl}${endpoint}`
      const headers = {
        ...this.defaultHeaders,
        ...options.headers
      }

      // Add auth token if available
      const token = localStorage.getItem('access_token')
      if (token) {
        headers['Authorization'] = `Bearer ${token}`
      }

      const response = await fetch(url, {
        ...options,
        headers
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()
      return {
        success: true,
        data
      }
    } catch (error: any) {
      console.error('API Request failed:', error)
      return {
        success: false,
        error: error.message,
        message: 'Failed to fetch data'
      }
    }
  }

  // Analytics API
  async getAnalytics(userId: string) {
    return this.request<{
      pageViews: number
      uniqueVisitors: number
      topPages: Array<{ path: string; views: number }>
      trafficSources: Record<string, number>
    }>(`/analytics/${userId}`)
  }

  // Email API
  async sendContactEmail(data: {
    name: string
    email: string
    message: string
  }) {
    return this.request<{ messageId: string }>('/email/contact', {
      method: 'POST',
      body: JSON.stringify(data)
    })
  }

  async sendNewsletterEmail(email: string) {
    return this.request<{ subscribed: boolean }>('/email/newsletter', {
      method: 'POST',
      body: JSON.stringify({ email })
    })
  }

  // Payment API (Stripe)
  async createCheckoutSession(priceId: string, userId: string) {
    return this.request<{ sessionId: string; url: string }>('/payment/checkout', {
      method: 'POST',
      body: JSON.stringify({ priceId, userId })
    })
  }

  async getSubscriptionStatus(userId: string) {
    return this.request<{
      active: boolean
      plan: string
      expiresAt: string
    }>(`/payment/subscription/${userId}`)
  }

  // Weather API (Example external API)
  async getWeather(location: string) {
    return this.request<{
      temperature: number
      condition: string
      location: string
      icon: string
    }>(`/weather?location=${encodeURIComponent(location)}`)
  }

  // GitHub API Integration
  async getGitHubStats(username: string) {
    return this.request<{
      repositories: number
      followers: number
      stars: number
      contributions: number
    }>(`/github/${username}`)
  }

  // File Processing API
  async processImage(file: File) {
    const formData = new FormData()
    formData.append('image', file)

    return this.request<{
      url: string
      processedUrl: string
      dimensions: { width: number; height: number }
    }>('/image/process', {
      method: 'POST',
      headers: {
        // Don't set Content-Type for FormData
      },
      body: formData
    })
  }

  // Backup/Restore API
  async backupData(userId: string) {
    return this.request<{ backupId: string; downloadUrl: string }>('/backup', {
      method: 'POST',
      body: JSON.stringify({ userId })
    })
  }

  async restoreData(backupId: string) {
    return this.request<{ restored: boolean }>(`/backup/${backupId}/restore`, {
      method: 'POST'
    })
  }

  // Webhook Testing
  async triggerWebhook(webhookId: string, payload: any) {
    return this.request<{ triggered: boolean; response: any }>(`/webhooks/${webhookId}/trigger`, {
      method: 'POST',
      body: JSON.stringify(payload)
    })
  }
}

export const apiClient = new ApiClient(API_BASE_URL)

// Mock API for development
export const mockApi = {
  async getAnalytics() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          pageViews: 15420,
          uniqueVisitors: 3250,
          topPages: [
            { path: '/', views: 5200 },
            { path: '/blog', views: 3200 },
            { path: '/projects', views: 2100 }
          ],
          trafficSources: {
            direct: 40,
            google: 35,
            social: 15,
            referral: 10
          }
        })
      }, 500)
    })
  },

  async sendContactEmail(data: any) {
    console.log('Mock email sent:', data)
    return { messageId: 'mock-' + Date.now() }
  }
}